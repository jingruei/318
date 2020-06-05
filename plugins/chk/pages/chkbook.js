define(function() {
    angular.module('app').controller('chk.chkbook',
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
                gridkey: "chkbook",
                title: "票据维护",
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
                    "acr_nbr": {
                        displayName: "帐款号码",
                        width: 120
                    },
                    "bank_date": {
                        displayName: "代收日期",
                        width: 120
                    },
                    "rcus_nbr": {
                        displayName: "转付客户",
                        width: 120
                    },
                    "pay_bank": {
                        displayName: "付款行库",
                        width: 120
                    },
                    "nbr": {
                        displayName: "登录编号",
                        width: 120
                    },
                    "io_nbr": {
                        displayName: "往来客户/厂商档",
                        width: 120
                    },
                    "dis_amt": {
                        displayName: "利息金额",
                        width: 120
                    },
                    "pay_code": {
                        displayName: "发票人帐号",
                        width: 120
                    },
                    "rio_nbr": {
                        displayName: "转付客户/厂商",
                        width: 120
                    },
                    "rven_nbr": {
                        displayName: "转付厂商",
                        width: 120
                    },
                    "cash_nbr": {
                        displayName: "转入现金登录编号",
                        width: 120
                    },
                    "chk_no": {
                        displayName: "支票号码",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "异动日期",
                        width: 120
                    },
                    "w_date": {
                        displayName: "收开日期",
                        width: 120
                    },
                    "amt": {
                        displayName: "支票金额",
                        width: 120
                    },
                    "upstatus": {
                        displayName: "兑现1.一般2.转付3.退票",
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
                    w_date: {
                        type: "input",
                        lovtype: "",
                        name: "w_date",
                        label: "收开日期"
                    },
                    chk_no: {
                        type: "input",
                        lovtype: "",
                        name: "chk_no",
                        label: "支票号码"
                    },
                    nbrdate: {
                        type: "input",
                        lovtype: "",
                        name: "nbrdate",
                        label: "异动日期"
                    },
                    pay_bank: {
                        type: "input",
                        lovtype: "",
                        name: "pay_bank",
                        label: "付款行库"
                    },
                    rven_nbr: {
                        type: "input",
                        lovtype: "",
                        name: "rven_nbr",
                        label: "转付厂商"
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
                        url: "chk/chkbook/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "票据明细",
                        url: 'chk/chkbook.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshchkbook', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});