from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.response import Response

from registrationprofiles.models import RegistrationProfile
from users.serialziers import LimitedUserSerializer, ValidationUserSerializer


class CreateUserView(CreateAPIView):
    permission_classes = []
    serializer_class = LimitedUserSerializer


class CreateRegisteredUserView(CreateAPIView):
    permission_classes = []
    serializer_class = ValidationUserSerializer

    def create(self, request, *args, **kwargs):
        target_profile = RegistrationProfile.objects.all().get(user__email=request.data['email'])
        if request.data['code'] == target_profile.code:
            User = get_user_model()
            target_user = User.objects.all().get(email=request.data['email'])
            target_user.username = request.data['username']
            target_user.first_name = request.data['first_name']
            target_user.last_name = request.data['last_name']
            target_user.set_password(request.data['password'])
            target_user.save()
            user_data = self.get_serializer(target_user).data
            return Response(user_data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"detail": "Your validation code didn't match."}, status=status.HTTP_400_BAD_REQUEST)


class CreatePasswordResetView(UpdateAPIView):
    pass


class ResetPasswordView(CreateAPIView):
    serializer_class = ValidationUserSerializer

    def create(self, request, *args, **kwargs):
        target_profile = RegistrationProfile.objects.all().get(user__email=request.data['email'])
        if request.data['code'] == target_profile.code:
            request.user.set_password(request.data['password'])
            request.user.save()
            user_data = self.get_serializer(request.user).data
            return Response(user_data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"detail": "Your validation code didn't match."}, status=status.HTTP_400_BAD_REQUEST)