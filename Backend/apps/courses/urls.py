from django.urls import path
from . import views

urlpatterns = [
    # Courses
    path('', views.CourseListCreateView.as_view(), name='course-list-create'),
    path('<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('my-courses/', views.my_courses_view, name='my-courses'),
    
    # Lessons
    path('lessons/', views.LessonListCreateView.as_view(), name='lesson-list-create'),
    path('lessons/<int:pk>/', views.LessonDetailView.as_view(), name='lesson-detail'),
    
    # Enrollments
    path('enrollments/', views.EnrollmentListCreateView.as_view(), name='enrollment-list-create'),
    path('enrollments/<int:pk>/', views.EnrollmentDetailView.as_view(), name='enrollment-detail'),
    path('enrollments/<int:enrollment_id>/progress/', views.update_progress_view, name='update-progress'),
]

