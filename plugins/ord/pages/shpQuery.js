define(function() {
    angular.module('app').controller('ord.shpquery',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
            scope.model = {
                records: 0,
                content: []
            }
            scope.ord_uid = "";
            if ($rootScope.ord_uid) {
                scope.ord_uid = $rootScope.ord_uid;
                $rootScope.ord_uid = "";
            };
            scope.datapage = {
                page: 0,
                size: 20,
                sort: "created,desc"
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "shpquery",
                title: "出货查询",
                listoperation: {
                    // add: {
                    //     name: "新增",
                    //     icon: "fa-calendar-check-o",
                    //     action: function(event, scope) {
                    //         scope.action.add();
                    //     }
                    // }
                    export: {
                        name: "导出",
                        icon: "fa-share",
                        action: function(event, scope) {
                            scope.action.export();
                        }
                    },
                },
                headers: {
                    "nbrdate": {
                        displayName: "出货日期",
                        width: 120
                    },
                    "is_sure": {
                        displayName: "状态",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        width: 60
                    },
                    "cus_nbr": {
                        displayName: "客户代号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },
                        width: 120
                    },
                    "cus_alias": {
                        displayName: "客户简称",
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
                        displayName: "客户产品编号",
                        width: 120
                    },
                    "desc_no": {
                        displayName: "客户订单号",
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
                    "amt": {
                        displayName: "本币金额",
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
                    cus_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "cus_nbr",
                        label: "客户代号"
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
                        label: "客户产品编号"
                    },
                    nbrdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdate",
                        label: "出货日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "出货日期T"
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
                    if (scope.ord_uid) {
                        scope.filter.ord_uid = scope.ord_uid;
                    }
                    scope.filter.is_sure = "Y"
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "ord/shpbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body.detail;
                        scope.config.headers.qty.summsg.sumval = res.data.body.header.qty;
                        scope.config.headers.amt.summsg.sumval = res.data.body.header.amt;
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
                        name: "出货明细",
                        url: 'ord/shpbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                },
                export: function() {
                    var page = {
                        size: 60000,
                        page: 0,
                        sort: scope.datapage.sort
                    }
                    scope.loadmessage = "EXCEL生成中....";
                    scope.promise = qwsys.exportExcel("ord/shpbat/export", scope.config.headers, scope.filter, page, "出货明细")

                }
            }
            $scope.$on('refreshshpbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});