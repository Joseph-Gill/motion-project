from rest_framework import serializers
from friendrequests.models import FriendRequest
from users.serialziers import LimitedUserSerializer


class ListFriendRequestSerializer(serializers.ModelSerializer):
    requester = LimitedUserSerializer(required=False, read_only=True)
    requested = LimitedUserSerializer(required=False, read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['status', 'requester', 'requested']
