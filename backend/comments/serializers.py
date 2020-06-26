from rest_framework import serializers
from comments.models import Comment
from users.serialziers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='user_profile.user', required=False, read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'post', 'created', 'user']