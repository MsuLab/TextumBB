# -*- coding:utf-8 -*-
from django import forms


class TxtFileForm(forms.Form):
    file = forms.FileField(required=False)
    text = forms.CharField(required=False)
