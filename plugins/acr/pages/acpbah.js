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
                title: "應收帳款管理",
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
                        displayName: "科目",
                        width: 120
                    },
                    "desc": {
                        displayName: "說明",
                        width: 120
                    },
                    "nbr": {
                        displayName: "收款單號",
                        width: 120
                    },
                    "cus_nbr": {
                        displayName: "客戶代號",
                        width: 120
                    },
                    "ar_amt": {
                        displayName: "應收金額",
                        width: 120
                    },
                    "chk_date": {
                        displayName: "票據到期日",
                        width: 120
                    },
                    "acr_mon": {
                        displayName: "結帳月份",
                        width: 120
                    },
                    
                },
                filterItems: { 
                    nbr: {
                        type: "basLov",
                        lovtype: "select",
                        name: "nbr",
                        label: "收款單號"
                    },
                    cus_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "cus_nbr",
                        label: "客戶代號"
                    },
                   
                    acr_mon: {
                        type: "basEsydatetime",
                        format: "YYYYMM",
                        name: "acr_mon",
                        label: "結帳月份"
                    },
                    date: {
                        type: "basEsydatetime",
                        name: "date",
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
                        name: "應收帳款明細",
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