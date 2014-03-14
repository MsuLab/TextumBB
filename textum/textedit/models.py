from django.db import models

class RTFFile(models.Model):
    file = models.FileField(upload_to="RTF")
    odt_file = models.FileField(upload_to="ODT", blank=True, null=True)
    slug = models.SlugField(max_length=50, blank=True)

    def __unicode__(self):
        return self.file.name

    @models.permalink
    def get_absolute_url(self):
        return ('upload-new', )


    def save(self, *args, **kwargs):
        self.slug = self.file.name
        super(RTFFile, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """delete -- Remove to leave file."""
        self.file.delete(False)
        super(RTFFile, self).delete(*args, **kwargs)



class TImage(models.Model):
    file = models.ImageField(upload_to="TImages")
    slug = models.SlugField(max_length=50, blank=True)

    def __unicode__(self):
        return self.file.name

    @models.permalink
    def get_absolute_url(self):
        return ('upload-new', )

    def save(self, *args, **kwargs):
        self.slug = self.file.name
        super(TImage, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """delete -- Remove to leave file."""
        self.file.delete(False)
        super(TImage, self).delete(*args, **kwargs)
