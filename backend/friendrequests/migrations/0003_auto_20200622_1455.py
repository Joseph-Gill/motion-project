# Generated by Django 3.0.7 on 2020-06-22 12:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('friendrequests', '0002_auto_20200622_1451'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='friendrequest',
            name='requested',
        ),
        migrations.AddField(
            model_name='friendrequest',
            name='requested',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friend_requests', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='friendrequest',
            name='requester',
        ),
        migrations.AddField(
            model_name='friendrequest',
            name='requester',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friends_requested', to=settings.AUTH_USER_MODEL),
        ),
    ]
