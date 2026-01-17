from rest_framework import generics, permissions, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q, Avg, Count
from .models import Course, Lesson, Enrollment
from .serializers import (
    CourseSerializer,
    CourseDetailSerializer,
    LessonSerializer,
    EnrollmentSerializer,
    EnrollmentDetailSerializer
)


class CourseListCreateView(generics.ListCreateAPIView):
    """List all courses or create a new course"""
    queryset = Course.objects.select_related('instructor').prefetch_related('lessons')
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'rating', 'enrolled_count', 'price']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        language = self.request.query_params.get('language', None)
        difficulty = self.request.query_params.get('difficulty', None)
        featured = self.request.query_params.get('featured', None)
        published_only = self.request.query_params.get('published', 'true')
        
        if language:
            queryset = queryset.filter(language=language)
        if difficulty:
            queryset = queryset.filter(difficulty_level=difficulty)
        if featured:
            queryset = queryset.filter(is_featured=True)
        if published_only == 'true':
            queryset = queryset.filter(is_published=True)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a course"""
    queryset = Course.objects.select_related('instructor').prefetch_related('lessons')
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CourseDetailSerializer
        return CourseSerializer


class LessonListCreateView(generics.ListCreateAPIView):
    """List all lessons or create a new lesson"""
    queryset = Lesson.objects.select_related('course').prefetch_related('signs')
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'course__title']
    ordering_fields = ['order', 'created_at']
    ordering = ['order']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.request.query_params.get('course', None)
        
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        
        return queryset


class LessonDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a lesson"""
    queryset = Lesson.objects.select_related('course').prefetch_related('signs')
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EnrollmentListCreateView(generics.ListCreateAPIView):
    """List user enrollments or create a new enrollment"""
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user).select_related('course')
    
    def perform_create(self, serializer):
        course = serializer.validated_data['course']
        enrollment, created = Enrollment.objects.get_or_create(
            user=self.request.user,
            course=course,
            defaults={'progress_percentage': 0.0}
        )
        if created:
            course.enrolled_count += 1
            course.save(update_fields=['enrolled_count'])
        serializer.instance = enrollment


class EnrollmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete an enrollment"""
    serializer_class = EnrollmentDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user).select_related('course')


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_courses_view(request):
    """Get all courses enrolled by the current user"""
    enrollments = Enrollment.objects.filter(user=request.user).select_related('course')
    serializer = EnrollmentDetailSerializer(enrollments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_progress_view(request, enrollment_id):
    """Update progress for a course enrollment"""
    try:
        enrollment = Enrollment.objects.get(id=enrollment_id, user=request.user)
        progress = request.data.get('progress_percentage', 0.0)
        
        if 0.0 <= progress <= 100.0:
            enrollment.progress_percentage = progress
            if progress >= 100.0 and not enrollment.is_completed:
                enrollment.is_completed = True
                from django.utils import timezone
                enrollment.completed_at = timezone.now()
            enrollment.save()
            return Response(EnrollmentDetailSerializer(enrollment).data)
        else:
            return Response(
                {'error': 'Progress must be between 0 and 100'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Enrollment.DoesNotExist:
        return Response(
            {'error': 'Enrollment not found'},
            status=status.HTTP_404_NOT_FOUND
        )

