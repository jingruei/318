define(function() {
    angular.module('app').controller('inv.invbah',
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
                gridkey: "invbah",
                title: "出入库资料",
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
                    "io_p": {
                        displayName: "出/入别",
                        type: "basLov",
                        lovtype: "select",
                        summsg: {
                            auto: false,
                            sumval: "合计:"
                        },
                        titleMap: [
                            { value: "+", name: "入" },
                            { value: "-", name: "出" }
                        ],
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "日期",
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
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 120
                    },
                    "item_name": {
                        displayName: "产品名称",
                    },
                    "pro_desc": {
                        displayName: "制程",
                        width: 120
                    },
                    "un_desc": {
                        displayName: "单位",
                        width: 120
                    },
                    "ware_nbr": {
                        displayName: "仓库代号",
                        width: 120
                    },
                    "ware_desc": {
                        displayName: "仓库名称",
                        width: 120
                    },
                    "qty": {
                        displayName: "数量",
                        summsg: {
                            auto: true,
                            sumval: 0
                        },
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    }

                },
                filterItems: {
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
                    io_p: {
                        type: "basLov",
                        lovtype: "select",
                        name: "io_p",
                        titleMap: [
                            { value: "+", name: "入" },
                            { value: "-", name: "出" }
                        ],
                        label: "出入别"
                    },
                    ware_nbr: {
                        type: "basLov",
                        lovtype: "getwar",
                        name: "ware_nbr",
                        label: "仓库代号"
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
                        url: "inv/invbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                //     $rootScope.uid = entity.huid;
                //     scope.action.opendetail();
                // },
                opendetail: function() {
                    var node = {
                        name: "出入库明细",
                        url: 'inv/invbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshinvbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});