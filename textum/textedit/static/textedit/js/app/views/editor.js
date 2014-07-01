define(['backbone',
    'views/popup_file_loader',
    'webodf', // Init webodf viewer
], function (Backbone, Popup) {

    var Editor = Backbone.View.extend({

        el: '.leftView',

        events: {
            'click #uploadButton': 'openFileLoader',
        },

        initialize: function () {
            console.log('new: Editor is created.');

            this.$webodf_wrapper = this.$('#webodf-wrapper');
            this.$webodf_element = this.$('#webodf-textarea');

            if (this.$webodf_element.length) {
                console.log('Loading webodf ...');
                // Init WebOdf Canvas
                this.$odfcanvas = new odf.OdfCanvas(this.$webodf_element[0]);
            } else {
                console.log("No Text Editor specified.")
            };

            this.listenTo(Backbone, 'Editor::uploadTextFile', function (odf_file_url) {
                this.updateTextFile(odf_file_url);
            }, this);

            this.listenTo(Backbone, 'Editor::showPage', function (pageNumber) {
                this.showPage(pageNumber);
            }, this);
        },

        openFileLoader: function () {
            if (this.popup == undefined) {
                this.popup = new Popup({type:'UploadFile'});
            } else {
                this.popup.show('UploadFile');
            }
        },

        pageScroller: function() {
            console.log("pageScroller");
            _this = this;
            _current_page = 0;

            this.$webodf_wrapper.scroll(function() {
                p = (_this.$webodf_wrapper.scrollTop() / 450) >> 0;
                _number_of_pages = (($("#webodf-textarea").height() / 500) >> 0) - 1

                if (_current_page < p && _current_page < _number_of_pages) {
                    _current_page = p;
                    Backbone.trigger('Image::showImage', _current_page);
                };

                if (_current_page > p) {
                    _current_page = p;
                    Backbone.trigger('Image::showImage', _current_page);
                };
            });
        },

        updateTextFile: function (odf_file_url) {
            self = this;
            if (self.$webodf_element.length) {
                self.$odfcanvas.load(odf_file_url);
                setTimeout(function() {self.$odfcanvas.fitToWidth(650);}, 1000);
                self.pageScroller();
            }
        },

        showPage: function(pageNumber) {
            this.$webodf_wrapper.scrollTop((pageNumber - 1) * 1200);
        }
    });

    return Editor;
});
