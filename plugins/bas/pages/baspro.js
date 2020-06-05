define(function() {
    angular.module('app').controller('bas.baspro',
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
                size: 30,
                sort: "created,desc"
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                title: "制程资料维护",
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
                    "pro_nbr": {
                        displayName: "工序代号",
                        width: 120
                    },
                    "pro_desc": {
                        displayName: "工序说明",
                        width: 120
                    },
                    "pro_days": {
                        displayName: "制程天数",
                        width: 120
                    }
                },
                filterItems: {
                    pro_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "pro_nbr",
                        label: "工序代号"
                    },
                    pro_desc: {
                        type: "input",
                        lovtype: "",
                        name: "pro_desc",
                        label: "工序说明"
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
                        url: "bas/baspro/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "制程资料明细",
                        url: 'bas/baspro.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbaspro', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});