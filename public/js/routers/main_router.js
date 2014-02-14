//index router
define(["backbone", "views/BarView", "views/ChartView", "jquery"], function(Backbone, BarView, ChartView, $){
	var defaultUrl = "/sold";
	var ChartRouter = Backbone.Router.extend({
        initialize : function(){
           var router = this;
        },

        routes : {
            "" : "index"
        },
        index : function() {
            var router = this;
            router.renderBarView();
            router.renderChartView();

        },
        renderChartView : function(options){
            var chartOption = window.localStorage && window.localStorage.getItem("chart")? window.localStorage.getItem("chart") : "line";
            var soldOption = window.localStorage && window.localStorage.getItem("sold") ? window.localStorage.getItem("sold") : "sold";
            var url = ["/", soldOption].join("");
            var router = this;
            $.ajax({
				type : "GET",
				url : url,
				success : function(data){

                    var chartView = new ChartView({router : router, data : data, chartOption: chartOption, soldOption : soldOption});
				},
                error : function() {

                }
			});
        },

        renderBarView : function(){
            var chartOption = window.localStorage && window.localStorage.getItem("chart") ? window.localStorage.getItem("chart") : "line";
            var soldOption = window.localStorage && window.localStorage.getItem("sold") ? window.localStorage.getItem("sold") : "sold";
            var router = this;
            var barView = new BarView({router : router, chartOption: chartOption, soldOption: soldOption});
        }
    });
    return ChartRouter;
	
})