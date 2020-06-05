define(function() {
    angular.module('app').controller('bas.bastax',
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
                title: "税别维护",
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
                    "tax_type": {
                        displayName: "税别代号",
                        width: 120
                    },
                    "tax_desc": {
                        displayName: "税别说明",
                        width: 120
                    },
                    "tax_per": {
                        displayName: "税率",
                        width: 120
                    },
                    "tax_log": {
                        displayName: "类型",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: 1, name: "外加" },
                            { value: 2, name: "内含" },
                            { value: 3, name: "不计税" }
                        ],
                        width: 120
                    }
                },
                filterItems: {
                    tax_type: {
                        type: "basDefault",
                        lovtype: "",
                        name: "tax_type",
                        label: "税别代号"
                    },
                    tax_desc: {
                        type: "input",
                        lovtype: "",
                        name: "tax_desc",
                        label: "税别说明"
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
                        url: "bas/bastax/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "税别明细",
                        url: 'bas/bastax.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbastax', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});