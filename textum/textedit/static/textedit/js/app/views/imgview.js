define(['backbone',
	'models/timage'
], function(Backbone, TImage) {
	var TImageView = Backbone.View.extend({
		tagName: 'li',
		template: _.template('<span><%= page_num %></span>\
			<img src="<%= url %>" alt="<%= name %>" />'),
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},
		render: function () {
			console.log(this.model.attributes);
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
	});

	return TImageView;
});