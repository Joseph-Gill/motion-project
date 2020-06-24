from rest_framework import serializers

from userprofiles.models import UserProfile
from users.serialziers import UserSerializer


class UserFollowersSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user']


class UserFollowingSerializer(serializers.ModelSerializer):
    user_follows = UserSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = ['user_follows']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    user_follows = UserSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'user_follows']
