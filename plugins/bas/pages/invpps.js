define(function() {
    angular.module('app').controller('bas.invpps',
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
                gridkey: "invpps",
                title: "料品制程维护",
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
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 120
                    },
                    "item_name": {
                        displayName: "产品名称",
                        width: 120
                    },
                    "matl_cost": {
                        displayName: "原料成本",
                        width: 120
                    },
                    "labor_cost": {
                        displayName: "制造成本",
                        width: 120
                    },
                    "other_cost": {
                        displayName: "其他成本",
                        width: 120
                    },
                    "unit_cost": {
                        displayName: "总成本",
                        width: 120
                    },
                    "cyc_time": {
                        displayName: "加工总数",
                        width: 120
                    }
                },
                filterItems: {
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        label: "产品编号"
                    },
                    item_name: {
                        type: "basDefault",
                        lovtype: "",
                        name: "item_name",
                        label: "产品名称"
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
                        url: "bas/invpps/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "料品制程明细",
                        url: 'bas/invpps.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshinvpps', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});