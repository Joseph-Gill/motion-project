from rest_framework import serializers

from postimages.models import PostImage


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'post', 'created']
