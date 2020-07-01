from rest_framework import serializers

from comments.serializers import CommentSerializer
from postimages.models import PostImage
from postimages.serializers import PostImageSerializer
from posts.models import Post
from users.serialziers import UserSerializer


class GetPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    amount_of_comments = serializers.SerializerMethodField()

    def get_amount_of_comments(self, obj):
        return len(obj.comments.all())

    amount_of_shares = serializers.SerializerMethodField()

    def get_amount_of_shares(self, obj):
        return len(obj.being_shared_by.all())

    images = serializers.SerializerMethodField()

    is_from_logged_in_user = serializers.SerializerMethodField()

    def get_is_from_logged_in_user(self, obj):
        return self.context['request'].user == obj.user

    logged_in_user_liked = serializers.SerializerMethodField()

    def get_logged_in_user_liked(self, obj):
        return self.context['request'].user in obj.likes.all()

    def get_images(self, obj):
        request = self.context.get('request')
        old_post_images = PostImage.objects.filter(post=obj)
        images = PostImageSerializer(data=old_post_images, many=True)
        images.is_valid()
        return [request.build_absolute_uri(image['image']) for image in images.data]

    class Meta:
        model = Post
        exclude = []

    def get_fields(self):
        fields = super(GetPostSerializer, self).get_fields()
        fields['shared_post'] = GetPostSerializer()
        return fields


class CreatePostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    shared_post = GetPostSerializer(required=False, read_only=True)

    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    is_from_logged_in_user = serializers.SerializerMethodField()

    def get_is_from_logged_in_user(self, obj):
        return self.context['request'].user == obj.user

    logged_in_user_liked = serializers.SerializerMethodField()

    def get_logged_in_user_liked(self, obj):
        return self.context['request'].user in obj.likes.all()

    amount_of_shares = serializers.SerializerMethodField()

    def get_amount_of_shares(self, obj):
        return len(obj.being_shared_by.all())

    amount_of_comments = serializers.SerializerMethodField()

    def get_amount_of_comments(self, obj):
        return len(obj.comments.all())

    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        request_images = self.context['request'].data.getlist('images')

        request = self.context.get('request')

        old_post_images = PostImage.objects.filter(post=obj)

        if not request_images:
            images = PostImageSerializer(data=old_post_images, many=True)
            images.is_valid()
            return [request.build_absolute_uri(image['image']) for image in images.data]

        if old_post_images:
            for image in old_post_images.all():
                image.delete()

        url_list = []
        for image in request_images:
            img_data = {
                'post': obj.pk,
                'image': image
            }
            new_image = PostImageSerializer(data=img_data)
            new_image.is_valid(raise_exception=True)
            new_image.save()
            url_list.append(request.build_absolute_uri(new_image.data['image']))
        return url_list

    class Meta:
        model = Post
        fields = ['id', 'amount_of_likes', 'amount_of_shares', 'amount_of_comments', 'content', 'images', 'created',
                  'is_from_logged_in_user', 'logged_in_user_liked', 'comments', 'shared_post', 'user']
