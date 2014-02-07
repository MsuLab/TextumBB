from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.shortcuts import render
from django.core.urlresolvers import reverse

from django.shortcuts import render_to_response
from django.template.context import RequestContext


class TextEdit(generic.View):
    """ TextEdit main view """
    
    template_name = 'textedit/textedit.html'

    def get(self, request, *args, **kwargs):
    	is_odf = True
    	return render_to_response(self.template_name, locals(), RequestContext(request))

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")


def fullView(request):
	return render_to_response('textedit/fullView.html', locals(), RequestContext(request))
