from django.urls import path

from .views import *

urlpatterns = [
    path('toggle-follow/<int:user_id>/', ToggleUserFollowView.as_view()),
    path('followers/', ListUserFollowersView.as_view()),
    path('following/', ListUserFollowingView.as_view()),
]
