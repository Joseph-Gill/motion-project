from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from posts.permissions import ReadOnly
from users.serialziers import UserSerializer
from rest_framework import filters


class ListUsersView(ListAPIView):
    """
    get:
    Returns all users or Search all users
    """
    User = get_user_model()
    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ['username', 'first_name', 'last_name', 'location']
    filter_backends = (filters.SearchFilter,)


class RetrieveUpdateLoggedInUserView(RetrieveUpdateAPIView):
    """
    get:
    Returns the Information of the logged in user

    put:
    Updates the logged in user's public information
    """
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.request.user)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class RetrieveUserView(RetrieveAPIView):
    """
    get:
    Returns a specific user
    """
    User = get_user_model()
    queryset = User
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'
