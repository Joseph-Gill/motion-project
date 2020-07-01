# from django.contrib.auth import get_user_model
from django.db import models
from django.conf import settings


class FriendRequest(models.Model):
    # User = get_user_model()

    class Meta:
        unique_together = ['requester', 'requested']

    FRIEND_REQUEST_CHOICES = [
        ('P', 'Pending'),
        ('A', 'Accepted'),
        ('R', 'Rejected')
    ]

    status = models.CharField(
        choices=FRIEND_REQUEST_CHOICES,
        max_length=1,
    )

    requester = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        related_name='fk_friend_requested_user',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    requested = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        related_name='fk_friend_requests_user',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    created = models.DateTimeField(
        auto_now_add=True,
    )

    updated = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f'Friend Request {self.pk}: {self.requester} to {self.requested}'
