define(function() {
    angular.module('app').controller('bas.purven',
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
                title: "厂商维护",
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
                    "ven_nbr": {
                        displayName: "厂商编号",
                        width: 120
                    },
                    "ven_name": {
                        displayName: "厂商名称",
                        width: 120
                    },
                    "ven_alias": {
                        displayName: "厂商简称",
                        width: 120
                    },
                    "tax_type": {
                        displayName: "税别",
                        width: 120
                    },
                    "cellphone": {
                        displayName: "手机",
                        width: 120
                    },
                    "ven_tel": {
                        displayName: "厂商电话",
                        width: 120
                    },
                    "attname": {
                        displayName: "连络人",
                        width: 120
                    },
                    "ven_fax": {
                        displayName: "传真机号码",
                        width: 120
                    },
                    "shp_desc": {
                        displayName: "业务性质",
                        width: 120
                    },
                    "ven_addr": {
                        displayName: "公司地址",
                        width: 120
                    },
                    "ware_nbr": {
                        displayName: "委外仓库",
                        width: 120
                    },
                    "remark": {
                        displayName: "备注",
                        width: 120
                    },
                    "l_shpdate": {
                        displayName: "最近交易日期",
                        width: 120
                    }
                },
                filterItems: {
                    pro_nbr: {
                        type: "basLov",
                        lovtype: "getpro",
                        name: "pro_nbr",
                        label: "主要制程"
                    },
                    ven_alias: {
                        type: "input",
                        lovtype: "",
                        name: "ven_alias",
                        label: "厂商简称"
                    },
                    ven_name: {
                        type: "input",
                        lovtype: "",
                        name: "ven_name",
                        label: "厂商名称"
                    },
                    big_key: {
                        type: "basDefault",
                        lovtype: "",
                        name: "big_key",
                        label: "译音码"
                    }
                },
                filtermoreItems: {
                    ven_tel: {
                        type: "basDefault",
                        lovtype: "",
                        name: "ven_tel",
                        label: "厂商电话"
                    },
                    remark: {
                        type: "basDefault",
                        lovtype: "",
                        name: "remark",
                        label: "备注"
                    },
                    shp_desc: {
                        type: "input",
                        lovtype: "",
                        name: "shp_desc",
                        label: "业务性质"
                    },
                    attname: {
                        type: "basDefault",
                        lovtype: "",
                        name: "attname1",
                        label: "连络人"
                    },
                    l_shpdate: {
                        type: "basDefault",
                        lovtype: "",
                        name: "l_shpdate",
                        label: "最近交易日期"
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
                        url: "bas/purven/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "厂商明细",
                        url: 'bas/purven.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshpurven', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});