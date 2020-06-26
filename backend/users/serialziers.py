from django.contrib.auth import get_user_model
from rest_framework import serializers
from userprofiles.models import UserProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    amount_of_posts = serializers.SerializerMethodField()

    def get_amount_of_posts(self, obj):
        return len(obj.posts.all())

    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.liked_posts.all())

    amount_following = serializers.SerializerMethodField()

    def get_amount_following(self, obj):
        return len(obj.followees.all())

    amount_user_follows = serializers.SerializerMethodField()

    def get_amount_user_follows(self, obj):
        related_obj = UserProfile.objects.get(user=obj.id)
        return related_obj.user_follows.count()

    amount_of_friends = serializers.SerializerMethodField()

    def get_amount_of_friends(self, obj):
        total_friends = 0
        for entry in list(obj.friends_requested.all()) + list(obj.friend_requests.all()):
            if entry.status == 'A':
                total_friends += 1
        return total_friends

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'amount_of_posts', 'amount_of_likes', 'amount_following',
                  'amount_user_follows', 'amount_of_friends', 'avatar']


class LimitedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']
