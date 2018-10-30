from alpaca.models import CustomUser, Work
from rest_framework import viewsets,permissions
from alpaca.serializers import CustomUserSerializer, WorkSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.IsAuthenticated,)

class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all().order_by('date')
    serializer_class = WorkSerializer
    permission_classes = (permissions.IsAuthenticated,)
    

class UserIdViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)
        
class WorkUserViewSet(viewsets.ModelViewSet):
    serializer_class = WorkSerializer

    def get_queryset(self):
        return Work.objects.filter(worker=self.request.user)
        
class WorkUserFromToViewSet(viewsets.ModelViewSet):
	serializer_class = WorkSerializer

	def get_queryset(self):
		filter_from = self.request.query_params.get('filter_from')
		filter_to = self.request.query_params.get('filter_to')
		queryset = Work.objects.filter(worker=self.request.user,date__range=[filter_from, filter_to])
		return queryset

