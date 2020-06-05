define(function() {
    angular.module('app').controller('pur.recbah',
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
                gridkey: "recbah",
                title: "订单维护",
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
                    "f1": {
                        enableColumnMenu: false,
                        displayName: "审核",
                        width: 88,
                        pinnedLeft: true,
                        cellTemplate: "<div class='ui-grid-cell-contents'> " +
                            "<i class=' iocstyle statusblue  fa fa-lock'  ng-class=\"{'statusdarkgray':row.entity.sure!='Y'}\"></i>" +
                            "</div>"
                    },
                    "io_p": {
                        displayName: "类别",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "收料" },
                            { value: "2", name: "退料" }
                        ],
                        width: 60
                    },
                    "ven_nbr": {
                        displayName: "厂商代号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },
                        width: 120
                    },
                    "ven_name": {
                        displayName: "厂商名称",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "采购日期",
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
                        displayName: "币别总额",
                        num: "2",
                        tot: 0,
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        type: "basNumber",
                        width: 120
                    },
                    "coin_per": {
                        displayName: "汇率",
                        type: "basNumber",
                        width: 120
                    },
                    "tot_amt": {
                        displayName: "总金额",
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
                    "pay_term": {
                        displayName: "交易方式",
                        type: "basLov",
                        lovtype: "getpay",
                        width: 120
                    },
                    "remark": {
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
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "厂商代号"
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
                        label: "收料日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "收料日期T"
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
                        url: "pur/recbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body.detail;
                        scope.config.headers.ctot_amt.summsg.sumval = res.data.body.header.ctot_amt;
                        scope.config.headers.tot_amt.summsg.sumval = res.data.body.header.tot_amt;
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
                        name: "进货明细",
                        url: 'pur/recbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshrecbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});