define(['backbone',
	'models/timage',
	'text!templates/imgview_image_template.html',
], function(Backbone, TImage, Template) {
	var TImageView = Backbone.View.extend({
		tagName: 'li',
		className: 'image',
		template: _.template(Template),
		events: {
			'click': 'deleteImg',
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		deleteImg: function () {
			this.model.destroy();
			this.remove();
		},
	});

	return TImageView;
});