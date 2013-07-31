from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()



urlpatterns = patterns('',

    # Examples:
    # url(r'^$', 'textum.views.home', name='home'),
    # url(r'^textum/', include('textum.foo.urls')),
    url(r'^', include('website.urls', namespace="website")),
    url(r'^p_g', include('pagination_recognition.urls', namespace="p_g")),

    


    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
