define(['backbone',
    'collections/timages',
    'views/imgview',
    'views/popup-img',
    'jScrollPane' // Init scroll 
], function(Backbone, TImages, TImageView, Popup) {

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
            this.viewsArray = [];
            this.listenTo(Backbone, 'uploadImage', function (data) {
                this.addToGallery(data);
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

        addToGallery: function(data) {
            console.log(data);
            /*this.imageCollection.create({
                id: data.id,
                img_url: data.files[0].url
            });*/
            this.imageCollection.create({
                id: data.id,
                file: data.file,
                page_num: data.page_num,
            });
            var just_added = this.imageCollection.last();
            console.log(just_added);
            this.viewsArray[this.viewsArray.length] = new TImageView({
                model: just_added,
                id: 'image' + just_added.attributes.id
            });
            this.viewsArray[this.viewsArray.length - 1]
                .$el.appendTo('.photoGrid');
            just_added.set('title', data.title); // I do it after view is inserted on page so that "change" event would happen
            //this.viewsArray[this.viewsArray.length - 1]
                //.listenTo(this.viewsArray[this.viewsArray.length - 1].$el, 'click', function(data){console.log('click');});
        },

    });

    return Gallery;

});
