from django.db import models
from posts.models import Post
from userprofiles.models import UserProfile


class Comment(models.Model):
    content = models.TextField()

    post = models.ForeignKey(
        to=Post,
        related_name='comments',
        on_delete=models.CASCADE,
    )

    user_profile = models.ForeignKey(
        to=UserProfile,
        related_name='post_comments',
        on_delete=models.CASCADE,
    )

    created = models.DateTimeField(
        auto_now_add=True,
    )
