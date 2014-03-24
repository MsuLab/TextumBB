define(['underscore', 
	'backbone',
    'models/timage',
    'collections/timages',
    'views/image_view',
], function (_, Backbone, TImage, TImages, TImageView) {
	var imageCollection = Backbone.View.extend({
		el: '.photoGrid',

		initialize: function () {
			this.collection = new TImages();
			this.collection.fetch({
				reset: true,
			});
			this.render();
            this.collection.on("add", this.renderImage, this);
            this.collection.on("reset", this.render, this);
            var self = this;
            this.selected = undefined;
            this.selectedModel = undefined;
            $('body').click(function () {
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
                $('.image').addClass('fullImage').removeClass('image').off('click').off('dblclick');
                $('#normal').addClass('hidden');
                $('#full-view').removeClass('hidden');
                $('.full-view-switch').off('click');
                $('.full-view-switch').click(function () {
                    self.switch2Normal();
                });
            }
        },

        switch2Normal: function() {
            Backbone.trigger('normal'); //in order to remove that one view for full view
            $(this.selected).removeClass('image-selected');
            this.selected = undefined;
            this.selectedModel = undefined;
            this.render();
            $('#normal').removeClass('hidden');
            $('#full-view').addClass('hidden');
            $('.full-view-switch').off('click');
            var self = this;
            $('.full-view-switch').click(function () {
                self.switch2Full();
            });
        },

	});
	return imageCollection;
});
