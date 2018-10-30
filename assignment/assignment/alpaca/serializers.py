from alpaca.models import CustomUser,Work
from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer




class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    work = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='work-detail'
    )
    class Meta:
        model = CustomUser
        fields = ('id','username', 'email', 'preferredworkinghourperday','work')


class WorkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'

