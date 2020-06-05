define(function() {
    angular.module('app').controller('ord.shpbah',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
            if ($rootScope.shpbah) {
                scope.filter = $rootScope.shpbah;
                $rootScope.shpbah = "";
            }
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
                gridkey: "shpbah",
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
                    "is_sure": {
                        enableColumnMenu: false,
                        displayName: "审核",
                        width: 50,
                        pinnedLeft: true,
                        cellTemplate: "<div class='ui-grid-cell-contents'> " +
                            "<i class=' iocstyle statusblue  fa fa-lock'  ng-class=\"{'statusdarkgray':row.entity.is_sure!='Y'}\"></i>" +
                            "</div>"
                    },
                    "io_p": {
                        displayName: "类别",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "出货" },
                            { value: "2", name: "退货" }
                        ],
                        width: 50
                    },
                    "cus_nbr": {
                        displayName: "客户代号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },
                        width: 80
                    },
                    "cus_name": {
                        displayName: "客户名称",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "日期",
                        width: 100
                    },
                    "nbr": {
                        displayName: "单据号码",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        width: 100
                    },
                    "coin_nbr": {
                        displayName: "币别",
                        width: 60
                    },
                    "coin_desc": {
                        displayName: "币别说明",
                        width: 70
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
                        width: 100
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
                        width: 100
                    },

                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "pay_term": {
                        displayName: "交易方式",
                        type: "basLov",
                        lovtype: "getpay",
                        width: 80
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
                },
                filtermoreItems: {
                    acr_mon: {
                        type: "input",
                        lovtype: "",
                        name: "acr_mon",
                        label: "结帐月份"
                    },
                    coin_nbr: {
                        type: "basLov",
                        lovtype: "getcoin",
                        name: "coin_nbr",
                        label: "币别"
                    },
                    is_sure: {
                        type: "basCheckboxes",
                        name: "is_sure",
                        css: "cell2",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        label: "审核状态"
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
                        url: "ord/shpbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "出货明细",
                        url: 'ord/shpbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshshpbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});