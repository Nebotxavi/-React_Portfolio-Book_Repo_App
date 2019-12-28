from rest_framework import serializers

from genres.models import Genre


class GenreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name', 'id']
