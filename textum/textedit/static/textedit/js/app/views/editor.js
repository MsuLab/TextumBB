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
        		
        		$('#upload').submit(function(){ //!!!!!!!!!!!!!!!!!!!!!!!!
        			var formData = new FormData($('#upload')[0]);
               $.ajax({
        				url: $('#upload').attr('action'),  //Server script to process data
                  type: 'POST',
        				xhr: function() {  // Custom XMLHttpRequest
         		   	var myXhr = $.ajaxSettings.xhr();
            			/*if(myXhr.upload){ // Check if upload property exists
            	   		myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            			}*/
            		return myXhr;
        			},
        			//Ajax events
        			//beforeSend: beforeSendHandler,
        			//success: completeHandler,
        			//error: errorHandler,
        			// Form data
        			data: formData,
        			//Options to tell jQuery not to process data or worry about content-type.
        			cache: false,
        			contentType: false,
        			processData: false
    				});
        			//$.post(this.$upload_form.attr('action'), this.$upload_form.serialize());
        		})
        		
        		this.$select_file.change(function() {
        			$('#upload').submit();
        		});
        		this.$select_file.click();
        		//this.$upload_form.submit();
        }
    });

    return Editor;
});
