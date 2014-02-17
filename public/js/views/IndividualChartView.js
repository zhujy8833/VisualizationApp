define(["backbone", "chart", "mustache","text!template/chart.mustache.html", "views/ChartView", "visualization", "jquery"],
    function(Backbone, ChartLibrary, Mustache, template, ChartView, Visualization, $){
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
            }];
        var IndividualView = ChartView.extend({
            render : function(){
                var view = this;
                $("#container").html(view.$el).prepend('<div class="navigate previous"></div>');
                $("#container .navigate").on("click", function(){
                    view.router.navigate("", {trigger: true});
                });
                var styleOpt = {
                    width : $("#main").width() * 0.3,
                    height : $("#main").height() * 0.55
                };

                if(view.chartOption != 'both') {
                    view.$el.html(Mustache.render(template, styleOpt));
                } else {
                    view.$el.html("")
                        .append(Mustache.render(template, $.extend({choice : "line"}, styleOpt)))
                        .append(Mustache.render(template, $.extend({choice : "bar" }, styleOpt)));
                }

                return view;
            },
            renderVisualization : function() {
                var view = this;
                var data = view.data || [];
                var target;
                var visualization;
                //var groupByFlower = _.groupBy(view.data, function(d){ return d.flower});
                var values = [];
                var labels = [];
                var criteria = ["sold", "unsold"];
                var index = 0;
                for (var i = 0; i < criteria.length; i++) {
                    var obj = {};
                    var style = styles[i];
                    obj.title = criteria[i];
                    obj.data = [];

                    for(var j = 0; j < data.length; j++) {
                        if(labels.length < data.length) labels.push(data[j].date);
                        obj.data.push(parseInt(data[j]["quantity-"+criteria[i]],10));
                    }
                    obj = _.extend(obj, style);
                    values.push(obj);
                }
                var sendingOptions = {
                    labels : labels,
                    data : values
                };

                if(view.chartOption !== 'both') {
                    target = view.$el.find(".myChart") ? view.$el.find(".myChart")[0] : null;
                    var visualization = new Visualization({target : target});

                    if(visualization) {
                        if(view.chartOption === 'line'){
                            visualization.renderLineChart(sendingOptions);
                        } else if(view.chartOption === 'bar') {
                            visualization.renderBarChart(sendingOptions);
                        }
                    }
                } else {
                    //draw both bar and line
                    target = view.$el.find(".myChart") ? view.$el.find(".myChart") : [];
                    _.each(target, function(t){
                        var visualization = new Visualization({target : t});
                        if($(t).data("choice") === 'line') {
                            visualization.renderLineChart(sendingOptions);
                        } else if($(t).data("choice") === 'bar'){
                            visualization.renderBarChart(sendingOptions);
                        }
                    });

                }
                view.dataInfo = sendingOptions.data;
                view.$el.append('<legend>');
                var legendFld = view.$el.find("legend");
                _.each(view.dataInfo, function(data){
                    legendFld.append('<div><div class="legend-block" style="background-color:' + data.fillColor + '"></div><span class="legend-title">' +data.title+'</span></div>')
                });
            }
        });

        return IndividualView;
    })
