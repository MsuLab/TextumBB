"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase

from django.core.urlresolvers import reverse

from django.test.client import Client


class WebsiteViewTests(TestCase):
    def test_index_view_redirects_to_home(self):
        """
		Index / url have to riderect to /Home page.
        """
        response = Client().get(reverse('website:index'))
        self.assertRedirects(response, reverse('website:home'), status_code=302, target_status_code=200)

    