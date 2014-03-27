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
            if (this.model.attributes.page_num == 0) {
            	this.model.attributes.show_pg = '?'
            }
            else if (this.model.attributes.page_num % 1 === 0) {
            	this.model.attributes.show_pg = this.model.attributes.page_num.toString();
            }
            else {
            	var z = this.model.attributes.page_num - 0.5;
            	this.model.attributes.show_pg = z.toString() + ' об';
            }
			this.$el.html(this.template(this.model.attributes)).attr('id', 'image' + this.model.id);
            var inputForm = this.$el.find('form');
            inputForm.off();
            var self = this;
            inputForm.submit(function (e) {
                var inputField = $(inputForm).find('input');
                var pg_num = $(inputField).val();
                self.model.save('page_num', pg_num.replace('об', 'turn').replace(/[а-я, А-Я]/g, ''));
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
