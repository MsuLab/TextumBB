# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import codecs
import sys

from django.core.files import File
from bs4 import BeautifulSoup

try:
    import unoconv.unoconv as unoconv
    is_unoconv_work = True
except Exception:
    is_unoconv_work = False


def convert_to_odt(file):

    odt_file_name = convert("odt", file.path)
    return File(open(odt_file_name, 'r'))


def convert(typ, filename):
    """
    Converts $filename into $typ using libreoffice API.
    unoconv github: http://dag.wiee.rs/home-made/unoconv/
    Returns converted file name.
    """
    if not is_unoconv_work:
        return filename
    converted_file = "%s.%s" % (os.path.splitext(filename)[0], typ) # ToDo(kopbob): Bad way

    try:
        with open(converted_file):
            print 'warning: %s file exists' % typ
            return converted_file
    except IOError:
        args = ["-f", typ, filename]

        unoconv.op = unoconv.Options(args)
        is_done, ret = unoconv.run()

        if is_done:
            return converted_file
        else:
            sys.exit(ret)


def prepare_html(converted_file):
    """
    Cleans HTML file using BeautifulSoup.
    Returns prettify HTML
    """

    if not converted_file.endswith('.html'):
        return None # ToDo(kopbob): Add error
        
    with codecs.open(converted_file, "r", "utf-8") as f:
        html_data = f.read().replace('iso-8859-1', 'utf-8')
        soup = BeautifulSoup(html_data)

    return soup.prettify('utf-8')


def save_to_file(data, filename):
    with codecs.open(filename, 'w', 'utf-8') as f:
        f.write(data)


def get_html(filename):
    """Returns converted HTML data."""

    converted_file = convert("html", filename)

    return prepare_html(converted_file)

# print get_html("testdoc.odt")
