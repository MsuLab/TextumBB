import os

from pytils import translit

from django.db import models


def file_storage_path(instance, filename):
    """
    Path is <kind>/<media_id/digits>/file_name
    """
    name, ext = os.path.splitext(filename)
    kind, media_id = instance.get_path_parts()
    return os.path.join(kind, os.path.join(*list(str(media_id))), translit.slugify(name)) + ext


class RTFFile(models.Model):
    file = models.FileField(upload_to=file_storage_path)
    odt_file = models.FileField(upload_to=file_storage_path, blank=True, null=True)
    slug = models.SlugField(max_length=50, blank=True)

    def __unicode__(self):
        return self.file.name

    @models.permalink
    def get_absolute_url(self):
        return ('upload-new', )

    def save(self, *args, **kwargs):
        self.slug = self.file.name
        super(RTFFile, self).save(*args, **kwargs)

    def get_path_parts(self):
        return 'text_file', self.id

    def delete(self):
        self.delete_file()
        super(RTFFile, self).delete(*args, **kwargs)

    def delete_file(self):
        if self.file:
            self.file.delete(False)
        if self.odt_file:
            self.odt_file.delete(False)



class TImage(models.Model):
    file = models.ImageField(upload_to=file_storage_path)
    title = models.SlugField(max_length=50, blank=True)
    page_num = models.FloatField(null=True)

    # def __unicode__(self):
    #     return self.file.name

    def get_path_parts(self):
        return 'photo', self.id

    def save(self, *args, **kwargs):
        self.title = self.file.name
        super(TImage, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.delete_photo()
        super(TImage, self).delete(*args, **kwargs)

    def delete_photo(self):
        if self.file:
            self.file.name = self.file.name[7:]
            self.file.delete(False)



class TxtFile(models.Model):
    file = models.FileField(upload_to=file_storage_path)

    def get_path_parts(self):
        return 'text_file', self.id

    def delete(self, *args, **kwargs):
        self.delete_file()
        super(TxtFile, self).delete(*args, **kwargs)

    def delete_file(self):
        if self.file:
            self.file.delete(False)
