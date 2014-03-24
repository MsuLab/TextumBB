define(['backbone',
	'models/timage',
	'text!templates/imgview_image_template.html',
], function (Backbone, TImage, Template) {
	var TImageView = Backbone.View.extend({
		tagName: 'li',
		className: 'image',
		template: _.template(Template),

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(Backbone, 'full-view', this.remove); // only one image should be shown in full view mode
			this.listenTo(Backbone, 'normal', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes)).attr('id', 'image' + this.model.id);
            var inputForm = this.$el.find('form');
            inputForm.off();
            var self = this;
            inputForm.submit(function (e) {
                var inputField = $(inputForm).find('input');
                var page_num = $(inputField).val();
                var n = ~~Number(page_num);
                if (String(n) === page_num && n > 0) {
                    self.model.save('page_num', n);
                    $(inputField).val('').blur();
                }
                else {
                    $(inputField).val('');
                }
                return false;
            });
			return this;
		},
		deleteImg: function () {
			this.model.destroy();
			this.remove();
		},
	});

	return TImageView;
});
