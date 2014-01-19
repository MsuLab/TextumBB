# Paginator urls router. 


from django.conf.urls import patterns, url

from textum.paginator import views


urlpatterns = patterns('',
	
    url(r'^$', views.index, name='main'),
    
)