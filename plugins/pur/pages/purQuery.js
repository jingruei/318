define(function() {
    angular.module('app').controller('pur.purquery',
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
                gridkey: "purquery",
                title: "采购查询",
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
                    }
                },
                headers: {
                    "plan_date": {
                        displayName: "预计交货日",
                        width: 100
                    },
                    "status": {
                        displayName: "状态",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "10", name: "未收料" },
                            { value: "20", name: "收料中" },
                            { value: "30", name: "已结案" },
                            { value: "40", name: "手动结案" }
                        ],
                        width: 60
                    },
                    "ven_nbr": {
                        displayName: "厂商代号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },
                        ondblclick: function(entity) {
                            $rootScope.ven_nbr = entity.ven_nbr;
                            qwsys.geteditdocuments("bas/purven.detail", "ngdialog-lg", function() {})
                        },
                        // type: "basIcos",
                        // iocs: [{
                        //     ioc: "fa-search",
                        //     color: "blue",
                        //     click: function(entity) {
                        //         $rootScope.ven_nbr = entity.ven_nbr;
                        //         qwsys.geteditdocuments("bas/purven.detail", "ngdialog-lg", function() {})
                        //     }
                        // }],
                        width: 60
                    },
                    "ven_alias": {
                        displayName: "厂商简称",
                        width: 80
                    },
                    "nbr": {
                        displayName: "单据号码",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.huid;
                            scope.action.opendetail();
                        },
                        // type: "basIcos",
                        // iocs: [{
                        //     ioc: "fa-search",
                        //     color: "blue",
                        //     click: function(entity) {
                        //         $rootScope.uid = entity.huid;
                        //         scope.action.opendetail();
                        //     }
                        // }],
                        width: 100
                    },
                    "cus_item": {
                        displayName: "厂商产品编号",
                        width: 100
                    },
                    "desc_no": {
                        displayName: "厂商订单号",
                        width: 80
                    },
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 70
                    },
                    "item_alias": {
                        displayName: "产品简称",
                        width: 100
                    },
                    "pro_desc": {
                        displayName: "制程名称",
                        width: 80
                    },
                    "un_desc": {
                        displayName: "单位",
                        width: 60
                    },
                    "qty": {
                        type: "number",
                        displayName: "数量",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 70
                    },
                    "t_un_desc": {
                        displayName: "计价单位",
                        width: 80
                    },
                    "t_qty": {
                        type: "number",
                        displayName: "计价数量",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 70
                    },

                    "c_price": {
                        type: "basNumber",
                        displayName: "币别单价",
                        width: 70
                    },
                    "c_amt": {
                        displayName: "金额",
                        type: "basNumber",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 80
                    },
                    "ioqty": {
                        type: "basNumber",
                        displayName: "进货量",
                        ondblclick: function(entity) {
                            scope.action.showrec(entity);
                        },
                        // type: "basIcos",
                        // iocs: [{
                        //     ioc: "fa-search",
                        //     color: "blue",
                        //     click: function(entity) {
                        //         scope.action.showrec(entity);
                        //     }
                        // }],
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 70
                    },
                    "coin_desc": {
                        displayName: "币别",
                        width: 60
                    },
                    "in_box": {
                        type: "basNumber",
                        displayName: "内盒",
                        width: 60
                    },
                    "qty_pbox": {
                        type: "basNumber",
                        displayName: "外箱",
                        type: "basNumber",
                        width: 60
                    },
                    "n_wight": {
                        type: "basNumber",
                        displayName: "净重",
                        width: 60
                    },
                    "g_wight": {
                        type: "basNumber",
                        displayName: "毛重",
                        width: 60
                    },
                    "remark": {
                        displayName: "备注",
                        width: 100
                    },
                    "cut": {
                        type: "basNumber",
                        displayName: "折数",
                        width: 60
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
                        label: "料品代号"
                    },
                    status: {
                        type: "basCheckboxes",
                        css: "cell2",
                        titleMap: [
                            { value: "10", name: "未收料" },
                            { value: "20", name: "收料中" },
                            { value: "30", name: "已结案" },
                            { value: "40", name: "手动结案" }
                        ],
                        name: "status",
                        label: "状态"
                    },

                    plan_date: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "plan_date",
                        label: "预计交货日F"
                    },
                    plan_dateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "plan_dateb",
                        label: "预计交货日T"
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
                    unit_price: {
                        type: "basNumber",
                        lovtype: "",
                        name: "unit_price",
                        label: "标准售价"
                    },
                    unit: {
                        type: "basLov",
                        lovtype: "getunit",
                        name: "unit",
                        label: "单位"
                    },
                    cut: {
                        type: "basNumber",
                        lovtype: "",
                        name: "cut",
                        label: "折数"
                    },
                    coin_desc: {
                        type: "basString",
                        lovtype: "",
                        name: "coin_desc",
                        label: "币别"
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
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.filter.sure = "Y"

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "pur/purbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body.detail;
                        scope.config.headers.qty.summsg.sumval = res.data.body.header.qty;
                        scope.config.headers.t_qty.summsg.sumval = res.data.body.header.t_qty;
                        scope.config.headers.c_amt.summsg.sumval = res.data.body.header.c_amt;
                        scope.config.headers.ioqty.summsg.sumval = res.data.body.header.ioqty;
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
                    qwsys.geteditdocuments("pur/purbah.detail", "ngdialog-lg", function() {})
                        // var node = {
                        //     name: "采购明细",
                        //     url: 'pur/purbah.detail'
                        // }
                        // $scope.$emit('opencusdetail', node);
                },
                export: function() {
                    var page = {
                        size: 60000,
                        page: 0,
                        sort: scope.datapage.sort
                    }
                    scope.loadmessage = "EXCEL生成中....";
                    scope.promise = qwsys.exportExcel("pur/purbat/export", scope.config.headers, scope.filter, page, "采购订单")

                },
                showrec: function(entity) {

                    $rootScope.pur_uid = entity.uid;
                    var node = {
                        name: "进货明细",
                        url: 'pur/recQuery'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshpurbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});