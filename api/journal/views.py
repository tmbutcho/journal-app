from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import JournalEntry
from .serializers import JournalEntrySerializer
import json
from django.http import JsonResponse
# Create your views here.

@api_view(['GET', 'POST'])
def list_journal_entries(request):
    if request.method == 'GET':
        journal_entries = JournalEntry.objects.all()
        serializer = JournalEntrySerializer(journal_entries, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":

        data = request.POST.copy()
        data['image'] = request.FILES.get('image')
        serializer = JournalEntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        else:
            return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)




@api_view(['GET', 'PUT', 'DELETE' ])
def show_entry_detail(request, id):
    try:
        journal_entry = JournalEntry.objects.get(id=id)
    except JournalEntry.DoesNotExist:
        return JsonResponse({'error': 'Journal Entry not found'}, status=404)

    if request.method == 'GET':
        serializer = JournalEntrySerializer(journal_entry)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = JournalEntrySerializer(journal_entry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


    elif request.method == 'DELETE':
        journal_entry.delete()
        return JsonResponse({'message': 'Journal Entry deleted sucessfully'}, status=400)
