import json
from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django import forms
from .models import RTFFile

from django.views.generic import CreateView, DeleteView, ListView

# encoding: utf-8
from django.utils import simplejson

# encoding: utf-8
import mimetypes
import re


class TextEdit(generic.View):
    """ TextEdit main view """
    
    template_name = 'textedit/textedit.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")


def fullView(request):
	return render(request, 'textedit/fullView.html')
    
def order_name(name):
    """order_name -- Limit a text to 20 chars length, if necessary strips the
    middle of the text and substitute it for an ellipsis.

    name -- text to be limited.

    """
    name = re.sub(r'^.*/', '', name)
    if len(name) <= 20:
        return name
    return name[:10] + "..." + name[-7:]


def serialize(instance, file_attr='file'):
    """serialize -- Serialize a Picture instance into a dict.

    instance -- Picture instance
    file_attr -- attribute name that contains the FileField or ImageField

    """
    obj = getattr(instance, file_attr)
    return {
        'url': obj.url,
        'name': order_name(obj.name),
        'type': mimetypes.guess_type(obj.path)[0] or 'application/rtf',
        'thumbnailUrl': obj.url,
        'size': obj.size,
    }

MIMEANY = '*/*'
MIMEJSON = 'application/json'
MIMETEXT = 'text/plain'

def response_mimetype(request):
    """response_mimetype -- Return a proper response mimetype, accordingly to
    what the client accepts, as available in the `HTTP_ACCEPT` header.

    request -- a HttpRequest instance.

    """
    can_json = MIMEJSON in request.META['HTTP_ACCEPT']
    can_json |= MIMEANY in request.META['HTTP_ACCEPT']
    return MIMEJSON if can_json else MIMETEXT


class JSONResponse(HttpResponse):
    """JSONResponse -- Extends HTTPResponse to handle JSON format response.

    This response can be used in any view that should return a json stream of
    data.

    Usage:

        def a_iew(request):
            content = {'key': 'value'}
            return JSONResponse(content, mimetype=response_mimetype(request))

    """
    def __init__(self, obj='', json_opts=None, mimetype=MIMEJSON, *args, **kwargs):
        json_opts = json_opts if isinstance(json_opts, dict) else {}
        content = simplejson.dumps(obj, **json_opts)
        super(JSONResponse, self).__init__(content, mimetype, *args, **kwargs)


class RTFCreateView(CreateView):
    model = RTFFile

    def form_valid(self, form):
        self.object = form.save()
        files = [serialize(self.object)]
        data = {'files': files}
        response = JSONResponse(data, mimetype=response_mimetype(self.request))
        response['Content-Disposition'] = 'inline; filename=files.json'
        return response

    def form_invalid(self, form):
        data = json.dumps(form.errors)
        return HttpResponse(content=data, status=400, content_type='application/json')
        
