define(function() {
    angular.module('app').controller('mak.combat',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                nbrdate: qwsys.gettoday("YYYY-MM-DD 00:00:00"),
                nbrdateb: qwsys.gettoday("YYYY-MM-DD 23:59:59")
            };
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
                gridkey: "combat",
                title: "生产完工明细表",
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
                    "sure": {
                        displayName: "状态",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        width: 50
                    },
                    "nbr": {
                        displayName: "完工单号",
                        summsg: {
                            auto: false,
                            sumval: "合计"
                        },
                        width: 120
                    },
                    "nbrdate": {
                        displayName: "完工日期",
                        width: 120
                    },
                    "mak_nbr": {
                        displayName: "生产单号",
                        width: 120
                    },
                    "desc_no": {
                        displayName: "客户订单号码",
                        width: 120
                    },
                    "item_nbr": {
                        displayName: "产品编号",
                        width: 80
                    },
                    "item_name": {
                        displayName: "产品名称",
                        width: 120
                    },
                    "item_desc": {
                        displayName: "产品规格",
                        width: 120
                    },
                    "pro_desc": {
                        displayName: "工序说明",
                        width: 100,
                    },
                    "mak_qty": {
                        displayName: "生产数量",
                        type: "basNumber",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 60
                    },
                    "pro_qty": {
                        displayName: "制程数量",
                        type: "basNumber",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 60
                    },
                    "qty": {
                        displayName: "完工数量",
                        type: "basNumber",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 60
                    },
                    "ipro_qty": {
                        displayName: "累计完工量",
                        type: "basNumber",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
                        width: 60
                    },
                    "start_time": {
                        displayName: "开始时段",
                        width: 120
                    },
                    "end_time": {
                        displayName: "结束时段",
                        width: 120
                    },
                    "work_hr": {
                        displayName: "工时",
                        type: "basNumber",
                        summsg: {
                            auto: false,
                            sumval: 0
                        },
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
                        label: "完工单号"
                    },
                    mak_nbr: {
                        type: "input",
                        lovtype: "",
                        name: "mak_nbr",
                        label: "生产单号"
                    },
                    desc_no: {
                        type: "input",
                        lovtype: "",
                        name: "desc_no",
                        label: "客户订单号"
                    },
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        label: "产品编号"
                    },

                    pro_nbr: {
                        type: "basLov",
                        lovtype: "getpro",
                        name: "pro_nbr",
                        label: "制程"
                    },
                    sure: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "Y", name: "已审核" },
                            { value: "N", name: "未审核" }
                        ],
                        name: "sure",
                        label: "状态"
                    },
                    nbrdate: {
                        type: "basEsydatetime",
                        format: "YYYY-MM-DD 00:00:00",
                        lovtype: "",
                        name: "nbrdate",
                        label: "生产日期F"
                    },
                    nbrdateb: {
                        type: "basEsydatetime",
                        format: "YYYY-MM-DD 23:59:59",
                        lovtype: "",
                        name: "nbrdateb",
                        label: "生产日期T"
                    },
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
                        url: "mak/combat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                        scope.config.headers.mak_qty.summsg.sumval = res.data.body.other.mak_qty;
                        scope.config.headers.pro_qty.summsg.sumval = res.data.body.other.pro_qty;
                        scope.config.headers.qty.summsg.sumval = res.data.body.other.qty;
                        scope.config.headers.ipro_qty.summsg.sumval = res.data.body.other.ipro_qty;
                        scope.config.headers.work_hr.summsg.sumval = res.data.body.other.work_hr;
                    });

                },
                reset: function() {
                    scope.filter = {
                        nbrdate: qwsys.gettoday("YYYY-MM-DD 00:00:00"),
                        nbrdateb: qwsys.gettoday("YYYY-MM-DD 23:59:59")
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
                rowclick: function(entity) {
                    $rootScope.uid = entity.huid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "完工明细",
                        url: 'mak/combah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshcombah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});