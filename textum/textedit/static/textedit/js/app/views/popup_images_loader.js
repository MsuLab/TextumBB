define(['backbone',
    'text!templates/popup_upload_image_table_row_template.html',
    'fileupload',
    'bootstrap-modal',
], function (Backbone, Template) {

    var Popup = Backbone.View.extend({

        el: '#popup',

        initialize: function () {
            console.log('new: Pop is created.');
            this.show('UploadImg');
        },

        closePopup: function () {
            $('#uploadImg table tbody').empty();
            $('#popupUploadImg').modal('hide');
        },

        show: function (popup_type) {
            var self = this;
            $('#popupUploadImg').modal('show');
            $('#uploadImg-quit').click(function () {
                self.closePopup();
            });

            this.initImageLoader();
        },

        initImageLoader: function () {
            console.log('Image pop-up!');

            var index = 0;

            $('#uploadImg').fileupload({
                url: '/api/images/timage/',
                dataType: 'json',
                context: $('#uploadImg')
            })
            .bind('fileuploadadd', function (e, data) {
                console.log("File added.");

                data.files[0].uploadID = "uploadID" + index;
                index = index + 1;

                var row = $(Template).clone();

                row.attr("id", "row" + data.files[0].uploadID);
                row.find('p.name').text(data.files[0].name);
                row.find('div.progress').attr('id', 'progressbar-ext' + data.files[0].uploadID);
                row.find('div.progress-bar').attr('id', 'progressbar' + data.files[0].uploadID);
                row.find('span.btn-success').attr('id', 'uploadbutton' + data.files[0].uploadID);
                row.find('span.btn-warning').attr('id', 'cancelbutton' + data.files[0].uploadID);

                data.context = row.appendTo($('#uploadImg table tbody'));

                $('#cancelbutton' + data.files[0].uploadID).click(function () {
                    $('#row' + data.files[0].uploadID).remove();
                });

                $('#uploadbutton' + data.files[0].uploadID).click(function () {
                    $('#uploadbutton' + data.files[0].uploadID).remove();
                    $('#cancelbutton' + data.files[0].uploadID).text('Прервать загрузку');

                    var jqXHR = data.submit();
                    $('#cancelbutton' + data.files[0].uploadID).click(function (e) {
                        jqXHR.abort();
                    });
                });

                return false;
            })
            .bind('fileuploaddone', function (e, data) {
                console.log("File uploaded.");

                Backbone.trigger('uploadImage', data.result);

                $('<p>Загрузка завершена.</p>').replaceAll('#cancelbutton' + data.files[0].uploadID);

                setTimeout(function () {
                    $('#progressbar-ext' + data.files[0].uploadID).remove();
                }, 1000);
            })
            .bind('fileuploadfail', function (e, data) {
                if (data.errorThrown === 'abort') {
                    alert('Загрузка прервана!');
                }
            })
            .bind('fileuploadprogress', function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);

                $('#progressbar-ext' + data.files[0].uploadID).attr("aria-valuenow", progress);
                $('#progressbar' + data.files[0].uploadID).width(progress + '%');
            })

            $('#uploadImg-uploadAll').click(function () {
                console.log('UploadAll pressed');
                $('.uploadImg-uploadThis').each(function (){
                    this.click();
                });
            });
        }
    });

    return Popup;
});
