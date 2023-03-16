from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class SearchImageView(GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ImageSerializer

    # http://127.0.0.1:8000/albums/searchImage/?label=japon&userId=1
    def get_queryset(self):
        queryset = []
        userId = self.request.query_params.get('userId', None)
        labelImage = self.request.query_params.get('label', None)
        if labelImage is not None and userId is not None:
            queryset = Image.objects.filter(
                is_activate=True,
                album__user_id=int(userId),
                label=labelImage
            ).order_by('-id')
        elif userId is not None:
            queryset = Image.objects.filter(
                is_activate=True,
                album__user_id=int(userId)
            ).order_by('-id')
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if len(queryset) == 0:
            return Response({"message": "The image was not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AlbumViewSet(ModelViewSet):
    ''''''
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = []
        userId = self.request.query_params.get('userId', None)
        if userId is not None:
            queryset = Album.objects.filter(
                is_activate=True,
                user_id=int(userId))
        return queryset

    # http://127.0.0.1:8000/albums/albums/?userId=1
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if len(queryset) == 0:
            return Response({"message": "The album was not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # http://127.0.0.1:8000/albums/albums/{album_id}/?userId=1
    def destroy(self, request, *args, **kwargs):
        album = self.get_object()
        album.delete()

        return Response({"message": "The album was deleted"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        album = self.get_object()
        album_data = request.data
        album_serializer = AlbumSerializer(
            instance=album, data=album_data)
        if album_serializer.is_valid():
            album_serializer.save()
            return Response(album_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(album_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)


class ImageViewSet(GenericViewSet):
    '''
    '''
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        image_data = request.data
        image_serializer = ImageSerializer(data=image_data)
        if image_serializer.is_valid():
            image_serializer.save()
            return Response(image_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)

    def destroy(self, request, *args, **kwargs):
        image = self.get_object()
        image.delete()

        return Response({"message": "The image was removed"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        image = self.get_object()
        image_data = request.data
        image_serializer = ImageSerializer(
            instance=image, data=image_data)
        if image_serializer.is_valid():
            image_serializer.save()
            return Response(image_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)
