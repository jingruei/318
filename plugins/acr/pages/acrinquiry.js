define(function() {
    angular.module('app').controller('acr.acrinquery',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                acr_mon: qwsys.getAcrmon(new Date())
            };
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
                gridkey: "acrinquery",
                title: "應收帳查詢",
                // listoperation: {
                //     add: {
                //         name: "新增",
                //         icon: "fa-calendar-check-o",
                //         action: function(event, scope) {
                //             scope.action.add();
                //         }
                //     }
                // },
                headers: {
                    "cus_nbr": {
                        displayName: "客戶編號",
                        type: "basString",
                        width: 120
                    },
                    "cus_alias": {
                        displayName: "客戶簡稱",
                        type: "basString",
                        width: 120
                    },
                    "coin_nbr": {
                        displayName: "合約編號",
                        type: "basString",
                        width: 120
                    },
                    "attname3": {
                        displayName: "主辦會計",
                        type: "basString",
                        width: 120
                    },
                    "*acr_amt": {
                        displayName: "前期未收金額",
                        type: "basNumber",
                        width: 120
                    },
                    "*tax_amt": {
                        displayName: "本期公費金額",
                        type: "basNumber",
                        width: 120
                    },
                    "*rec_amt": {
                        displayName: "本期已收公費",
                        type: "basNumber",
                        width: 120
                    },
                    "*tot_amt": {
                        displayName: "未收代墊款",
                        type: "basNumber",
                        width: 120
                    },
                    "*tot_amt": {
                        displayName: "本期餘額",
                        type: "basNumber",
                        width: 120
                    }
                },
                filterItems: {
                    acr_mon: {
                        label: "結帳月份",
                        type: "basEsydatetime",
                        format: "YYYYMM",
                        name: "acr_mon"                       
                    },
                    group_nbr: {
                        type: "basLov",
                        lovtype: "select",
                        name: "group_nbr",
                        label: "組別(起)"
                    },
                    group_nbr2: {
                        type: "basLov",
                        lovtype: "select",
                        name: "group_nbr2",
                        label: "組別(迄)"
                    }
                }
            }

            scope.action = {
                // add: function() {
                //     $rootScope.uid = "";
                //     scope.action.opendetail();
                // },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "acr/acrinquiry/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model.content = res.data;
                        // scope.model = res.data.body;
                        // scope.model.content.forEach(function(element) {
                        //     element.tax_amt = element.tax_amt - element.rtax_amt
                        //     element.tot_amt = element.bal_amt + element.shp_amt + element.tax_amt - element.rshp_amt - element.rec_amt;
                        // }, this);
                    });

                },
                // reset: function() {
                //     scope.filter = {
                //         acr_mon: qwsys.getAcrmon(new Date())
                //     };

                // },
                // changepage: function(page, size, sort) {
                //     scope.datapage.page = page;
                //     scope.datapage.size = size;
                //     scope.datapage.sort = sort;
                //     scope.action.load();
                // },
                // rowclick: function(entity) {

                // },
            }
            $scope.$on('refreshacrinquiry', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});