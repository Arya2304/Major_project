from django.contrib import admin
from .models import SignProgress, VideoProgress, LessonProgress, LearningStats


@admin.register(SignProgress)
class SignProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'sign', 'is_learned', 'practice_count', 
                    'mastery_score', 'last_practiced_at', 'updated_at']
    list_filter = ['is_learned', 'updated_at', 'sign__language']
    search_fields = ['user__email', 'sign__word']
    raw_id_fields = ['user', 'sign']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(VideoProgress)
class VideoProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'video', 'is_watched', 'watch_count', 
                    'is_completed', 'last_watched_at', 'updated_at']
    list_filter = ['is_watched', 'is_completed', 'updated_at']
    search_fields = ['user__email', 'video__title']
    raw_id_fields = ['user', 'video']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'lesson', 'is_completed', 'watch_count',
                    'last_watched_at', 'completed_at', 'updated_at']
    list_filter = ['is_completed', 'updated_at']
    search_fields = ['user__email', 'lesson__title']
    raw_id_fields = ['user', 'lesson']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(LearningStats)
class LearningStatsAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_signs_learned', 'total_videos_watched',
                    'total_lessons_completed', 'current_streak', 'longest_streak',
                    'last_activity_at', 'updated_at']
    list_filter = ['updated_at']
    search_fields = ['user__email']
    raw_id_fields = ['user']
    readonly_fields = ['created_at', 'updated_at']

