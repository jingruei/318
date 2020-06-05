define(function() {
    angular.module('app').controller('chk.othebook',
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
                gridkey: "othebook",
                title: "银行其他作业",
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
                    "b_nbr": {
                        displayName: "银行代号",
                        width: 120
                    },
                    "io_p": {
                        displayName: "收/支",
                        width: 120
                    },
                    "nbr": {
                        displayName: "登录编号",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "收支日期",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "ven_nbr": {
                        displayName: "往来厂商",
                        width: 120
                    },
                    "cus_nbr": {
                        displayName: "往来客户",
                        width: 120
                    },
                    "acr_nbr": {
                        displayName: "帐款号码",
                        width: 120
                    },
                    "amt": {
                        displayName: "金额",
                        width: 120
                    },
                    "status": {
                        displayName: "状态",
                        width: 120
                    }
                },
                filterItems: {
                    nbr: {
                        type: "input",
                        lovtype: "",
                        name: "nbr",
                        label: "登录编号"
                    },
                    b_nbr: {
                        type: "input",
                        lovtype: "",
                        name: "b_nbr",
                        label: "银行代号"
                    },
                    nbrdate: {
                        type: "input",
                        lovtype: "",
                        name: "nbrdate",
                        label: "收支日期"
                    },
                    io_p: {
                        type: "input",
                        lovtype: "",
                        name: "io_p",
                        label: "收/支"
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
                        url: "chk/othebook/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "银行其他作业明细",
                        url: 'chk/othebook.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshothebook', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});