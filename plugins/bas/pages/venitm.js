define(function() {
    angular.module('app').controller('pur.venitm',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = { addpas: 0 };
            scope.model = {
                records: 0,
                content: []
            }

            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "venitm",
                title: "产商产品调价",
                listoperation: {
                    save: {
                        name: "保存",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.save();
                        }
                    }
                },

                filterItems: {
                    ven_nbr: {
                        type: "basLov",
                        lovtype: "getven",
                        name: "ven_nbr",
                        label: "厂商代号"
                    },
                    item_nbr: {
                        type: "basLov",
                        lovtype: "getitm",
                        name: "item_nbr",
                        label: "产品编号"
                    },
                    addpas: {
                        type: "basNumber",
                        lovtype: "",
                        name: "addpas",
                        label: "调价%"
                    }
                },
                form: {
                    title: "厂商产品调价",
                    key: 'venitms',
                    type: "basEditgrid",
                    gridkey: "ord.ordPurSuggest",
                    css: "cell100",
                    // action: {
                    //     add: {

                    //         click: function() {
                    //             var item = {
                    //                 isdel: false
                    //             }
                    //             scope.model.cltbats.push(item);
                    //         }
                    //     },
                    //     del: {

                    //         click: function(item) {
                    //             item.isdel = true;
                    //         }
                    //     }
                    // },
                    headers: {
                        "ven_nbr": {
                            displayName: "厂商代号",
                            readonly: true,
                            width: 70
                        },
                        "ven_alias": {
                            displayName: "厂商简称",
                            readonly: true,
                            width: 80
                        },
                        "item_nbr": {
                            displayName: "产品编号",
                            readonly: true,
                            width: 80
                        },
                        "item_name": {
                            displayName: "产品名称",
                            readonly: true,
                            width: 100
                        },
                        "unit": {
                            displayName: "单位",
                            readonly: true,
                            width: 60
                        },
                        "un_desc": {
                            displayName: "单位名称",
                            readonly: true,
                            width: 70
                        },
                        "pro_nbr": {
                            displayName: "制程代号",
                            readonly: true,
                            width: 60
                        },
                        "pro_desc": {
                            displayName: "制程名称",
                            readonly: true,
                            width: 70
                        },
                        "coin_nbr": {
                            displayName: "币别代号",
                            readonly: true,
                            width: 70
                        },
                        "coin_desc": {
                            displayName: "币别说明 ",
                            readonly: true,
                            width: 70
                        },
                        "ven_item": {
                            displayName: "厂商产品编号",
                            readonly: true,
                            width: 100
                        },
                        "price": {
                            displayName: "原价",
                            readonly: true,
                            type: "basNumber",
                            width: 70
                        },
                        "newpri": {
                            displayName: "单价",
                            type: "basNumber",
                            width: 70
                        }
                    },

                }
            }

            scope.action = {
                save: function() {
                    var gridoption = scope.config.form;

                    if (gridoption.gridApi) {
                        var rows = gridoption.gridApi.selection.getSelectedRows() || []
                        if (rows.length == 0) {
                            toastr.info("请选择记录！");
                            return
                        }

                        scope.promise = utils.ajax({
                            method: 'POST',
                            url: "bas/venitm/savevenitm",
                            mockUrl: "plugins/base/data/orderlines.json",
                            data: rows
                        }).then(function(res) {
                            toastr.info("转档成功！");
                        });

                    }
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "bas/venitm/getvenitm",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                        scope.model.forEach(element => {
                            element.newpri = element.price + (element.price * scope.filter.addpas / 100);
                        });
                    });

                },
                reset: function() {
                    scope.filter = {

                    };

                },
                // changepage: function(page, size, sort) {
                //     scope.datapage.page = page;
                //     scope.datapage.size = size;
                //     if (sort) {
                //         scope.datapage.sort = sort;
                //     }
                //     scope.action.load();
                // },
                // rowclick: function(entity) {
                //     $rootScope.uid = entity.uid;
                //     scope.action.opendetail();
                // },
                // opendetail: function() {
                //     var node = {
                //         name: "",
                //         url: 'pur/venitm.detail'
                //     }
                //     $scope.$emit('opencusdetail', node);
                // }
            }
            $scope.$on('refreshvenitm', function(event, message) {
                scope.action.load()
            });
            // scope.action.load();
        });

});