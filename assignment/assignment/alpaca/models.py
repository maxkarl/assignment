from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    preferredworkinghourperday = models.IntegerField(default=8)

class Work(models.Model):
    worker = models.ForeignKey(CustomUser, related_name='work', on_delete=models.CASCADE, default=1)
    date = models.DateField()
    total_time = models.IntegerField()
    notes = models.TextField(default='default')