define(function() {
    angular.module('app').controller('mak.cltbah',
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
                gridkey: "cltbah",
                title: "生产领料单",
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
                    "nbr": {
                        displayName: "领料单号",
                        ondblclick: function(entity) {
                            $rootScope.uid = entity.uid;
                            scope.action.opendetail();
                        },
                        width: 120
                    },
                    "sure": {
                        displayName: "核准",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "日期",
                        width: 120
                    },
                    "io_p": {
                        displayName: "领/退料单",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "领料单" },
                            { value: "2", name: "退料单" }
                        ],
                        width: 120
                    },
                    "mak_nbr": {
                        displayName: "制令单号",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    }
                },
                filterItems: {
                    nbr: {
                        type: "input",
                        lovtype: "",
                        name: "nbr",
                        label: "领料单号"
                    },
                    mak_nbr: {
                        type: "input",
                        lovtype: "",
                        name: "mak_nbr",
                        label: "制令单号"
                    },
                    io_p: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "领料单" },
                            { value: "2", name: "退料单" }
                        ],
                        name: "io_p",
                        label: "领/退料单"
                    },

                    nbrdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdate",
                        label: "领料日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "领料日期T"
                    },
                    sure: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        name: "sure",
                        label: "核准"
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
                        url: "mak/cltbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                    if (sort) {
                        scope.datapage.sort = sort;
                    }
                    scope.action.load();
                },
                // rowclick: function(entity) {
                //     $rootScope.uid = entity.uid;
                //     scope.action.opendetail();
                // },
                opendetail: function() {
                    var node = {
                        name: "领料明细",
                        url: 'mak/cltbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshcltbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});