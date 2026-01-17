from rest_framework import serializers
from .models import Category, Sign, Video


class CategorySerializer(serializers.ModelSerializer):
    signs_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'icon', 'signs_count', 
                  'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
    
    def get_signs_count(self, obj):
        return obj.signs.count()


class SignSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    videos_count = serializers.SerializerMethodField()
    language_display = serializers.CharField(source='get_language_display', read_only=True)
    difficulty_display = serializers.CharField(source='get_difficulty_level_display', read_only=True)
    
    class Meta:
        model = Sign
        fields = ['id', 'word', 'language', 'language_display', 'category', 'category_id',
                  'description', 'image', 'difficulty_level', 'difficulty_display',
                  'videos_count', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
    
    def get_videos_count(self, obj):
        return obj.videos.count()


class VideoSerializer(serializers.ModelSerializer):
    sign = SignSerializer(read_only=True)
    sign_id = serializers.PrimaryKeyRelatedField(
        queryset=Sign.objects.all(),
        source='sign',
        write_only=True
    )
    created_by = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Video
        fields = ['id', 'sign', 'sign_id', 'title', 'video_file', 'thumbnail',
                  'duration', 'description', 'is_featured', 'view_count',
                  'created_by', 'created_at', 'updated_at']
        read_only_fields = ['view_count', 'created_at', 'updated_at']


class VideoDetailSerializer(VideoSerializer):
    """Extended serializer for video detail view"""
    sign = SignSerializer(read_only=True)

