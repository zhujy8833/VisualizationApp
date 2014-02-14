define(['chart','jquery',"underscore"],function(ChartLib, $, _){
    var Visualization = function(options) {
        this.target = options.target;
        this.outputData = {
            labels : [],
            datasets : []
        };
        this.ctx = this.target.getContext("2d");
    };

    Visualization.prototype.renderLineChart = function(options) {
        var that = this;
        var xLabels = options.labels || [];
        if(!that.target) return;
        var values = options.data || [];
        that.outputData.datasets = values;
        this.outputData.labels = xLabels;
        var chart = new Chart(that.ctx).Line(that.outputData, {});

        return chart;

    };

    Visualization.prototype.renderBarChart = function(options){
        var that = this;
        var xLabels = options.labels || [];
        if(!that.target) return;
        var values = options.data || [];
        that.outputData.datasets = values;
        this.outputData.labels = xLabels;
        var chart = new Chart(that.ctx).Bar(that.outputData, {});

        return chart;
    };

    return Visualization;
//    var
//	return {
//		data :  {
//			labels : ["January","February","March","April","May","June","July"],
//			datasets : [
//				{
//					fillColor : "rgba(220,220,220,0.5)",
//					strokeColor : "rgba(220,220,220,1)",
//					pointColor : "rgba(220,220,220,1)",
//					pointStrokeColor : "#fff",
//					data : [65,59,90,81,56,55,40]
//				},
//				{
//					fillColor : "rgba(151,187,205,0.5)",
//					strokeColor : "rgba(151,187,205,1)",
//					pointColor : "rgba(151,187,205,1)",
//					pointStrokeColor : "#fff",
//					data : [28,48,40,19,96,27,100]
//				}
//			]
//		},
//
//		init : function(target) {
//			var view = this;
//			if(!target) return;
//			var ctx = target.getContext("2d");
//			var chart = new Chart(ctx).Line(view.data, {});
//		},
//
//		render : function() {
////			$.ajax({
////				type : "GET",
////				url : "/",
////				dataType : "json",
////				success: function(data) {
////
////				},
////				error : function() {
////
////				}
////			});
//		}
//	};
});