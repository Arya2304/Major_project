from django.urls import path
from . import views

urlpatterns = [
    # Learning Stats
    path('stats/', views.learning_stats_view, name='learning-stats'),
    
    # Sign Progress
    path('signs/', views.SignProgressListCreateView.as_view(), name='sign-progress-list-create'),
    path('signs/<int:pk>/', views.SignProgressDetailView.as_view(), name='sign-progress-detail'),
    path('signs/<int:sign_id>/update/', views.update_sign_progress_view, name='update-sign-progress'),
    
    # Video Progress
    path('videos/', views.VideoProgressListCreateView.as_view(), name='video-progress-list-create'),
    path('videos/<int:pk>/', views.VideoProgressDetailView.as_view(), name='video-progress-detail'),
    path('videos/<int:video_id>/update/', views.update_video_progress_view, name='update-video-progress'),
    
    # Lesson Progress
    path('lessons/', views.LessonProgressListCreateView.as_view(), name='lesson-progress-list-create'),
    path('lessons/<int:pk>/', views.LessonProgressDetailView.as_view(), name='lesson-progress-detail'),
    path('lessons/<int:lesson_id>/update/', views.update_lesson_progress_view, name='update-lesson-progress'),
]

