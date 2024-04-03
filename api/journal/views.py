from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .models import JournalEntry, User
from .serializers import JournalEntrySerializer, LoginSerializer, SignupSerializer, UserSerializer
import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

@csrf_exempt
# @login_required
@api_view(['GET', 'POST'])
def list_journal_entries(request):
    if request.method == 'GET':
        journal_entries = JournalEntry.objects.filter(created_by=request.user)
        serializer = JournalEntrySerializer(journal_entries, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":

        data = request.POST.copy()
        data['image'] = request.FILES.get('image')
        data['created_by'] = request.user.id
        serializer = JournalEntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        else:
            return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
# @login_required
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



@csrf_exempt
@api_view(["GET"])
def list_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)








@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup_user(request):
    if request.method == 'POST':
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)







@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    if request.method == "POST":
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return JsonResponse({'refresh': str(refresh), 'access': str(refresh.access_token)},status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)






@csrf_exempt
def logout_user(request):
    if request.method == "POST":
        logout(request)
    #return redirect('home) example if home was the name of the URL pattern i want it to go to.
    # also i would have to import that function from the django.shortcuts module
        return JsonResponse({'message': 'Logout sucessful'}, status=200)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
