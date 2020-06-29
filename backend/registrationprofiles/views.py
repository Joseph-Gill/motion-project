from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from registrationprofiles.models import RegistrationProfile, code_generator
from registrationprofiles.serializers import RegistrationProfileSerializer
from users.serialziers import ValidationUserSerializer, LimitedUserSerializer


class CreateUserView(CreateAPIView):
    """
    post:
    Create a non active user with email info only.
    """
    permission_classes = []
    serializer_class = RegistrationProfileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        target_profile = RegistrationProfile.objects.get(email=request.data['email'])
        email = EmailMessage()
        email.subject = 'New User Creation'
        email.body = f'Your validation code is {target_profile.code}'
        email.to = [target_profile.email]
        email.send(fail_silently=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreateRegisteredUserView(CreateAPIView):
    """
    post:
    Update user info, first_name and last_name are required as well,  activates the user.
    """
    permission_classes = []
    serializer_class = ValidationUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        target_profile = RegistrationProfile.objects.all().get(email=request.data['email'])
        User = get_user_model()
        new_user = User.objects.create_user(request.data['username'], request.data['email'],
                                            request.data['password'],
                                            first_name=request.data['first_name'],
                                            last_name=request.data['last_name'])
        self.perform_create(new_user)
        target_profile.user = new_user
        target_profile.save()
        return Response(status=status.HTTP_201_CREATED)


class CreatePasswordResetView(CreateAPIView):
    """
    post:
    Creates an email to the supplied valid email address with a Verification Code to reset User's password
    """
    permission_classes = []
    serializer_class = RegistrationProfileSerializer

    def create(self, request, *args, **kwargs):
        try:
            target_profile = RegistrationProfile.objects.all().get(email=request.data['email'])
            target_profile.code = code_generator()
            target_profile.save()
            email = EmailMessage()
            email.subject = 'Password Reset'
            email.body = f'Your password reset validation code is {target_profile.code}'
            email.to = [target_profile.email]
            email.send(fail_silently=False)
            return Response(status=status.HTTP_202_ACCEPTED)
        except RegistrationProfile.DoesNotExist:
            return Response({"detail": "Your email doesn't match any profile or is invalid."},
                            status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(UpdateAPIView):
    """
    patch:
    Resets a User's password, requires valid email address, verification code, password, and password_repeat
    """
    permission_classes = []
    serializer_class = LimitedUserSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        try:
            target_profile = RegistrationProfile.objects.all().get(email=request.data['email'])
            serializer = self.get_serializer(target_profile, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            target_profile.user.set_password(request.data['password'])
            target_profile.user.save()
            target_profile.code = code_generator()
            target_profile.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except RegistrationProfile.DoesNotExist:
            return Response({"detail": "Your email doesn't match any profile or is invalid."},
                            status=status.HTTP_400_BAD_REQUEST)
