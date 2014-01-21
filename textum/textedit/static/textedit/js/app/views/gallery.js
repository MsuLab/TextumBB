define(['backbone',
    'jScrollPane' // Init scroll 
], function(Backbone) {

    var Gallery = Backbone.View.extend({

        el: ".rightView",

        initialize: function() {
            console.log('new: Gallery is created.');

            this.$photo_gallery = this.$('.photoGallery');
            this.$photo_gallery.jScrollPane({
                autoReinitialise: true,
                hideFocus: true
            });
        }
    });

    return Gallery;

});
