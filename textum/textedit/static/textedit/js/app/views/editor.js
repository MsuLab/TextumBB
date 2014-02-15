define(['backbone',
    'editor', // Init wysihtml5 editor
    'jquery.ui.widget',
    'jquery.iframe-transport',
    'fileupload'
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
            this.$upload_button = this.$('#uploadButton');
        },
        uploadFile: function() {
        	  	$.fn.alignCenter = function() {
   			//get margin left
   				var marginLeft = - $(this).outerWidth()/2 + 'px';
   			//get margin top
   				var marginTop = - $(this).outerHeight()/2 + 'px';
   			//return updated element
   				return $(this).css({'margin-left':marginLeft, 'margin-top':marginTop});
  				};
				function closePopup() {
				  	$('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
				  	$('#popup').toggleClass('hidden');
				  	$('#upload').fileupload('destroy');
					return false;
				}
	        	function showPopup(popup_type) {
				   $('#opaco').height($(document).height()).toggleClass('hidden').fadeTo('slow', 0.7)
				   .click(function() {closePopup();});
	           	$('#popup').html($('#popup' + popup_type).html()).toggleClass('hidden').alignCenter();
	         	$('#upload').fileupload({
	         		dataType: 'json',
	         		context: $('#upload')[0],
	         		add: function(e, data) {
	         			console.log("File added");
	         			var jqXHR = data.submit()
	         			.error(function (jqXHR, textStatus, errorThrown) {
	         				if (errorThrown === 'abort') {
	         					alert('Загрузка прервана');
	         				}
	         			});
			         	$('#upload-cancel').click(function(e) {
			           		jqXHR.abort();
			           	});
			           	
	         		},
	         		done: function(e, data) {
	         			console.log("File uploaded");
	         			closePopup();
	         		}
	         	});
	         	return false;
	        	}
            console.log("Upload Button");
   			$('#upload-quit').click(function() {closePopup();});
            showPopup('UploadFile');
            
            
        }
    });

    return Editor;
});
