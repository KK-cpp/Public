
from django.db import models
from django.contrib.auth.models import User

class Video(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    video = models.FileField(upload_to='videos/')
    created_at = models.DateTimeField(auto_now_add=True)
    watch_later = models.ManyToManyField(User, related_name='watch_later_videos', blank=True)
    def __str__(self):
        return self.title
