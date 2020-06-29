from django.urls import path
from comments.views import *

urlpatterns = [
    path('<int:post_id>/', ListCreateCommentsView.as_view()),
]
