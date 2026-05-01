from rest_framework import generics, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import base64
import os
import pickle
import cv2
import mediapipe as mp
import numpy as np
from .models import Category, Sign, Video
from .serializers import (
    CategorySerializer,
    SignSerializer,
    VideoSerializer,
    VideoDetailSerializer
)


class CategoryListCreateView(generics.ListCreateAPIView):
    """List all categories or create a new category"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a category"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SignListCreateView(generics.ListCreateAPIView):
    """List all signs or create a new sign"""
    queryset = Sign.objects.select_related('category').prefetch_related('videos')
    serializer_class = SignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['word', 'description', 'category__name']
    ordering_fields = ['word', 'language', 'difficulty_level', 'created_at']
    ordering = ['word']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        language = self.request.query_params.get('language', None)
        category = self.request.query_params.get('category', None)
        difficulty = self.request.query_params.get('difficulty', None)
        
        if language:
            queryset = queryset.filter(language=language)
        if category:
            queryset = queryset.filter(category_id=category)
        if difficulty:
            queryset = queryset.filter(difficulty_level=difficulty)
        
        return queryset


class SignDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a sign"""
    queryset = Sign.objects.select_related('category').prefetch_related('videos')
    serializer_class = SignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class VideoListCreateView(generics.ListCreateAPIView):
    """List all videos or create a new video"""
    queryset = Video.objects.select_related('sign', 'created_by')
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'sign__word']
    ordering_fields = ['created_at', 'view_count', 'is_featured']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        sign_id = self.request.query_params.get('sign', None)
        is_featured = self.request.query_params.get('featured', None)
        language = self.request.query_params.get('language', None)
        
        if sign_id:
            queryset = queryset.filter(sign_id=sign_id)
        if is_featured:
            queryset = queryset.filter(is_featured=True)
        if language:
            queryset = queryset.filter(sign__language=language)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class VideoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a video"""
    queryset = Video.objects.select_related('sign', 'created_by')
    serializer_class = VideoDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def languages_view(request):
    """Get available sign languages"""
    languages = [
        {'code': 'ASL', 'name': 'American Sign Language'},
        {'code': 'ISL', 'name': 'Indian Sign Language'},
        {'code': 'BSL', 'name': 'British Sign Language'},
    ]
    return Response(languages)


_gesture_model = None
_gesture_hands = None
_labels_dict = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I',
    9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q',
    17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'
}


def _get_gesture_model():
    global _gesture_model
    if _gesture_model is not None:
        return _gesture_model

    configured_path = os.environ.get('SIGN_MODEL_PATH')
    default_project_path = os.path.join(settings.BASE_DIR, 'model.p')
    fallback_external_path = r'C:\Desktop\BE-Projects\Sign-Language-Detection-main\model.p'
    model_path = configured_path or (default_project_path if os.path.exists(default_project_path) else fallback_external_path)

    with open(model_path, 'rb') as model_file:
        model_dict = pickle.load(model_file)
        _gesture_model = model_dict['model']
    return _gesture_model


def _get_hands_detector():
    global _gesture_hands
    if _gesture_hands is None:
        _gesture_hands = mp.solutions.hands.Hands(static_image_mode=True, min_detection_confidence=0.3)
    return _gesture_hands


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def detect_gesture_view(request):
    """
    Detect sign gesture from a base64 image frame.
    Payload:
      { "image": "data:image/jpeg;base64,...." } or raw base64 string
    """
    image_data = request.data.get('image')
    if not image_data or not isinstance(image_data, str):
        return Response({'error': 'Missing image data'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        encoded = image_data.split(',', 1)[1] if ',' in image_data else image_data
        binary = base64.b64decode(encoded)
        image_array = np.frombuffer(binary, dtype=np.uint8)
        frame = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        if frame is None:
            return Response({'gesture': None, 'detail': 'Invalid image frame'}, status=status.HTTP_200_OK)

        model = _get_gesture_model()
        hands = _get_hands_detector()

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)
        if not results.multi_hand_landmarks:
            return Response({'gesture': None}, status=status.HTTP_200_OK)

        data_aux = []
        x_ = []
        y_ = []
        hand_landmarks = results.multi_hand_landmarks[0]
        for point in hand_landmarks.landmark:
            x_.append(point.x)
            y_.append(point.y)
        for point in hand_landmarks.landmark:
            data_aux.append(point.x - min(x_))
            data_aux.append(point.y - min(y_))

        prediction = model.predict([np.asarray(data_aux)])
        predicted_idx = int(prediction[0])
        predicted_character = _labels_dict.get(predicted_idx, str(predicted_idx))

        return Response({
            'gesture': predicted_character,
            'prediction': predicted_character,
            'label': predicted_character,
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

