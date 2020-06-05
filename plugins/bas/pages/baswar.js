define(function() {
    angular.module('app').controller('bas.baswar',
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
                title: "仓库管理",
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
                    "ware_nbr": {
                        displayName: "仓库代号",
                        width: 120
                    },
                    "ware_desc": {
                        displayName: "仓库说明",
                        width: 120
                    }
                },
                filterItems: {
                    ware_desc: {
                        type: "basDefault",
                        lovtype: "",
                        name: "ware_desc",
                        label: "仓库说明"
                    },
                    ware_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "ware_nbr",
                        label: "仓库代号"
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
                        url: "bas/baswar/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "仓库明细",
                        url: 'bas/baswar.detail'
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