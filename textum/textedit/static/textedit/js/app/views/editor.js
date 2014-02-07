define(['backbone',
    'editor', // Init wysihtml5 editor
    'webodf'  // Init webodf editor
], function(Backbone) {

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
                odfcanvas = new odf.OdfCanvas(this.$webodf_element[0]);
                odfcanvas.load("/static/textedit/docs/testdoc.odt");

            } else {
                console.log("No Text Editor.")
            }

        }
    });

    return Editor;
});
