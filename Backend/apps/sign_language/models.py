from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    """Category for organizing signs (e.g., Greetings, Numbers, Colors)"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    icon = models.ImageField(upload_to='categories/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Sign(models.Model):
    """Sign language sign model"""
    LANGUAGE_CHOICES = [
        ('ASL', 'American Sign Language'),
        ('ISL', 'Indian Sign Language'),
        ('BSL', 'British Sign Language'),
    ]
    
    word = models.CharField(max_length=200)
    language = models.CharField(max_length=3, choices=LANGUAGE_CHOICES)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='signs'
    )
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='signs/images/', null=True, blank=True)
    difficulty_level = models.IntegerField(
        choices=[(1, 'Beginner'), (2, 'Intermediate'), (3, 'Advanced')],
        default=1
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['word', 'language']
        ordering = ['word', 'language']
        indexes = [
            models.Index(fields=['language', 'category']),
            models.Index(fields=['difficulty_level']),
        ]
    
    def __str__(self):
        return f"{self.word} ({self.get_language_display()})"


class Video(models.Model):
    """Video model for sign language lessons"""
    sign = models.ForeignKey(
        Sign,
        on_delete=models.CASCADE,
        related_name='videos'
    )
    title = models.CharField(max_length=200)
    video_file = models.FileField(upload_to='signs/videos/')
    thumbnail = models.ImageField(upload_to='signs/thumbnails/', null=True, blank=True)
    duration = models.IntegerField(help_text='Duration in seconds', null=True, blank=True)
    description = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    view_count = models.IntegerField(default=0)
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='uploaded_videos'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at', '-is_featured']
        indexes = [
            models.Index(fields=['sign', 'is_featured']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.sign.word}"

