from rest_framework import serializers

from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.exceptions import ValidationError


User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(label="Email address")
    email2 = serializers.EmailField(label="Confirm email")

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'email',
            'email2',
        ]

        extra_kwargs = {"password":
                        {"write_only": True}}

    def get_token(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def validate(self, data):

        return data

    def validate_email(self, value):
        data = self.get_initial()
        email1 = data.get("email2")

        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match.")

        user_qs = User.objects.filter(email=email1)
        if user_qs.exists():
            raise ValidationError("This email has already been registered.")

        return value

    def validate_email2(self, value):
        data = self.get_initial()
        email1 = data.get("email")

        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match.")

        return value

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']

        user_obj = User(
            username=username,
            email=email
        )

        user_obj.set_password(password)

        user_obj.save()
        return validated_data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


# class UserLoginSerializer(serializers.ModelSerializer):
#     token = serializers.CharField(allow_blank=True, read_only=True)
#     username = serializers.CharField(required=False, allow_blank=True)
#     email = serializers.EmailField(
#         label="Email address", required=False, allow_blank=True)

#     class Meta:
#         model = User
#         fields = [
#             'username',
#             'email',
#             'password',
#             'token'
#         ]

#         extra_kwargs = {"password":
#                         {"write_only": True}}

# Validate email or username and check password. Return a token
    # def validate(self, data):
    #     user_obj = None
    #     email = data.get('email', None)
    #     username = data.get("username", None)
    #     password = data["password"]

    #     if not email and not username:
    #         raise ValidationError("A username or email is required to login")

    #     user = User.objects.filter(
    #         Q(email=email) |
    #         Q(username=username)
    #     ).distinct()
    #     user = user.exclude(email__isnull=True).exclude(email__iexact='')
    #     if user.exists() and user.count() == 1:
    #         user_obj = user.first()
    #     else:
    #         raise ValidationError("This username/email is not valid.")

    #     if user_obj:
    #         if not user_obj.check_password(password):
    #             raise ValidationError(
    #                 "Incorrect credentials, please try again.")

    #     data['token'] = "SOME RANDOM TOKEN"

    #     return data
