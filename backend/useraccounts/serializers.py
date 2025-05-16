from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Profile
import pyotp

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated):
        user = User.objects.create_user(
            username=validated["username"],
            email=validated["email"],
            password=validated["password"],
        )
        Profile.objects.create(user=user)
        return user

class CustomTokenSerializer(TokenObtainPairSerializer):
    otp_code = serializers.CharField(write_only=True, required=False, default="")

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token

    def validate(self, attrs):
        otp = attrs.pop("otp_code", "")
        data = super().validate(attrs)
        profile = self.user.profile  # via OneToOne auto-created signal
        if profile.totp_secret:
            if not profile.verify_otp(otp):
                raise serializers.ValidationError({"otp_code": "Invalid or missing TOTP code"})
        return data

class TOTPSetupSerializer(serializers.Serializer):
    otp_uri = serializers.CharField(read_only=True)
    secret = serializers.CharField(read_only=True)

class TOTPVerifySerializer(serializers.Serializer):
    otp_code = serializers.CharField()
