from rest_framework import serializers
from .models import JournalEntry
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
class JournalEntrySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = JournalEntry
        fields = ['id', 'title', 'image', 'text', 'created_at', 'created_by']






class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


# serializers.py



class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                return user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")





class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
