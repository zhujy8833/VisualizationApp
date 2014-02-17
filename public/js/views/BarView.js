define(["backbone", "underscore", "jquery", "chart", "mustache","text!template/bar.mustache.html", "visualization"],
    function(Backbone, _, $, ChartLib, Mustache, template, Visualization){
        var BarView = Backbone.View.extend({
            tagName : "div",
            className: "topBar",
            events : {
                "change #chart-choice" : "changeChart",
                "click .sub-button" : "toggleTopBtn"
            },

            initialize : function(options) {
                var view = this;
                view.router = options.router;
                view.chartOption = view.chartOption || "line";
                view.soldOption = view.soldOption || "sold";
                view.render();
            },

            toggleTopBtn : function(e){
                var view = this;
                var btnGroup = $(e.currentTarget).closest('.button-group');
                var sold = $(e.currentTarget).data('field');
                btnGroup.find('.sub-button').removeClass('active');
                $(e.currentTarget).addClass('active');
                view.soldOption = sold;
                view.router.renderChartView({soldOption : view.soldOption, chartOption: view.chartOption});
            },

            changeChart: function(e){
                var view = this;
                var ele = e.currentTarget;
                var choice = $(ele).val();

                view.chartOption = choice;
                view.router.renderChartView({soldOption : view.soldOption, chartOption: view.chartOption});
            },
            render : function() {
                var view = this;
                $("header").html(view.$el);
                view.$el.html(Mustache.render(template, {fields: [{name : "sold", active : true}, {name : "unsold", active : false}]}));
                view.$el.find("button:first").css({left : "2px"});
                return view;

            }
        });
        return BarView;

    });