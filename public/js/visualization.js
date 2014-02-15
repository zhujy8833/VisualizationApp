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
});