define(function() {
    angular.module('app').controller('chk.basbank',
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
                gridkey: "basbank",
                title: "银行管理",
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
                    "b_nbr": {
                        displayName: "银行代号",
                        width: 120
                    },
                    "b_name": {
                        displayName: "银行名称",
                        width: 120
                    },
                    "b_alias": {
                        displayName: "银行简称",
                        width: 120
                    },
                    "eng_name": {
                        displayName: "英文名称",
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "开帐日期",
                        width: 120
                    },
                    "b_code": {
                        displayName: "银行帐号",
                        width: 120
                    },
                    "b_amt": {
                        displayName: "开帐金额",
                        width: 120
                    },
                    "addr_e": {
                        displayName: "英文地址",
                        width: 120
                    },
                    "b_addr": {
                        displayName: "银行地址",
                        width: 120
                    },
                    "b_tel1": {
                        displayName: "银行电话1",
                        width: 120
                    },
                    "bal_amt": {
                        displayName: "余额",
                        width: 120
                    },
                    "acc_id": {
                        displayName: "会计科目",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "b_fax": {
                        displayName: "传真机号码",
                        width: 120
                    }
                },
                filterItems: {
                    b_nbr: {
                        type: "input",
                        lovtype: "",
                        name: "b_nbr",
                        label: "银行代号"
                    },
                    b_alias: {
                        type: "input",
                        lovtype: "",
                        name: "b_alias",
                        label: "银行简称"
                    },
                    nbrdate: {
                        type: "input",
                        lovtype: "",
                        name: "nbrdate",
                        label: "开帐日期"
                    },
                    b_code: {
                        type: "input",
                        lovtype: "",
                        name: "b_code",
                        label: "银行帐号"
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
                        url: "chk/basbank/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "银行信息",
                        url: 'chk/basbank.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbasbank', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});