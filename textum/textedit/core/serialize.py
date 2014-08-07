# encoding: utf-8
import mimetypes
import re
from django.core.urlresolvers import reverse


    
def order_name(name):
    """order_name -- Limit a text to 20 chars length, if necessary strips the
    middle of the text and substitute it for an ellipsis.

    name -- text to be limited.

    """
    name = re.sub(r'^.*/', '', name)
    if len(name) <= 20:
        return name
    return name[:10] + "..." + name[-7:]


def serialize(instance, file_attr='odt_file'):
    """serialize -- Serialize a Picture instance into a dict.

    instance -- Picture instance
    file_attr -- attribute name that contains the FileField or ImageField

    """
    obj = getattr(instance, file_attr)
    return {
        'url': obj.url,
        'name': order_name(obj.name),
        'type': mimetypes.guess_type(obj.path)[0] or 'application/rtf',
        'size': obj.size,
    }


def TextFileSerializer(obj):
    return {
        'pk': obj.pk,
        'name': order_name(obj.file.name),
        'text': obj.file.read().decode('cp1251').encode('utf8').decode('utf8'),
        'url': obj.file.url,
    }