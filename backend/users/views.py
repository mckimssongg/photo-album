from .models import *
from .serializers import *
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django.contrib.sessions.models import Session
from datetime import datetime


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        '''
        Returns the user information and the token

        parameters.
        request ----> request object
        '''
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                user_serializer = UserListSerializer(user)
                if created:
                    return Response({
                        'token': token.key,
                        'auth': True,
                        'user': user_serializer.data,
                        'message': 'Successful login',
                    }, status=status.HTTP_201_CREATED)
                else:
                    all_sessions = Session.objects.filter(
                        expire_date__gte=datetime.now()
                    )
                    if all_sessions.exists():
                        for session in all_sessions:
                            session_data = session.get_decoded()
                            if int(session_data.get('_auth_user_id')) == user.id:
                                session.delete()
                    token.delete()
                    token = Token.objects.create(user=user)
                    return Response({
                        'token': token.key,
                        'auth': True,
                        'user': user_serializer.data,
                        'message': 'Successful login',
                    }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'message': 'User is not active',
                    'auth': False
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'message': 'Wrong username or password',
                'auth': False
            },
                status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            all_sessions = Session.objects.filter(
                expire_date__gte=datetime.now()
            )
            if all_sessions.exists():
                for session in all_sessions:
                    session_data = session.get_decoded()
                    if int(session_data.get('_auth_user_id')) == request.user.id:
                        session.delete()
            Token.objects.get(user=request.user).delete()
            return Response({
                'message': 'Successful logout',
                'auth': False
            }, status=status.HTTP_200_OK)
        except:
            return Response({
                'message': 'No session or user token found',
                'auth': False
            }, status=status.HTTP_400_BAD_REQUEST)


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        users = User.objects.all()
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({"message": "The user was deleted"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user_data = request.data
        user_serializer = UserSerializer(
            instance=user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)
