from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ["email"]


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ["email"]
