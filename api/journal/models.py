from django.db import models

# Create your models here.

class JournalEntry(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='journal_images/')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
