
define(["backbone", "underscore", "jquery", "chart", "mustache","text!template/bar.mustache.html", "views/BarView","visualization"],
    function(Backbone, _, $, ChartLib, Mustache, template, BarView, Visualization){
        var BarView = BarView.extend({
            initialize : function(options) {
                var view = this;
                view.router = options.router;
                view.chartOption = view.chartOption || "line";
                view.flowerName = options.flowerName;
                view.render();
            },

            toggleTopBtn : function(e){
                var view = this;
                var btnGroup = $(e.currentTarget).closest('.button-group');
                var flowerName = $(e.currentTarget).data('field');
                btnGroup.find('.sub-button').removeClass('active');
                $(e.currentTarget).addClass('active');
                view.flowerName = flowerName;
                view.router.renderIndividualChartView({flowerName : view.flowerName, chartOption: view.chartOption, router : view.router});
            },

            changeChart: function(e){
                var view = this;
                var ele = e.currentTarget;
                var choice = $(ele).val();

                view.chartOption = choice;
                view.router.renderIndividualChartView({flowerName : view.flowerName, chartOption: view.chartOption, router: view.router});
            },
            render : function() {
                var view = this;
                $("header").html(view.$el);

                view.$el.html(Mustache.render(template, {
                    fields: [{name : "tulip", active : true},
                             {name : "rose", active : false},
                             {name : "dandelion", active: false}
                            ]}));
                view.$el.find("button:first").css({left : "7px"});
                return view;

            }
        });
        return BarView;

    });
