define(['backbone',
    'editor', // Init wysihtml5 editor
    'webodf',  // Init webodf editor
    'jquery.ui.widget',
    'jquery.iframe-transport',
    'fileupload'
], function(Backbone) {

    var Editor = Backbone.View.extend({

        el: '.leftView',

        events: {
            'click #uploadButton': 'uploadFile',
        },

        initialize: function() {
            console.log('new: Editor is created.');

            this.$text_area = this.$('#wysihtml5-textarea');
            this.$webodf_element = this.$('#webodf-textarea');

            if (this.$text_area.length) {
                console.log('Loading wysihtml5 ...');
                this.$text_area.wysihtml5();

            } else if(this.$webodf_element.length) {
                console.log('Loading webodf ...');
                odfcanvas = new odf.OdfCanvas(this.$webodf_element[0]);
                odfcanvas.load("/static/textedit/docs/testdoc.odt");

            } else {
                console.log("No Text Editor.")
            }

            this.$upload_button = this.$('#uploadButton');
        },
        uploadFile: function() {
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

            function showPopup(popup_type) {
                $('#opaco').height($(document).height()).toggleClass('hidden').fadeTo('slow', 0.7)
                    .click(function() {
                        self.closePopup();
                    });
                $('#popup').html($('#popup' + popup_type).html()).toggleClass('hidden').alignCenter();
                $('#upload').fileupload({
                    dataType: 'json',
                    context: $('#upload')[0],
                    add: function(e, data) {
                        console.log("File added");
                        var jqXHR = data.submit();

                        jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                            if (errorThrown === 'abort') {
                                alert('Загрузка прервана');
                            }
                        });
                        jqXHR.success(function (result, textStatus, jqXHR) {
                            self.updateTextFile(result.files[0]);
                        });


                        $('#upload-cancel').click(function(e) {
                            jqXHR.abort();
                        });
                    },
                    done: function(e, data) {
                        console.log("File uploaded");
                        self.closePopup();
                    }
                });
                console.log("Upload Button");
                $('#upload-quit').on('click', function() {
                    console.log(self);
                    self.closePopup();
                });
                return false;
            }

            showPopup('UploadFile');
        },
        closePopup: function() {
            $('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
            $('#popup').toggleClass('hidden');
            $('#upload').fileupload('destroy');
        },

        updateTextFile: function(file_data) {
            console.log(file_data);
        }
    });

    return Editor;
});
