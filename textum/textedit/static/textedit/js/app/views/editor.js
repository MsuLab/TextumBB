define(['backbone',
    'editor' // Init wysihtml5 editor
], function(Backbone) {

    var Editor = Backbone.View.extend({

        el: '.leftView',
        
        events: {
                 'click #uploadButton':			'uploadFile',
                 //'click #opaco':						'removePopup'
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
        	  	$.fn.alignCenter = function() {
   			//get margin left
   				var marginLeft = - $(this).width()/2 + 'px';
   			//get margin top
   				var marginTop = - $(this).height()/2 + 'px';
   			//return updated element
   				return $(this).css({'margin-left':marginLeft, 'margin-top':marginTop});
  				};
				function closePopup() {
				  	$('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
				  	$('#popup').toggleClass('hidden');
					return false;
				}
	        	function showPopup(popup_type) {
				   $('#opaco').height($(document).height()).toggleClass('hidden').fadeTo('slow', 0.7)
				   .click(function() {closePopup();});
	           	$('#popup').html($('#popup' + popup_type).html()).toggleClass('hidden').alignCenter();
	         	return false;
	        	}
            console.log("Upload Button");
            console.log($('#opaco').attr('class'));
   				
            showPopup('UploadFile');
            //$('#opaco').click(function(){
            	//closePopup();
            //});
            console.log($('#opaco').attr('class'));
           	return false;
        }
    });

    return Editor;
});
