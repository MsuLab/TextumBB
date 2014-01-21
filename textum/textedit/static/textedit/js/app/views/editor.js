define(['backbone',
    'editor' // Init wysihtml5 editor
], function(Backbone) {

    var Editor = Backbone.View.extend({

        el: '.leftView',

        initialize: function() {
            console.log('new: Editor is created.');

            // ToDo(kopbob): Rename #some-textarea
            this.$text_area = this.$('#some-textarea');
            this.$text_area.wysihtml5();
        }
    });

    return Editor;
});
