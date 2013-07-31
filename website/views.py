from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic

from django.shortcuts import render

from django.core.urlresolvers import reverse


class Home(generic.View):
    template_name = 'website/home.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")

class SignIn(generic.View):
    template_name = 'website/sign_in.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")

class Docs(generic.View):
    template_name = 'website/docs.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")




def index(request):
    return HttpResponseRedirect(reverse('website:home'))