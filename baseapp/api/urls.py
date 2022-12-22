from django.urls import path
from . import views

urlpatterns=[
    path('',views.getData),
    path('user-form/',views.addItem)
]