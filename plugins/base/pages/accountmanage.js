define(function() {
    angular.module('app').controller('base.accountmanage',
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
                title: "帳號管理",
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
                        displayName: "狀態",
                        type:'basString',
                        width: 120
                    },
                    "username": {
                        displayName: "使用者帳號",
                        type:'basString',
                        width: 120
                    },
                    "real_name": {
                        displayName: "真實姓名",
                        type:'basString',
                        required: true,
                        width: 120
                    },
                    "celphone": {
                        displayName: "手機號碼",
                        type:'basString',
                        width: 120
                    },
                    "staff_nbr": {
                        displayName: "員工代號",
                        type:'basString',
                        width: 120
                    },
                    "group_nbr": {
                        displayName: "組別代號",
                        type:'basString',
                        width: 120
                    },
                    "update_date_time":{
                        displayName: "最後更新時間",
                        readonly: true,
                        placeholder: "自動產生",
                        type: 'basString',
                        width: 120
                    }
                },
                filterItems: {
                    username: {
                        label: "使用者帳號",
                        type:'basString',
                        name: "username"
                    },
                    real_name: {
                        label: "真實姓名",
                        type:'basString',
                        name: "real_name"
                    },
                    staff_nbr: {
                        label: "員工代號",
                        type: "basString",
                        name: "staff_nbr"
                    },
                    group_nbr: {
                        label: "組別代號",
                        type: "basString",
                        name: "group_nbr"
                    }
                },
                
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: `accountmanage/query?page=${scope.datapage.page || 0}&size=${scope.datapage.size || 30} ${scope.datapage.sort ? `&sort=${scope.datapage.sort}` : ''}`,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data:scope.filter
                    }).then(function(res) {
                        scope.model.content = res.data;
                    });


                    // var req = {
                    //     method: 'GET',
                    //     url: 'https://localhost:5001/api/ping',
                    //     headers: {
                    //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJpZXdpaGNAanduZXQuY29tLnR3IiwianRpIjoiOTY3MmIzODctNGU5MS00YzgxLWEyNWEtYmEzNmZmMTIzNTdiIiwic3ViIjoiYWRtaW4iLCJleHAiOjE1OTE5MTQ2MTMsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.XrnBH08sTw0-NKSMXH4y7wxP6UDrPwosV0gpZZRFVZY'
                    //     },
                    //    }
                       
                    //    $http(req).then(function(res){console.log(res)}, function(err){});

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
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "使用者資料",
                        url: 'base/accountmanage.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbaswar', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});