from rest_framework.permissions import BasePermission


class IsRequesterOrRequested(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.requested == request.user or obj.requester == request.user or request.user.is_staff
