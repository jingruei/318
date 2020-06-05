define(function() {
    angular.module('app').controller('mak.makbah',
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
                gridkey: "makbah",
                title: "生产通知单",
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
                    "nbr": {
                        displayName: "单据号码",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "status": {
                        displayName: "状态",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "10", name: "未生产" },
                            { value: "20", name: "制造中" },
                            { value: "30", name: "已完工" }
                        ],
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "生产日期",
                        width: 120
                    },
                    "actu_date": {
                        displayName: "实际完工日",
                        width: 120
                    },
                    "desc_no": {
                        displayName: "客户订单编号",
                        width: 120
                    },
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 120
                    },
                    "item_name": {
                        displayName: "产品名称",
                        width: 120
                    },
                    "item_desc": {
                        displayName: "产品规格",
                        width: 120
                    },
                    "qty": {
                        displayName: "数量",
                        width: 120
                    },
                    "sale_id": {
                        displayName: "制单人员",
                        width: 120
                    },
                    "ctl": {
                        displayName: "制令核准",
                        type: "basLov",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        width: 120
                    },
                    "ord_nbr": {
                        displayName: "订单编号",
                        width: 120
                    },
                    "plan_date": {
                        displayName: "预计完工日",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    }
                },
                filterItems: {
                    desc_no: {
                        type: "basDefault",
                        lovtype: "",
                        name: "desc_no",
                        label: "客户订单编号"
                    },
                    ord_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "ord_nbr",
                        label: "订单编号"
                    },
                    nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "nbr",
                        label: "单据号码"
                    },
                    ctl: {
                        type: "basDefault",
                        lovtype: "",
                        name: "ctl",
                        label: "制令核准"
                    },
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        label: "产品编号"
                    },
                    nbrdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdate",
                        label: "生产日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "生产日期T"
                    },
                    status: {
                        type: "basDefault",
                        lovtype: "select",
                        titleMap: [
                            { value: "10", name: "未生产" },
                            { value: "20", name: "制造中" },
                            { value: "30", name: "已完工" }
                        ],
                        name: "status",
                        label: "状态"
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
                        url: "mak/makbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                // rowclick: function(entity) {
                //     $rootScope.uid = entity.uid;
                //     scope.action.opendetail();
                // },
                opendetail: function() {
                    var node = {
                        name: "生产明细",
                        url: 'mak/makbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshmakbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});