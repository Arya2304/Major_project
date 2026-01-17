from django.urls import path
from . import views

urlpatterns = [
    # Languages
    path('languages/', views.languages_view, name='languages'),
    
    # Categories
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    
    # Signs
    path('signs/', views.SignListCreateView.as_view(), name='sign-list-create'),
    path('signs/<int:pk>/', views.SignDetailView.as_view(), name='sign-detail'),
    
    # Videos
    path('videos/', views.VideoListCreateView.as_view(), name='video-list-create'),
    path('videos/<int:pk>/', views.VideoDetailView.as_view(), name='video-detail'),
]

