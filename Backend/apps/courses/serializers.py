import json
from rest_framework import serializers
from .models import Course, Lesson, Enrollment
from apps.sign_language.serializers import SignSerializer


class LessonSerializer(serializers.ModelSerializer):
    signs = SignSerializer(many=True, read_only=True)
    
    class Meta:
        model = Lesson
        fields = ['id', 'course', 'title', 'description', 'video', 'thumbnail',
                  'duration', 'order', 'signs', 'is_free',
                  'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
    
    def to_internal_value(self, data):
        # Handle sign_ids if provided
        if 'sign_ids' in data:
            from apps.sign_language.models import Sign
            # `sign_ids` may come as:
            # - list of values (e.g. JSON)
            # - a single string (e.g. "1" or "[1,2]" or "1,2")
            # - multipart form keys where multiple values may exist
            if hasattr(data, 'getlist'):
                sign_ids = data.getlist('sign_ids')
                # `getlist` returns [] if key doesn't exist
                if sign_ids:
                    # Remove from data so it doesn't end up in `super()`
                    try:
                        data.pop('sign_ids', None)
                    except Exception:
                        pass
            else:
                sign_ids = data.pop('sign_ids', [])

            if isinstance(sign_ids, str):
                # Try JSON first, then comma-separated.
                try:
                    parsed = json.loads(sign_ids)
                    sign_ids = parsed if isinstance(parsed, list) else [parsed]
                except Exception:
                    if sign_ids.strip().endswith(']') and sign_ids.strip().startswith('['):
                        sign_ids = [s for s in sign_ids.strip('[]').split(',') if s.strip()]
                    elif ',' in sign_ids:
                        sign_ids = [s.strip() for s in sign_ids.split(',') if s.strip()]
                    else:
                        sign_ids = [sign_ids] if sign_ids.strip() else []

            # Normalize to list[int] where possible.
            sign_ids = [int(s) for s in sign_ids if str(s).strip().isdigit()]
            ret = super().to_internal_value(data)
            ret['sign_ids'] = sign_ids
            return ret
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        sign_ids = validated_data.pop('sign_ids', [])
        lesson = Lesson.objects.create(**validated_data)
        if sign_ids:
            from apps.sign_language.models import Sign
            lesson.signs.set(Sign.objects.filter(id__in=sign_ids))
        return lesson
    
    def update(self, instance, validated_data):
        sign_ids = validated_data.pop('sign_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if sign_ids is not None:
            from apps.sign_language.models import Sign
            instance.signs.set(Sign.objects.filter(id__in=sign_ids))
        return instance


class CourseSerializer(serializers.ModelSerializer):
    instructor = serializers.StringRelatedField(read_only=True)
    lessons_count = serializers.SerializerMethodField()
    language_display = serializers.CharField(source='get_language_display', read_only=True)
    difficulty_display = serializers.CharField(source='get_difficulty_level_display', read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'language', 'language_display',
                  'difficulty_level', 'difficulty_display', 'thumbnail', 'instructor',
                  'is_published', 'is_featured', 'price', 'duration_hours',
                  'enrolled_count', 'rating', 'lessons_count', 'is_enrolled',
                  'created_at', 'updated_at']
        read_only_fields = ['enrolled_count', 'rating', 'created_at', 'updated_at']
    
    def get_lessons_count(self, obj):
        return obj.lessons.count()
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(user=request.user, course=obj).exists()
        return False


class CourseDetailSerializer(CourseSerializer):
    """Extended serializer for course detail view with lessons"""
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta(CourseSerializer.Meta):
        fields = [*CourseSerializer.Meta.fields, 'lessons']


class EnrollmentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.filter(is_published=True),
        source='course',
        write_only=True
    )
    
    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'course_id', 'enrolled_at',
                  'completed_at', 'is_completed', 'progress_percentage']
        read_only_fields = ['user', 'enrolled_at', 'completed_at', 'is_completed']


class EnrollmentDetailSerializer(EnrollmentSerializer):
    """Extended serializer for enrollment detail view"""
    course = CourseDetailSerializer(read_only=True)

