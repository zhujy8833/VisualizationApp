define(["backbone", "underscore", "jquery", "chart", "mustache","text!template/chart.mustache.html", "visualization"],
	function(Backbone, _, $, ChartLib, Mustache, template, Visualization){
        var styles = [
            {
                fillColor : "rgba(37,119,243,0.5)",
                strokeColor : "rgba(37,119,243,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff"
            },
            {
                fillColor : "rgba(255,123,16,0.5)",
                strokeColor : "rgba(255,123,16,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff"
            },
            {
                fillColor : "rgba(121,180,56,0.5)",
                strokeColor : "rgba(121,180,56,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff"
            }];

        var ChartView = Backbone.View.extend({
			tagName: "div",
            className : "chatDiv",

			events: {

			},

			initialize: function(options) {
				var view = this;
                var target;

				view.render();
                view.data = options.data || [];
                view.chartOption = options.chartOption || "line";
                view.render();
                view.renderVisualization();

			}, 
            renderVisualization : function() {
                var view = this;
                var target;
                target = view.$el.find("#myChart") ? view.$el.find("#myChart")[0] : null;
                //Helper.init(target);
                var visualization = new Visualization({target : target});
                var groupByFlower = _.groupBy(view.data, function(d){ return d.flower});
                var values = [];
                var labels = [];
                var index = 0;
                for (var flowerName in groupByFlower) {
                    var style = styles[index];
                    var obj = {};
                    var eachArray = groupByFlower[flowerName];
                    if(labels.length === 0) labels = eachArray.map(function(d){return d.date});
                    obj.data = eachArray.map(function(d){
                        return d.quantity;
                    });
                    obj.title = flowerName;
                    obj = _.extend(obj, style);
                    values.push(obj);
                    index++;
                }
                var sendingOptions = {
                    labels : labels,
                    data : values
                };
                if(visualization) {
                    if(view.chartOption === 'line'){
                        visualization.renderLineChart(sendingOptions);
                    } else if(view.chartOption === 'bar') {
                        visualization.renderBarChart(sendingOptions);
                    }
                }
                view.dataInfo = sendingOptions.data;
                var legendFld = view.$el.find('legend');
                _.each(view.dataInfo, function(data){
                    legendFld.append('<div><div class="legend-block" style="background-color:' + data.fillColor + '"></div><span class="legend-title">' +data.title+'</span></div>')
                });

            },
			render : function(){
				var view = this;
				$("#container").html(view.$el);

				view.$el.html(Mustache.render(template));
				return view;
			}
		});
	    return ChartView;
	});