from rest_framework import serializers
from .models import *


class AlbumSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True)

    class Meta:
        model = Album
        fields = ['id', 'user', 'name', 'description',
                  'is_public', 'is_activate', 'images', ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['images'] = [{'id': image.id,
                           'label': image.label,
                           'link': image.link, }
                          for image in instance.images.all()]
        return data


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
