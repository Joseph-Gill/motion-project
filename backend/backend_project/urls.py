from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('api/docs/', include_docs_urls(title='JEGill Motion Backend API', public=True, permission_classes=[])),
    path('admin/', admin.site.urls),
    path('backend/api/users/', include('users.urls')),
    path('backend/api/social/comments/', include('comments.urls')),
    path('backend/api/social/followers/', include('userprofiles.urls')),
    path('backend/api/social/posts/', include('posts.urls')),
    path('backend/api/social/friends/', include('friendrequests.urls')),
    path('backend/api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
