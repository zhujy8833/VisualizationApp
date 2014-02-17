//index router
define(["backbone", "views/BarView", "views/ChartView", "views/IndividualChartView", "views/IndividualBarView", "jquery"],
    function(Backbone, BarView, ChartView, IndividualChartView, IndividualBarView, $){
	var defaultUrl = "/sold";
	var ChartRouter = Backbone.Router.extend({
        initialize : function(){
           var router = this;
        },

        routes : {
            "" : "index",
            "flower" : "flower"
        },
        index : function() {
            var router = this;
            router.renderBarView();
            router.renderChartView();

        },
        flower : function() {
            var router = this;
            router.renderIndividualBarView();
            router.renderIndividualChartView({router : router});
        },

        renderChartView : function(options){
            var chartOption = options && options.chartOption ? options.chartOption: "line";
            var soldOption = options && options.soldOption ? options.soldOption : "sold";
            var url = ["/", soldOption].join("");
            var router = this;
            $.ajax({
				type : "GET",
				url : url,
				success : function(data){

                    var chartView = new ChartView({
                        router : router,
                        data : data,
                        chartOption: chartOption,
                        title : "Overview"
                    });
				},
                error : function() {

                }
			});
        },

        renderIndividualChartView : function(options){
            var chartOption = options && options.chartOption ? options.chartOption: "line";
            var flowerName = options && options.flowerName ? options.flowerName : "tulip";
            $.ajax({
                type : "GET",
                url : ["/flower/", flowerName].join(""),
                success : function(data) {
                    var individualChartView = new IndividualChartView($.extend({
                       data : data,
                       title : "Individual Flower"
                    }, options));
                },
                error : function() {

                }
            });
        },

        renderBarView : function(options){
            var router = this;
            options = options || {};
            var barView = new BarView($.extend({router : router}, options));
        },

        renderIndividualBarView : function(options){
            var router = this;
            options = options || {};
            var barView = new IndividualBarView($.extend({router : router}, options));
        }
    });
    return ChartRouter;
	
})