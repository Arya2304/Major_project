from rest_framework import generics, permissions, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q, Sum, Count
from .models import SignProgress, VideoProgress, LessonProgress, LearningStats
from .serializers import (
    SignProgressSerializer,
    VideoProgressSerializer,
    LessonProgressSerializer,
    LearningStatsSerializer
)


class SignProgressListCreateView(generics.ListCreateAPIView):
    """List or create sign progress"""
    serializer_class = SignProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['sign__word', 'sign__description']
    ordering_fields = ['mastery_score', 'practice_count', 'updated_at']
    ordering = ['-updated_at']
    
    def get_queryset(self):
        return SignProgress.objects.filter(user=self.request.user).select_related('sign')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SignProgressDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete sign progress"""
    serializer_class = SignProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return SignProgress.objects.filter(user=self.request.user).select_related('sign')


class VideoProgressListCreateView(generics.ListCreateAPIView):
    """List or create video progress"""
    serializer_class = VideoProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['video__title', 'video__description']
    ordering_fields = ['watch_count', 'last_watched_at', 'updated_at']
    ordering = ['-updated_at']
    
    def get_queryset(self):
        return VideoProgress.objects.filter(user=self.request.user).select_related('video')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VideoProgressDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete video progress"""
    serializer_class = VideoProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return VideoProgress.objects.filter(user=self.request.user).select_related('video')


class LessonProgressListCreateView(generics.ListCreateAPIView):
    """List or create lesson progress"""
    serializer_class = LessonProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['lesson__title', 'lesson__description']
    ordering_fields = ['watch_count', 'last_watched_at', 'updated_at']
    ordering = ['lesson__order']
    
    def get_queryset(self):
        return LessonProgress.objects.filter(user=self.request.user).select_related('lesson')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LessonProgressDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete lesson progress"""
    serializer_class = LessonProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return LessonProgress.objects.filter(user=self.request.user).select_related('lesson')


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def learning_stats_view(request):
    """Get learning statistics for the current user"""
    stats, created = LearningStats.objects.get_or_create(user=request.user)
    serializer = LearningStatsSerializer(stats)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_sign_progress_view(request, sign_id):
    """Update progress for a sign"""
    from apps.sign_language.models import Sign
    
    try:
        sign = Sign.objects.get(id=sign_id)
        progress, created = SignProgress.objects.get_or_create(
            user=request.user,
            sign=sign
        )
        
        mastery_score = request.data.get('mastery_score', progress.mastery_score)
        is_learned = request.data.get('is_learned', progress.is_learned)
        
        if 0.0 <= mastery_score <= 100.0:
            progress.mastery_score = mastery_score
            progress.is_learned = is_learned
            progress.practice_count += 1
            progress.last_practiced_at = timezone.now()
            progress.save()
            
            # Update learning stats
            stats, _ = LearningStats.objects.get_or_create(user=request.user)
            stats.total_signs_learned = SignProgress.objects.filter(
                user=request.user, is_learned=True
            ).count()
            stats.last_activity_at = timezone.now()
            stats.save()
            
            return Response(SignProgressSerializer(progress).data)
        else:
            return Response(
                {'error': 'Mastery score must be between 0 and 100'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Sign.DoesNotExist:
        return Response(
            {'error': 'Sign not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_video_progress_view(request, video_id):
    """Update progress for a video"""
    from apps.sign_language.models import Video
    
    try:
        video = Video.objects.get(id=video_id)
        progress, created = VideoProgress.objects.get_or_create(
            user=request.user,
            video=video
        )
        
        watch_duration = request.data.get('watch_duration', 0)
        is_completed = request.data.get('is_completed', False)
        
        progress.watch_duration += watch_duration
        progress.watch_count += 1
        progress.is_watched = True
        progress.is_completed = is_completed
        progress.last_watched_at = timezone.now()
        progress.save()
        
        # Update learning stats
        stats, _ = LearningStats.objects.get_or_create(user=request.user)
        stats.total_videos_watched = VideoProgress.objects.filter(
            user=request.user, is_watched=True
        ).count()
        stats.total_practice_time += watch_duration
        stats.last_activity_at = timezone.now()
        stats.save()
        
        return Response(VideoProgressSerializer(progress).data)
    except Video.DoesNotExist:
        return Response(
            {'error': 'Video not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_lesson_progress_view(request, lesson_id):
    """Update progress for a lesson"""
    from apps.courses.models import Lesson
    
    try:
        lesson = Lesson.objects.get(id=lesson_id)
        progress, created = LessonProgress.objects.get_or_create(
            user=request.user,
            lesson=lesson
        )
        
        watch_duration = request.data.get('watch_duration', 0)
        is_completed = request.data.get('is_completed', False)
        
        progress.watch_duration += watch_duration
        progress.watch_count += 1
        progress.is_completed = is_completed
        progress.last_watched_at = timezone.now()
        
        if is_completed and not progress.completed_at:
            progress.completed_at = timezone.now()
        
        progress.save()
        
        # Update learning stats
        stats, _ = LearningStats.objects.get_or_create(user=request.user)
        stats.total_lessons_completed = LessonProgress.objects.filter(
            user=request.user, is_completed=True
        ).count()
        stats.total_practice_time += watch_duration
        stats.last_activity_at = timezone.now()
        stats.save()
        
        return Response(LessonProgressSerializer(progress).data)
    except Lesson.DoesNotExist:
        return Response(
            {'error': 'Lesson not found'},
            status=status.HTTP_404_NOT_FOUND
        )

