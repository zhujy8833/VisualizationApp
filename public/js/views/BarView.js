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
                view.chartOption = options.chartOption || "line";
                view.soldOption = options.soldOption || "sold";
                view.render();

            },

            toggleTopBtn : function(e){
                var view = this;
                var btnGroup = $(e.currentTarget).closest('.button-group');
                var sold = $(e.currentTarget).data('field');
                btnGroup.find('.sub-button').removeClass('active');
                $(e.currentTarget).addClass('active');
                if(window.localStorage) {
                    window.localStorage.setItem("sold", sold);
                }
                view.router.renderChartView();
            },

            changeChart: function(e){
                var view = this;
                var ele = e.currentTarget;
                var choice = $(ele).val();
                if(window.localStorage) {
                    window.localStorage.setItem("chart", choice);
                }
                //view.router.navigate("", {trigger:true});
                view.router.renderChartView();
            },
            render : function() {
                var view = this;
                $("#main").before(view.$el);

                view.$el.html(Mustache.render(template, {chartOption : view.chartOption}));
                _.each(view.$el.find("select#chart-choice option"), function(option){
                   //  if($(option).val() == view.chartOption) {
                         option.selected = $(option).val() == view.chartOption;
                     //}
                });

                view.$el.find('.sold-field-btn button').removeClass('active');
                view.$el.find('.sold-field-btn button[data-field=' +view.soldOption+']').addClass('active');
                return view;

            }
        });
        return BarView;

    });