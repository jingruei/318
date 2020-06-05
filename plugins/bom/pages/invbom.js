define(function() {
    angular.module('app').controller('bom.invbom',
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
                gridkey: "invbom",
                title: "BOM维护",
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
                    "assy_nbr": {
                        displayName: "母件代号",
                        ondblclick: function(entity) {
                            $rootScope.invbom = entity;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "assy_nbr_name": {
                        displayName: "产品名称",
                        width: 120
                    },
                    "assy_pro": {
                        displayName: "母件制程",
                        width: 120
                    },
                    "assy_pro_desc": {
                        displayName: "制程名称",
                        width: 120
                    },
                    "item_desc": {
                        displayName: "规格说明",
                        width: 120
                    }
                },
                filterItems: {
                    assy_pro: {
                        type: "basLov",
                        lovtype: "getpro",
                        name: "assy_pro",
                        label: "母件制程"
                    },
                    assy_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "assy_nbr",
                        label: "母件代号"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.invbom = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "bom/invbom/bomquery?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                // rowclick: function(entity) {
                //     $rootScope.invbom = entity;
                //     scope.action.opendetail();
                // },
                opendetail: function() {
                    var node = {
                        name: "BOM明细",
                        url: 'bom/invbom.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshinvbom', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});