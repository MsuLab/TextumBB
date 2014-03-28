define(['backbone',
	'models/timage',
	'text!templates/imgview_image_template.html',
	'views/page_decoder',
], function (Backbone, TImage, Template, code) {
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
			this.$el.html(this.template([this.model.attributes, code])).attr('id', 'image' + this.model.id);
            var inputForm = this.$el.find('form');
            inputForm.off();
            var self = this;
			inputForm.submit(function (e) {
                var inputField = $(inputForm).find('input');
                var pg_num = $(inputField).val();
                console.log(code.decode(pg_num));
                self.model.save({page_num: code.decode(pg_num)}, {wait: true});
                $(inputField).val('').blur();                
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
