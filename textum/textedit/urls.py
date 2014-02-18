# Textedit urls router.


from django.conf.urls import patterns, include, url

from textum.textedit import views


urlpatterns = patterns('',

    url(r'^$', views.TextEdit.as_view(), name='main'),
    url(r'^fullView$', views.fullView, name='fullView'),
    url(r'^upload$', views.RTFCreateView.as_view(), name='upload'),

    # ToDo: For tmp purposes. Change url names for more readability
    url(r'^upload_image$', views.TImageCreateView.as_view(), name='upload_image'),
)