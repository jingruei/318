define(function() {
    angular.module('app').controller('mak.artbah',
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
                gridkey: "artbah",
                title: "制成品入库",
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
                    "sure": {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        displayName: "状态",
                        width: 50
                    },
                    "mak_nbr": {
                        displayName: "生产单号",
                        width: 100
                    },
                    "nbr": {
                        displayName: "入库单号",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "日期",
                        width: 120
                    },
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 80
                    },
                    "item_name": {
                        displayName: "产品名称",
                        width: 120
                    },
                    "item_desc": {
                        displayName: "产品规格",
                        width: 120
                    },
                    "pro_nbr": {
                        displayName: "制程代号",
                        width: 120
                    },
                    "pro_desc": {
                        displayName: "制程说明",
                        width: 120
                    },
                    "unit": {
                        displayName: "单位代号",
                        width: 50
                    },
                    "un_desc": {
                        displayName: "单位名称",
                        width: 80
                    },
                    "qty": {
                        displayName: "入库数量",
                        width: 80
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "ware_nbr": {
                        displayName: "仓库代号",
                        width: 60
                    },
                    "ware_desc": {
                        displayName: "仓库说明",
                        width: 80
                    }
                },
                filterItems: {
                    nbr: {
                        type: "input",
                        lovtype: "",
                        name: "nbr",
                        label: "单据号码"
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
                        label: "入库日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "入库日期T"
                    },
                    ware_nbr: {
                        type: "basLov",
                        lovtype: "getwar",
                        name: "ware_nbr",
                        label: "仓库代号"
                    },
                    sure: {
                        type: "basLov",
                        lovtype: "select",
                        name: "sure",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        label: "状态"
                    },
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
                        url: "mak/artbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                    if (sort) {
                        scope.datapage.sort = sort;
                    }
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.huid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "入库明细",
                        url: 'mak/artbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshartbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});