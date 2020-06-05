define(function() {
    angular.module('app').controller('bas.basun',
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
                title: "单位管理",
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
                    "unit": {
                        displayName: "单位代号",
                        width: 120
                    },
                    "un_desc": {
                        displayName: "单位说明",
                        width: 120
                    },
                    "un_edesc": {
                        displayName: "英文说明",
                        width: 120
                    }
                },
                filterItems: {
                    unit: {
                        type: "basDefault",
                        lovtype: "",
                        name: "unit",
                        label: "单位代号"
                    },
                    un_desc: {
                        type: "input",
                        lovtype: "",
                        name: "un_desc",
                        label: "单位说明"
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
                        url: "bas/basun/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "单位明细",
                        url: 'bas/basun.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbasun', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});