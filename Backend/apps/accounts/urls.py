from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('profile/', views.profile_view, name='profile'),
    
    # Roles
    path('roles/', views.RoleListCreateView.as_view(), name='role-list-create'),
    path('roles/<int:pk>/', views.RoleDetailView.as_view(), name='role-detail'),
    
    # Users (admin only)
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
]

