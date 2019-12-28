from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

from genres.models import Genre

User = get_user_model()


class Book(models.Model):
    title = models.CharField(max_length=150, blank=False)
    author_first_name = models.CharField(max_length=150, blank=True)
    author_second_name = models.CharField(max_length=150, blank=True)
    rate = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(10)])
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.title
