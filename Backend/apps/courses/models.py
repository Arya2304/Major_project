from django.db import models
from django.contrib.auth import get_user_model
from apps.sign_language.models import Sign

User = get_user_model()


class Course(models.Model):
    """Educational course model for deaf/mute users"""
    LANGUAGE_CHOICES = [
        ('ASL', 'American Sign Language'),
        ('ISL', 'Indian Sign Language'),
        ('BSL', 'British Sign Language'),
    ]
    
    DIFFICULTY_CHOICES = [
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    language = models.CharField(max_length=3, choices=LANGUAGE_CHOICES)
    difficulty_level = models.IntegerField(choices=DIFFICULTY_CHOICES, default=1)
    thumbnail = models.ImageField(upload_to='courses/thumbnails/', null=True, blank=True)
    instructor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='instructed_courses'
    )
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    duration_hours = models.FloatField(default=0.0, help_text='Estimated course duration in hours')
    enrolled_count = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0, help_text='Average rating out of 5')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at', '-is_featured']
        indexes = [
            models.Index(fields=['language', 'difficulty_level']),
            models.Index(fields=['is_published', 'is_featured']),
        ]
    
    def __str__(self):
        return f"{self.title} ({self.get_language_display()})"


class Lesson(models.Model):
    """Lesson model within a course"""
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='lessons'
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    video = models.FileField(upload_to='courses/lessons/videos/')
    thumbnail = models.ImageField(upload_to='courses/lessons/thumbnails/', null=True, blank=True)
    duration = models.IntegerField(help_text='Duration in seconds', null=True, blank=True)
    order = models.IntegerField(help_text='Order of lesson in the course', default=0)
    signs = models.ManyToManyField(
        Sign,
        related_name='lessons',
        blank=True,
        help_text='Signs covered in this lesson'
    )
    is_free = models.BooleanField(default=False, help_text='Can be accessed without enrollment')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['course', 'order', 'created_at']
        unique_together = ['course', 'order']
        indexes = [
            models.Index(fields=['course', 'order']),
        ]
    
    def __str__(self):
        return f"{self.course.title} - Lesson {self.order}: {self.title}"


class Enrollment(models.Model):
    """User enrollment in a course"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    progress_percentage = models.FloatField(default=0.0)
    
    class Meta:
        unique_together = ['user', 'course']
        ordering = ['-enrolled_at']
        indexes = [
            models.Index(fields=['user', 'is_completed']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.course.title}"

