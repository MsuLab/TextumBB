define(['backbone'], function(Backbone) {
	var App = Backbone.View.extend({
		el: "#imageViewer",

		initialize: function() {
			this.$imageInput = this.$el.find("input");
			this.$prevImage = this.$el.find("#prevImage");

			this.$imageInput.on('onchange', function () {
				console.log('JJSDJJDSJJ');
			});

	        // if(document.all)
	        //     document.getElementById('prevImage').src = file.value;
	        // else
	        //     document.getElementById('prevImage').src = file.files.item(0).getAsDataURL();
	        // if(document.getElementById('prevImage').src.length > 0) 
	        //     document.getElementById('prevImage').style.display = 'block';

		},
		events: {
			'onchange input': 	'loadImage'
		},

		loadImage: function (file) {
			console.log('HEEELLLOO!');
		}
	});

	return App;
});