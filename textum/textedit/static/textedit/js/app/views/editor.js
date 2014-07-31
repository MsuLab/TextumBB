define(['backbone',
    'views/popup_file_loader', 'underscore',
    'webodf' // Init webodf viewer
], function (Backbone, Popup, _) {

    var Editor = Backbone.View.extend({
        pageHeight: 875,
        _current_page: 0,

        el: '.leftView',

        events: {
            'click #uploadButton': 'openFileLoader',
            'click #saveButton': 'saveFile',
            'click #downloadButton': 'downloadFile',
        },
        txt_file: undefined,

        initialize: function () {
            console.log('new: Editor is created.');

            this.$webodf_wrapper = this.$('#webodf-wrapper');
            this.$webodf_element = this.$('#webodf-textarea');
            this.$wysihtml5 = this.$('#wysihtml5-textarea');

            

            // if (this.$wysihtml5.length) {
            //     console.log("Here!")
            //     // this.$wysihtml5.wysihtml5();

            //     var editor = new wysihtml5.Editor("wysihtml5-textarea", { // id of textarea element
            //     });

            //     console.log(editor.getValue())
            // }

            if (this.$webodf_element.length) {
                console.log('Loading webodf ...');
                // Init WebOdf Canvas
                this.$odfcanvas = new odf.OdfCanvas(this.$webodf_element[0]);
            } else {
                console.log("No Text Editor specified.")
            };

            this.listenTo(Backbone, 'Editor::uploadTextFile', function (data) {
                if (_.isObject(data)) {
                    this.txt_file = data;
                    this.$wysihtml5.val(this.txt_file.text)
                } else {
                    this.updateTextFile(odf_file_url);
                }
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

        showPage: function(pageNumber) {
            self._current_page = pageNumber;
            this.$webodf_wrapper.scrollTop(pageNumber * this.pageHeight);
        },

        pageScroller: function() {
            self = this;

            this.$webodf_wrapper.scroll(function() {
                p = (self.$webodf_wrapper.scrollTop() / (self.pageHeight - 100)) >> 0;
                _number_of_pages = Math.ceil($("#webodf-textarea").height() / self.pageHeight)

                if (self._current_page < p && self._current_page < _number_of_pages - 1 ) {
                    self._current_page = p;
                    Backbone.trigger('Image::showImage', self._current_page);
                };

                if (self._current_page > p) {
                    self._current_page = p;
                    Backbone.trigger('Image::showImage', self._current_page, p);
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

        saveFile: function() {
            self = this;

            function OpenInNewTab(url) {
              var win = window.open(url, '_blank');
              win.focus();
            }

            if (this.txt_file) {
                var data = this.$wysihtml5.val();
                var request = $.ajax({
                    url: "txtfiles/" + this.txt_file.pk + '/',
                    type: "PATCH",
                    data: {
                        text: this.$wysihtml5.val(),
                    }
                }).done(function(data) {
                    self.txt_file = data;
                    OpenInNewTab(window.location.origin + self.txt_file.url)
                }).fail(function( jqXHR, textStatus ) {
                    console.log(jqXHR, textStatus);
                });
            }
        },

        downloadFile: function() {
            function OpenInNewTab(url) {
              var win = window.open(url, '_blank');
              win.focus();
            }
            OpenInNewTab(window.location.origin + this.txt_file.url)
        }
    });

    return Editor;
});
