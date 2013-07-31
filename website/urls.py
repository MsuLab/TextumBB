from django.conf.urls import patterns, url

from website import views

urlpatterns = patterns('',

    #  Ex.: http://textum.com/
    url(r'^$', views.index, name='index'),

    #  Ex.: http://textum.com/home
    url(r'^home$', views.Home.as_view(), name='home'),
)