from rest_framework import serializers
from friendrequests.models import FriendRequest
from users.serialziers import UserSerializer


class ListFriendRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(required=False, read_only=True)
    requested = UserSerializer(required=False, read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'status', 'requester', 'requested']
