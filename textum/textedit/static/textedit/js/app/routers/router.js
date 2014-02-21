/*global define*/
define([
    'jquery', 'backbone', 'views/app',
    'bootstrap' // Init Bootstrap js lib
], function($, Backbone, AppView) {
    'use strict';


    var Controller = Backbone.Router.extend({
        routes: {
            "": "setDefault",

            "posts/:id": "getPost",
            // <a href="http://example.com/#/posts/121">Example</a>

            "download/*path": "downloadFile",
            // <a href="http://example.com/#/download/user/images/hey.gif">Download</a>

            ":route/:action": "loadView",
            // <a href="http://example.com/#/dashboard/graph">Load Route/Action View</a>
        },
        initialize: function(options) {
            console.log('Controller is created!');
        },

        setDefault: function() {
            console.log('--> Welcome to Textum.');
            new AppView();
        },

        getPost: function(id) {
            console.log(id);
        },

        downloadFile: function(path) {
            console.log(path);
        },

        loadView: function(route, action) {
            console.log(route + "_" + action);
        },

    });

    return Controller
});
