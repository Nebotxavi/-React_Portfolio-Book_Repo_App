from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateAPIView,
                                     DestroyAPIView,
                                     CreateAPIView)

from books.models import Book

from .serializers import BookListSerializer, BookCreateUpdateSerializer

from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import (AllowAny,
                                        IsAdminUser,
                                        IsAuthenticated
                                        )


class BookListAPIView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookListSerializer

    permission_classes = [AllowAny]


class BookDetailAPIView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookListSerializer
    permission_classes = [IsAuthenticated]


class BookUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookCreateUpdateSerializer
    #permission_classes = [IsOwnerOrReadOnly]


class BookDeleteAPIView(DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookListSerializer
    #permission_classes = [IsAdminUser]


class BookCreateAPIView(CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookCreateUpdateSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
