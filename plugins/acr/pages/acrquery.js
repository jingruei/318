define(function() {
    angular.module('app').controller('acr.acrquery',
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
                gridkey: "acrquery",
                title: "应收帐查询",
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
                        width: 80
                    },
                    "cus_alias": {
                        displayName: "客户简称",
                        width: 120
                    },
                    "bal_amt": {
                        displayName: "前期余额",
                        type: "number",
                        width: 120
                    },
                    "shp_amt": {
                        displayName: "本期出货金额",
                        type: "number",
                        ondblclick: function(entity) {
                            $rootScope.shpbah = {
                                cus_nbr: entity.cus_nbr,
                                acr_mon: entity.acr_mon,
                                is_sure: "Y"
                            };
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "rshp_amt": {
                        displayName: "本期退货金额",
                        type: "number",
                        ondblclick: function(entity) {
                            $rootScope.shpbah = {
                                cus_nbr: entity.cus_nbr,
                                acr_mon: entity.acr_mon,
                                is_sure: "Y"
                            };
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "tax_amt": {
                        displayName: "本月出货税额",
                        ondblclick: function(entity) {
                            $rootScope.shpbah = {
                                cus_nbr: entity.cus_nbr,
                                acr_mon: entity.acr_mon,
                                is_sure: "Y"
                            };
                            scope.action.opendetail();
                        },
                        type: "number",
                        width: 120
                    },
                    "rec_amt": {
                        displayName: "本期收款金额",
                        type: "number",
                        width: 120
                    },
                    "tot_amt": {
                        displayName: "期未金额",
                        type: "number",
                        width: 120
                    }
                },
                filterItems: {
                    acr_mon: {
                        type: "basEsydatetime",
                        format: "YYYYMM",
                        name: "acr_mon",
                        label: "结帐月份"
                    },
                    cus_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "cus_nbr",
                        label: "客户代号"
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
                        url: "acr/acrbal/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                        scope.model.content.forEach(function(element) {
                            element.tax_amt = element.tax_amt - element.rtax_amt
                            element.tot_amt = element.bal_amt + element.shp_amt + element.tax_amt - element.rshp_amt - element.rec_amt;
                        }, this);
                    });

                },
                reset: function() {
                    scope.filter = {
                        acr_mon: qwsys.getAcrmon(new Date())
                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.datapage.sort = sort;
                    scope.action.load();
                },
                rowclick: function(entity) {

                },
                opendetail: function() {
                    var node = {
                        name: "出货查询",
                        url: 'ord/shpbah'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshacrbal', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});