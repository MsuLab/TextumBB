define(['backbone',
	'models/timage'
], function(Backbone, TImage) {
	var TImageView = Backbone.View.extend({
		tagName: 'li',
		className: 'image',
		template: _.template('<span><%= page_num %></span>\
			<img src="<%= file %>" alt="<%= title %>" />'),
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