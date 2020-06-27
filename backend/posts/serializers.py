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
        fields = ['id', 'content', 'amount_of_likes', 'created', 'user']


class ListPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    shared_post = SharedPostSerializer(required=False, read_only=True)

    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    is_from_logged_in_user = serializers.SerializerMethodField()

    def get_is_from_logged_in_user(self, obj):
        return self.context['request'].user == obj.user

    logged_in_user_liked = serializers.SerializerMethodField()

    def get_logged_in_user_liked(self, obj):
        return self.context['request'].user in obj.likes.all()

    class Meta:
        model = Post
        fields = ['id', 'amount_of_likes', 'content', 'created', 'is_from_logged_in_user', 'logged_in_user_liked',
                  'comments', 'shared_post', 'user']
