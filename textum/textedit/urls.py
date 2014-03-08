# Textedit urls router.


from django.conf.urls import patterns, include, url

from textum.textedit import views

from tastypie.api import Api
from textum.textedit.api import TImageResource

images_api = Api(api_name='images')			# Create new api version urlconf
images_api.register(TImageResource())


urlpatterns = patterns('',

    url(r'^$', views.TextEdit.as_view(), name='main'),
    url(r'^fullView$', views.fullView, name='fullView'),
    url(r'^upload$', views.RTFCreateView.as_view(), name='upload'),

    # ToDo: For tmp purposes. Change url names for more readability
    url(r'^upload_image$', views.TImageCreateView.as_view(), name='upload_image'),
    #url(r'^api/', include(images_api.urls)),
    #url(r'^images/(?P<id>\d+)/$', 'textum.textedit.views.manage'),
)