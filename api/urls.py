from django.urls import path

from api.views import *

app_name = 'api'
urlpatterns = [
    path('<int:pk>/', todo_detail.as_view()),
    path('', todo_list.as_view()),
  
    path('todos/', todo.as_view()),
    path('todos/<int:idd>/', todo.as_view()),
]
