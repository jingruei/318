define(function() {
    angular.module('app').controller('bas.basstaff',
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
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                title: "員工資料維護",
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
                    "s_nbr": {
                        displayName: "員工編號",
                        width: 120
                    },
                    "group_nbr": {
                        displayName: "組別",
                        width: 120
                    },
                    "s_name": {
                        displayName: "員工姓名",
                        width: 120
                    },
                    "s_id": {
                        displayName: "身分證號碼",
                        width: 120
                    },
                    "n_name": {
                        displayName: "籍貫",
                        width: 120
                    },
                    "birthday": {
                        displayName: "出生年月日",
                        width: 120
                    },
                    "tel1": {
                        displayName: "電話",
                        width: 120
                    },
                    "addr1": {
                        displayName: "戶籍地址",
                        width: 120
                    },
                    "addr2": {
                        displayName: "通訊地址",
                        width: 120
                    },
                    "tel2": {
                        displayName: "手機",
                        width: 120
                    },
                    "cname": {
                        displayName: "緊急聯絡人",
                        width: 120
                    },
                    "redate": {
                        displayName: "到職日期",
                        width: 120
                    },
                    "hour": {
                        displayName: "時薪",
                        width: 120
                    },
                    "indate1": {
                        displayName: "勞保生效日期",
                        width: 120
                    }
                },
                filterItems: {
                    s_id: {
                        type: "input",
                        lovtype: "",
                        name: "s_id",
                        label: "身分證號碼"
                    },
                    s_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "s_nbr",
                        label: "客戶編號"
                    },
                    s_name: {
                        type: "input",
                        lovtype: "",
                        name: "s_name",
                        label: "員工姓名"
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
                    addr2: {
                        type: "input",
                        lovtype: "",
                        name: "addr2",
                        label: "通訊地址"
                    },
                    addr1: {
                        type: "input",
                        lovtype: "",
                        name: "addr1",
                        label: "戶籍地址"
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
                        url: `staff/query?page=${scope.datapage.page || 0}&size=${scope.datapage.size || 30} ${scope.datapage.sort ? `&sort=${scope.datapage.sort}` : ''}`,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data:scope.filter
                    }).then(function(res) {
                        scope.model = res.data;
                    });
                },
                reset: function() {
                    scope.filter = {};

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.datapage.sort = sort;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "員工明細",
                        url: 'bas/basstaff.detail'
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