define(function() {
    angular.module('app').controller('ord.quobah',
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
                gridkey: "quobah",
                title: "报价维护",
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
                    "cus_nbr": {
                        displayName: "客户代号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },
                        width: 120
                    },
                    "cus_name": {
                        displayName: "客户名称",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "日期",
                        width: 120
                    },
                    "nbr": {
                        displayName: "单据号码",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "coin_nbr": {
                        displayName: "币别",
                        width: 120
                    },
                    "coin_desc": {
                        displayName: "币别说明",
                        width: 120
                    },
                    "ctot_amt": {
                        displayName: "总金额",
                        num: "2",
                        tot: 0,
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        type: "basNumber",
                        width: 120
                    },
                    "cost_amt": {
                        displayName: "总成本",
                        num: "2",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        type: "basNumber",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "over_date": {
                        displayName: "有效日期",
                        width: 120
                    },
                    "last_user": {
                        displayName: "最后异动者代号",
                        width: 120
                    },
                    "pay_term": {
                        displayName: "交易方式",
                        type: "basLov",
                        lovtype: "getpay",
                        width: 120
                    },
                    "status": {
                        displayName: "状态",
                        width: 120
                    },

                    "remark1": {
                        displayName: "备注",
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
                        label: "客户代号"
                    },
                    pay_term: {
                        type: "basLov",
                        lovtype: "getpay",
                        name: "pay_term",
                        label: "交易方式"
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
                        url: "ord/quobah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {

                        scope.model = res.data.body.detail;
                        scope.config.headers.ctot_amt.summsg.sumval = res.data.body.header.ctot_amt;
                        scope.config.headers.cost_amt.summsg.sumval = res.data.body.header.cost_amt;
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
                        name: "报价明细",
                        url: 'ord/quobah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshquobah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});