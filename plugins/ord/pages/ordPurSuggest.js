define(function() {
    angular.module('app').controller('ord.ordPurSuggest',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                doc_ctl: "1",
                beforedays: 7
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
                        name: "转采购",
                        icon: "fa-share",
                        action: function(event, scope) {
                            scope.action.save();
                        }
                    },
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
                        label: "订单日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "订单日期T"
                    },
                    plan_date: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "plan_date",
                        label: "预计出货日F"
                    },
                    plan_dateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "plan_dateb",
                        label: "预计出货日T"
                    },
                    doc_ctl: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "依不足量" },
                            { value: "2", name: "依需求量" }
                        ],
                        name: "doc_ctl",
                        label: "转单方式"
                    },
                    beforedays: {
                        type: "basNumber",
                        lovtype: "",
                        name: "beforedays",
                        label: "前置天数"
                    },

                },
                form: {
                    title: "零件估算",
                    key: 'ordbats',
                    type: "basEditgrid",
                    gridkey: "ord.ordPurSuggest",
                    css: "cell100",
                    // action: {
                    //     add: {

                    //         click: function() {
                    //             var item = {
                    //                 isdel: false
                    //             }
                    //             scope.model.cltbats.push(item);
                    //         }
                    //     },
                    //     del: {

                    //         click: function(item) {
                    //             item.isdel = true;
                    //         }
                    //     }
                    // },
                    headers: {
                        "nbr": {
                            displayName: "订单编号",
                            readonly: true,
                            type: 'basDefault',
                            lovtype: '',
                            width: 80
                        },
                        "ven_nbr": {
                            displayName: "供应商编号",
                            type: 'basLov',
                            lovtype: 'getven',
                            relationfield: [
                                { findfield: "ven_alias", tofield: "ven_alias" }
                            ],
                            width: 80
                        },
                        "ven_alias": {
                            displayName: "供应简称",
                            readonly: true,
                            type: 'basDefault',
                            lovtype: '',
                            width: 80
                        },
                        "item_nbr": {
                            displayName: "料品代号",
                            readonly: true,
                            type: 'basLov',
                            lovtype: 'getitm',
                            width: 80
                        },
                        "item_name": {
                            displayName: "产品名称",
                            readonly: true,
                            width: 110
                        },
                        "pro_nbr": {
                            displayName: "制程代号",
                            readonly: true,
                            width: 60
                        },
                        "pro_desc": {
                            displayName: "制程名称",
                            readonly: true,
                            width: 60
                        },
                        "un_desc": {
                            displayName: "单位",
                            readonly: true,
                            width: 60
                        },
                        "safe_qty": {
                            displayName: "最底订购量",
                            type: 'basNumber',
                            readonly: true,
                            lovtype: '',
                            width: 80
                        },
                        "qty": {
                            displayName: "采购数量",
                            type: 'basNumber',
                            lovtype: '',
                            width: 60
                        },
                        "c_price": {
                            displayName: "单价 ",
                            type: 'basNumber',
                            lovtype: '',
                            width: 60
                        },
                        "plan_date": {
                            displayName: "预计到货日",
                            type: 'basEsydatetime',
                            lovtype: '',
                            width: 110
                        },
                        "remark": {
                            displayName: "备注",
                            type: 'basDefault',
                            lovtype: '',
                            width: 110
                        }
                    }

                }
            }

            scope.action = {

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "ord/ordbah/ordPurSuggest?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {

                        scope.model = res.data.body;

                    });

                },
                reset: function() {
                    scope.filter = {
                        doc_ctl: "1",
                        beforedays: 7
                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.datapage.sort = sort;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.huid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "出货明细",
                        url: 'ord/shpbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                },
                save: function() {
                    var gridoption = scope.config.form;

                    if (gridoption.gridApi) {
                        var rows = gridoption.gridApi.selection.getSelectedRows() || []
                        if (rows.length == 0) {
                            toastr.info("请选择记录！");
                            return
                        }

                        scope.promise = utils.ajax({
                            method: 'POST',
                            url: "pur/purbah/ordtopur",
                            mockUrl: "plugins/base/data/orderlines.json",
                            data: rows
                        }).then(function(res) {
                            toastr.info("转档成功！");
                        });

                    }


                }
            }
            $scope.$on('refreshshpbah', function(event, message) {
                scope.action.load()
            });
            // scope.action.load();
        });

});