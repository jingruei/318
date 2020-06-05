define(function() {
    angular.module('app').controller('bas.invpps.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            var scope = $scope;
            scope.uid = "";
            if ($rootScope.uid) {
                scope.uid = $rootScope.uid;
                $rootScope.uid = "";
            };
            scope.model = {
                formstatus: "add" //edit,view
            };
            scope.adddetailUrl = "";
            scope.promise = null;
            scope.detailUrl = "plugins/bas/templates/detail.html";
            scope.addconfig = {
                listoperation: {

                    sure: {
                        name: "确定",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.sure(event, form);
                        }
                    }

                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "item_nbr": {
                                "title": "产品编号",
                                "type": "string"
                            },
                            "item_name": {
                                "title": "产品名称",
                                "type": "string"
                            },
                            "item_nbr1": {
                                "title": "原料代号",
                                "type": "string"
                            },
                            "item_name1": {
                                "title": "产品名称",
                                "type": "string"
                            },
                            "matl_cost": {
                                "title": "原料成本",
                                "type": "number"
                            },
                            "labor_cost": {
                                "title": "制造成本",
                                "type": "number"
                            },
                            "other_cost": {
                                "title": "其他成本",
                                "type": "number"
                            },
                            "unit_cost": {
                                "title": "总成本",
                                "type": "number"
                            },
                            "cyc_time": {
                                "title": "加工总数",
                                "type": "number"
                            },
                            "pro_nbr": {
                                "title": "制程代号",
                                "type": "string"
                            },
                            "pro_desc": {
                                "title": "制程名称",
                                "type": "string"
                            },
                            "pro_days": {
                                "title": "制程天数",
                                "type": "number"
                            },
                            "pro_cost": {
                                "title": "制程成本",
                                "type": "number"
                            },
                            "ven_nbr": {
                                "title": "主要厂商",
                                "type": "string"
                            },
                            "ven_alias": {
                                "title": "厂商简称",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "请选择产品",
                            items: [{
                                    title: "产品编号",
                                    key: 'item_nbr',
                                    required: true,
                                    relationfield: [
                                        { findfield: "uid", tofield: "uid" },
                                        { findfield: "updstamp", tofield: "updstamp" },
                                        { findfield: "item_name", tofield: "item_name" },
                                        { findfield: "item_nbr1", tofield: "item_nbr1" },
                                        { findfield: "item_name1", tofield: "item_name1" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getitm'
                                },
                                {
                                    title: "产品名称",
                                    key: 'item_name',
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "原料代号",
                                    key: 'item_nbr1',
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "产品名称",
                                    key: 'item_name1',
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "原料成本",
                                    key: 'matl_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "制造成本",
                                    key: 'labor_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "其他成本",
                                    key: 'other_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "总成本",
                                    key: 'unit_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "加工总数",
                                    key: 'cyc_time',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                }
                            ]
                        }


                    ]
                }
            };
            scope.config = {
                listoperation: {

                    save: {
                        name: "保存",
                        icon: "fa-save",
                        action: function(event, form) {
                            scope.action.save(event, form);
                        }
                    },
                    refresh: {
                        name: "刷新",
                        icon: "fa-refresh",
                        htmlClass: "refresh",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.load();
                        }
                    }
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "item_nbr": {
                                "title": "产品编号",
                                "type": "string"
                            },
                            "item_name": {
                                "title": "产品名称",
                                "type": "string"
                            },
                            "item_nbr1": {
                                "title": "原料代号",
                                "type": "string"
                            },
                            "item_name1": {
                                "title": "产品名称",
                                "type": "string"
                            },
                            "matl_cost": {
                                "title": "原料成本",
                                "type": "number"
                            },
                            "labor_cost": {
                                "title": "制造成本",
                                "type": "number"
                            },
                            "other_cost": {
                                "title": "其他成本",
                                "type": "number"
                            },
                            "unit_cost": {
                                "title": "总成本",
                                "type": "number"
                            },
                            "cyc_time": {
                                "title": "加工总数",
                                "type": "number"
                            },
                            "pro_nbr": {
                                "title": "制程代号",
                                "type": "string"
                            },
                            "pro_desc": {
                                "title": "制程名称",
                                "type": "string"
                            },
                            "pro_days": {
                                "title": "制程天数",
                                "type": "number"
                            },
                            "pro_cost": {
                                "title": "制程成本",
                                "type": "number"
                            },
                            "ven_nbr": {
                                "title": "主要厂商",
                                "type": "string"
                            },
                            "ven_alias": {
                                "title": "厂商简称",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "料品信息",
                            items: [{
                                    title: "产品编号",
                                    key: 'item_nbr',
                                    readonly: true,
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "产品名称",
                                    key: 'item_name',
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "原料代号",
                                    key: 'item_nbr1',
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "产品名称",
                                    key: 'item_name1',
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "原料成本",
                                    key: 'matl_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "制造成本",
                                    key: 'labor_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "其他成本",
                                    key: 'other_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "总成本",
                                    key: 'unit_cost',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "总天数",
                                    key: 'cyc_time',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                }
                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "制程信息"
                        },
                        {
                            title: "制程信息",
                            key: 'invppsvs',
                            type: "basEditgrid",
                            gridkey: "bas.invpps.detail",
                            css: "cell100",
                            action: {
                                add: {
                                    editstatus: {
                                        relation: "or",
                                        editstatus: {
                                            relation: "and",
                                            filedlist: [
                                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                                            ]
                                        }
                                    },
                                    click: function() {
                                        var item = {
                                            isdel: false
                                        }
                                        scope.model.invppsvs.push(item);
                                    }
                                },
                                del: {
                                    editstatus: {
                                        relation: "or",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                        ]
                                    },
                                    click: function(item) {
                                        item.isdel = true;
                                    }
                                }
                            },
                            headers: {
                                "pro_nbr": {
                                    displayName: "制程代号",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "pro_desc", tofield: "pro_desc" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getpro',
                                    width: 110
                                },
                                "pro_desc": {
                                    displayName: "制程名称",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "pro_qty": {
                                    displayName: "制程数量",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "pro_days": {
                                    displayName: "制程天数",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(entity) {
                                        scope.model.cyc_time = 0;
                                        scope.model.invppsvs.forEach(function(element) {
                                            if (!element.isdel) {
                                                scope.model.cyc_time += element.pro_days;
                                            }

                                        }, this);

                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "pro_cost": {
                                    displayName: "制程成本",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(entity) {
                                        scope.model.matl_cost = 0;
                                        scope.model.other_cost = 0;
                                        scope.model.labor_cost = 0;
                                        scope.model.invppsvs.forEach(function(element) {
                                            if (!element.isdel && scope.model.pro_nbr) {
                                                scope.model.labor_cost += element.pro_cost;
                                            }

                                        }, this);
                                        scope.model.unit_cost = scope.model.matl_cost + scope.model.labor_cost + scope.model.other_cost;
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "ven_nbr": {
                                    displayName: "主要厂商",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "ven_alias", tofield: "ven_alias" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getven',
                                    width: 110
                                },
                                "ven_alias": {
                                    displayName: "厂商简称",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                }
                            }

                        }


                    ]
                }
            };
            scope.action = {
                add: function(event) {
                    scope.bakconfig = angular.copy(scope.config);
                    scope.config = angular.copy(scope.addconfig);
                    scope.adddetailUrl = "plugins/bas/templates/detail.html";
                },
                sure: function(event, form) {
                    scope.$broadcast("schemaFormValidate");
                    if (!form.base_form.$valid) {
                        toastr.warning("请输入必填项！");
                        return
                    }
                    scope.config = angular.copy(scope.bakconfig);
                    scope.adddetailUrl = "";
                    scope.uid = scope.model.uid;
                    scope.action.load();

                },
                load: function() {
                    if (scope.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "bas/invpps/" + scope.uid,
                            mockUrl: "plugins/data/invpps.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.formstatus = "edit";
                            for (var p in scope.model) {
                                if (scope.model[p] === null) {
                                    delete scope.model[p];
                                }
                            }
                            scope.bakmodel = angular.copy(scope.model);
                        });
                    } else {
                        scope.action.add();
                    }

                },
                save: function(event, form) {
                    for (var p in scope.model) {
                        if (scope.model[p] === null) {
                            delete scope.model[p];
                        }
                    }
                    scope.$broadcast("schemaFormValidate");
                    if (!form.base_form.$valid) {
                        toastr.warning("请输入必填项！");
                        return
                    }
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "bas/invpps",
                        mockUrl: "plugins/data/invpps.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        scope.uid = res.data.body.uid
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshinvpps", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                }
            };
            scope.action.load();
        });

});