from django.urls import path

from users.views import ListUsersView

urlpatterns = [
    path('user/', ListUsersView.as_view()),
]