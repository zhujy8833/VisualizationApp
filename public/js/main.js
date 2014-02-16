 require.config({
    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    },

    paths: {
        //"zepto": "vendor/zepto/zepto.min",
        "jquery": "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "mustache": "lib/mustache",
        "text": "lib/require-text",
        "chart" : "lib/chart.min"
        
    }



});
require(['jquery'], function($){
//    $.fn.slideIn = function(options) {
//        return this.each(function())
//    }
});

require(["backbone","jquery","routers/main_router"], function(Backbone, $, MainRouter){
    //TODO make chart choices as router flow, store the current chart choice in cookie or localstorage
    //Add a dropdown to allow changing chart choices
	var router = new MainRouter();

	Backbone.history.start();
});