from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/books/', include('books.api.urls')),
    path('api/users/', include('users.api.urls')),
    path('api/genres/', include('genres.api.urls')),
]
