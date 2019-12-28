from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from users.api import views as userViews


urlpatterns = [
    # path('login', userViews.UserLoginAPIView.as_view(), name='login'),
    path('register/', userViews.UserCreateAPIView.as_view(), name='register'),
    path('token/', userViews.MyTokenObtainPairView.as_view(),
         name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token refresh"),
]
