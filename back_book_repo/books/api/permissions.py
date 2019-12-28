from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnly(BasePermission):
    message = 'You can modify only your books.'

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
