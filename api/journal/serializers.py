from rest_framework import serializers
from .models import JournalEntry
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = '__all__'






class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


# serializers.py


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            # Include username and password in validated data
            return {'username': username, 'password': password}
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")

# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField(style={'input_type': 'password'})

#     def validate(self, data):
#         username = data.get('username')
#         password = data.get('password')

#         if username and password:
#             user = authenticate(username=username, password=password)
#             if user:
#                 if not user.is_active:
#                     raise serializers.ValidationError("User account is disabled.")
#                 return user
#             else:
#                 raise serializers.ValidationError("Unable to log in with provided credentials.")
#         else:
#             raise serializers.ValidationError("Must include 'username' and 'password'.")





class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
