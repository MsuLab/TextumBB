# encoding: utf-8
from django.http import HttpResponse
from django.views import generic
from django.views.generic import CreateView, DeleteView, ListView
from django.shortcuts import render_to_response
from django.template.context import RequestContext
import json

from .models import RTFFile, TImage
from .core.response import JSONResponse, response_mimetype
from .core.serialize import serialize



class TextEdit(generic.View):
    """ TextEdit main view """
    
    template_name = 'textedit/textedit.html'

    def get(self, request, *args, **kwargs):
    	is_odf = True
    	return render_to_response(self.template_name, locals(), RequestContext(request))

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")


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
        

class TImageCreateView(CreateView):
    model = TImage

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


def fullView(request):
    return render_to_response('textedit/fullView.html', locals(), RequestContext(request))
  
