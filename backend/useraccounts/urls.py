from django.urls import path
from .views import RegisterView, LoginView, RefreshView, TOTPSetupView, TOTPVerifyView, TOTPDisableView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("token/", LoginView.as_view()),
    path("token/refresh/", RefreshView.as_view()),
    path("2fa/setup/", TOTPSetupView.as_view()),
    path("2fa/verify/", TOTPVerifyView.as_view()),
    path("2fa/disable/", TOTPDisableView.as_view()),
]
