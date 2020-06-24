from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from posts.permissions import ReadOnly
from users.serialziers import UserSerializer

User = get_user_model()


class ListUsersView(ListAPIView):
    """
    get:
    Returns all users
    """
    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer
