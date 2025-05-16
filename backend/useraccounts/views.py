from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, CustomTokenSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Profile
import pyotp

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

class RefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]

class TOTPSetupView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        profile: Profile = request.user.profile
        secret = profile.generate_totp_secret()
        otp_uri = pyotp.TOTP(secret).provisioning_uri(
            name=request.user.email or request.user.username,
            issuer_name="MHRspace"
        )
        return Response({"secret": secret, "otp_uri": otp_uri})

class TOTPVerifyView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        code = request.data.get("otp_code", "")
        if request.user.profile.verify_otp(code):
            return Response({"detail": "TOTP valid"})
        return Response({"detail": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)

class TOTPDisableView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.profile.disable_totp()
        return Response({"detail": "Two-factor authentication disabled"})
