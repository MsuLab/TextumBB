# ROOT_URLCONF main textum urls router.

from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import patterns, url, include

from tastypie.api import Api
from textum.textedit.api import TImageResource

images_api = Api(api_name='images')			# Create new api version urlconf
images_api.register(TImageResource())

urlpatterns = patterns('',
    
    # Website urls:
    url(r'^',       include('textum.website.urls',   namespace="website")),

    # Pagination detection urls:
    url(r'^paginator/', include('textum.paginator.urls', namespace="paginator")),

    # textedit(Text Editor) app urls:
    url(r'^textedit/',  include('textum.textedit.urls',  namespace="textedit")),
    url(r'^api/', include(images_api.urls)),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Examples:
    # url(r'^$', 'textum.views.home', name='home'),
    # url(r'^textum/', include('textum.foo.urls')),