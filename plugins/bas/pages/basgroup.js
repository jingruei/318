define(function() {
    angular.module('app').controller('bas.basgroup',
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
                title: "組別管理",
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
                    "group_nbr": {
                        displayName: "組別代號",
                        width: 120
                    },
                    "group_name": {
                        displayName: "組別名稱",
                        width: 120
                    }
                },
                filterItems: {
                    ware_desc: {
                        type: "basDefault",
                        lovtype: "",
                        name: "group_name",
                        label: "組別名稱"
                    },
                    ware_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "group_nbr",
                        label: "組別代號"
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
                        url: `group/query?page=${scope.datapage.page || 0}&size=${scope.datapage.size || 30} ${scope.datapage.sort ? `&sort=${scope.datapage.sort}` : ''}`,
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
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "組別明細",
                        url: 'bas/basgroup.detail'
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