define(function() {
    angular.module('app').controller('acr.acptemp',
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
                title: "代墊款登錄作業",
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
                    "nbr": {
                        displayName: "項目編號",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "acr_mon": {
                        displayName: "代墊內容",
                        width: 120
                    },
                    "tot_amt": {
                        displayName: "金額",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "請款月份",
                        width: 120
                    },
                    "status": {
                        displayName: "狀態",
                        width: 120
                    }
                },
                filterItems: {
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "客戶編號"
                    },
                    nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "nbr",
                        label: "合約編號"
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
                        name: "代墊明細",
                        url: 'acr/acptemp.detail'
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