define(function() {
    angular.module('app').controller('acr.acpbah',
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
                gridkey: "acpbah",
                title: "应付管理",
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
                    "ven_nbr": {
                        displayName: "厂商代号",
                        width: 120
                    },
                    "nbr": {
                        displayName: "付款单代号",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "付款日期",
                        width: 120
                    },
                    "tot_amt": {
                        displayName: "付款金额",
                        width: 120
                    }
                },
                filterItems: {
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "厂商代号"
                    },
                    nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "nbr",
                        label: "付款单代号"
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
                        label: "付款日期"
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
                        url: "acr/acpbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "应付明细",
                        url: 'acr/acpbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshacpbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});