from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.db.models.signals import post_save
from django.dispatch import receiver
from registrationprofiles.models import RegistrationProfile
from userprofiles.models import UserProfile

User = get_user_model()


@admin.register(User)
class CustomUserModel(UserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'location', 'about_me', 'things_user_likes')}),
        ('Files', {'fields': ('avatar',)}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    readonly_fields = ('date_joined', 'last_login')
    list_display = ('pk', 'username', 'email', 'is_staff')
    ordering = ('-email',)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


# @receiver(post_save, sender=User)
# def create_registration_profile(sender, instance, created, **kwargs):
#     if created:
#         RegistrationProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.user_profile.save()


# @receiver(post_save, sender=User)
# def save_registration_profile(sender, instance, **kwargs):
#     instance.registration_profile.save()
