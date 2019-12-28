from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from books.models import Book
from users.models import User
from genres.models import Genre

from users.forms import CustomUserCreationForm, CustomUserChangeForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    list_display = ['email', 'username']
    model = User


admin.site.register(Book)
admin.site.register(Genre)
admin.site.register(User, CustomUserAdmin)
