from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from posts.models import Post
from posts.permissions import IsAuthorOrReadOnly, ReadOnly
from posts.serializers import ListPostSerializer, CommentPostSerializer
from userprofiles.models import UserProfile


class ListCreatePostsView(ListCreateAPIView):
    """
    get:
    Returns all the Posts

    post:
    Creates a new post instance by the current user and returns it
    """
    queryset = Post.objects.all()
    serializer_class = ListPostSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDestroyPostView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Returns a post based on the given id

    put:
    Updates and returns a post based on the given id

    patch:
    Partially updates and returns a post based on the given id

    delete:
    Deletes a recipe based on the given id and returns no content status 204
    """
    queryset = Post
    serializer_class = ListPostSerializer
    lookup_url_kwarg = 'post_id'
    permission_classes = [IsAuthorOrReadOnly]


class ListSpecificUserPostsView(ListAPIView):
    """
    get:
    Returns all posts by a user based on the given id
    """
    User = get_user_model()
    queryset = User
    serializer_class = ListPostSerializer
    lookup_url_kwarg = 'user_id'
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        target_user = self.get_object()
        post_data = target_user.posts.all().order_by('-created')
        serializer = ListPostSerializer(post_data, many=True)
        return Response(serializer.data)


class ListUserFollowingPostsView(ListAPIView):
    """
    get:
    Returns all posts of all users the logged in user is following
    """
    User = get_user_model()
    queryset = User
    serializer_class = ListPostSerializer

    def list(self, request, *args, **kwargs):
        post_data = []
        for user_entry in request.user.followees.all():
            post_data.extend(list(user_entry.user.posts.all()))
        serializer = self.get_serializer(post_data, many=True)
        return Response(serializer.data)


class TogglePostLikesView(CreateAPIView):
    """
    post:
    Toggle liking post by logged in user
    """
    queryset = Post
    serializer_class = ListPostSerializer
    lookup_url_kwarg = 'post_id'
    permission_classes = [IsAuthenticated | ReadOnly]

    def create(self, request, *args, **kwargs):
        target_post = self.get_object()
        if self.request.user in target_post.likes.all():
            target_post.likes.remove(self.request.user)
        else:
            target_post.likes.add(self.request.user)
        toggle_post_data = self.get_serializer(target_post).data
        return Response(toggle_post_data, status=status.HTTP_202_ACCEPTED)


class ListUserLikedPostsView(ListAPIView):
    """
    get:
    Returns all posts the logged is user has liked
    """
    serializer_class = ListPostSerializer

    def list(self, request, *args, **kwargs):
        User = get_user_model()
        target_user = User.objects.filter(id=request.user.id)
        post_data = target_user[0].liked_posts.all().order_by('-created')
        serializer = self.get_serializer(post_data, many=True)
        return Response(serializer.data)


class TogglePostSharesView(CreateAPIView):
    """
    post:
    Toggle sharing post by logged in user
    """
    queryset = Post
    serializer_class = ListPostSerializer
    lookup_url_kwarg = 'post_id'

    def create(self, request, *args, **kwargs):
        target_post = self.get_object()
        target_profile = UserProfile.objects.all().filter(user=request.user)
        if target_profile[0] in target_post.users_who_shared.all():
            target_post.users_who_shared.remove(target_profile[0])
        else:
            target_post.users_who_shared.add(target_profile[0])
        toggle_post_data = self.get_serializer(target_post).data
        return Response(toggle_post_data, status=status.HTTP_202_ACCEPTED)


class ListCreateCommentView(ListCreateAPIView):
    queryset = Post
    serializer_class = CommentPostSerializer
