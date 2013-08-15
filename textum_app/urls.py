from django.conf.urls import patterns, url

from textum_app import views

urlpatterns = patterns('',

    url(r'^$', views.Textum.as_view(), name='app'),
    
)