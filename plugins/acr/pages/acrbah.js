define(function() {
    angular.module('app').controller('acr.acrbah',
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
                gridkey: "acrbah",
                title: "应收管理",
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
                    "status": {
                        displayName: "状态",
                        width: 120
                    },
                    "acr_mon": {
                        displayName: "结帐月份",
                        width: 120
                    },
                    "cus_nbr": {
                        displayName: "客户代号",
                        width: 120
                    },
                    "nbr": {
                        displayName: "收款单代号",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "收款日期",
                        width: 120
                    },
                    "tot_amt": {
                        displayName: "收款金额",
                        width: 120
                    }
                },
                filterItems: {
                    cus_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "cus_nbr",
                        label: "客户代号"
                    },
                    nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "nbr",
                        label: "收款单代号"
                    },
                    acr_mon: {
                        type: "input",
                        lovtype: "",
                        name: "acr_mon",
                        label: "结帐月份"
                    },
                    nbrdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdate",
                        label: "收款日期"
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
                        url: "acr/acrbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "应收明细",
                        url: 'acr/acrbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshacrbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});