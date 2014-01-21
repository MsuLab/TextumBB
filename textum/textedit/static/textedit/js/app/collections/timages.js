/*global define*/
define([
        'underscore',
        'backbone',
        'backboneLocalstorage',
        'models/timage'
], function (_, Backbone, Store, TImage) {
        'use strict';

        var TodosCollection = Backbone.Collection.extend({
                // Reference to this collection's model.
                model: TImage,

                // Save all of the todo items under the `"todos"` namespace.
                localStorage: new Store('timages-backbone'),

                // TImage are sorted by their original insertion order.
                comparator: function (timage) {
                        return todo.get('order');
                }
        });

        return new TodosCollection();
});