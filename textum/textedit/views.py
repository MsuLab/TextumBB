# encoding: utf-8
import json
import abc
import os

from django.http import HttpResponse
from django.views.generic import CreateView, DeleteView, ListView, View
from django.shortcuts import render_to_response, get_object_or_404
from django.template.context import RequestContext
from django.core.files.base import ContentFile

from braces.views import JSONResponseMixin

from .models import RTFFile, TImage, TxtFile
from .forms import TxtFileForm
from .core.response import JSONResponse, response_mimetype
from .core.serialize import serialize, TextFileSerializer
from .core.converter.engine import convert_to_odt



class ApiView(JSONResponseMixin, View):
    """
    100 => 'Continue',
    101 => 'Switching Protocols',

    200 => 'OK',
    201 => 'Created',
    202 => 'Accepted',
    203 => 'Non-Authoritative Information',
    204 => 'No Content',
    205 => 'Reset Content',
    206 => 'Partial Content',

    300 => 'Multiple Choices',
    301 => 'Moved Permanently',
    302 => 'Found',
    303 => 'See Other',
    304 => 'Not Modified',
    305 => 'Use Proxy',
    307 => 'Temporary Redirect',

    400 => 'Bad Request',
    401 => 'Unauthorized',
    402 => 'Payment Required',
    403 => 'Forbidden',
    404 => 'Not Found',
    405 => 'Method Not Allowed',
    406 => 'Not Acceptable',
    407 => 'Proxy Authentication Required',
    408 => 'Request Timeout',
    409 => 'Conflict',
    410 => 'Gone',
    411 => 'Length Required',
    412 => 'Precondition Failed',
    413 => 'Request Entity Too Large',
    414 => 'Request-URI Too Long',
    415 => 'Unsupported Media Type',
    416 => 'Requested Range Not Satisfiable',
    417 => 'Expectation Failed',

    500 => 'Internal Server Error',
    501 => 'Not Implemented',
    502 => 'Bad Gateway',
    503 => 'Service Unavailable',
    504 => 'Gateway Timeout',
    505 => 'HTTP Version Not Supported',
    """

    __metaclass__ = abc.ABCMeta
    http_method_names = ['get', 'post', 'put', 'delete', 'head', 'options', 'trace', 'patch']
    auth_required = True

    def dispatch_init(self, request):
        for method in ('put', 'patch',):
            self._coerce_method_post(request, method)

        return None

    def dispatch(self, request, *args, **kwargs):
        result = self.dispatch_init(request)
        return result if isinstance(result, HttpResponse) else super(ApiView, self).dispatch(request, *args, **kwargs)

    def response_unauthorized(self):
        return HttpResponse(status=401)

    def response_limits(self):
        return HttpResponse(status=402)

    def response_forbidden(self):
        return HttpResponse(status=403)

    def response_conflict(self, data):
        return self.render_json_response(data, 409)

    def options(self, request, *args, **kwargs):
        return self.http_method_not_allowed(request, *args, **kwargs)

    def get_request_dict(self, query_dict, param):
        result = dict()
        all_params = query_dict.dict()
        for str_name in all_params:
            if str_name.startswith(param + '[') and str_name.endswith(']'):
                self._request_dict_val(result, re.findall(r'\[(\w+)\]', str_name), all_params.get(str_name))
        return result

    def _request_dict_val(self, result, keys, val):
        current_key = keys[0]
        if len(keys) < 2:
            result[current_key] = val
        else:
            if current_key not in result:
                result[current_key] = dict()
            self._request_dict_val(result[current_key], keys[1:], val)

    def _coerce_method_post(self, request, method):
        """
        Django doesn't particularly understand REST.
        In case we send data over PUT, Django won't
        actually look at the data and load it. We need
        to twist its arm here.

        The try/except abominiation here is due to a bug
        in mod_python. This should fix it.
        """
        method_name = method.upper()
        if request.method == method_name:
            # Bug fix: if _load_post_and_files has already been called, for
            # example by middleware accessing request.POST, the below code to
            # pretend the request is a POST instead of a PUT will be too late
            # to make a difference. Also calling _load_post_and_files will result
            # in the following exception:
            # AttributeError: You cannot set the upload handlers after the upload has been processed.
            # The fix is to check for the presence of the _post field which is set
            # the first time _load_post_and_files is called (both by wsgi.py and
            # modpython.py). If it's set, the request has to be 'reset' to redo
            # the query value parsing in POST mode.
            if hasattr(request, '_post'):
                del request._post
                del request._files

            try:
                request.method = "POST"
                request._load_post_and_files()
                request.method = method_name
            except AttributeError:
                request.META['REQUEST_METHOD'] = 'POST'
                request._load_post_and_files()
                request.META['REQUEST_METHOD'] = method_name

            setattr(request, method_name, request.POST)


class TextEdit(View):
    """ TextEdit main view """

    template_name = 'textedit/textedit.html'

    def get(self, request, *args, **kwargs):
        is_odf = False
        return render_to_response(self.template_name, locals(), RequestContext(request))

    def post(self, request, *args, **kwargs):
        return HttpResponse("post")


class RTFCreateView(CreateView):
    model = RTFFile

    def form_valid(self, form):
        self.object = form.save()
        # self.object.odt_file = convert_to_odt(self.object.file)
        # self.object.save()
        # files = [serialize(self.object)]

        # data = {'files': files}
        data = TextFileSerializer(self.object)
        response = JSONResponse(data, mimetype=response_mimetype(self.request))
        response['Content-Disposition'] = 'inline; filename=files.json'
        return response


    def form_invalid(self, form):
        data = json.dumps(form.errors)
        return HttpResponse(content=data, status=400, content_type='application/json')
        

def fullView(request):
    return render_to_response('textedit/fullView.html', locals(), RequestContext(request))
  

class TxtView(ApiView):
    def get(self, request, pk):
        txt_file = get_object_or_404(TxtFile, pk=pk)
        data =  TextFileSerializer(txt_file)
        return self.render_json_response(data)

    def post(self, request):
        form = TxtFileForm(request.POST, request.FILES)

        if form.is_valid():
            txt_file = TxtFile.objects.create(file=form.cleaned_data['file'])
            return self.get(request, txt_file.pk)
        else:
            return self.render_json_response(dict(errors=form.errors), 400)

    def patch(self, request, pk):
        txt_file = get_object_or_404(TxtFile, pk=pk)

        form = TxtFileForm(request.POST)
        if form.is_valid():
            filename = os.path.basename(txt_file.file.name)
            txt_file.file.save(filename, ContentFile(form.cleaned_data['text'].encode('cp1251')))
            return self.get(request, pk)
        else:
           return self.render_json_response(dict(errors=form.errors), 400)

