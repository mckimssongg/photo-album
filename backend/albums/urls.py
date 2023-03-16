from django.urls import path
from . import views
from django.db import router
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'albums', views.AlbumViewSet, basename='albums')
router.register(r'image', views.ImageViewSet, basename='image')
router.register(r'searchImage', views.SearchImageView, basename='searchImage')
urlpatterns = router.urls
