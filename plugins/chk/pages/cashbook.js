define(function() {
    angular.module('app').controller('chk.cashbook',
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
                gridkey: "cashbook",
                title: "现金管理",
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
                        displayName: "收/支",
                        titleMap: [
                            { value: "1", name: "收入" },
                            { value: "2", name: "支出" }
                        ],
                        type: 'basLov',
                        lovtype: "select",
                        width: 120
                    },
                    "nbr": {
                        displayName: "单据号码",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "收支日期",
                        width: 120
                    },
                    "amt": {
                        displayName: "金额",
                        width: 120
                    },
                    "acc_id": {
                        displayName: "科目代号",
                        width: 120
                    },
                    "b_name": {
                        displayName: "银行名称",
                        width: 120
                    },
                    "ven_alias": {
                        displayName: "往来厂商",
                        width: 120
                    },
                    "cus_alias": {
                        displayName: "往来客户",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "acr_nbr": {
                        displayName: "帐款单号",
                        width: 120
                    },
                    "chk_nbr": {
                        displayName: "支票单号",
                        width: 120
                    }
                },
                filterItems: {
                    nbr: {
                        type: "input",
                        lovtype: "",
                        name: "nbr",
                        label: "单据号码"
                    },
                    cus_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "cus_nbr",
                        label: "往来客户"
                    },
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "往来厂商"
                    },

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
                    b_nbr: {
                        type: "basLov",
                        lovtype: "getbank",
                        name: "b_nbr",
                        label: "银行代号"
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
                        url: "chk/cashbook/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "现金明细",
                        url: 'chk/cashbook.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshcashbook', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});