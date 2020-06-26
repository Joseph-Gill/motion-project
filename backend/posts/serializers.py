from rest_framework import serializers
from posts.models import Post
from users.serialziers import UserSerializer


class SharedPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    class Meta:
        model = Post
        fields = ['id', 'content', 'amount_of_likes', 'created', 'updated', 'user']


class ListPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    shared_post = SharedPostSerializer(required=False, read_only=True)

    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'shared_post', 'amount_of_likes', 'created', 'updated']
