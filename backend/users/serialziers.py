from django.contrib.auth import get_user_model
from rest_framework import serializers
from registrationprofiles.models import RegistrationProfile
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

    amount_followed = serializers.SerializerMethodField()

    def get_amount_followed(self, obj):
        related_obj = UserProfile.objects.get(user=obj.id)
        return related_obj.user_follows.count()

    amount_of_friends = serializers.SerializerMethodField()

    def get_amount_of_friends(self, obj):
        total_friends = 0
        for entry in list(obj.friends_requested.all()) + list(obj.friend_requests.all()):
            if entry.status == 'A':
                total_friends += 1
        return total_friends

    logged_in_user_is_following = serializers.SerializerMethodField()

    def get_logged_in_user_is_following(self, obj):
        return obj in self.context['request'].user.user_profile.user_follows.all()

    logged_in_user_is_friends = serializers.SerializerMethodField()

    def get_logged_in_user_is_friends(self, obj):
        return self.context['request'].user in self.get_all_friends(obj)

    def get_all_friends(self, obj):
        total_friends = []
        for request_entry in list(obj.friends_requested.all()) + list(obj.friend_requests.all()):
            if request_entry.requester != obj and request_entry.status == 'A':
                total_friends.append(request_entry.requester)
            if request_entry.requested != obj and request_entry.status == 'A':
                total_friends.append(request_entry.requested)
        return total_friends

    logged_in_user_is_rejected = serializers.SerializerMethodField()

    def get_logged_in_user_is_rejected(self, obj):
        return self.context['request'].user in self.get_all_rejected(obj)

    def get_all_rejected(self, obj):
        total_rejected = []
        for request_entry in list(obj.friends_requested.all()) + list(obj.friend_requests.all()):
            if request_entry.requester != obj and request_entry.status == 'R':
                total_rejected.append(request_entry.requester)
            if request_entry.requested != obj and request_entry.status == 'R':
                total_rejected.append(request_entry.requested)
        return total_rejected

    logged_in_user_received_fr = serializers.SerializerMethodField()

    def get_logged_in_user_received_fr(self, obj):
        for request_entry in obj.friends_requested.all():
            if request_entry.requested == self.context['request'].user:
                return True
        return False

    logged_in_user_sent_fr = serializers.SerializerMethodField()

    def get_logged_in_user_sent_fr(self, obj):
        for request_entry in obj.friend_requests.all():
            if request_entry.requester == self.context['request'].user:
                return True
        return False

    class Meta:
        model = User
        fields = ['id', 'about_me', 'amount_following', 'amount_followed', 'amount_of_friends', 'amount_of_likes',
                  'amount_of_posts', 'avatar', 'banner', 'email', 'first_name', 'last_name', 'location',
                  'logged_in_user_is_following', 'logged_in_user_is_friends', 'logged_in_user_is_rejected',
                  'logged_in_user_received_fr', 'logged_in_user_sent_fr', 'things_user_likes', 'username']
        extra_kwargs = {
            'email': {'read_only': True},
        }


class LimitedUserSerializer(serializers.ModelSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    code = serializers.CharField(
        write_only=True,
        required=True,
    )

    email = serializers.CharField(
        write_only=True,
        required=True,
    )

    class Meta:
        model = User
        fields = ['email', 'code', 'password', 'password_repeat']

    def validate(self, data):
        target_profile = RegistrationProfile.objects.get(email=data.get('email'))
        if data.get('code') != target_profile.code:
            raise serializers.ValidationError({"detail": "Your Validation Code is incorrect"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "Password and Password Repeat do not match"})
        return data


class ValidationUserSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    code = serializers.CharField(
        write_only=True,
        required=True,
    )

    class Meta:
        model = User
        fields = ['code', 'email', 'username', 'first_name', 'last_name', 'password', 'password_repeat']

    def validate(self, data):
        try:
            target_profile = RegistrationProfile.objects.get(email=data.get('email'))
        except RegistrationProfile.DoesNotExist:
            raise serializers.ValidationError({"detail": "Your email doesn't match any profile or is invalid."})
        if data.get('code') != target_profile.code:
            raise serializers.ValidationError({"detail": "Your Validation Code is incorrect"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "Password and Password Repeat do not match"})
        if not len(data.get('first_name')):
            raise serializers.ValidationError({"detail": "First name cannot be blank"})
        if not len(data.get('last_name')):
            raise serializers.ValidationError({"detail": "Last name cannot be blank"})
        if not len(data.get('username')):
            raise serializers.ValidationError({"detail": "Username cannot be blank"})
        return data
