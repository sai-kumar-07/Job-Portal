from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, JobViewSet, ApplyViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'apply', ApplyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
