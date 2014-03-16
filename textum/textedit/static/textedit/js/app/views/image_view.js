define(['backbone',
	'models/timage',
	'text!templates/imgview_image_template.html',
], function(Backbone, TImage, Template) {
	var TImageView = Backbone.View.extend({
		tagName: 'li',
		className: 'image',
		template: _.template(Template),

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(Backbone, 'full-view', this.remove); // only one image should be shown in full view mode
		},
		render: function () {
			this.$el.html(this.template(this.model.attributes)).attr('id', 'image' + this.model.id);
			return this;
		},
		deleteImg: function () {
			this.model.destroy();
			this.remove();
		},
	});

	return TImageView;
});