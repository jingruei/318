define(function() {
    angular.module('app').controller('mak.combah.detail',
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
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "nbr": {
                                "title": "单据号码",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "日期",
                                "type": "string"
                            },
                            "status": {
                                "title": "状态",
                                "type": "string"
                            },
                            "mak_nbr": {
                                "title": "制令单据号码",
                                "type": "string"
                            },
                            "desc_no": {
                                "title": "客户订单号码",
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
                                "title": "制程",
                                "type": "string"
                            },
                            "qty": {
                                "title": "数量",
                                "type": "number"
                            },
                            "work_hr": {
                                "title": "工时",
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
                            title: "完工头信息",
                            items: [{
                                    title: "单据号码",
                                    key: 'nbr',
                                    placeholder: "自动产生",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "完工日期",
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
                                    title: "应到人数",
                                    key: 'plan_mans',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "实到人数",
                                    key: 'act_mans',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "总工时",
                                    key: 'work_hr',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "备注",
                                    key: 'remark',
                                    css: "cell3",
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
                                    key: 'sure',
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
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "完工明细"
                        },
                        {
                            title: "完工明细",
                            key: 'combats',
                            type: "basEditgrid",
                            gridkey: "mak.combah.detail",
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
                            //             }
                            //         },
                            //         click: function() {
                            //             var item = {
                            //                 isdel: false
                            //             }
                            //             scope.model.combats.push(item);
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
                                    displayName: "制令单号",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 80
                                },
                                "desc_no": {
                                    displayName: "客户订单号",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "item_nbr": {
                                    displayName: "产品编号",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "item_name": {
                                    displayName: "产品名称",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "item_desc": {
                                    displayName: "产品规格",
                                    readonly: true,
                                    type: 'basTextarea',
                                    lovtype: '',
                                    width: 110
                                },
                                "pro_nbr": {
                                    displayName: "制程",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "pro_qty": {
                                    displayName: "工序数量",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "ioqty": {
                                    displayName: "已完工数量",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "qty": {
                                    displayName: "完工数量",
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
                                "bad_qty": {
                                    displayName: "不良数",
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
                                "mans": {
                                    displayName: "人数",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basNumber',
                                    onchange: function() {
                                        var act_mans = 0;
                                        scope.model.combats.forEach(element => {
                                            if (element.mans) {
                                                act_mans = act_mans + element.mans
                                            }
                                        });
                                        scope.model.act_mans = act_mans.toFixed(2) * 1;
                                    },
                                    lovtype: '',
                                    width: 110
                                },
                                "start_time": {
                                    displayName: "开始时段",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    onchange: function(entity) {
                                        if (entity.start_time && entity.end_time) {
                                            entity.work_hr = qwsys.gettimediff("2011-01-01 " + entity.start_time, "2011-01-01 " + entity.end_time)
                                            scope.action.changerow();
                                        }
                                    },
                                    format: "hh:mm:zz",
                                    lovtype: '',
                                    width: 110
                                },
                                "end_time": {
                                    displayName: "结束时段",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(entity) {
                                        if (entity.start_time && entity.end_time) {
                                            entity.work_hr = qwsys.gettimediff("2011-01-01 " + entity.start_time, "2011-01-01 " + entity.end_time)
                                            scope.action.changerow();
                                        }

                                    },
                                    type: 'basEsydatetime',
                                    format: "hh:mm:zz",
                                    lovtype: '',
                                    width: 110
                                },
                                "work_hr": {
                                    displayName: "工时",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function() {
                                        scope.action.changerow();
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
                }
            };
            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        nbrdate: qwsys.gettoday(),
                        sure: "N",
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
                            url: "mak/combah/" + scope.model.uid,
                            mockUrl: "plugins/data/combah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshcombah", {});

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
                            url: "mak/combah/" + scope.uid,
                            mockUrl: "plugins/data/combah.detail.json"
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
                        url: "mak/combah",
                        mockUrl: "plugins/data/combah.detail.json",
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
                        scope.refreshtab("refreshcombah", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                changerow: function() {
                    var work_hr = 0;
                    scope.model.combats.forEach(element => {
                        if (element.work_hr) {
                            work_hr = work_hr + element.work_hr
                        }
                    });
                    scope.model.work_hr = work_hr.toFixed(2) * 1;
                },
                readmak: function() {
                    var para = {
                        ctl: "Y", //已核审
                        status: "10,20", //未完工
                    }
                    qwsys.getdocuments("getmakbat", para, function(selectmodel) {
                        var tag = false;
                        if (selectmodel.type == "rep") {
                            scope.model.combats = [];
                        }
                        if (selectmodel.records.length > 0) {
                            selectmodel.records.forEach(function(element) {
                                var item = {
                                    makbatuid: element.uid,
                                    mak_nbr: element.nbr,
                                    desc_no: element.desc_no,
                                    item_nbr: element.item_nbr,
                                    item_name: element.item_name,
                                    pro_nbr: element.pro_nbr,
                                    unit: element.unit,
                                    pro_qty: element.pro_qty,
                                    ioqty: element.ipro_qty,
                                    qty: element.com_qty
                                }
                                scope.model.combats.push(item)
                            }, this);
                        }
                    });
                },

                audit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/combah/audit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("审核成功！");
                        scope.action.load();
                        scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshcombah", {});
                    });

                },
                unaudit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/combah/unaudit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshcltbah", {});

                    });
                },
            };
            scope.action.load();
        });

});