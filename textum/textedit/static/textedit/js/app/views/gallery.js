define(['backbone', 'collections/timages',
    'jScrollPane' // Init scroll 
], function(Backbone, TImages) {

    var Gallery = Backbone.View.extend({

        el: ".rightView",

        events: {
                'click .addImage':       'addTImage',
        },

        initialize: function() {
            console.log('new: Gallery is created.');

            // Init scroll
            this.$photo_gallery = this.$('.photoGallery');
            this.$photo_gallery.jScrollPane({
                autoReinitialise: true,
                hideFocus: true
            });

        },
        addTImage: function() {
        	console.log("New TImage!")
        }
    });

    return Gallery;

});
