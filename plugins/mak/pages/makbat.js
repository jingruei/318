define(function() {
    angular.module('app').controller('mak.makbat',
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
                gridkey: "makbat",
                title: "生产明细查询",
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
                        displayName: "单据号码",
                        width: 120
                    }
                     ,
                    "ord_nbr": {
                        displayName: "订单单据号码",
                        width: 120
                    }
                     ,
                    "desc_no": {
                        displayName: "客户订单号码",
                        width: 120
                    }
                     ,
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 120
                    }
                     ,
                    "qty": {
                        displayName: "数量",
                        width: 120
                    }
                     ,
                    "ioqty": {
                        displayName: "已出货数量",
                        width: 120
                    }
                     ,
                    "plan_date": {
                        displayName: "预计出货日",
                        width: 120
                    }
                     ,
                    "remark": {
                        displayName: "备注",
                        width: 120
                    }
                },
                filterItems: {
                    nbr: {
                        type: "input",
                        lovtype:"",
                        name: "nbr",
                        label: "单据号码"
                    }
                     ,
                    ord_nbr: {
                        type: "input",
                        lovtype:"",
                        name: "ord_nbr",
                        label: "订单单据号码"
                    }
                     ,
                    desc_no: {
                        type: "input",
                        lovtype:"",
                        name: "desc_no",
                        label: "客户订单号码"
                    }
                     ,
                    item_nbr: {
                        type: "input",
                        lovtype:"",
                        name: "item_nbr",
                        label: "产品编号"
                    }
                     ,
                    nbrdate: {
                        type: "input",
                        lovtype:"",
                        name: "nbrdate",
                        label: "日期"
                    }
                     ,
                    plan_date: {
                        type: "input",
                        lovtype:"",
                        name: "plan_date",
                        label: "预计出货日"
                    }
                     ,
                    remark: {
                        type: "input",
                        lovtype:"",
                        name: "remark",
                        label: "备注"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise=utils.ajax({
                        method: 'POST',
                        url: "mak/makbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort="+ scope.datapage.sort,
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
                changepage: function(page, size,sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    if (sort){
                       scope.datapage.sort = sort;
                    }
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "工序明细",
                        url: 'mak/makbat.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshmakbat', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});
