from rest_framework import serializers

from posts.models import Post
from users.serialziers import UserSerializer


class ListPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    amount_of_shares = serializers.SerializerMethodField()

    def get_amount_of_shares(self, obj):
        return len(obj.users_who_shared.all())

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'amount_of_likes', 'amount_of_shares', 'created', 'updated', 'user']


class CommentPostSerializer(serializers.ModelSerializer):
    pass
