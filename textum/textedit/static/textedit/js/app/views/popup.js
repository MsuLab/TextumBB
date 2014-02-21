define(['backbone',
    'fileupload'
], function(Backbone) {

    var Popup = Backbone.View.extend({

        el: '#popup',

        events: {
            'click #upload-quit': 'closePopup'
        },

        initialize: function(options) {
            console.log('new: Pop is created.');
            console.log(options.type);
            this.show(options.type);
        },

        closePopup: function() {
            $('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
            $('#popup').toggleClass('hidden');
            $('#upload').fileupload('destroy');
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
            if(popup_type === 'UploadFile') {
                self.initFileupload();
            }
            if(popup_type === 'UploadImg') {
                self.initImgupload();
            }
        },

        initFileupload: function() {
            var self = this;
            console.log($('#popupUploadFile form').attr('action'));
            $('#upload').fileupload({
                dataType: 'json',
                context: $('#upload')[0],

                add: function(e, data) {
                    console.log("File added.");

                    if (!(/\.(odt|doc|docx|rtf|txt)$/i).test(data.files[0].name)) {
                        alert('Неверный формат файла.');
                    } else {
                        var jqXHR = data.submit();

                        jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                            if (errorThrown === 'abort') {
                                alert('Загрузка прервана!');
                            }
                        });

                        jqXHR.success(function(result, textStatus, jqXHR) {
                            Backbone.trigger('uploadTextFile', result.files[0]);
                        });

                        $('#upload-cancel').click(function(e) {
                            jqXHR.abort();
                        });
                    }
                },

                done: function(e, data) {
                    console.log("File uploaded.");
                    self.closePopup();
                }
            });
        },

        initImgupload: function () {
            console.log('Image pop-up!');
            var self = this;
            $('#upload').fileupload({
                dataType: 'json',
                context: $('#upload')[0],

                add: function(e, data) {
                    console.log("File added.");
                    data.context
                    /*if (!(/\.(odt|doc|docx|rtf|txt)$/i).test(data.files[0].name)) {
                        alert('Неверный формат файла.');
                    } else {*/
                        var jqXHR = data.submit();

                        jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                            if (errorThrown === 'abort') {
                                alert('Загрузка прервана!');
                            }
                        });

                        //jqXHR.success(function(result, textStatus, jqXHR) {
                            //Backbone.trigger('uploadTextFile', result.files[0]);
                        //});

                        $('#upload-cancel').click(function(e) {
                            jqXHR.abort();
                        });
                    //}
                },

                done: function(e, data) {
                    console.log("File uploaded.");
                    self.closePopup();
                }
            });
        }

    });

    return Popup;
});
