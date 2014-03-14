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

            this.$webodf_element = this.$('#webodf-textarea');

            if (this.$webodf_element.length) {
                console.log('Loading webodf ...');
                // Init WebOdf Canvas
                this.$odfcanvas = new odf.OdfCanvas(this.$webodf_element[0]);
            } else {
                console.log("No Text Editor specified.")
            };
            this.listenTo(Backbone, 'uploadTextFile', function (data) {
                this.updateTextFile(data);
            }, this);
        },

        openFileLoader: function () {
            if (this.popup == undefined) {
                this.popup = new Popup({type:'UploadFile'});
            } else {
                this.popup.show('UploadFile');
            }
        },

        updateTextFile: function (file_data) {
            if (this.$webodf_element.length) {
                this.$odfcanvas.load(file_data.url);
            }
        }
    });

    return Editor;
});
