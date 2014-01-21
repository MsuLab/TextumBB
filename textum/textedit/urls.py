# Textedit urls router.


from django.conf.urls import patterns, url

from textum.textedit import views


urlpatterns = patterns('',

    url(r'^$', views.TextEdit.as_view(), name='main'),
    url(r'^fullView$', views.fullView, name='fullView'),
    
)