define(function() {
    angular.module('app').controller('bas.cuscus',
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
                size: 20
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                title: "客戶管理",
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
                        displayName: "客戶編號",
                        width: 120
                    },
                    "cus_name": {
                        displayName: "客戶名稱",
                        width: 120
                    },
                    "cus_alias": {
                        displayName: "客戶簡稱",
                        width: 120
                    },
                    "eng_name": {
                        displayName: "英文名稱",
                        width: 120
                    },
                    "oew_amt": {
                        displayName: "資本額",
                        width: 120
                    },
                    "sale_nbr": {
                        displayName: "業務員",
                        width: 120
                    },
                    "shp_desc": {
                        displayName: "業務性質",
                        width: 120
                    },
                    "tax_cal": {
                        displayName: "稅額計算方式",
                        width: 120
                    },
                    "remark": {
                        displayName: "備注",
                        width: 120
                    },
                    "tot_amt": {
                        displayName: "授信額度",
                        width: 120
                    },
                    "days3": {
                        displayName: "付款日",
                        width: 120
                    },
                    "ddate": {
                        displayName: "開始交易日",
                        width: 120
                    },
                    "remark7": {
                        displayName: "收款方式",
                        width: 120
                    }
                },
                filterItems: {
                    cus_alias: {
                        type: "input",
                        lovtype: "",
                        name: "cus_alias",
                        label: "客戶簡稱"
                    },
                    cus_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "cus_nbr",
                        label: "客戶編號"
                    },
                    cus_name: {
                        type: "input",
                        lovtype: "",
                        name: "cus_name",
                        label: "客戶名稱"
                    }
                },
                filtermoreItems: {
                    cus_gun: {
                        type: "input",
                        lovtype: "",
                        name: "cus_gun",
                        label: "統一編號"
                    },
                    sale_inv: {
                        type: "input",
                        lovtype: "",
                        name: "sale_inv",
                        label: "營業項目"
                    },
                    area_nbr: {
                        type: "input",
                        lovtype: "",
                        name: "area_nbr",
                        label: "地區名稱"
                    },
                    tax_cal: {
                        type: "basLov",
                        // lovtype: "gettax",
                        name: "tax_cal",
                        label: "稅額計算方式"
                    },
                    shp_desc: {
                        type: "input",
                        lovtype: "",
                        name: "shp_desc",
                        label: "業務性質"
                    },
                    sen_addr: {
                        type: "input",
                        lovtype: "",
                        name: "sen_addr",
                        label: "送貨地址"
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
                        url: `customer/query?page=${scope.datapage.page || 0}&size=${scope.datapage.size || 30} ${scope.datapage.sort ? `&sort=${scope.datapage.sort}` : ''}`,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data:{}
                    }).then(function(res) {
                        scope.model=res.data;
                    });

    

                },
                reset: function() {
                    scope.filter = {

                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    // scope.datapage.sort = sort;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "客戶明細",
                        url: 'bas/cuscus.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshcuscus', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});