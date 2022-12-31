from rest_framework import serializers 
from app.models import Post
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class post_seri(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'is_done', 'content', 'date', 'user', ]


class user_seri(serializers.ModelSerializer):
    class Meta:
        model =User
        fields = '__all__'
       

    def create(self, validated_data):
        user = User.objects.create(password=make_password(validated_data['password']),
            first_name=validated_data['first_name'], username=validated_data['username'])
 
        return user
