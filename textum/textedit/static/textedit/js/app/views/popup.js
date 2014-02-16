define(['backbone',
    'jquery.ui.widget',
    'jquery.iframe-transport',
    'fileupload'
], function(Backbone) {

    var Popup = Backbone.View.extend({

        el: '.leftView',

        initialize: function() {
            //console.log('new: Editor is created.');
            var self = this;
            this.$upload_button = this.$('#uploadButton');
        },

        showPopup: function(popup_type) {
            var self = this;
            $.fn.alignCenter = function() {
                //get margin left
                var marginLeft = -$(this).outerWidth() / 2 + 'px';
                //get margin top
                var marginTop = -$(this).outerHeight() / 2 + 'px';
                //return updated element
                return $(this).css({
                    'margin-left': marginLeft,
                    'margin-top': marginTop
                });
            };

            $('#opaco').height($(document).height()).toggleClass('hidden').fadeTo('slow', 0.7)
                .click(function() {
                    self.closePopup();
                });
            $('#popup').html($('#popup' + popup_type).html()).toggleClass('hidden').alignCenter();
            console.log("Upload Button");
            $('#upload-quit').on('click', function() {
                //console.log(self);
                self.closePopup();
            });
        },

        closePopup: function() {
            $('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
            $('#popup').toggleClass('hidden');
            $('#upload').fileupload('destroy');
        },

    });

    return Popup;
});
