from rest_framework import serializers
from .models import SignProgress, VideoProgress, LessonProgress, LearningStats
from apps.sign_language.serializers import SignSerializer, VideoSerializer
from apps.courses.serializers import LessonSerializer


class SignProgressSerializer(serializers.ModelSerializer):
    sign = SignSerializer(read_only=True)
    
    class Meta:
        model = SignProgress
        fields = ['id', 'user', 'sign', 'is_learned', 'practice_count',
                  'last_practiced_at', 'mastery_score', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def to_internal_value(self, data):
        # Handle sign_id if provided
        if 'sign_id' in data:
            sign_id = data.pop('sign_id')
            ret = super().to_internal_value(data)
            ret['sign_id'] = sign_id
            return ret
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        sign_id = validated_data.pop('sign_id', None)
        if sign_id:
            from apps.sign_language.models import Sign
            validated_data['sign'] = Sign.objects.get(id=sign_id)
        return SignProgress.objects.create(**validated_data)


class VideoProgressSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = VideoProgress
        fields = ['id', 'user', 'video', 'is_watched', 'watch_count',
                  'last_watched_at', 'watch_duration', 'is_completed',
                  'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def to_internal_value(self, data):
        if 'video_id' in data:
            video_id = data.pop('video_id')
            ret = super().to_internal_value(data)
            ret['video_id'] = video_id
            return ret
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        video_id = validated_data.pop('video_id', None)
        if video_id:
            from apps.sign_language.models import Video
            validated_data['video'] = Video.objects.get(id=video_id)
        return VideoProgress.objects.create(**validated_data)


class LessonProgressSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)
    
    class Meta:
        model = LessonProgress
        fields = ['id', 'user', 'lesson', 'is_completed', 'watch_count',
                  'last_watched_at', 'watch_duration', 'completed_at',
                  'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def to_internal_value(self, data):
        if 'lesson_id' in data:
            lesson_id = data.pop('lesson_id')
            ret = super().to_internal_value(data)
            ret['lesson_id'] = lesson_id
            return ret
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        lesson_id = validated_data.pop('lesson_id', None)
        if lesson_id:
            from apps.courses.models import Lesson
            validated_data['lesson'] = Lesson.objects.get(id=lesson_id)
        return LessonProgress.objects.create(**validated_data)


class LearningStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningStats
        fields = ['id', 'user', 'total_signs_learned', 'total_videos_watched',
                  'total_lessons_completed', 'total_practice_time', 'current_streak',
                  'longest_streak', 'last_activity_at', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

