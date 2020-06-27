from django.urls import path
from .views import *

urlpatterns = [
    path('registration/', CreateUserView.as_view()),
    path('registration/validation/', CreateRegisteredUserView.as_view()),
    path('password-reset/', CreatePasswordResetView.as_view()),
    path('password-reset/validation/', ResetPasswordView.as_view()),
]