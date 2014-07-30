require.config({
    'baseUrl': "/static/textedit/js/app",
    'paths': {

        // libs
        'jquery': '../bower_components/jquery/jquery.min',
        'underscore': '../bower_components/underscore-amd/underscore-min',
        'backbone': '../bower_components/backbone-amd/backbone-min',
        'backboneLocalstorage': '../bower_components/backbone.localStorage/backbone.localStorage',
        'text': '../bower_components/requirejs-text/text',

        // jScrollPane
        'mousewheel': '../bower_components/jquery-mousewheel/jquery.mousewheel',
        'jScrollPane': '../bower_components/jscrollpane/script/jquery.jscrollpane',

        // bootstrap3-wysihtml5
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'bootstrap-modal': '../bower_components/bootstrap/js/modal',
        'handlebars': '../bower_components/handlebars/handlebars',
        'wysihtml5': '../bower_components/wysihtml5/dist/wysihtml5-0.3.0.min',
        'editor': '../bower_components/bootstrap3-wysihtml5-bower/dist/bootstrap3-wysihtml5.min',
        'webodf': '../tmp/webodf',
        'jquery.ui.widget': '../bower_components/jquery-file-upload/js/vendor/jquery.ui.widget',
        'jquery.iframe-transport': '../bower_components/jquery-file-upload/js/jquery.iframe-transport',
        'fileupload': '../bower_components/jquery-file-upload/js/jquery.fileupload',

        //templates
        'templates': 'templates'
    },
    // Shim declaration
    'shim': {
        // jScrollPane
        'jScrollPane': {
            'deps': ['jquery', 'mousewheel'],
            'exports': 'jScrollPane'
        },
        // bootstrap3-wysihtml5
        'handlebars': {
            'exports': 'Handlebars'
        },
        'bootstrap': {
            'deps': ['jquery'],
            'exports': 'bootstrap'
        },
        'wysihtml5': {
            'deps': ['handlebars', 'jquery'],
            'exports': 'wysihtml5'
        },
        'editor': {
            'deps': ['wysihtml5', 'handlebars', 'jquery', 'bootstrap'],
            'exports': 'editor'
        },
        'webodf': {
            'exports': 'webodf'
        },
        'fileupload': {
            'deps': ['jquery.ui.widget', 'jquery.iframe-transport'],
            'exports': 'fileupload'
        }
    }
});


require(['backbone', 'routers/router'],
    function(Backbone, Router) {
        new Router();
        Backbone.history.start();
    });
