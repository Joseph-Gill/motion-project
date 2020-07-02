from django.urls import path

from users.views import *

urlpatterns = [
    path('', ListUsersView.as_view()),
    path('me/', RetrieveUpdateLoggedInUserView.as_view()),
    path('<int:user_id>/', RetrieveUserView.as_view()),
]
