from django.contrib import admin
from .models import JournalEntry
# Register your models here.
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'created_at')



admin.site.register(JournalEntry, JournalEntryAdmin )
