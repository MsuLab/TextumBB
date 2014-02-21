from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.shortcuts import render
from django.core.urlresolvers import reverse


class Home(generic.View):
    """ Home view """

    template_name = 'website/home.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")

def index(request):
    """Redirect to Home page"""

    return HttpResponseRedirect(reverse('textedit:main'))


class SignIn(generic.View):
    """ Sign In view """

    template_name = 'website/log_in.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")


class Docs(generic.View):
    """ Documentation view """

    template_name = 'website/docs.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")



    