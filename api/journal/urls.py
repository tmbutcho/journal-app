from django.urls import path
from .views import list_journal_entries, show_entry_detail,login_user, signup_user, logout_user, list_users


urlpatterns = [
    path('journal-entries/', list_journal_entries, name='list-journal-entries'),
    path('journal-entries/<int:id>/', show_entry_detail, name='show-entry-detail'),
    path('sign-up/', signup_user, name='signup-user'),
    path('login/', login_user, name='login-user'),
    path('logout/', logout_user, name='logout-user'),
    path('users/', list_users, name='list-users')

]
