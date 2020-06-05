define(function() {
    angular.module('app').controller('inv.invtra',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
            if ($rootScope.invtra) {
                scope.filter = $rootScope.invtra;
                $rootScope.invtra = "";
            };
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20,
                sort: "created,desc"
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "invtra",
                title: "库存交易明细表",
                headers: {
                    "ware_nbr": {
                        displayName: "仓库代号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },

                        width: 60
                    },
                    "ware_desc": {
                        displayName: "仓库名称",
                        width: 80
                    },
                    "item_nbr": {
                        displayName: "料品代号",
                        width: 80
                    },
                    "item_name": {
                        displayName: "料品名称"
                    },
                    "pro_nbr": {
                        displayName: "制程代号",
                        width: 60
                    },
                    "pro_desc": {
                        displayName: "制程名称",
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
                    "nbrdate": {
                        displayName: "日期",
                        width: 120
                    },
                    "tra_desc": {
                        displayName: "交易说明",
                        width: 120
                    },
                    "nbr": {
                        displayName: "单据号码",
                        width: 100
                    },
                    "qty": {
                        displayName: "数量",
                        type: "number",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 80
                    }
                },
                filterItems: {
                    acr_mon: {
                        type: "basEsydatetime",
                        format: "YYYYMM",
                        name: "acr_mon",
                        label: "月份"
                    },
                    nbrdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdate",
                        label: "日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "日期T"
                    },
                    ware_nbr: {
                        type: "basLov",
                        lovtype: "getwar",
                        name: "ware_nbr",
                        label: "仓库代号"
                    },
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        onchange: function() {
                            scope.filter.pro_nbr = "";
                            scope.filter.unit = "";

                        },
                        label: "料品代号"
                    },
                    pro_nbr: {
                        type: "basLov",
                        lovtype: "getinvpro",
                        name: "pro_nbr",
                        label: "制程代号"
                    },
                    unit: {
                        type: "basLov",
                        lovtype: "getunit",
                        name: "unit",
                        label: "单位"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "inv/invtra/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body.detail;
                        scope.config.headers.qty.summsg.sumval = res.data.body.header.qty;
                    });

                },
                reset: function() {
                    scope.filter = {

                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.datapage.sort = sort;
                    scope.action.load();
                },
                // rowclick: function(entity) {
                //     $rootScope.uid = entity.uid;
                //     scope.action.opendetail();
                // },
                opendetail: function() {
                    // var node = {
                    //     name: "",
                    //     url: 'inv/invtra.detail'
                    // }
                    // $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshinvtra', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});