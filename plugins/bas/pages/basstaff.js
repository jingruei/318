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
                size: 20
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                title: "員工系統管理",
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
                    "s_name": {
                        displayName: "員工名稱",
                        width: 120
                    },
                    "tel1": {
                        displayName: "電話",
                        width: 120
                    },
                    /*"s_id": {
                        type: "input",
                        lovtype: "",
                        name: "s_id",
                        label: "身分證號碼"
                    },
                    "n_name": {
                        type: "input",
                        lovtype: "",
                        name: "n_name",
                        label: "籍貫"
                    },
                    "birthday": {
                        type: "input",
                        lovtype: "",
                        name: "birthday",
                        label: "出生年月日"
                    },
                    "tel1": {
                        type: "input",
                        lovtype: "",
                        name: "tel1",
                        label: "電話"
                    },
                    "addr1": {
                        type: "input",
                        lovtype: "",
                        name: "addr1",
                        label: "戶籍地址"
                    },
                    "addr2": {
                        type: "input",
                        lovtype: "",
                        name: "addr2",
                        label: "通訊地址"
                    },
                    "cellphone": {
                        type: "input",
                        lovtype: "",
                        name: "cellphone",
                        label: "手機"
                    },
                    "tel2": {
                        type: "input",
                        lovtype: "",
                        name: "tel2",
                        label: "B.B.Call"
                    },
                    "eng_name": {
                        type: "input",
                        lovtype: "",
                        name: "eng_name",
                        label: "緊急聯絡人"
                    },
                    "indate1": {
                        type: "input",
                        lovtype: "",
                        name: "indate1",
                        label: "到職日"
                    },
                    "hour": {
                        type: "input",
                        lovtype: "",
                        name: "hour",
                        label: "時薪"
                    },
                    "redate": {
                        type: "input",
                        lovtype: "",
                        name: "redate",
                        label: "勞保生效日期"
                    },
                    "group_nbr": {
                        type: "input",
                        lovtype: "",
                        name: "group_nbr",
                        label: "組別"
                    }*/
                },
                filterItems: {
                    s_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "s_nbr",
                        label: "員工編號"
                    },
                    s_name: {
                        type: "input",
                        lovtype: "",
                        name: "s_name",
                        label: "員工名稱"
                    }, 
                    tel1: {
                        type: "input",
                        lovtype: "",
                        name: "tel1",
                        label: "電話"
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
                        url: `staff/query?page=${scope.datapage.page || 0}&size=${scope.datapage.size || 30} ${scope.datapage.sort ? `&sort=${scope.datapage.sort}` : ''}`,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data:{}
                    }).then(function(res) {
                        scope.model.content=res.data;
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