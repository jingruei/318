define(function() {
    angular.module('app').controller('mak.artbah.detail',
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
                                { field: "formstatus", status: "view" }, //查询状态                              
                                { field: "sure", status: "N" } //已审核
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
                                { field: "formstatus", status: "view" }, //表单查询状态                             
                                { field: "sure", status: "N" } //已审核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
                        }
                    },
                    readord: {
                        name: "读取生产单",
                        icon: "fa-file-text-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "edit,add" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.readmak(event);
                        }
                    },
                    audit: {
                        name: "审核",
                        icon: "fa-calendar-check-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表单新增状态
                                { field: "sure", status: "N" } //已审核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.audit(event);
                        }
                    },
                    unaudit: {
                        name: "反审",
                        icon: "fa-calendar-times-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表单新增状态
                                { field: "sure", status: "Y" } //已审核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.unaudit(event);
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
                            "nbrdate": {
                                "title": "日期",
                                "type": "string"
                            },
                            "nbr": {
                                "title": "单据号码",
                                "type": "string"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "status": {
                                "title": "状态",
                                "type": "string"
                            },
                            "ware_nbr": {
                                "title": "仓库代号",
                                "type": "string"
                            },
                            "item_nbr": {
                                "title": "产品编号",
                                "type": "string"
                            },
                            "item_desc": {
                                "title": "产品规格",
                                "type": "string"
                            },
                            "pro_nbr": {
                                "title": "制程代号",
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
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "入库头信息",
                            items: [{
                                    title: "单据号码",
                                    key: 'nbr',
                                    placeholder: "自动产生",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "日期",
                                    key: 'nbrdate',
                                    required: true,
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
                                    key: 'remark',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "仓库代号",
                                    key: 'ware_nbr',
                                    required: true,
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
                                    title: "状态",
                                    key: 'status',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basStatus',
                                    titleMap: [
                                        { value: "Y", name: "已审核" },
                                        { value: "N", name: "未审核" },
                                    ],
                                    lovtype: 'select'
                                }

                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "入库行信息"
                        },
                        {
                            title: "入库行信息",
                            key: 'artbats',
                            type: "basEditgrid",
                            gridkey: "mak.artbah.detail",
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
                                        scope.model.artbats.push(item);
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
                                    nameField: "item_name",
                                    relationfield: [
                                        { findfield: "item_name", tofield: "item_name" },
                                        { findfield: "item_desc", tofield: "item_desc" },
                                        { findfield: "item_un", tofield: "unit" },
                                        { findfield: "ware_nbr", tofield: "ware_nbr" },
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getitm',
                                    width: 110
                                },
                                "item_desc": {
                                    displayName: "产品规格",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basTextarea',
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
                                    type: 'basLov',
                                    lovtype: 'getpro',
                                    width: 110
                                },
                                "unit": {
                                    displayName: "单位",
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
                                    type: 'basLov',
                                    lovtype: 'getwar',
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
                        sure: "N",
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
                            url: "mak/artbah/" + scope.model.uid,
                            mockUrl: "plugins/data/artbah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshartbah", {});

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
                            url: "mak/artbah/" + scope.uid,
                            mockUrl: "plugins/data/artbah.detail.json"
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
                        url: "mak/artbah",
                        mockUrl: "plugins/data/artbah.detail.json",
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
                        scope.refreshtab("refreshartbah", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                readmak: function() {
                    var para = {
                        ctl: "Y", //已核审
                        art_status: "10,20", //未完全入库
                        status: "20,30", //已完工、完工中
                    }
                    qwsys.getdocuments("getmakbahtra", para, function(selectmodel) {
                        var tag = false;
                        if (selectmodel.type == "rep") {
                            scope.model.artbats = [];
                        }
                        if (selectmodel.records.length > 0) {
                            selectmodel.records.forEach(function(element) {
                                var item = {
                                    makbahuid: element.uid,
                                    mak_nbr: element.nbr,
                                    item_nbr: element.item_nbr,
                                    item_name: element.item_name,
                                    item_desc: element.item_desc,
                                    pro_nbr: element.pro_nbr,
                                    unit: element.unit,
                                    qty: element.itra_qty
                                }
                                scope.model.artbats.push(item)
                            }, this);
                        }
                    });
                },

                audit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/artbah/audit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("审核成功！");
                        scope.action.load();
                        scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshartbah", {});
                    });
                },
                unaudit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/artbah/unaudit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshartbah", {});

                    });
                }
            };
            scope.action.load();
        });

});