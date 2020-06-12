define(function() {
    angular.module('app').controller('ord.contract',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
                 $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
            if ($rootScope.contract) {
                scope.filter = $rootScope.contract;
                $rootScope.contract = "";
            }
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
                gridkey: "contract",
                title: "合約管理",
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
                    "is_sure": {
                        enableColumnMenu: false,
                        displayName: "審核",
                        width: 50,
                        pinnedLeft: true,
                        cellTemplate: "<div class='ui-grid-cell-contents'> " +
                            "<i class=' iocstyle statusblue  fa fa-lock'  ng-class=\"{'statusdarkgray':row.entity.is_sure!='Y'}\"></i>" +
                            "</div>"
                    },
                    "nbr": {
                        displayName: "案號",
                        // summsg: {
                        //     auto: false,
                        //     sumval: "合計"
                        // },
                        width: 80
                    },
                    "date": {
                        displayName: "合約日期",
                        width: 100
                    },
                    "con_nbr": {
                        displayName: "合約編號",
                        width: 120
                    },
                    "cus_nbr": {
                        displayName: "客戶代號",
                        width: 120
                    },
                    "cus_name": {
                        displayName: "客戶名稱",
                        width: 120
                    },
                    "s_nbr": {
                        displayName: "工作代號",
                        width: 120
                    },
                    "work_desc": {
                        displayName: "工作細項",
                        width: 120
                    },
                    "plan_date":{
                        displayName: "預計完成日",
                        width: 120
                    },
                    "proj_status":{
                        displayName: "核准情形",
                        width: 120
                    },
                    "close_status":{
                        displayName: "結案情形",
                        width: 120
                    }
                },
                filterItems: {
                    group_nbrf: {
                        type: "basLov",
                        lovtype: "getgroup",
                        name: "group_nbrf",
                        label: "組別F"
                    },
                    group_nbrt: {
                        type: "basLov",
                        lovtype: "getgroup",
                        name: "group_nbrt",
                        label: "組別T"
                    },

                    pay_term: {
                        type: 'basLov',
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "未收款" },
                            { value: "2", name: "已收款" }
                        ],
                        name: "status",
                        label: "合約狀態"
                    },
                    inv_datef: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "inv_datef",
                        label: "委任日期F"
                    },
                    inv_datet: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "inv_datet",
                        label: "委任日期T"
                    },
                    close_datef: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "close_datef",
                        label: "結案日期F"
                    },
                    close_datet: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "close_datet",
                        label: "結案日期T"
                    }
                },
                filtermoreItems: {
                    // acr_mon: {
                    //     type: "input",
                    //     lovtype: "",
                    //     name: "acr_mon",
                    //     label: "結帳月份"
                    // },
                    // is_sure: {
                    //     type: "basCheckboxes",
                    //     name: "is_sure",
                    //     css: "cell2",
                    //     titleMap: [
                    //         { value: "Y", name: "已審核" },
                    //         { value: "N", name: "未審核" }
                    //     ],
                    //     label: "審核狀態"
                    // },
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
                        url: `contract/query?page=${scope.datapage.page || 0}&size=${scope.datapage.size || 30} ${scope.datapage.sort ? `&sort=${scope.datapage.sort}` : ''}`,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: {}
                    }).then(function(res) {
                        scope.model.content = res.data;
                        // scope.config.headers.ctot_amt.summsg.sumval = 0;
                        // scope.config.headers.tot_amt.summsg.sumval = 0;
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
                        name: "合約明細",
                        url: 'ord/contract.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }

            $scope.$on('refreshcontract', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});