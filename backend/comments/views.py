from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from comments.models import Comment
from comments.serializers import CommentSerializer
from posts.models import Post
from posts.permissions import ReadOnly


class ListCreateCommentsView(ListCreateAPIView):
    """
    get:
    Returns all comments of the specified post

    post:
    Creates and returns a new comment on the specified post
    """
    serializer_class = CommentSerializer
    lookup_url_kwarg = 'post_id'
    queryset = Post
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        comments = self.get_object().comments.all().order_by('-created')
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        post = self.get_object()
        comment = Comment.objects.create(content=request.data['content'], post=post,
                                         user_profile=request.user.user_profile)
        serializer = self.get_serializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
