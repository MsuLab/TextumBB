define(['backbone',
    'fileupload'
], function(Backbone) {

    var Popup = Backbone.View.extend({

        el: '#popup',

        events: {
            'click #uploadImg-quit': 'closePopup'
        },

        initialize: function() {
            console.log('new: Pop is created.');

            this.show('UploadImg');
        },

        closePopup: function() {
            $('#uploadImg ul li').remove();
            $('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
            $('#popup').toggleClass('hidden');
            $('#uploadImg').fileupload('destroy');
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

            self.initImgupload();
        },

        initImgupload: function () {
            console.log('Image pop-up!');
            var self = this;
            $('#uploadImg').fileupload({
                dataType: 'json',
                context: $('#uploadImg')[0],

                add: function(e, data) {
                    //var jqXHR;
                    console.log("File added.");
                    data.context = $('<li><span class="btn btn-success fileinput-button uploadImg-uploadThis">\
                                     <span>' + data.files[0].name + '</span>\
                                    </span></li>')
                        //.text('Upload ' + data.files[0].name)
                        .appendTo($('#uploadImg ul'))
                        .click(function() {
                            data.context = $('<p/>').text('Загружается...').replaceAll($(this));
                            var jqXHR = data.submit();
                            jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                                if (errorThrown === 'abort') {
                                    alert('Загрузка прервана!');
                                }
                            });
                            $('#uploadImg-cancel').click(function (e) {
                                jqXHR.abort();
                            });
                            jqXHR.success(function(result, textStatus, jqXHR) {
                                //Backbone.trigger('uploadTextFile', result.files[0]);
                                data.context = $('<p/>').text('Загрузка завершена.').replaceAll($(this));
                            });
                        });
                        //jqXHR.success(function(result, textStatus, jqXHR) {
                            //Backbone.trigger('uploadTextFile', result.files[0]);
                        //});
                },

                done: function(e, data) {
                    console.log("File uploaded.");
                    //data.context = $('<p/>').text('Загрузка завершена.').replaceAll($(this));
                }
            });
            $('#uploadImg-uploadAll').click(function() {
                console.log('UploadAll pressed');
                $('.uploadImg-uploadThis').each(function(){
                    this.click();
                });
            });
        }
    });

    return Popup;
});
