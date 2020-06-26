from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Post(models.Model):
    content = models.TextField()

    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    likes = models.ManyToManyField(
        to=User,
        related_name='liked_posts',
        blank=True)

    user = models.ForeignKey(
        to=User,
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
        title = f'{self.title[0:30]}...' if len(self.title) > 30 else self.title
        return f'Post {self.pk}, {title} by User: {self.user.username}'
