from django.urls import path

from friendrequests.views import ListUserFriendsView, CreateFriendRequestView, ListUserFriendRequestsView, \
    RetrieveUpdateDestroyUserFriendRequestView

urlpatterns = [
    path('social/friends/', ListUserFriendsView.as_view()),
    path('social/friends/request/<int:user_id>/', CreateFriendRequestView.as_view()),
    path('social/friends/requests/', ListUserFriendRequestsView.as_view()),
    path('social/friends/requests/<int:request_id>/', RetrieveUpdateDestroyUserFriendRequestView.as_view()),
]
