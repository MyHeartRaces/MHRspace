from django.urls import path
from .views import RegisterView, LoginView, TOTPSetupView, TOTPVerifyView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("token/",    LoginView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("2fa/setup/",  TOTPSetupView.as_view()),
    path("2fa/verify/", TOTPVerifyView.as_view()),
]
