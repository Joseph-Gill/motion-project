from django.urls import path
from posts.views import *

urlpatterns = [
    path('', ListCreatePostsView.as_view()),
    path('me/', ListUsersPostsView.as_view()),
    path('<int:post_id>/', RetrieveUpdateDestroyPostView.as_view()),
    path('user/<int:user_id>/', ListSpecificUserPostsView.as_view()),
    path('following/', ListUserFollowingPostsView.as_view()),
    path('friends/', ListUserFriendsPostsView.as_view()),
    path('toggle-like/<int:post_id>/', TogglePostLikesView.as_view()),
    path('likes/', ListUserLikedPostsView.as_view()),
]
