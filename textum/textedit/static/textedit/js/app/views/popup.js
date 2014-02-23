define(['backbone',
    'fileupload'
], function(Backbone) {

    var Popup = Backbone.View.extend({

        el: '#popup',

        events: {
            'click #uploadFile-quit': 'closePopup'
        },

        initialize: function() {
            console.log('new: Pop is created.');
            this.show('UploadFile');
        },

        closePopup: function() {
            $('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
            $('#popup').toggleClass('hidden');
            $('#uploadFile').fileupload('destroy');
        },

        show: function(popup_type) {
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

            $('#opaco')
                .height($(document).height())
                .toggleClass('hidden')
                .fadeTo('slow', 0.7)
                .click(function() {
                    self.closePopup();
                });
            $('#popup')
                .html($('#popup' + popup_type).html())
                .toggleClass('hidden')
                .alignCenter();
            self.initFileupload();
        },

        initFileupload: function() {
            var self = this;
            console.log($('#popupUploadFile form').attr('action'));
            $('#uploadFile').fileupload({
                dataType: 'json',
                context: $('#uploadFile')[0],

                add: function(e, data) {
                    console.log("File added.");

                    if (!(/\.(odt|doc|docx|rtf|txt)$/i).test(data.files[0].name)) {
                        alert('Неверный формат файла.');
                    } else {
                        var jqXHR = data.submit();
                        $('#uploadFile-status').text('Загружается...');
                        jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                            if (errorThrown === 'abort') {
                                $('#uploadFile-status').text('Загрузка прервана!');
                            }
                        });

                        jqXHR.success(function(result, textStatus, jqXHR) {
                            Backbone.trigger('uploadTextFile', result.files[0]);
                            $('#uploadFile-status').text('Загрузка завершена.');
                        });

                        $('#uploadFile-cancel').click(function(e) {
                            jqXHR.abort();
                        });
                    }
                },

                done: function(e, data) {
                    console.log("File uploaded.");
                    setTimeout(function() {self.closePopup();}, 1000);
                }
            });
        },

    });

    return Popup;
});
