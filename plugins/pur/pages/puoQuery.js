define(function() {
    angular.module('app').controller('pur.puoQuery',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
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
                gridkey: "puoQuery",
                title: "询价查询",
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
                    "nbr": {
                        displayName: "单据号码",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.huid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "ven_nbr": {
                        displayName: "厂商代号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },
                        width: 120
                    },
                    "ven_alias": {
                        displayName: "厂商简称",
                        width: 120
                    },
                    "ven_item": {
                        displayName: "厂商产品编号",
                        width: 120
                    },
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 120
                    },
                    "item_alias": {
                        displayName: "产品简称",
                        width: 120
                    },
                    "unit": {
                        displayName: "单位",
                        width: 120
                    },
                    "un_desc": {
                        displayName: "单位名称",
                        width: 120
                    },
                    "pro_desc": {
                        displayName: "制程名称",
                        width: 120
                    },
                    "qty": {
                        type: "basNumber",
                        displayName: "数量",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 120
                    },
                    "c_price": {
                        type: "basNumber",
                        displayName: "币别单价",
                        width: 120
                    },
                    "c_amt": {
                        displayName: "金额",
                        type: "basNumber",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 120
                    },
                    "over_date": {
                        displayName: "有效日期",
                        width: 120
                    },

                },
                filterItems: {
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "厂商代号"
                    },
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        label: "产品编号"
                    },
                    ven_item: {
                        type: "basDefault",
                        lovtype: "",
                        name: "ven_item",
                        label: "厂商产品编号"
                    },
                    over_date: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "over_date",
                        label: "有效日期F"
                    },
                    over_dateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "over_dateb",
                        label: "有效日期T"
                    }
                },
                filtermoreItems: {
                    c_amt: {
                        type: "basDefault",
                        lovtype: "",
                        css: "cell2",
                        ftcondition: {
                            f: {
                                name: "c_amt"
                            },
                            t: {
                                name: "c_amtb"
                            }
                        },
                        name: "c_amt",
                        label: "金额"
                    },
                    remark: {
                        type: "basDefault",
                        lovtype: "",
                        name: "remark",
                        label: "备注"
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
                        url: "pur/puobat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/purerlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body.detail;
                        scope.config.headers.qty.summsg.sumval = res.data.body.header.qty;
                        scope.config.headers.c_amt.summsg.sumval = res.data.body.header.c_amt;
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
                //     $rootScope.uid = entity.huid;
                //     scope.action.opendetail();
                // },
                opendetail: function() {
                    var node = {
                        name: "询价资料",
                        url: 'pur/puobah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshpuobatallv', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});