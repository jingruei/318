define(function() {
    angular.module('app').controller('bas.bascoin',
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
                title: "币别维护",
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
                    "coin_nbr": {
                        displayName: "币别代号",
                        width: 120
                    },
                    "coin_desc": {
                        displayName: "币别说明",
                        width: 120
                    },
                    "ecoin_desc": {
                        displayName: "币别英文说明",
                        width: 120
                    },
                    "coin_date": {
                        displayName: "最近交易日",
                        width: 120
                    },
                    "coin_per": {
                        displayName: "汇率",
                        width: 120
                    }
                },
                filterItems: {
                    coin_desc: {
                        type: "basDefault",
                        lovtype: "",
                        name: "coin_desc",
                        label: "币别说明"
                    },
                    coin_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "coin_nbr",
                        label: "币别代号"
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
                        url: "bas/bascoin/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "币别明细",
                        url: 'bas/bascoin.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbascoin', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});