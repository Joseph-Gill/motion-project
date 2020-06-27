from django.urls import path
from .views import *

urlpatterns = [
    path('', ListUserFriendsView.as_view()),
    path('request/<int:user_id>/', CreateFriendRequestView.as_view()),
    path('requests/', ListUserFriendRequestsView.as_view()),
    path('requests/<int:request_id>/', RetrieveUpdateDestroyUserFriendRequestView.as_view()),
]
