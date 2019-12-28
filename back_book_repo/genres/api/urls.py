from django.urls import path

from . import views as GenresViews

urlpatterns = [
    path('', GenresViews.GenreListAPIView.as_view(), name='view_genres'),
]
