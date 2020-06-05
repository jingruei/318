define(function() {
    angular.module('app').controller('inv.invbah.detail',
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
            scope.promise = null;
            scope.detailUrl = "plugins/bas/templates/detail.html";
            scope.config = {
                listoperation: {
                    add: {
                        name: "新增",
                        icon: "fa-plus",
                        readonlystatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit,read" } //表单新增状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.add(event);
                        }
                    },
                    save: {
                        name: "保存",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.save(event, form);
                        }
                    },
                    undo: {
                        name: "取消",
                        icon: "fa-undo",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.undo(event);
                        }
                    },
                    edit: {
                        name: "修改",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //查询状态                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.edit(event);
                        }
                    },
                    del: { //分配状态下还可以删除
                        name: "删除",
                        icon: "fa-remove",
                        htmlClass: "deletestyle",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //表单查询状态                             
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
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
                            "io_p": {
                                "title": "出/入别",
                                "type": "string"
                            },
                            "nbr": {
                                "title": "单据号码",
                                "type": "string"
                            },
                            "ware_nbr": {
                                "title": "仓库代号",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "日期",
                                "type": "string"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "item_nbr": {
                                "title": "产品编号",
                                "type": "string"
                            },
                            "pro_nbr": {
                                "title": "制程代号",
                                "type": "string"
                            },
                            "item_desc": {
                                "title": "品名规格",
                                "type": "string"
                            },
                            "unit": {
                                "title": "单位",
                                "type": "string"
                            },
                            "qty": {
                                "title": "数量",
                                "type": "number"
                            },
                            "ware_nbr": {
                                "title": "仓库代号",
                                "type": "string"
                            },
                            "to_qty": {
                                "title": "现存数量",
                                "type": "number"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "出入库头信息",
                            items: [{
                                    title: "出/入别",
                                    key: 'io_p',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'select',
                                    titleMap: [
                                        { value: "1", name: "入" },
                                        { value: "2", name: "出" }
                                    ]
                                },
                                {
                                    title: "单据号码",
                                    key: 'nbr',
                                    readonly: true,
                                    placeholder: "自动产生",
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "仓库代号",
                                    key: 'ware_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getwar'
                                },
                                {
                                    title: "日期",
                                    key: 'nbrdate',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "备注",
                                    css: "cell100",
                                    key: 'remark',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basTextarea',
                                    lovtype: ''
                                }
                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "出入库行"
                        },
                        {
                            title: "出入库行",
                            key: 'invbats',
                            type: "basEditgrid",
                            gridkey: "inv.invbah.detail",
                            css: "cell100",
                            action: {
                                add: {
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                                        ]
                                    },
                                    click: function() {
                                        var item = {
                                            ware_nbr: scope.model.ware_nbr,
                                            isdel: false
                                        }
                                        scope.model.invbats.push(item);
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
                                        { findfield: "item_un", tofield: "unit" }
                                    ],
                                    onchange: function(item) {
                                        qwsys.getohqty(item.ware_nbr, item.item_nbr, item.pro_nbr, item.unit).then(function(res) {
                                            item.to_qty = res.data.body;
                                        })
                                    },
                                    type: 'basLov',
                                    lovtype: 'getitm',
                                    width: 110
                                },
                                "item_name": {
                                    displayName: "产品名称",
                                    readonly: true,
                                    type: 'basString',
                                    lovtype: '',
                                    width: 110
                                },
                                "item_desc": {
                                    displayName: "品名规格",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basString',
                                    lovtype: '',
                                    width: 110
                                },
                                "pro_nbr": {
                                    displayName: "制程代号",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(item) {
                                        qwsys.getohqty(item.ware_nbr, item.item_nbr, item.pro_nbr, item.unit).then(function(res) {
                                            item.to_qty = res.data.body;
                                        })
                                    },
                                    relationfield: [
                                        { findfield: "item_un", tofield: "unit" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getinvpro',
                                    width: 110
                                },

                                "unit": {
                                    displayName: "单位",
                                    readonly: true,
                                    type: 'basLov',
                                    lovtype: 'getunit',
                                    onchange: function(item) {
                                        qwsys.getohqty(item.ware_nbr, item.item_nbr, item.pro_nbr, item.unit).then(function(res) {
                                            item.to_qty = res.data.body;
                                        })
                                    },
                                    width: 110
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
                                    width: 110
                                },
                                "ware_nbr": {
                                    displayName: "仓库代号",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(item) {
                                        qwsys.getohqty(item.ware_nbr, item.item_nbr, item.pro_nbr, item.unit).then(function(res) {
                                            item.to_qty = res.data.body;
                                        })
                                    },
                                    type: 'basLov',
                                    lovtype: 'getwar',
                                    width: 110
                                },
                                "to_qty": {
                                    displayName: "现存数量",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "remark": {
                                    displayName: "备注",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
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
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        io_p: "1",
                        nbrdate: qwsys.gettoday(),
                        formstatus: "add" //edit,view
                    }
                },
                edit: function() {
                    scope.model.formstatus = "edit"
                    $scope.$broadcast('schemaFormRedraw');
                },
                del: function() {
                    dialog.confirm('确定删除当前数据?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "inv/invbah/" + scope.model.uid,
                            mockUrl: "plugins/data/invbah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshinvbah", {});


                        });
                    });
                },
                undo: function() {
                    if (scope.model.formstatus == "add") {
                        scope.model = angular.copy(scope.bakmodel);
                    } else {
                        scope.model = angular.copy(scope.bakmodel);
                        scope.$broadcast("GridRedraw");
                    }
                    scope.model.formstatus = "view";
                },
                load: function() {
                    if (scope.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "inv/invbah/" + scope.uid,
                            mockUrl: "plugins/data/invbah.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.formstatus = "view";
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
                        url: "inv/invbah",
                        mockUrl: "plugins/data/invbah.detail.json",
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
                        scope.refreshtab("refreshinvbah", {});

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