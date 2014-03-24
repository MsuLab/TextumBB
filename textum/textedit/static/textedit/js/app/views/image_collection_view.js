define(['underscore', 
	'backbone',
    'models/timage',
    'collections/timages',
    'views/image_view',
    'text!templates/gallery_menu_normal_view.html',
    'text!templates/gallery_menu_full_view.html'
], function (_, Backbone, TImage, TImages, TImageView, Normal, Full) {
	var imageCollection = Backbone.View.extend({
		el: '.photoGrid',

		initialize: function () {
			this.collection = new TImages();
			this.collection.fetch({
				reset: true,
			});
			this.render();
            $('.galleryMenu').empty().append(Normal);
            this.collection.on("add", this.renderImage, this);
            this.collection.on("reset", this.render, this);
            var self = this;
            this.selected = undefined;
            this.selectedModel = undefined;
            $('body').click(function (){
                $(self.selected).removeClass('image-selected');
                self.selected = undefined;
                self.selectedModel = undefined;
            });
            $('.full-view-switch').click(function () {
                self.switch2Full();
            });
		},

        render: function () {
            var self = this;
            this.$el.empty();
            this.collection.each(function (image) {
            	self.renderImage(image);
            });
        },

        renderImage: function (image) {
            var imageView = new TImageView({
                model: image,
            });
            this.$el.append(imageView.render().el);
            var self = this;
            $('#image' + image.id).off('click');
            $('#image' + image.id).click(function (event) {
                $(self.selected).removeClass('image-selected');
                self.selected = '#image' + image.id;
                self.selectedModel = image.id;
                $(self.selected).addClass('image-selected');
                event.stopPropagation();
            });
            $('#image' + image.id).dblclick(function () {
                self.switch2Full();
            });
        },

        switch2Full: function() {
            var self = this;
            if (self.selectedModel != undefined) {
                Backbone.trigger('full-view');
                $(self.selected).removeClass('image-selected');
                self.selected = undefined;
                self.$el.empty();
                self.renderImage(self.collection.get(self.selectedModel));
                self.selectedModel = undefined;
                $('.image').addClass('fullImage').removeClass('image').off('click');
                $('.galleryMenu').html(Full);
                $('.full-view-switch').off('click');
                $('.full-view-switch').click(function () {
                    self.switch2Normal();
                });
            }
        },

        switch2Normal: function() {
            Backbone.trigger('full-view'); //in order to remove that one view for full view
            $(this.selected).removeClass('image-selected');
            this.selected = undefined;
            this.selectedModel = undefined;
            this.render();
            $('.galleryMenu').html(Normal);
            $('.full-view-switch').off('click');
            var self = this;
            $('.full-view-switch').click(function () {
                self.switch2Full();
            });
        },

	});
	return imageCollection;
});
