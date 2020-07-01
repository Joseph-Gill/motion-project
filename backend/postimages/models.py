from django.db import models
from posts.models import Post


class PostImage(models.Model):
    post = models.ForeignKey(
        to=Post,
        related_name='images',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    image = models.ImageField(
        null=True,
        blank=True,
    )

    created = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f'Image {self.pk}: for Post {self.post}'
