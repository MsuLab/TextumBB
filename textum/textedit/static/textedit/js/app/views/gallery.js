define(['backbone',
    'collections/timages',
    'views/popup-img',
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
            this.imageCollection = new TImages();
            this.listenTo(Backbone, 'uploadImage', function (data) {
                this.updateGallery(data);
            });
        },
        addTImage: function() {
            console.log("New TImage!");
            if (this.popup == undefined) {
                this.popup = new Popup;
            } else {
                this.popup.show('UploadImg');
            }
        },
        updateGallery: function(data) {
            this.imageCollection.create(
                {title: data.name, url: data.url}
            );
            var just_added = this.imageCollection.last();
            $('<li><span>' + just_added.attributes.page_num + 
                '</span><img src="' + just_added.attributes.url + 
                '" alt="' + just_added.attributes.name +'" /></li>')
                .appendTo('.photoGrid');
        }
    });

    return Gallery;

});
