from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic

from django.shortcuts import render

from django.core.urlresolvers import reverse


class Home(generic.View):
    template_name = 'website/base.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")

def index(request):
    return HttpResponseRedirect(reverse('website:home'))