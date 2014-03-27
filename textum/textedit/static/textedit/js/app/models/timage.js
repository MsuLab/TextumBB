/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TImage = Backbone.Model.extend({
        defaults: {
            title: '',
            file: '',
            page_num: '',
            show_pg: '',
        }
    });

    return TImage;
});
