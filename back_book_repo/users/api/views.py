from .serializers import UserCreateSerializer  # , UserLoginSerializer

from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView

from rest_framework.permissions import AllowAny

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from rest_framework_simplejwt.views import TokenObtainPairView, TokenObtainSlidingView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import MyTokenObtainSlidingSerializer

User = get_user_model()


class MyTokenObtainSlidingView(TokenObtainSlidingView):
    serializer_class = MyTokenObtainSlidingSerializer
    permission_classes = [AllowAny]


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]


# class UserLoginAPIView(APIView):
#     permission_classes = [AllowAny]
#     serializer_class = UserLoginSerializer

#     def post(self, request, *args, **kwargs):
#         data = request.data
#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             new_data = serializer.data
#             return Response(new_data, status=HTTP_200_OK)
#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
