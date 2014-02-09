define(['backbone',
    'editor' // Init wysihtml5 editor
], function(Backbone) {

    var Editor = Backbone.View.extend({

        el: '.leftView',
        
        events: {
        			  'click #uploadButton':			'uploadFile',
        },

        initialize: function() {
            console.log('new: Editor is created.');

            // ToDo(kopbob): Rename #some-textarea
            this.$text_area = this.$('#some-textarea');
            this.$text_area.wysihtml5();
            this.$upload_form = this.$('#upload');
            this.$upload_button = this.$('#uploadButton');
            this.$select_file = this.$('#id_file');
        },
        uploadFile: function() {
        		console.log("Upload Button");
        		this.$select_file.change(function() {
        			$('#upload').submit();
        		});
        		this.$select_file.click();
        }
    });

    return Editor;
});
