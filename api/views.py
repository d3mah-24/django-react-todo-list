
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from api.seri import post_seri, user_seri
from app.models import Post
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['name'] = user.first_name
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class todo_list(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = post_seri


class todo_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = post_seri


class todo(APIView):
    def get(self, request, idd):
        queryset = Post.objects.all()
        if idd:
            queryset = queryset.filter(user=idd)
        serializer = post_seri(queryset, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = user_seri(data=request.data)
 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
