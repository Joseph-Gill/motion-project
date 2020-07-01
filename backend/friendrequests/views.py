from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from friendrequests.models import FriendRequest
from friendrequests.permissions import IsRequesterOrRequested
from friendrequests.serializers import ListFriendRequestSerializer
from posts.permissions import ReadOnly
from users.serialziers import UserSerializer
from django.core.mail import EmailMessage


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
    permission_classes = [IsAuthenticated | ReadOnly]

    def create(self, request, *args, **kwargs):
        try:
            target_user = self.get_object()
            current_user = self.request.user
            new_friend_request = FriendRequest.objects.create(status='P', requester=current_user,
                                                              requested=target_user)
            serializer = self.get_serializer(new_friend_request)
            email = EmailMessage()
            email.subject = f'{target_user.first_name}, you have received a new Friend Request!'
            email.body = f'You have received a Friend Request from {current_user.first_name} {current_user.last_name}.'
            email.to = [target_user.email]
            email.send(fail_silently=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"detail": "This friend request already exists"}, status=status.HTTP_400_BAD_REQUEST)


class ListUserFriendRequestsView(ListAPIView):
    """
    get:
    Returns all the logged in users friend requests, status P = Pending, A = Accepted, R = Rejected
    """
    serializer_class = ListFriendRequestSerializer

    def list(self, request, *args, **kwargs):
        all_friend_requests = list(request.user.friend_requests.all()) + list(request.user.friends_requested.all())
        all_friend_requests_data = self.get_serializer(all_friend_requests, many=True).data
        return Response(all_friend_requests_data, status=status.HTTP_202_ACCEPTED)


class RetrieveUpdateDestroyUserFriendRequestView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Returns a specific friend request, status P = Pending, A = Accepted, R = Rejected

    patch:
    Partially updates and returns a specific friend request, status P = Pending, A = Accepted, R = Rejected

    delete:
    Delete a specific friend request, returns no content status 204
    """
    queryset = FriendRequest
    serializer_class = ListFriendRequestSerializer
    lookup_url_kwarg = 'friend_request_id'
    permission_classes = [IsRequesterOrRequested]
    http_method_names = ['get', 'patch', 'delete']

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        target_friend_request = self.get_object()
        serializer = self.get_serializer(target_friend_request, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if target_friend_request.status == 'A':
            email = EmailMessage()
            email.subject = f'{target_friend_request.requester.first_name}, you have a new Friend!'
            email.body = f'{target_friend_request.requested.first_name} accepted your Friend Request, congrats!'
            email.to = [target_friend_request.requester.email]
            email.send(fail_silently=False)
        return Response(serializer.data)
