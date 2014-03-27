/*global define*/
define([
        'underscore',
        'backbone',
        //'backboneLocalstorage',
        'models/timage'
], function (_, Backbone, TImage) {
        'use strict';

        var TodosCollection = Backbone.Collection.extend({

                model: TImage,

                url: '/api/images/timage/',

                comparator: function (timage) {
                        return timage.get('order');
                        //return timage.get('page_num');
                }
        });

        return TodosCollection;
});
