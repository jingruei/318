define(function() {
    angular.module('app').controller('inv.itmacr',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                acr_mon: new moment(new Date()).format("YYYYMM")
            };
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20,
                sort: ""
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "itmacr",
                title: "库存交易汇总表",
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
                    "ware_nbr": {
                        displayName: "仓库代号",
                        width: 60
                    },
                    "ware_desc": {
                        displayName: "仓库名称",
                        width: 80
                    },
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 80
                    },
                    "item_name": {
                        displayName: "产品名称",
                    },
                    "pro_nbr": {
                        displayName: "制程代号",
                        width: 60
                    },
                    "pro_desc": {
                        displayName: "制程说明",
                        width: 80
                    },
                    "unit": {
                        displayName: "单位",
                        width: 50
                    },
                    "un_desc": {
                        displayName: "单位名称",
                        width: 80
                    },
                    "bal_qty": {
                        displayName: "期初存货",
                        width: 80
                    },
                    "shp_qty": {
                        displayName: "本出",
                        width: 80
                    },
                    "rec_qty": {
                        displayName: "本进",
                        width: 80
                    },
                    "oth_qty": {
                        displayName: "调整",
                        width: 80
                    },
                    "oh_qty": {
                        displayName: "期未",
                        width: 80
                    }
                },
                filterItems: {
                    acr_mon: {
                        type: "basEsydatetime",
                        format: "YYYYMM",
                        name: "acr_mon",
                        label: "结帐月份"
                    },
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        label: "产品编号"
                    },
                    ware_nbr: {
                        type: "basLov",
                        lovtype: "getwar",
                        name: "ware_nbr",
                        label: "仓库代号"
                    },
                    pro_nbr: {
                        type: "basLov",
                        lovtype: "getpro",
                        name: "pro_nbr",
                        label: "制程代号"
                    }
                }
            }

            scope.action = {

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "inv/itmacr/queryitmacr?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                        scope.model.content.forEach(function(element) {
                            element.oh_qty = element.bal_qty + element.rec_qty - element.shp_qty + element.oth_qty;
                        }, this);
                    });

                },
                reset: function() {
                    scope.filter = {
                        acr_mon: new moment(new Date()).format("YYYYMM")
                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.datapage.sort = sort;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.invtra = {
                        acr_mon: scope.filter.acr_mon,
                        ware_nbr: entity.ware_nbr,
                        item_nbr: entity.item_nbr,
                        pro_nbr: entity.pro_nbr,
                        unit: entity.unit,
                        filterfields: "item_nbr,pro_nbr,unit"
                    }
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "库存交易明细表",
                        url: 'inv/invtra'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshitmacr', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});