define(['backbone',
    'views/popup',
    'editor', // Init wysihtml5 editor
    'webodf',  // Init webodf editor
    'jquery.ui.widget',
    'jquery.iframe-transport',
    'fileupload'
], function(Backbone, Popup) {

    var Editor = Backbone.View.extend({

        el: '.leftView',

        initialize: function() {
            console.log('new: Editor is created.');

            this.$text_area = this.$('#wysihtml5-textarea');
            this.$webodf_element = this.$('#webodf-textarea');

            if (this.$text_area.length) {
                console.log('Loading wysihtml5 ...');
                this.$text_area.wysihtml5();

            } else if(this.$webodf_element.length) {
                console.log('Loading webodf ...');
                this.$odfcanvas = new odf.OdfCanvas(this.$webodf_element[0]);
                this.$odfcanvas.load("/static/textedit/docs/testdoc.odt");

            } else {
                console.log("No Text Editor.")
            }

            this.$upload_button = this.$('#uploadButton');
            this.popup = new Popup({parent:this});
        },

        updateTextFile: function(file_data) {
            console.log(file_data);
            if (this.$webodf_element.length) {
                this.$odfcanvas.load(file_data.url);
            }
        }
    });

    return Editor;
});
