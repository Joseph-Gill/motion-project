from django.urls import path

from .views import *

urlpatterns = [
    path('', ListUsersView.as_view()),
    path('me/', RetrieveUpdateLoggedInUserView.as_view()),
    path('<int:user_id>/', RetrieveUserView.as_view()),
    path('search/<str:search_string>/', SearchAllUsersView.as_view()),
]
