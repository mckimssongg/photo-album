from django.db import models
from users.models import User
# Create your models here.


class Album(models.Model):
    user = models.ForeignKey(
        User, related_name='albums', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    is_activate = models.BooleanField(default=True)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Image(models.Model):
    album = models.ForeignKey(
        Album, related_name='images', on_delete=models.CASCADE)
    label = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    is_activate = models.BooleanField(default=True)
    link = models.CharField(max_length=255)

    def __str__(self):
        return self.label
