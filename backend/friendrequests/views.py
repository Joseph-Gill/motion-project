from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from friendrequests.models import FriendRequest
from friendrequests.permissions import IsRequesterOrRequested
from friendrequests.serializers import ListFriendRequestSerializer
from users.serialziers import UserSerializer
from django.core.mail import send_mail


class ListUserFriendsView(ListAPIView):
    """
    get:
    Returns all logged in user friends
    """
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        friends = []
        for friend_request in list(request.user.friend_requests.all()) + list(request.user.friends_requested.all()):
            if friend_request.requester == request.user and friend_request.status == 'A':
                friends.append(friend_request.requested)
            elif friend_request.requested == request.user and friend_request.status == 'A':
                friends.append(friend_request.requester)
        serializer = self.get_serializer(friends, many=True)
        return Response(serializer.data)


class CreateFriendRequestView(CreateAPIView):
    """
    post:
    Create and return a new friend request
    """
    User = get_user_model()
    queryset = User
    serializer_class = ListFriendRequestSerializer
    lookup_url_kwarg = 'user_id'

    def create(self, request, *args, **kwargs):
        try:
            target_user = self.get_object()
            current_user = self.request.user
            new_friend_request = FriendRequest.objects.create(status='P', requester=current_user,
                                                              requested=target_user)
            serializer = self.get_serializer(new_friend_request)
            send_mail(
                'Test Email',
                'Test Message',
                'students@propulsionacademy.com',
                [target_user.email],
                fail_silently=False,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"detail": "This friend request already exists"}, status=status.HTTP_400_BAD_REQUEST)


class ListUserFriendRequestsView(ListAPIView):
    """
    get:
    Returns all the logged in users friend requests, status P = Pending, A = Accepted, R = Rejected
    """
    queryset = FriendRequest.objects.all()
    serializer_class = ListFriendRequestSerializer


class RetrieveUpdateDestroyUserFriendRequestView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Returns a specific friend request, status P = Pending, A = Accepted, R = Rejected

    put:
    Updates and returns a specific friend request, status P = Pending, A = Accepted, R = Rejected

    patch:
    Partially updates and returns a specific friend request, status P = Pending, A = Accepted, R = Rejected

    delete:
    Delete a specific friend request, returns no content status 204
    """
    queryset = FriendRequest
    serializer_class = ListFriendRequestSerializer
    lookup_url_kwarg = 'request_id'
    permission_classes = [IsRequesterOrRequested]
