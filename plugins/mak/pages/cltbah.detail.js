define(function() {
    angular.module('app').controller('mak.cltbah.detail',
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
                                { field: "sure", status: "N" }
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
                                { field: "sure", status: "N" }
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
                            "io_p": {
                                "title": "领/退料单",
                                "type": "string"
                            },
                            "nbr": {
                                "title": "领料单号",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "日期",
                                "type": "string"
                            },
                            "mak_nbr": {
                                "title": "制令单号",
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
                            "mak_nbr": {
                                "title": "制令单号",
                                "type": "string"
                            },
                            "item_nbr": {
                                "title": "料品代号",
                                "type": "string"
                            },
                            "ware_nbr": {
                                "title": "仓库代号",
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
                            "iiqty": {
                                "title": "差异数量",
                                "type": "number"
                            },
                            "qty": {
                                "title": "领料数量",
                                "type": "number"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "nbr": {
                                "title": "单据号码",
                                "type": "string"
                            },
                            "qty": {
                                "title": "数量",
                                "type": "number"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "领料信息",
                            items: [{
                                    title: "领/退料单",
                                    key: 'io_p',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    titleMap: [
                                        { value: "1", name: "领料单" },
                                        { value: "2", name: "退料单" }
                                    ],
                                    lovtype: 'select'
                                },
                                {
                                    title: "领料单号",
                                    key: 'nbr',
                                    placeholder: "自动产生",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "日期",
                                    required: true,
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
                                    title: "制令单号",
                                    required: true,
                                    key: 'mak_nbr',
                                    placeholder: "请记取制今单",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "备注",
                                    key: 'remark',
                                    css: "cell2",
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
                                    title: "状态",
                                    key: 'statusdesc',
                                    readonly: true,
                                    type: 'basStatus',
                                    titleMap: [
                                        { value: "Y", name: "已审核" },
                                        { value: "N", name: "未审核" },
                                    ],
                                    lovtype: 'select'
                                }
                            ]
                        },
                        //下面为页签
                        {
                            type: "tabs",
                            css: "max-4",
                            tabs: [{
                                    title: "领料明细",
                                    items: [{
                                            title: "领料明细",
                                            key: 'cltbats',
                                            type: "basEditgrid",
                                            gridkey: "mak.cltbah.detail",
                                            css: "cell100",
                                            // action: {
                                            //     add: {
                                            //         editstatus: {
                                            //             relation: "or",
                                            //             editstatus: {
                                            //                 relation: "and",
                                            //                 filedlist: [
                                            //                     { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                                            //                 ]
                                            //             },
                                            //             filedlist: [
                                            //                 { field: "formstatus", status: "add,edit" }, //表单新增状态
                                            //             ]
                                            //         },
                                            //         click: function() {
                                            //             var item = {
                                            //                 isdel: false
                                            //             }
                                            //             scope.model.cltbats.push(item);
                                            //         }
                                            //     },
                                            //     del: {
                                            //         editstatus: {
                                            //             relation: "or",
                                            //             filedlist: [
                                            //                 { field: "formstatus", status: "add,edit" }, //表单新增状态
                                            //             ]
                                            //         },
                                            //         click: function(item) {
                                            //             item.isdel = true;
                                            //         }
                                            //     }
                                            // },
                                            headers: {
                                                "mak_nbr": {
                                                    displayName: "生产单号",
                                                    readonly: true,
                                                    type: 'basDefault',
                                                    lovtype: '',
                                                    width: 110
                                                },
                                                "item_nbr": {
                                                    displayName: "料品代号",
                                                    readonly: true,
                                                    type: 'basLov',
                                                    lovtype: 'getitm',
                                                    nameField: "item_name",
                                                    width: 110
                                                },
                                                "ware_nbr": {
                                                    displayName: "仓库代号",
                                                    readonly: true,
                                                    type: 'basLov',
                                                    lovtype: 'getwar',
                                                    width: 110
                                                },
                                                "pro_nbr": {
                                                    displayName: "制程代号",
                                                    readonly: true,
                                                    type: 'basLov',
                                                    nameField: "pro_desc",
                                                    lovtype: 'getpro',
                                                    width: 110
                                                },
                                                "unit": {
                                                    displayName: "单位",
                                                    readonly: true,
                                                    type: 'basLov',
                                                    nameField: "un_desc",
                                                    lovtype: 'getunit',
                                                    width: 110
                                                },
                                                "mak_qty": {
                                                    displayName: "生产用量",
                                                    readonly: true,
                                                    type: 'basNumber',
                                                    lovtype: '',
                                                    width: 110
                                                },
                                                "iiqty": {
                                                    displayName: "已领数量",
                                                    readonly: true,
                                                    type: 'basNumber',
                                                    lovtype: '',
                                                    width: 110
                                                },
                                                "qty": {
                                                    displayName: "领料数量",
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
                                },
                                //页签A--结束

                            ]
                        }


                    ]
                }
            };
            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        io_p: "1",
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
                            url: "mak/cltbah/" + scope.model.uid,
                            mockUrl: "plugins/data/cltbah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshcltbah", {});
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
                            url: "mak/cltbah/" + scope.uid,
                            mockUrl: "plugins/data/cltbah.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.formstatus = "view";
                            scope.model.statusdesc = scope.model.sure;
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
                        url: "mak/cltbah",
                        mockUrl: "plugins/data/cltbah.detail.json",
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
                        scope.refreshtab("refreshcltbah", {});
                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                readmak: function() {
                    if (!scope.model.io_p) {
                        toastr.warning("请选择类别！");
                        return
                    }
                    var para = {
                        ctl: "Y", //已核审
                        clt_status: (scope.model.io_p == "1" ? "10,20" : "20,30"), //未完全领料
                        status: "10,20", //未完工
                    }
                    qwsys.getdocument("getmakbahtra", para, function(selectmodel) {
                        scope.model.mak_nbr = selectmodel.nbr;
                        scope.action.getdetail();
                    });
                },
                getdetail: function() {

                    var obj = {
                        nbr: scope.model.mak_nbr,
                    }
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "mak/makbat1/query",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: obj
                    }).then(function(res) {
                        scope.model.cltbats = [];
                        res.data.body.content.forEach(element => {
                            if (element.qty - element.ioqty > 0) {
                                scope.model.cltbats.push({
                                    makbat1uid: element.uid,
                                    mak_nbr: scope.model.mak_nbr,
                                    item_nbr: element.item_nbr,
                                    item_name: element.item_name,
                                    pro_nbr: element.pro_nbr,
                                    pro_desc: element.pro_desc,
                                    ware_nbr: element.ware_nbr,
                                    unit: element.unit,
                                    un_desc: element.un_desc,
                                    mak_qty: element.qty,
                                    qty: element.qty - element.ioqty,
                                    iiqty: element.ioqty
                                })
                            }
                        });

                    });
                },
                audit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/cltbah/audit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("审核成功！");
                        scope.action.load();
                        scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshcltbah", {});
                    });

                },
                unaudit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/cltbah/unaudit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshcltbah", {});

                    });
                }
            };
            scope.action.load();
        });

});