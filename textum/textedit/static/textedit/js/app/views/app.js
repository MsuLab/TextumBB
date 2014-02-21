define(['backbone',
        'views/editor',
        'views/gallery'
    ],
    function(Backbone, Editor, Gallery) {

        var AppView = Backbone.View.extend({

            el: ".mainView",

            initialize: function() {
                console.log('new: AppView is created.');

                this.editor = new Editor();
                this.gallery = new Gallery();
            }
        });

        return AppView;

    });
