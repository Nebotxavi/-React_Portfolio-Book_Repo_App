from rest_framework.generics import ListAPIView

from genres.models import Genre

from .serializers import GenreListSerializer

from rest_framework.permissions import AllowAny


class GenreListAPIView(ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreListSerializer
    permission_classes = [AllowAny]
