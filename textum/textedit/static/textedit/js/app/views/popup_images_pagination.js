define(['backbone',
    'collections/timages',
    'text!templates/popup_image_pagination_table_row_template.html',
    'views/page_decoder',
    'bootstrap-modal',
], function (Backbone, TImages, Template, code) {

    var Popup = Backbone.View.extend({

        initialize: function (img_collection) {
            console.log('new: Pop is created.');
            this.show(img_collection);
        },

        closePopup: function () {
            $('#imgPage table tbody').empty();
            $('#popupImgPage').modal('hide');
            Backbone.trigger('paginationDone');
        },

        show: function (img_collection) {
            var self = this;
            $('#popupImgPage').modal('show');
            $('#imgPage-quit').click(function () {
                self.closePopup();
            });

            this.initPaginator(img_collection);
        },

        initPaginator: function (img_collection) {
            img_collection.forEach(function (image) {
                var row = $(Template).clone();
                row.find('p.name').text(decodeURIComponent(image.attributes.title.replace(/^.*[\\\/]/, '')));
                row.find('form').off().submit(function (e) {
                    var inputField = row.find('form').find('input');
                    var pg_num = $(inputField).val();
                    image.save({page_num: code.decode(pg_num)}, {wait: true});
                    return false;
                });
                row.appendTo($('#imgPage table tbody'));
            });
            var self = this;
            $('#imgPage-ok').click(function () {
                $('#imgPage form').each(function () {
                    $(this).submit();
                });
                self.closePopup();
            });
            
        }
    });

    return Popup;
});
