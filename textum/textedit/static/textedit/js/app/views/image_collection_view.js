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
            //this.collection.on("remove", this.removeImage, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("change", this.change, this);
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
            var inputForm = $('#pageNumInput' + image.id);
            inputForm.submit(function (e) {
                var inputField = $(inputForm).find('input');
                var page_num = $(inputField).val();
                var n = ~~Number(page_num);
                if (String(n) === page_num && n > 0) {
                    image.save('page_num', n);
                    $(inputField).val('').blur();
                }
                else {
                    $(inputField).val('');
                }
                return false;
            }); /* Something that looks very promising */
        },

        change: function () {
            var self = this;
            this.collection.each(function (image) {
                var inputForm = $('#pageNumInput' + image.id);
                $(inputForm).off();
                $(inputForm).submit(function (e) {
                    var inputField = $(inputForm).find('input');
                    var page_num = $(inputField).val();
                    var n = ~~Number(page_num);
                    if (String(n) === page_num && n > 0) {
                        image.save('page_num', n);
                        $(inputField).val('').blur();
                    }
                    else {
                        $(inputField).val('');
                    }
                    return false;
                });
            });
        },

	});
	return imageCollection;
});
