# ROOT_URLCONF main textum urls router.

from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import patterns, url, include


urlpatterns = patterns('',
    
    # Website urls:
    url(r'^',       include('textum.website.urls',   namespace="website")),

    # Pagination detection urls:
    url(r'^paginator/', include('textum.paginator.urls', namespace="paginator")),

    # textedit(Text Editor) app urls:
    url(r'^textedit/',  include('textum.textedit.urls',  namespace="textedit")),

) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Examples:
    # url(r'^$', 'textum.views.home', name='home'),
    # url(r'^textum/', include('textum.foo.urls')),