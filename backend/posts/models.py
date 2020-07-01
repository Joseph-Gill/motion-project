from django.conf import settings
from django.db import models


class Post(models.Model):
    content = models.TextField()

    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    likes = models.ManyToManyField(
        to=settings.AUTH_USER_MODEL,
        related_name='fk_posts_likes_user',
        blank=True)

    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        related_name='fk_posts_user',
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
        title = f'{self.title[0:30]}...' if len(self.title) > 30 else self.title
        return f'Post {self.pk}, {title} by User: {self.user.username}'
