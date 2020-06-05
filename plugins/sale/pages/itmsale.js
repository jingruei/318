define(function() {
    angular.module('app').controller('sale.itmsale',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                acr_mon: new moment(new Date(new Date() - 365 * 24 * 60 * 60 * 1000)).format("YYYYMM"),
                acr_monb: new moment(new Date()).format("YYYYMM")
            };
            scope.model = {
                records: 0,
                content: []
            }
            scope.idprofita = "itmsalea"
            scope.idprofitb = "itmsaleb"

            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "itmsale",
                title: "产品销售排行板",
                // gridheight: 200,
                // listoperation: {
                //     add: {
                //         name: "新增",
                //         icon: "fa-calendar-check-o",
                //         action: function(event, scope) {
                //             scope.action.add();
                //         }
                //     }
                // },
                headers: {
                    "item_nbr": {
                        displayName: "产品代号",
                        width: 60
                    },
                    "item_name": {
                        displayName: "产品名称",
                        width: 80
                    },
                    "item_desc": {
                        displayName: "规格说明",
                        width: 100
                    },
                    "item_name": {
                        displayName: "产品名称",
                    },
                    "qty": {
                        displayName: "销售数量",
                        width: 60
                    },
                    "amt": {
                        displayName: "销售金额",
                        width: 80
                    },
                    "cost": {
                        displayName: "销售成本",
                        width: 80
                    },
                    "profit": {
                        displayName: "销售毛利",
                        width: 80
                    },
                    "profitrat": {
                        displayName: "毛利率",
                        width: 80
                    },
                },
                filterItems: {
                    acr_mon: {
                        type: "basEsydatetime",
                        format: "YYYYMM",
                        name: "acr_mon",
                        label: "月份F"
                    },
                    acr_monb: {
                        type: "basEsydatetime",
                        format: "YYYYMM",
                        name: "acr_monb",
                        label: "月份T"
                    },
                    page: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: 2000, name: "全部" },
                            { value: 10, name: "前10名" },
                            { value: 15, name: "前15名" },
                            { value: 20, name: "前20名" }
                        ],
                        name: "page",
                        label: "排行板"
                    },
                }
            }

            scope.action = {

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "ord/sale/itmsale",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body.list;
                        scope.mon = res.data.body.mon;
                        scope.model.content.forEach(function(element) {
                            if (element.amt) {
                                element.profitrat = (element.profit * 100 / element.amt) + "%";
                            }
                        }, this);
                        scope.action.showimage();
                    });

                },
                reset: function() {
                    scope.filter = {
                        acr_mon: new moment(new Date(new Date() - 365 * 24 * 60 * 60 * 1000)).format("YYYYMM"),
                        acr_monb: new moment(new Date()).format("YYYYMM")
                    };

                },
                showimage: function() {
                    // 路径配置
                    var ecConfig = require.config({
                        paths: {
                            echarts: './core/vendor/echarts'
                        }
                    });

                    // var ecConfig = echarts.config.EVENT;

                    // 使用
                    require(
                        [
                            'echarts',
                            'echarts/chart/bar',
                            'echarts/chart/pie',
                            'echarts/chart/funnel',
                            'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function(ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myCharta = ec.init(document.getElementById(scope.idprofita));
                            option = {
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data: ['邮件营销', '联盟广告']
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] }
                                    }
                                },
                                calculable: true,
                                xAxis: [{
                                    type: 'category',
                                    boundaryGap: false,
                                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                                }],
                                yAxis: [{
                                    type: 'value'
                                }],
                                series: [{
                                        name: '邮件营销',
                                        type: 'line',
                                        stack: '总量',
                                        data: [120, 132, 101, 134, 90, 230, 210]
                                    },
                                    {
                                        name: '联盟广告',
                                        type: 'line',
                                        stack: '总量',
                                        data: [220, 182, 191, 234, 290, 330, 310]
                                    }

                                ]
                            };

                            var monarray = qwsys.changearray(scope.mon, "item_name", "acr_mon", "amt");
                            option.legend.data = [];
                            option.xAxis = [];
                            option.series = [];
                            angular.forEach(monarray, function(val, key) {
                                option.legend.data.push(key);
                                option.xAxis = [];
                                var xitem = {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: []
                                }
                                var dataitem = {
                                    name: key,
                                    type: 'line',
                                    stack: '金额',
                                    data: []
                                };
                                angular.forEach(val, function(valb, keyb) {
                                    xitem.data.push(keyb);
                                    dataitem.data.push(valb);
                                })
                                option.xAxis.push(xitem);
                                option.series.push(dataitem);

                            })

                            // 为echarts对象加载数据
                            myCharta.setOption(option);
                            // myCharta.on(ecConfig.MAGIC_TYPE_CHANGED, function(para) {
                            //     var d = 1;
                            //     d = 2;
                            // });

                            var myChartb = ec.init(document.getElementById(scope.idprofitb));

                            optionb = {
                                title: {
                                    text: '',
                                    subtext: '',
                                    x: 'center'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    x: 'left',
                                    data: qwsys.getarraycol(scope.model.content, "item_name")
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        magicType: {
                                            show: true,
                                            type: ['pie', 'funnel'],
                                            option: {
                                                funnel: {
                                                    x: '25%',
                                                    width: '50%',
                                                    funnelAlign: 'left',
                                                    max: 1548
                                                }
                                            }
                                        },
                                        saveAsImage: { show: true }
                                    }
                                },
                                calculable: true,
                                series: [{
                                    name: '销售金额',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: qwsys.getarraycolval(scope.model.content, "item_name", "amt")
                                }]
                            };

                            // 为echarts对象加载数据
                            myChartb.setOption(optionb);
                            // myChartb.on(ecConfig.MAGIC_TYPE_CHANGED, function(para) {
                            //     var d = 1;
                            //     d = 2;
                            // });
                        }
                    );
                },
                // changepage: function(page, size, sort) {
                //     scope.datapage.page = page;
                //     scope.datapage.size = size;
                //     scope.datapage.sort = sort;
                //     scope.action.load();
                // },
                // rowclick: function(entity) {
                //     $rootScope.invtra = {
                //         acr_mon: scope.filter.acr_mon,
                //         ware_nbr: entity.ware_nbr,
                //         item_nbr: entity.item_nbr,
                //         pro_nbr: entity.pro_nbr,
                //         unit: entity.unit,
                //         filterfields: "item_nbr,pro_nbr,unit"
                //     }
                //     scope.action.opendetail();
                // },
                // opendetail: function(entity) {
                //     $rootScope.filter = scope.filter;
                //     var node = {
                //         name: "库存交易明细表",
                //         url: 'sale/itmsale.detail'
                //     }
                //     $scope.$emit('opencusdetail', node);
                // }
            }

            // scope.action.load();
        });

});