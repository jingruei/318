define(function() {
    angular.module('app').controller('pur.recquery',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
            scope.model = {
                records: 0,
                content: []
            }

            scope.pur_uid = "";
            if ($rootScope.pur_uid) {
                scope.pur_uid = $rootScope.pur_uid;
                $rootScope.pur_uid = "";
            };
            scope.datapage = {
                page: 0,
                size: 20,
                sort: "created,desc"
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "recquery",
                title: "采购查询",
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
                    "nbrdate": {
                        displayName: "收料日期",
                        width: 120
                    },
                    "sure": {
                        displayName: "状态",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
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
                    "nbr": {
                        displayName: "单据号码",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.huid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "cus_item": {
                        displayName: "厂商产品编号",
                        width: 120
                    },
                    "desc_no": {
                        displayName: "厂商订单号",
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
                    "pro_desc": {
                        displayName: "制程名称",
                        width: 120
                    },
                    "un_desc": {
                        displayName: "单位",
                        width: 120
                    },
                    "qty": {
                        type: "number",
                        displayName: "数量",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 120
                    },
                    "t_un_desc": {
                        displayName: "计价单位",
                        width: 120
                    },
                    "t_qty": {
                        type: "number",
                        displayName: "计价数量",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 120
                    },
                    "coin_desc": {
                        displayName: "币别",
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

                    "in_box": {
                        type: "basNumber",
                        displayName: "内盒",
                        width: 120
                    },
                    "qty_pbox": {
                        type: "basNumber",
                        displayName: "外箱",
                        type: "basNumber",
                        width: 120
                    },
                    "n_wight": {
                        type: "basNumber",
                        displayName: "净重",
                        width: 120
                    },
                    "g_wight": {
                        type: "basNumber",
                        displayName: "毛重",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "cut": {
                        type: "basNumber",
                        displayName: "折数",
                        width: 120
                    }

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
                    cus_item: {
                        type: "basDefault",
                        lovtype: "",
                        name: "cus_item",
                        label: "厂商产品编号"
                    },
                    nbrdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdate",
                        label: "收料日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "收料日期T"
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
                    },
                    coin_nbr: {
                        type: "basLov",
                        lovtype: "getcoin",
                        name: "coin_nbr",
                        label: "币别"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.filter.sure = "Y"
                    if (scope.pur_uid) {
                        scope.filter.pur_uid = scope.pur_uid;
                    }

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "pur/recbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body.detail;
                        scope.config.headers.qty.summsg.sumval = res.data.body.header.qty;
                        scope.config.headers.t_qty.summsg.sumval = res.data.body.header.t_qty;
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
                        name: "收料明细",
                        url: 'pur/recbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshrecbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});