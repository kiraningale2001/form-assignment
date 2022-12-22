from django.db import models

# Create your models here.

class Item(models.Model):
    
    name=models.CharField(max_length=200)
    dob=models.DateField()
    phone=models.CharField(max_length=10)
    email=models.EmailField()
    DateTime=models.DateField(auto_now_add=True)



