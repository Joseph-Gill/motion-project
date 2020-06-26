from django.urls import path

from posts.views import ListCreatePostsView, RetrieveUpdateDestroyPostView, ListSpecificUserPostsView, \
    ListUserFollowingPostsView, TogglePostLikesView, ListUserLikedPostsView, TogglePostSharesView, \
    ListCreateCommentView

urlpatterns = [
    path('social/posts/', ListCreatePostsView.as_view()),
    path('social/posts/<int:post_id>/', RetrieveUpdateDestroyPostView.as_view()),
    path('social/posts/user/<int:user_id>/', ListSpecificUserPostsView.as_view()),
    path('social/posts/following/', ListUserFollowingPostsView.as_view()),
    path('social/posts/toggle-like/<int:post_id>/', TogglePostLikesView.as_view()),
    path('social/posts/likes/', ListUserLikedPostsView.as_view()),
    path('social/comments/<int:post_id>', ListCreateCommentView.as_view())
]
