from django.db import models
from django.contrib.auth import get_user_model
from apps.sign_language.models import Sign, Video
from apps.courses.models import Course, Lesson

User = get_user_model()


class SignProgress(models.Model):
    """Track user progress for individual signs"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sign_progress'
    )
    sign = models.ForeignKey(
        Sign,
        on_delete=models.CASCADE,
        related_name='user_progress'
    )
    is_learned = models.BooleanField(default=False)
    practice_count = models.IntegerField(default=0)
    last_practiced_at = models.DateTimeField(null=True, blank=True)
    mastery_score = models.FloatField(default=0.0, help_text='Score from 0.0 to 100.0')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'sign']
        ordering = ['-updated_at']
        indexes = [
            models.Index(fields=['user', 'is_learned']),
            models.Index(fields=['sign', 'mastery_score']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.sign.word} ({self.mastery_score}%)"


class VideoProgress(models.Model):
    """Track user progress for videos"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='video_progress'
    )
    video = models.ForeignKey(
        Video,
        on_delete=models.CASCADE,
        related_name='user_progress'
    )
    is_watched = models.BooleanField(default=False)
    watch_count = models.IntegerField(default=0)
    last_watched_at = models.DateTimeField(null=True, blank=True)
    watch_duration = models.IntegerField(default=0, help_text='Total seconds watched')
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'video']
        ordering = ['-updated_at']
        indexes = [
            models.Index(fields=['user', 'is_completed']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.video.title}"


class LessonProgress(models.Model):
    """Track user progress for course lessons"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='lesson_progress'
    )
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name='user_progress'
    )
    is_completed = models.BooleanField(default=False)
    watch_count = models.IntegerField(default=0)
    last_watched_at = models.DateTimeField(null=True, blank=True)
    watch_duration = models.IntegerField(default=0, help_text='Total seconds watched')
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'lesson']
        ordering = ['lesson__order']
        indexes = [
            models.Index(fields=['user', 'is_completed']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.lesson.title}"


class LearningStats(models.Model):
    """Aggregated learning statistics for users"""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='learning_stats'
    )
    total_signs_learned = models.IntegerField(default=0)
    total_videos_watched = models.IntegerField(default=0)
    total_lessons_completed = models.IntegerField(default=0)
    total_practice_time = models.IntegerField(default=0, help_text='Total practice time in seconds')
    current_streak = models.IntegerField(default=0, help_text='Days of consecutive learning')
    longest_streak = models.IntegerField(default=0)
    last_activity_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Learning Stats'
    
    def __str__(self):
        return f"{self.user.email} - Learning Stats"

