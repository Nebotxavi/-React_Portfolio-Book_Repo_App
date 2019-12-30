from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView, TokenRefreshSlidingView

from users.api import views as userViews


urlpatterns = [
    # path('login', userViews.UserLoginAPIView.as_view(), name='login'),
    path('register/', userViews.UserCreateAPIView.as_view(), name='register'),
    path('token/', userViews.MyTokenObtainSlidingView.as_view(),
         name="token_obtain_sliding"),
    path('token/refresh/', TokenRefreshSlidingView.as_view(), name="token refresh"),
]
