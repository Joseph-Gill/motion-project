from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from posts.models import Post
from posts.permissions import IsAuthorOrReadOnly, ReadOnly
from posts.serializers import ListPostSerializer


class ListCreatePostsView(ListCreateAPIView):
    """
    get:
    Returns all the Posts

    post:
    Creates a new post instance by the current user with the option to share a different post and returns it
    """
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = ListPostSerializer

    def list(self, request, *args, **kwargs):
        queryset = Post.objects.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            shared_post = Post.objects.get(id=self.request.data.get("shared_post"))
            serializer.save(user=self.request.user, shared_post=shared_post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


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
        serializer = self.get_serializer(post_data, many=True)
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
        post_data.sort(key=lambda a: a.created, reverse=True)
        serializer = self.get_serializer(post_data, many=True)
        return Response(serializer.data)


class ListUserFriendsPostsView(ListAPIView):
    """
    get:
    Returns all posts of the logged in user's friends
    """
    User = get_user_model()
    queryset = User
    serializer_class = ListPostSerializer

    def get_all_friends(self, obj):
        total_friends = []
        for request_entry in list(obj.friends_requested.all()) + list(obj.friend_requests.all()):
            if request_entry.requester != obj and request_entry.status == 'A':
                total_friends.append(request_entry.requester)
            if request_entry.requested != obj and request_entry.status == 'A':
                total_friends.append(request_entry.requested)
        return total_friends

    def list(self, request, *args, **kwargs):
        post_data = []
        for user_entry in self.get_all_friends(request.user):
            post_data.extend(list(user_entry.posts.all()))
        post_data.sort(key=lambda a: a.created, reverse=True)
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


class SearchAllPostsView(ListAPIView):
    """
    get:
    Returns all posts with content, username, user first name, or user last name matching search string
    """
    serializer_class = ListPostSerializer

    def list(self, request, *args, **kwargs):
        keyword = self.kwargs['search_string']
        queryset = Post.objects.filter(Q(content__icontains=keyword) | Q(user__username__icontains=keyword) | Q(
            user__first_name__icontains=keyword) | Q(user__last_name__icontains=keyword))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
