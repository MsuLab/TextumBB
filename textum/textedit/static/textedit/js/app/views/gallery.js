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
            this.imageCollection.create({
                //title: data.name, 
                url: data.url
            });
            var just_added = this.imageCollection.last();
            this.viewsArray[this.viewsArray.length] = new TImageView({
                model: just_added,
                id: 'image' + just_added.attributes.id
            });
            this.viewsArray[this.viewsArray.length - 1]
                .$el.appendTo('.photoGrid');
            just_added.set('title', data.name); // I do it after view is inserted on the page so that "change" event would happen
            /*$('<li><span>' + just_added.attributes.page_num + 
                '</span><img src="' + just_added.attributes.url + 
                '" alt="' + just_added.attributes.name +'" /></li>')
                .appendTo('.photoGrid');*/
        }
    });

    return Gallery;

});
