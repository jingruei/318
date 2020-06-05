define(function() {
    angular.module('app').controller('pur.shpoverdue',
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
                gridkey: "shpoverdue",
                title: "厂商评比表",
                // listoperation: {
                //     add: {
                //         name: "新增",
                //         icon: "fa-calendar-check-o",
                //         action: function(event, scope) {
                //             scope.action.add();
                //         }
                //     }
                // },
                headers: {
                    "ven_nbr": {
                        displayName: "厂商代号",
                        width: 80
                    },
                    "ven_alias": {
                        displayName: "厂商简称",
                        width: 100
                    },
                    "amt": {
                        type: "basNumber",
                        displayName: "逾期金额",
                        width: 80
                    },
                    "purcot": {
                        type: "basNumber",
                        displayName: "采购批数",
                        width: 80
                    },
                    "delay": {
                        type: "basNumber",
                        displayName: "逾期批数",
                        width: 80
                    },
                    "delay5": {
                        type: "basNumber",
                        displayName: "逾期5天",
                        width: 80
                    },
                    "delay10": {
                        type: "basNumber",
                        displayName: "逾期10天",
                        width: 80
                    },
                    "delay15": {
                        type: "basNumber",
                        displayName: "逾期15天",
                        width: 120
                    },
                    "delayoth": {
                        type: "basNumber",
                        displayName: "超过15天",
                        width: 120
                    },
                    "delayrat": {
                        displayName: "逾期率",
                        width: 120
                    }

                },
                filterItems: {
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "厂商代号"
                    },

                    nbrdate: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdate",
                        label: "收料日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "收料日期T"
                    },
                    plan_date: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "plan_date",
                        label: "预计交货日F"
                    },
                    plan_dateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "plan_dateb",
                        label: "预计交货日T"
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
                        url: "pur/purbah/shpoverdue",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model.content = res.data.body;
                        scope.model.content.forEach(element => {
                            element.delayrat = (element.delay * 100 / element.purcot) + "%";
                        });
                        scope.dd = scope.model;

                    });

                },
                reset: function() {
                    scope.filter = {

                    };

                }


            }


        });

});