define(function() {
    angular.module('app').controller('bas.baswork',
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
                title: "工作內容維護",
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
                        displayName: "工作編號",
                        width: 120
                    },
                    "desc": {
                        displayName: "工作內容",
                        width: 120
                    },
                    "acc_id": {
                        displayName: "會計科目",
                        width: 120
                    },
                },
                filterItems: {
                    s_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "s_nbr",
                        label: "工作編號"
                    },
                    desc: {
                        type: "basDefault",
                        lovtype: "",
                        name: "desc",
                        label: "工作內容"
                    },
                    acc_id:{
                        type: "basDefault",
                        lovtype: "",
                        name: "acc_id",
                        label: "會計科目"  
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
                        url: `work/query?page=${scope.datapage.page || 0}&size=${scope.datapage.size || 30} ${scope.datapage.sort ? `&sort=${scope.datapage.sort}` : ''}`,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data;
                    });

                },
                reset: function() {
                    scope.filter = {

                    };

                },
                changepage: function(page, size,sort) {
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
                        name: "工作明細",
                        url: 'bas/baswork.detail'
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