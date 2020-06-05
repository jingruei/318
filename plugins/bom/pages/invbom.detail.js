define(function() {
    angular.module('app').controller('bom.invbom.detail',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.model = {};
            if ($rootScope.invbom) {
                scope.model = $rootScope.invbom;
                $rootScope.invbom = "";
            };

            scope.initmodel = angular.copy(scope.model);

            scope.detailUrl = "";

            scope.invboms = [];
            scope.nextinvbom = [];
            scope.promise = null;
            scope.config = {
                editbom: {
                    gridkey: "invbom",
                    action: {
                        add: {

                            click: function() {
                                var item = {
                                    isdel: false,
                                }
                                scope.nextinvbom.push(item);
                            }
                        },
                        del: {
                            click: function(item) {
                                item.isdel = true;
                            }
                        },
                        save: {
                            name: "保存",
                            click: function() {
                                scope.action.save();
                            }

                        }
                    },
                    headers: {
                        "item_nbr": {
                            displayName: "产品编号",
                            readonlystatus: {
                                relation: "and",
                                filedlist: [
                                    { field: "formstatus", status: "view" }, //表单新增状态
                                ]
                            },
                            relationfield: [
                                { findfield: "item_desc", tofield: "item_desc" },
                                { findfield: "item_name", tofield: "item_name" },
                                { findfield: "item_un", tofield: "unit" },
                                { findfield: "ware_nbr", tofield: "ware_nbr" }
                            ],
                            onchange: function(item) {
                                item.qty = 1;
                                item.over_qty = 1;
                            },
                            type: 'basLov',
                            lovtype: 'getitm',
                            width: 110
                        },
                        "item_name": {
                            displayName: "产品名称",
                            readonly: true,
                            width: 130
                        },
                        "item_desc": {
                            displayName: "规格",
                            readonlystatus: {
                                relation: "and",
                                filedlist: [
                                    { field: "formstatus", status: "view" }, //表单新增状态
                                ]
                            },
                            type: 'basDefault',
                            lovtype: '',
                            width: 110
                        },
                        "pro_nbr": {
                            displayName: "制程",
                            readonlystatus: {
                                relation: "and",
                                filedlist: [
                                    { field: "formstatus", status: "view" }, //表单新增状态
                                ]
                            },

                            type: 'basLov',
                            lovtype: 'getpro',
                            width: 80
                        },
                        "ware_nbr": {
                            displayName: "仓库",
                            type: 'basLov',
                            lovtype: 'getwar', //获取辅助单位
                            width: 80
                        },
                        "unit": {
                            displayName: "单位",
                            type: 'basLov',
                            lovtype: 'getuns', //获取辅助单位
                            width: 80
                        },
                        "qty": {
                            displayName: "数量",
                            readonlystatus: {
                                relation: "and",
                                filedlist: [
                                    { field: "formstatus", status: "view" }, //表单新增状态
                                ]
                            },
                            type: 'basNumber',
                            lovtype: '',
                            width: 70
                        },
                        "over_qty": {
                            displayName: "放宽成数",
                            type: 'basNumber',
                            lovtype: '',
                            width: 70
                        }

                    }
                },
                parentItems: {
                    assy_nbr: {
                        type: "basString",
                        readonly: true,
                        lovtype: "",
                        name: "assy_nbr",
                        label: "编号"
                    },
                    assy_nbr_name: {
                        type: "basString",
                        readonly: true,
                        lovtype: "",
                        name: "assy_nbr_name",
                        label: "名称"
                    },
                    assy_pro: {
                        type: "basString",
                        readonly: true,
                        lovtype: "",
                        name: "assy_pro",
                        label: "编号"
                    },
                    assy_pro_name: {
                        type: "basString",
                        readonly: true,
                        lovtype: "",
                        name: "assy_pro_name",
                        label: "名称"
                    }
                },
                listoperation: {
                    sure: {
                        name: "确定",
                        icon: "fa-save",
                        action: function(event, form) {
                            scope.action.sure(event, form);
                        }
                    },
                    undo: {
                        name: "重置",
                        icon: "fa-undo",
                        action: function(event, form) {
                            scope.action.undo(event);
                        }
                    }

                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "assy_pro": {
                                "title": "产品编号",
                                "type": "string"
                            }

                        }
                    },
                    form: [{
                        type: "group",
                        title: "基础信息",
                        items: [{
                                title: "产品编号",
                                key: 'assy_nbr',
                                type: 'basLov',
                                relationfield: [
                                    { findfield: "item_name", tofield: "assy_nbr_name" }
                                ],
                                lovtype: 'getitm'
                            },
                            {
                                title: "产品名称",
                                key: 'assy_nbr_name',
                                readonly: true,
                                type: 'basDefault',
                                lovtype: ''
                            },
                            {
                                title: "制程编号",
                                key: 'assy_pro',
                                relationfield: [
                                    { findfield: "pro_desc", tofield: "assy_pro_desc" }
                                ],
                                type: 'basLov',
                                lovtype: 'getpro'
                            },
                            {
                                title: "制程说明",
                                key: 'assy_pro_desc',
                                readonly: true,
                                type: 'basDefault',
                                lovtype: ''
                            }
                        ]
                    }]
                }


            }

            scope.action = {
                sure: function() {
                    scope.invboms = [{
                        id: scope.model.assy_nbr + scope.model.assy_pro,
                        pid: "",
                        item_nbr: scope.model.assy_nbr,
                        item_name: scope.model.assy_nbr_name,
                        pro_nbr: scope.model.assy_pro,
                        pro_desc: scope.model.assy_pro_desc,
                        name: scope.model.assy_nbr_name + (scope.model.assy_pro_desc ? "--" + scope.model.assy_pro_desc : "")
                    }]
                    scope.detailUrl = "";
                },
                undo: function() {
                    scope.model = {};
                },
                save: function() {
                    scope.nextinvbom.forEach(function(element) {
                        element.assy_nbr = scope.model.assy_nbr;
                        element.assy_nbr_name = scope.model.assy_nbr_name;
                        element.assy_pro = scope.model.assy_pro;
                        element.assy_pro_desc = scope.model.assy_pro_desc;
                    }, this);

                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "bom/invbom/savelist",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.nextinvbom
                    }).then(function(res) {
                        toastr.info("存档成功！");
                        scope.treeOption.load();
                    });



                }
            }

            scope.treeOption = {
                lowerlevels: [],
                title: "用料结构",
                id: "id",
                parent: "pid",
                name: "name",
                clicknode: function(item, level) { //tree内部固定
                    scope.model = {
                        assy_nbr: item.item_nbr,
                        assy_nbr_name: item.item_name,
                        assy_pro: item.pro_nbr,
                        assy_pro_desc: item.pro_desc
                    }
                    scope.nextinvbom = scope.treeOption.lowerlevels;
                },
                load: function() {
                    if (scope.initmodel.assy_nbr) {
                        qwsys.show_bom(scope.initmodel.assy_nbr, scope.initmodel.assy_pro, 1, "Y", "Y", "N").then(function(res) {
                            var ret = res.data.body;
                            var topitm = {
                                id: scope.initmodel.assy_nbr + scope.initmodel.assy_pro,
                                pid: "",
                                item_nbr: scope.initmodel.assy_nbr,
                                item_name: scope.initmodel.assy_nbr_name,
                                pro_nbr: scope.initmodel.pro_nbr,
                                pro_desc: scope.initmodel.assy_pro_desc,
                                name: scope.initmodel.assy_nbr_name + (scope.initmodel.assy_pro_desc ? "--" + scope.initmodel.assy_pro_desc : "")

                            }
                            ret.push(topitm)
                            scope.invboms = ret;
                        })
                    } else {
                        scope.initmodel = angular.copy(scope.model);
                        scope.detailUrl = "plugins/bas/templates/detail.html";
                    }

                }
            }
            scope.treeOption.load();
        });

});