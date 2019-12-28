from django.urls import path

from . import views as bookViews

urlpatterns = [
    path('', bookViews.BookListAPIView.as_view(), name='view_books'),
    path('<int:pk>/', bookViews.BookDetailAPIView.as_view(), name='detail_book'),
    path('<int:pk>/edit/', bookViews.BookUpdateAPIView.as_view(), name='update_book'),
    path('<int:pk>/delete/', bookViews.BookDeleteAPIView.as_view(), name='delete_book'),
    path('new/', bookViews.BookCreateAPIView.as_view(), name='new_book'),
]
