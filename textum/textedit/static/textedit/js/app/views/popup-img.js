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
            $('#uploadImg table tbody').empty();
            $('#opaco').toggleClass('hidden').removeAttr('style').unbind('click');
            $('#popup').toggleClass('hidden');
            //$('#uploadImg').fileupload('destroy');
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
                    data.context = $('<tr id="row' + data.files[0].uploadID + '">\
                                        <td style="max-width: 200px; white-space: nowrap; overflow: hidden;\
                                         text-overflow: ellipsis;">\
                                         <p style="white-space: nowrap; overflow: hidden;\
                                             text-overflow: ellipsis;" class="name">' + data.files[0].name + '</p>\
                                        </td>\
                                        <td style="width: 200px;">\
                                            <div id="progressbarext' + data.files[0].uploadID + '"\
                                             class="progress progress-striped active" role="progressbar" \
                                             aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"\
                                             style="margin-top: 10px;">\
                                                <div id="progressbar' + data.files[0].uploadID + 
                                                '" class="progress-bar progress-bar-success" style="width:0%;"></div>\
                                            </div>\
                                        </td>\
                                        <td style="width: 250px;">\
                                            <span id="uploadbutton' + data.files[0].uploadID + 
                                            '" class="btn btn-success uploadImg-uploadThis">\
                                                <i class="glyphicon glyphicon-upload"></i>\
                                                <span>Загрузить файл</span>\
                                            </span>\
                                            <span id="cancelbutton' + data.files[0].uploadID + 
                                            '" class="btn btn-warning">\
                                                <span>Отмена</span>\
                                            </span>\
                                        </td>\
                                    </tr>')
                        .appendTo($('#uploadImg table tbody'));
                    $('#cancelbutton' + data.files[0].uploadID).click(function() {
                        $('#row' + data.files[0].uploadID).remove();
                    });
                    $('#uploadbutton' + data.files[0].uploadID).click(function() {
                            $('#uploadbutton' + data.files[0].uploadID).remove();
                            $('#cancelbutton' + data.files[0].uploadID).text('Прервать загрузку');
                            var jqXHR = data.submit();
                            jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                                if (errorThrown === 'abort') {
                                    alert('Загрузка прервана!');
                                }
                            });
                            $('#cancelbutton' + data.files[0].uploadID).click(function (e) {
                                jqXHR.abort();
                            });
                            jqXHR.success(function(result, textStatus, jqXHR) {
                                Backbone.trigger('uploadImage', result.files[0]);
                                //console.log(result.files[0]);
                                $('<p>Загрузка завершена.</p>').replaceAll('#cancelbutton' + data.files[0].uploadID);
                                setTimeout(function() {
                                    $('#progressbarext' + data.files[0].uploadID).remove();
                                }, 1000);
                            });
                        });
                },

                progress: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progressbar' + data.files[0].uploadID).width(progress + '%');
                },

                done: function(e, data) {
                    console.log("File uploaded.");
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
