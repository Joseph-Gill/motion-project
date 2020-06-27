# Generated by Django 3.0.7 on 2020-06-26 12:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('comments', '0002_comment_post'),
        ('userprofiles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='user_profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_comments', to='userprofiles.UserProfile'),
        ),
    ]
