from django.urls import path
from .views import list_journal_entries, show_entry_detail


urlpatterns = [
    path('journal-entries', list_journal_entries, name='list-journal-entries'),
    path('journal-entries/<int:id>/', show_entry_detail, name='show-entry-detail')
]
