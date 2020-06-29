from django.db import models
from posts.models import Post


class PostImage(models.Model):
    class Meta:

        post = models.ForeignKey(
            to=Post,
            related_name='images',
            on_delete=models.CASCADE,
            null=True,
            blank=True,
        )

        created = models.DateTimeField(
            auto_now_add=True,
        )
