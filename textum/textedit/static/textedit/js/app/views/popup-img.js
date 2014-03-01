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
            $('#uploadImg ul').empty();
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
            var index = 0;
            $('#uploadImg').fileupload({
                dataType: 'json',
                context: $('#uploadImg'),

                add: function(e, data) {
                    //var jqXHR;
                    console.log("File added.");
                    data.files[0].uploadID = "uploadID" + index;
                    index = index + 1;
                    data.context = $('<li><span class="btn btn-success fileinput-button uploadImg-uploadThis">\
                                     <span>' + data.files[0].name + '</span>\
                                    </span></li>')
                        //.text('Upload ' + data.files[0].name)
                        .appendTo($('#uploadImg ul'))
                        .click(function() {
                            data.context = $('<li><p>Загружается...</p></li>').replaceAll($(this));//.text('Загружается...').replaceAll($(this));
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
                                            /*setTimeout(function () {
                                            var overallProgress = $(data.context).fileupload('progress');
                                            console.log(overallProgress.loaded);}, 100);*/
                        });
                        //jqXHR.success(function(result, textStatus, jqXHR) {
                            //Backbone.trigger('uploadTextFile', result.files[0]);
                        //});
                },

                progress: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    console.log(progress);
                    console.log(data.files[0].uploadID);
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
