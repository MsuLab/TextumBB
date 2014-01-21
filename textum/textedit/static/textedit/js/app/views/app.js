define(['backbone'], function(Backbone) {

    var App = Backbone.View.extend({
    	el: ".mainView",

        initialize: function() {
            console.log('Wahoo!');
        }
    });

    return App;

});
