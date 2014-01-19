from django.conf.urls import patterns, url

from pagination_recognition import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)