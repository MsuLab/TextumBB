define(['backbone',
    'fileupload',
    'bootstrap-modal'
], function (Backbone) {

    var Popup = Backbone.View.extend({

        initialize: function () {
            console.log('new: Pop is created.');
            this.show('UploadFile');
        },

        closePopup: function () {
            $('#uploadFile-status').empty();
            $('#popupUploadFile').modal('hide');
        },

        show: function (popup_type) {
            var self = this;

            $('#popupUploadFile').modal('show');
            $('#uploadFile-quit').click(function () {
                self.closePopup();
            });

            $('#progressbar-ext').attr("aria-valuenow", 0);
            $('#progressbar').width('0');

            self.initFileupload();
        },

        initFileupload: function () {
            var self = this;
            
            $('#uploadFile').fileupload({
                dataType: 'json',
                context: $('#uploadFile')[0],

                add: function(e, data) {
                    console.log("File added.");

                    if (!(/\.(odt|doc|docx|rtf|txt)$/i).test(data.files[0].name)) {
                        alert('Неверный формат файла.');
                    } else {
                        var jqXHR = data.submit();
                        jqXHR.error(function(jqXHR, textStatus, errorThrown) {
                            if (errorThrown === 'abort') {
                                $('<p>Загрузка прервана!</p>').replaceAll('#progressbar-ext');
                            }
                        });

                        jqXHR.success(function(result, textStatus, jqXHR) {
                        });

                        $('#uploadFile-cancel').click(function(e) {
                            jqXHR.abort();
                        });
                    }
                },

                progress: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progressbar-ext').attr("aria-valuenow", progress);
                    $('#progressbar').width(progress + '%');
                },

                done: function(e, data) {
                    var result = data.result;
                    Backbone.trigger('uploadTextFile', result.files[0]);
                    console.log("File uploaded.");
                    setTimeout(function() {self.closePopup();}, 1000);
                }
            });
        },

    });

    return Popup;
});
