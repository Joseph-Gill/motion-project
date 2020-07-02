from django.conf import settings
from django.db import models


class Post(models.Model):
    content = models.TextField()

    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    likes = models.ManyToManyField(
        to=settings.AUTH_USER_MODEL,
        related_name='liked_posts',
        blank=True)

    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        related_name='posts',
        on_delete=models.SET_NULL,
        null=True)

    shared_post = models.ForeignKey(
        'Post',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='being_shared_by',
    )

    def __str__(self):
        return f'Post {self.pk} by User: {self.user.username}'
