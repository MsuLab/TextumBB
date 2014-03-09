define(['backbone',
    'fileupload',
    'bootstrap-modal'
], function(Backbone) {

    var Popup = Backbone.View.extend({

        el: '#popup',

        initialize: function() {
            console.log('new: Pop is created.');

            this.show('UploadImg');
        },

        closePopup: function() {
            $('#uploadImg table tbody').empty();
            $('#popupUploadImg').modal('hide');
        },

        show: function(popup_type) {
            var self = this;
            $('#popupUploadImg').modal('show');
            $('#uploadImg-quit').click(function () {
                self.closePopup();
            });
            self.initImgupload();

        },

        initImgupload: function () {
            console.log('Image pop-up!');
            var self = this;
            var index = 0;
            $('#uploadImg').fileupload({
                url: '/api/images/timage/',
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
                                            <div id="progressbar-ext' + data.files[0].uploadID + '"\
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
                        });
                },

                progress: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progressbar-ext' + data.files[0].uploadID).attr("aria-valuenow", progress);
                    $('#progressbar' + data.files[0].uploadID).width(progress + '%');
                },

                done: function(e, data) {
                    var result = data.result;
                    var textStatus = data.textStatus;
                    var jqXHR = data.jqXHR;
                    console.log(data);
                                Backbone.trigger('uploadImage', result);
                                $('<p>Загрузка завершена.</p>').replaceAll('#cancelbutton' + data.files[0].uploadID);
                                setTimeout(function() {
                                    $('#progressbar-ext' + data.files[0].uploadID).remove();
                                }, 1000);
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
