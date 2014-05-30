define(['backbone',
    'views/popup_images_loader',
    'views/popup_images_pagination',
    'views/image_collection_view',
    'collections/timages',
    'jScrollPane', // Init scroll 
], function (Backbone, Popup, PopupPage, TImagesView, TImages) {

    var Gallery = Backbone.View.extend({

        el: ".rightView",

        events: {
            'click .addImage': 'addTImage',
        },

        initialize: function () {
            console.log('new: Gallery is created.');
            var self = this;

            // Init scroll
            this.$photo_gallery = this.$('.photoGallery');
            this.$photo_gallery.jScrollPane({
                autoReinitialise: true,
                hideFocus: true,
                mouseWheelSpeed: 50
            });
            
            this.imageCollection = new TImagesView();
            this.noPageImages = new TImages();
            this.listenTo(Backbone, 'uploadImage', function (data) {
                var p = this.imageCollection.collection.create({
                    id: data.id,
                    file: data.file,
                    page_num: data.page_num,
                    title: data.title,
                });
                if (data.page_num == 0) {
                    console.log('New image without page!');
                    self.noPageImages.add(p);
                }
                //console.log(p);
                //p.save({page_num: 1}, {wait: true});
            });
        },

        addTImage: function () {
            if (this.popup == undefined) {
                this.popup = new Popup;
            } else {
                this.popup.show();
            };
            var self = this;
            this.listenToOnce(Backbone, 'uploadFinished', function (data){
                if (data && !self.noPageImages.isEmpty()) {
                    self.addPagination();
                } else {
                    self.noPageImages.reset();
                }
            });
        },

        addPagination: function () {
            var self = this;
            if (this.paginationPopup == undefined) {
                this.paginationPopup = new PopupPage(self.noPageImages);
            } else {
                this.paginationPopup.show(self.noPageImages);
            };
            this.listenToOnce(Backbone, 'paginationDone', function (data) {
                self.noPageImages.reset();
            });
        },

    });

    return Gallery;

});
