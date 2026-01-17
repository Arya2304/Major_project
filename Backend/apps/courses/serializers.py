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
            sign_ids = data.pop('sign_ids', [])
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

