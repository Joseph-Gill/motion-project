from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(
        to=User,
        related_name='user_profile',
        on_delete=models.CASCADE)

    user_follows = models.ManyToManyField(
        to=User,
        related_name='followees',
        blank=True)

    def __str__(self):
        return f'User Profile {self.pk}: for {self.user.username}'
