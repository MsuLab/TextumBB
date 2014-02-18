define(['backbone',
    'jquery.ui.widget',
    'jquery.iframe-transport',
    'fileupload'
], function(Backbone) {

    var Popup = Backbone.View.extend({

        el: '.leftView',

        events: {
            'click #uploadButton': 'uploadFile',
        },

        initialize: function(options) {
            //console.log('new: Editor is created.');
            var self = this;
            this.$upload_button = this.$('#uploadButton');
            this.parent = options.parent;
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
                
                self.closePopup();
            });
        },

        closePopup: function() {
            $('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
            $('#popup').toggleClass('hidden');
            $('#upload').fileupload('destroy');
        },

        uploadFile: function() {
            var self = this;
            self.showPopup('UploadFile');
            $('#upload').fileupload({
                dataType: 'json',
                context: $('#upload')[0],
                add: function (e, data) {
                    console.log("File added");
                    if (!(/\.(odt|doc|docx|rtf|txt)$/i).test(data.files[0].name)) {
                        console.log("nope");
                        alert('Неверный формат файла.');
                    } 
                    else {
                        var jqXHR = data.submit();
                        jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                            if (errorThrown === 'abort') {
                                alert('Загрузка прервана!');
                            }
                        });
                        jqXHR.success(function (result, textStatus, jqXHR) {
                            self.parent.updateTextFile(result.files[0]);
                        });
                        $('#upload-cancel').click(function (e) {
                            jqXHR.abort();
                        });
                    }
                },
                done: function(e, data) {
                    console.log("File uploaded");
                    self.closePopup();
                }
            });
            
            console.log("File upload button pressed");
        },


    });

    return Popup;
});
