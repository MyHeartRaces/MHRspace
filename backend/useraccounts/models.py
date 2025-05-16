from django.contrib.auth.models import User
from django.db import models
import uuid, pyotp

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    totp_secret = models.CharField(max_length=32, blank=True, null=True)

    def generate_totp_secret(self):
        self.totp_secret = pyotp.random_base32()
        self.save(update_fields=["totp_secret"])
        return self.totp_secret

    def verify_otp(self, code: str) -> bool:
        if not self.totp_secret:
            return False
        totp = pyotp.TOTP(self.totp_secret)
        return totp.verify(code, valid_window=1)

    def __str__(self): return f"Profile<{self.user.username}>"
