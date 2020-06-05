define(function() {
    angular.module('app').controller('bas.invitm',
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
                title: "料品维护",
                listoperation: {
                    add: {
                        name: "新增",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add();
                        }
                    }
                },
                headers: {
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 120
                    },
                    "item_name": {
                        displayName: "品名名称",
                        width: 120
                    },
                    "item_alias": {
                        displayName: "产品简称",
                        width: 120
                    },
                    "safety_qty": {
                        displayName: "安全存量",
                        width: 120
                    },
                    "l_shpdate": {
                        displayName: "最後交易日",
                        width: 120
                    },
                    "other_cost": {
                        displayName: "其他成本",
                        width: 120
                    },
                    "stock_desc": {
                        displayName: "储位",
                        width: 120
                    },
                    "item_desc": {
                        displayName: "产品描述",
                        width: 120
                    },
                    "pro_nbr": {
                        displayName: "原料制程",
                        width: 120
                    },
                    "ven_nbr": {
                        displayName: "采购厂商",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "l_crtdate": {
                        displayName: "最近建立日",
                        width: 120
                    },
                    "bar_code": {
                        displayName: "条码编号",
                        width: 120
                    },
                    "l_update": {
                        displayName: "最近异动日期",
                        width: 120
                    },
                    "ware_nbr": {
                        displayName: "储存仓库",
                        width: 120
                    },
                    "q_code": {
                        displayName: "查询码",
                        width: 120
                    },
                    "l_recdate": {
                        displayName: "最後交易日",
                        width: 120
                    },
                    "last_price": {
                        displayName: "最近进价",
                        width: 120
                    },
                    "item_nbr1": {
                        displayName: "原料代号",
                        width: 120
                    },
                    "oh_qty": {
                        displayName: "库存量",
                        width: 120
                    },
                    "i_type": {
                        displayName: "料品来源",
                        width: 120
                    },
                    "big_key": {
                        displayName: "译音码",
                        width: 120
                    }
                },
                filterItems: {
                    item_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "item_nbr",
                        label: "产品编号"
                    },
                    item_alias: {
                        type: "input",
                        lovtype: "",
                        name: "item_alias",
                        label: "产品简称"
                    },
                    item_name: {
                        type: "input",
                        lovtype: "",
                        name: "item_name",
                        label: "品名名称"
                    },
                    stock_desc: {
                        type: "basDefault",
                        lovtype: "",
                        name: "stock_desc",
                        label: "储位"
                    }
                },
                filtermoreItems: {
                    item_desc: {
                        type: "input",
                        lovtype: "",
                        name: "item_desc",
                        label: "产品描述"
                    },
                    ud_oh_ctl: {
                        name: "ud_oh_ctl",
                        titleMap: [
                            { value: "Y", name: "是" },
                            { value: "N", name: "否" }

                        ],
                        type: 'basLov',
                        lovtype: "select",
                        label: "异动库存"
                    },
                    item_type: {
                        type: "basLov",
                        lovtype: "getmtype",
                        name: "item_type",
                        label: "料品型态"
                    },
                    ware_nbr: {
                        type: "basLov",
                        lovtype: "getwar",
                        name: "ware_nbr",
                        label: "储存仓库"
                    },
                    last_ven: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "last_ven",
                        label: "采购厂商"
                    },
                    l_crtdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "l_crtdate",
                        label: "最近建立日"
                    },
                    l_shpdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "l_shpdate",
                        label: "最後交易日"
                    },
                    l_edtdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "l_edtdate",
                        label: "最近修改日"
                    },
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "采购厂商"
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
                        url: "bas/invitm/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort= " + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
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
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "料品明细",
                        url: 'bas/invitm.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshinvitm', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});