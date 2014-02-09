import json
from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django import forms

class UploadFileForm(forms.Form):
    file = forms.FileField()


class TextEdit(generic.View):
    """ TextEdit main view """
    
    template_name = 'textedit/textedit.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")


def fullView(request):
	return render(request, 'textedit/fullView.html')

def save_file(f):
    destination = open('111.jpg', 'wb+')
    for chunk in f.chunks():
        destination.write(chunk)
    destination.close()

def upload(request):
    if request.method == 'POST': # If the form has been submitted...
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            save_file(request.FILES['file'])
            #return HttpResponseRedirect('upload')
            #form = UploadFileForm()
            return HttpResponse(json.dumps({"message": "ok"})) #???????
    else:
        form = UploadFileForm() # An unbound form
        
    return render_to_response('textedit/textedit.html', {
        'form': form,
    },
    context_instance=RequestContext(request))
