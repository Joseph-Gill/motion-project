from django.urls import path

from userprofiles.views import ToggleUserFollowView, ListUserFollowersView, ListUserFollowingView

urlpatterns = [
    path('social/followers/toggle-follow/<int:user_id>/', ToggleUserFollowView.as_view()),
    path('social/followers/followers/', ListUserFollowersView.as_view()),
    path('social/followers/following/', ListUserFollowingView.as_view()),
]
