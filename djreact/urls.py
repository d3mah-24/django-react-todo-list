from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from api.views import MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls'), name='app'),
    path('api/', include('api.urls'), name='api'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

