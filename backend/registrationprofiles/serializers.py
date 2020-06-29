from rest_framework import serializers
from registrationprofiles.models import RegistrationProfile


class RegistrationProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationProfile
        fields = ['email']
