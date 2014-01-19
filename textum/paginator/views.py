from django.http import HttpResponse, HttpResponseRedirect


def index(request):

    return HttpResponse("Pagination Recognition!!!")