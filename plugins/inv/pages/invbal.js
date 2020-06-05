define(function() {
    angular.module('app').controller('inv.invbal',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                war_type: "2",
                un_type: "1",
                qty_type: "1"
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
                gridkey: "invbal",
                title: "库存状态表",
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
                        hidestatus: {
                            relation: "and",
                            filedlist: [
                                { field: "war_type", status: "1" }, //表单新增状态
                            ]
                        },

                        width: 60
                    },
                    "ware_desc": {
                        displayName: "仓库名称",
                        hidestatus: {
                            relation: "and",
                            filedlist: [
                                { field: "war_type", status: "1" }, //表单新增状态
                            ]
                        },
                        width: 80
                    },
                    "item_nbr": {
                        displayName: "料品代号",
                        width: 80
                    },
                    "item_name": {
                        displayName: "料品名称 ",
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
                        width: 60
                    },
                    "un_desc": {
                        displayName: "单位说明",
                        width: 80
                    },
                    "oh_qty": {
                        type: "number",
                        displayName: "库存量",
                        ondblclick: function(entity) {
                            $rootScope.invtra = {
                                ware_nbr: entity.ware_nbr,
                                item_nbr: entity.item_nbr,
                                pro_nbr: entity.pro_nbr,
                                unit: entity.unit,
                                filterfields: "pro_nbr"
                            }
                            scope.action.opendetail();
                        },
                        width: 60
                    },
                    "last_date": {
                        displayName: "最近交易日期",
                        width: 120
                    },

                },
                filterItems: {
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        label: "料品代号"
                    },
                    ware_nbr: {
                        type: "basLov",
                        lovtype: "getwar",
                        readonlystatus: {
                            relation: "and",
                            filedlist: [
                                { field: "war_type", status: "1" }, //表单新增状态
                            ]
                        },
                        name: "ware_nbr",
                        label: "仓库代号"
                    },
                    war_type: {
                        type: "basRadiosinline",
                        css: "cell2",
                        titleMap: [
                            { value: "1", name: "不同仓库数量合并" },
                            { value: "2", name: "不同仓库数量分开" }
                        ],
                        onchange: function(item) {
                            if (scope.filter.war_type == "1") {
                                scope.filter.ware_nbr = "";
                            }

                        },
                        name: "war_type",
                        label: "合并方式"
                    },
                    qty_type: {
                        type: "basRadiosinline",
                        css: "cell2",
                        titleMap: [
                            { value: "1", name: "数量为零显示" },
                            { value: "2", name: "数量为零不显示" }
                        ],
                        name: "qty_type",
                        label: "零库存"
                    },
                    un_type: {
                        type: "basRadiosinline",
                        css: "cell2",
                        titleMap: [
                            { value: "1", name: "库存单位" },
                            { value: "2", name: "出货单位" },
                            { value: "3", name: "进货单位" },
                        ],
                        name: "un_type",
                        label: "单位类别"
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
                        url: "inv/invbal/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                    });

                },
                reset: function() {
                    scope.filter = {
                        war_type: "2",
                        un_type: "1",
                        qty_type: "1"
                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.datapage.sort = sort;
                    scope.action.load();
                },
                // rowclick: function(entity) {
                //     $rootScope.invtra = {
                //         ware_nbr: entity.ware_nbr,
                //         item_nbr: entity.item_nbr,
                //         pro_nbr: entity.pro_nbr,
                //         unit: entity.unit,
                //         filterfields: "pro_nbr"
                //     }
                //     scope.action.opendetail();
                // },
                opendetail: function() {
                    var node = {
                        name: "库存交易明细表",
                        url: 'inv/invtra'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshinvbal', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});