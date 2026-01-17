from django.contrib import admin
from .models import Category, Sign, Video


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']


@admin.register(Sign)
class SignAdmin(admin.ModelAdmin):
    list_display = ['word', 'language', 'category', 'difficulty_level', 'created_at']
    list_filter = ['language', 'category', 'difficulty_level', 'created_at']
    search_fields = ['word', 'description']
    raw_id_fields = ['category']


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'sign', 'duration', 'is_featured', 'view_count', 'created_at']
    list_filter = ['is_featured', 'created_at', 'sign__language']
    search_fields = ['title', 'description', 'sign__word']
    raw_id_fields = ['sign', 'created_by']
    readonly_fields = ['view_count']

