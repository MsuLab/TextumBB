define(['underscore', 
	'backbone',
    'models/timage',
    'collections/timages',
    'views/image_view',
    'views/page_decoder',
], function (_, Backbone, TImage, TImages, TImageView, code) {
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
            $('.normal-view-switch').click(function () {
                self.switch2Normal();
            });

            var pageSearchForm = $('#search-page');
            pageSearchForm.off();
            var inputField = $(pageSearchForm).find('input');
            pageSearchForm.submit(function (e) {
                var page = $(inputField).val();
                $(inputField).val('').blur();
                self.selectedModel = self.collection.findWhere({page_num: code.decode(page)});
                if (self.selectedModel != undefined) {
                    self.selectedModel = self.selectedModel.id;
                    self.selected = '#image' + self.selectedModel;
                }
                else {
                    self.selectedModel = undefined;
                    self.selected = undefined;
                }

                self.switch2Full();
                return false;
            });
            $(pageSearchForm).find('.btn').click(function () {
                pageSearchForm.submit();
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
                $('#normal-view-menu').addClass('hidden');
                $('#full-view-menu').removeClass('hidden');
                $('#search-page').addClass('hidden');
            }
        },

        switch2Normal: function() {
            Backbone.trigger('normal'); //in order to remove that one view for full view
            $(this.selected).removeClass('image-selected');
            this.selected = undefined;
            this.selectedModel = undefined;
            this.render();
            $('#normal-view-menu').removeClass('hidden');
            $('#full-view-menu').addClass('hidden');
            $('#search-page').removeClass('hidden');
        },

	});
	return imageCollection;
});
