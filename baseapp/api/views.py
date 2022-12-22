from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.models import Item
from .serializers import ItemSerializer
from django.core.mail import send_mail
import re
@api_view(['GET'])
def getData(request):
    Items=Item.objects.all()
    serializer=ItemSerializer(Items,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer=ItemSerializer(data=request.data)
    
    if serializer.is_valid():
        mob=request.data['phone']
        pattarn=re.compile("(0|91)?[-\s]?[6-9][0-9]{9}")
        if pattarn.match(mob):
            serializer.save()
            send_mail("Notification",f"Dear {request.data['name']},\nYour form successfully submitted.We have reacived following details:\nName: {serializer.data['name']}\nEmail: {serializer.data['email']}\nPhone: {serializer.data['phone']}\nDate of birth: {serializer.data['dob']}\n\n\nThank You\n",
            'ingalekiran2001@gmail.com',[f"{request.data['email']}"],fail_silently=False)
            
            return Response({"status":True})
        else:
            
            return Response(False)