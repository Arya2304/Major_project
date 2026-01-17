from django.contrib import admin
from .models import Course, Lesson, Enrollment


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1
    fields = ['title', 'order', 'duration', 'is_free']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'language', 'difficulty_level', 'instructor', 
                    'is_published', 'is_featured', 'enrolled_count', 'rating', 'created_at']
    list_filter = ['language', 'difficulty_level', 'is_published', 'is_featured', 'created_at']
    search_fields = ['title', 'description']
    raw_id_fields = ['instructor']
    inlines = [LessonInline]


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'order', 'duration', 'is_free', 'created_at']
    list_filter = ['course', 'is_free', 'created_at']
    search_fields = ['title', 'description', 'course__title']
    raw_id_fields = ['course']
    filter_horizontal = ['signs']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'enrolled_at', 'is_completed', 
                    'progress_percentage', 'completed_at']
    list_filter = ['is_completed', 'enrolled_at']
    search_fields = ['user__email', 'course__title']
    raw_id_fields = ['user', 'course']
    readonly_fields = ['enrolled_at']

