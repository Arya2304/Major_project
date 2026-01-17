from rest_framework import generics, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
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

