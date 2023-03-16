from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        update_user = super().update(instance, validated_data)
        update_user.set_password(validated_data['password'])
        update_user.save()
        return update_user

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
            'password': instance.password,
            'is_superuser': instance.is_superuser,
            'is_staff': instance.is_staff,
            'is_active': instance.is_active,
        }


class UserListSerializer(serializers.ModelSerializer):
    albums = serializers.StringRelatedField(many=True)
    '''
    serializador para listar
    '''
    class Meta:
        model = User
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
            'albums': [{'id': album.id,
                        'name': album.name,
                        } for album in instance.albums.filter(is_activate=True)]
        }


class UserGetDataSerializer(serializers.ModelSerializer):
    albums = serializers.StringRelatedField(many=True)
    '''
    serializador para listar
    '''
    class Meta:
        model = User
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
        }
