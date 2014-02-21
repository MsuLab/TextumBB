define(['backbone',
    'collections/timages',
    'views/popup',
    'jScrollPane' // Init scroll 
], function(Backbone, TImages, Popup) {

    var Gallery = Backbone.View.extend({

        el: ".rightView",

        events: {
            'click .addImage': 'addTImage',
        },

        initialize: function() {
            console.log('new: Gallery is created.');

            // Init scroll
            this.$photo_gallery = this.$('.photoGallery');
            this.$photo_gallery.jScrollPane({
                autoReinitialise: true,
                hideFocus: true,
                mouseWheelSpeed: 50
            });

        },
        addTImage: function() {
            console.log("New TImage!");
            if (this.popup == undefined) {
                this.popup = new Popup({type:'UploadImg'});
            } else {
                this.popup.show('UploadImg');
            }
        }
    });

    return Gallery;

});
