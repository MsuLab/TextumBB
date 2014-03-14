define(['backbone',
    'views/popup_images_loader',
    'views/image_collection_view',
    'jScrollPane', // Init scroll 
], function (Backbone, Popup, TImagesView) {

    var Gallery = Backbone.View.extend({

        el: ".rightView",

        events: {
            'click .addImage': 'addTImage',
        },

        initialize: function () {
            console.log('new: Gallery is created.');

            // Init scroll
            this.$photo_gallery = this.$('.photoGallery');
            this.$photo_gallery.jScrollPane({
                autoReinitialise: true,
                hideFocus: true,
                mouseWheelSpeed: 50
            });
            
            this.imageCollection = new TImagesView();
            this.listenTo(Backbone, 'uploadImage', function (data) {
                this.imageCollection.collection.create({
                    id: data.id,
                    file: data.file,
                    page_num: data.page_num,
                    title: data.title,
                });
            });
        },

        addTImage: function () {
            if (this.popup == undefined) {
                this.popup = new Popup;
            } else {
                this.popup.show('UploadImg');
            }
        },

    });

    return Gallery;

});
