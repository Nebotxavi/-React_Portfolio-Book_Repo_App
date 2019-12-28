from rest_framework import serializers

from books.models import Book

from genres.models import Genre
from genres.api.serializers import GenreListSerializer


class BookListSerializer(serializers.ModelSerializer):

    genre = serializers.CharField(source='genre.name', read_only=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'author_first_name',
                  'author_second_name', 'genre', 'rate')


class BookCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:

        genre = serializers.PrimaryKeyRelatedField(
            queryset=Genre.objects.all())

        model = Book
        fields = ('title', 'author_first_name',
                  'author_second_name', 'genre', 'rate')

        # def create(self, validated_data):
        #     genres_data = validated_data.pop('genre')
        #     book = Book.objects.create(**validated_data)
        #     for genre in genres_data:
