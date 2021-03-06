from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from userprofiles.models import UserProfile
from userprofiles.permissions import IsNotUser
from userprofiles.serializers import UserFollowingSerializer, UserFollowersSerializer
from users.serialziers import UserSerializer


class ToggleUserFollowView(CreateAPIView):
    """
    post:
    Toggle following a different user specified by id
    """
    User = get_user_model()
    queryset = User
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'
    permission_classes = [IsAuthenticated & IsNotUser]

    def create(self, request, *args, **kwargs):
        target_user = self.get_object()
        current_user_profile = UserProfile.objects.get(user=request.user)
        if current_user_profile in target_user.followees.all():
            target_user.followees.remove(current_user_profile)
        else:
            target_user.followees.add(current_user_profile)
            email = EmailMessage()
            email.subject = f'{target_user.first_name}, you have a new follower!'
            email.body = f'{current_user_profile.user.first_name} {current_user_profile.user.last_name} ' \
                         f'has followed you.'
            email.to = [target_user.email]
            email.send(fail_silently=False)
        toggle_follower_data = self.get_serializer(target_user).data
        return Response(toggle_follower_data, status=status.HTTP_202_ACCEPTED)


class ListUserFollowersView(ListAPIView):
    """
    get:
    Returns all users that are following the logged in user
    """
    serializer_class = UserFollowersSerializer

    def get_queryset(self):
        return self.request.user.followees.all()


class ListUserFollowingView(ListAPIView):
    """
    get:
    Returns all users that the logged in user follows
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserFollowingSerializer

    def list(self, request, *args, **kwargs):
        current_user_profile = self.get_queryset().filter(user=request.user)
        serializer = self.get_serializer(current_user_profile, many=True)
        return Response(serializer.data)
