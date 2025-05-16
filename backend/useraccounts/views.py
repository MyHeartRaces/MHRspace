from rest_framework import generics, permissions
from .serializers import (
    RegisterSerializer, CustomTokenSerializer,
    TOTPSetupSerializer, TOTPVerifySerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.response import Response
import pyotp

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer
    permission_classes = [permissions.AllowAny]

class TOTPSetupView(generics.GenericAPIView):
    serializer_class = TOTPSetupSerializer

    def post(self, request):
        profile = request.user.profile
        secret = profile.generate_totp_secret()
        otp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
            name=request.user.email or request.user.username,
            issuer_name="MHRspace"
        )
        return Response({"secret": secret, "otp_uri": otp_uri})

class TOTPVerifyView(generics.GenericAPIView):
    serializer_class = TOTPVerifySerializer

    def post(self, request):
        code = request.data.get("otp_code", "")
        if request.user.profile.verify_otp(code):
            return Response({"detail": "TOTP verified"})
        return Response({"detail": "Invalid code"}, status=400)
