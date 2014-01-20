# Website urls router. 


from django.conf.urls import patterns, url

from textum.website import views


urlpatterns = patterns('',

    url(r'^$', views.index, name='index'),
    url(r'^home/$', 	views.Home.as_view(), name='home'),

    url(r'^log_in/$', 	views.SignIn.as_view(), name='log_in'),
    
    url(r'^docs/$', 	views.Docs.as_view(), name='docs'),
    
)