from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Video
from .serializers import UserSerializer, VideoSerializer
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            email=serializer.validated_data.get('email', ''),
            password=request.data.get('password')
        )
        return Response({"message": "User registered successfully!"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.id,
            'username': user.username
        }, status=200)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    user = request.user
    videos = Video.objects.filter(user=user)
    serializer = VideoSerializer(videos, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_video(request):
    serializer = VideoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def list_videos(request):
    videos = Video.objects.all().order_by('-id')
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_video(request, id):
    try:
        video = Video.objects.get(id=id)
        serializer = VideoSerializer(video)
        return Response(serializer.data)
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_videos(request):
    videos = Video.objects.filter(user=request.user).order_by('-id')
    serializer = VideoSerializer(videos, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_watch_later(request, video_id):
    try:
        video = Video.objects.get(pk=video_id)
        user = request.user
        if user in video.watch_later.all():
            video.watch_later.remove(user)
        else:
            video.watch_later.add(user)
        return Response({'message': 'Toggled Watch Later'})
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_watch_later(request):
    videos = Video.objects.filter(watch_later=request.user)
    serializer = VideoSerializer(videos, many=True, context={'request': request})
    return Response(serializer.data)