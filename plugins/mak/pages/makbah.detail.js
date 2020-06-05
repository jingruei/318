define(function() {
    angular.module('app').controller('mak.makbah.detail',
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
                                { field: "ctl", status: "N" } //已审核
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
                                { field: "ctl", status: "N" } //已审核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
                        }
                    },
                    readord: {
                        name: "读取订单",
                        icon: "fa-file-text-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "edit,add" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.readord(event);
                        }
                    },
                    audit: {
                        name: "审核",
                        icon: "fa-calendar-check-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表单新增状态
                                { field: "ctl", status: "N" } //已审核
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
                                { field: "status", status: "10" },
                                { field: "ctl", status: "Y" } //已审核
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
                            "nbr": {
                                "title": "单据号码",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "日期",
                                "type": "string"
                            },
                            "ord_nbr": {
                                "title": "订单编号",
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
                            "qty": {
                                "title": "数量",
                                "type": "number"
                            },
                            "plan_date": {
                                "title": "预计完工日",
                                "type": "string"
                            },
                            "actu_date": {
                                "title": "实际完工日",
                                "type": "string"
                            },
                            "desc_no": {
                                "title": "客户订单编号",
                                "type": "string"
                            },
                            "status": {
                                "title": "状态",
                                "type": "string"
                            },
                            "pro_nbr": {
                                "title": "工序",
                                "type": "string"
                            },
                            "qty": {
                                "title": "数量",
                                "type": "number"
                            },
                            "plan_date": {
                                "title": "预计完工日",
                                "type": "string"
                            },
                            "ioqty": {
                                "title": "已完工量",
                                "type": "number"
                            },
                            "item_nbr": {
                                "title": "产品编号",
                                "type": "string"
                            },
                            "item_desc": {
                                "title": "产品规格",
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
                                "title": "入库仓库",
                                "type": "string"
                            },
                            "mark_date": {
                                "title": "需求日期",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "生产信息",
                            items: [{
                                    title: "单据号码",
                                    placeholder: "自动产生",
                                    readonly: true,
                                    key: 'nbr',
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
                                    title: "订单编号",
                                    key: 'ord_nbr',
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
                                    title: "产品编号",
                                    key: 'item_nbr',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    nameField: "item_name",
                                    relationfield: [
                                        { findfield: "item_name", tofield: "item_name" },
                                        { findfield: "item_desc", tofield: "item_desc" },
                                    ],
                                    onchange: function() {
                                        scope.action.getdetail();
                                    },
                                    type: 'basLov',
                                    lovtype: 'getitm'
                                },
                                {
                                    title: "产品规格",
                                    key: 'item_desc',
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
                                    title: "数量",
                                    key: 'qty',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function() {
                                        // 数量改变 生产流程所有数量都进行改变
                                        // for (var p in scope.model.makbats) {

                                        //     if (scope.model.makbats[p] != null) {
                                        //         scope.model.makbats[p].qty = scope.model.qty; //数量    
                                        //         scope.model.makbats[p].pro_qty = scope.model.qty * scope.model.makbats[p].pro_rat;
                                        //     }
                                        // }

                                        scope.action.getdetail();

                                    },
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "预计完工日",
                                    readonly: true,
                                    key: 'plan_date',
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
                                    title: "实际完工日",
                                    readonly: true,
                                    key: 'actu_date',
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "客户订单编号",
                                    key: 'desc_no',
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
                                        { value: "N10", name: "【未审核】" },
                                        { value: "Y10", name: "【已审核】" },
                                        { value: "Y20", name: "【已审核】【制造中】" },
                                        { value: "Y30", name: "【已审核】【已完工】" },
                                        { value: "Y40", name: "【已审核】【手动结案】" }

                                    ],
                                    lovtype: ''
                                }
                            ]
                        },
                        //下面为页签
                        {
                            type: "tabs",
                            css: "max-4",
                            tabs: [

                                {
                                    title: "生产流程",
                                    items: [{
                                            title: "生产流程",
                                            key: 'makbats',
                                            type: "basEditgrid",
                                            gridkey: "mak.makbah.detail",
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
                                                        },
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                        ]
                                                    },
                                                    click: function() {
                                                        var item = {
                                                            isdel: false
                                                        }
                                                        scope.model.makbats.push(item);
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
                                                    displayName: "工序",
                                                    required: true,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view" }, //表单新增状态
                                                        ]
                                                    },
                                                    nameField: "pro_desc",
                                                    type: 'basLov',
                                                    lovtype: 'getpro',
                                                    width: 110
                                                },
                                                "qty": {
                                                    displayName: "数量",
                                                    required: true,
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
                                                "pro_qty": {
                                                    displayName: "工序数量",
                                                    required: true,
                                                    readonly: true,
                                                    type: 'basNumber',
                                                    lovtype: '',
                                                    width: 110
                                                },
                                                "ipro_qty": {
                                                    displayName: "已完工量",
                                                    readonly: true,
                                                    type: 'basNumber',
                                                    lovtype: '',
                                                    width: 110
                                                },
                                                "plan_date": {
                                                    displayName: "预计完工日",
                                                    type: 'basEsydatetime',
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view" }, //表单新增状态
                                                        ]
                                                    },
                                                    lovtype: '',
                                                    width: 110
                                                },
                                                "actu_date": {
                                                    displayName: "实际完工日",
                                                    type: 'basEsydatetime',
                                                    readonly: true,
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
                                                    type: 'basString',
                                                    lovtype: '',
                                                    width: 110
                                                }
                                            }

                                        }

                                    ]
                                },
                                //页签A--结束
                                {
                                    title: "用料明细",
                                    items: [{
                                            title: "用料明细",
                                            key: 'makbat1s',
                                            type: "basEditgrid",
                                            gridkey: "mak.makbah.detailb",
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
                                                        },
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                        ]
                                                    },
                                                    click: function() {
                                                        var item = {
                                                            isdel: false
                                                        }
                                                        scope.model.makbat1s.push(item);
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
                                                    required: true,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view" }, //表单新增状态
                                                        ]
                                                    },
                                                    relationfield: [
                                                        { findfield: "item_name", tofield: "item_name" },
                                                        { findfield: "item_desc", tofield: "item_desc" },
                                                        { findfield: "item_un", tofield: "unit" },
                                                        { findfield: "ware_nbr", tofield: "ware_nbr" }
                                                    ],
                                                    onchange: function(item) {
                                                        scope.action.getun_desc(item);
                                                    },
                                                    nameField: "item_name",
                                                    type: 'basLov',
                                                    lovtype: 'getitm',
                                                    width: 110
                                                },
                                                "item_name": {
                                                    displayName: "产品名称",
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
                                                "item_desc": {
                                                    displayName: "产品规格",
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
                                                    relationfield: [
                                                        { findfield: "pro_desc", tofield: "pro_desc" },
                                                        { findfield: "item_un", tofield: "unit" }
                                                    ],
                                                    onchange: function(item) {
                                                        scope.action.getun_desc(item);
                                                    },
                                                    nameField: "pro_desc",
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
                                                    onchange: function(item) {
                                                        scope.action.getun_desc(item);
                                                    },
                                                    relationfield: [
                                                        { findfield: "un_desc", tofield: "un_desc" },
                                                    ],
                                                    nameField: "un_desc",
                                                    type: 'basLov',
                                                    lovtype: 'getunit',
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
                                                "ioqty": {
                                                    displayName: "已领量",
                                                    readonly: true,
                                                    type: 'basNumber',
                                                    lovtype: '',
                                                    width: 110
                                                },
                                                "ware_nbr": {
                                                    displayName: "仓库",
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
                                //页签B--结束
                            ]
                        }


                    ]
                }
            };
            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        ctl: "N",
                        status: "10",
                        clt_status: "10",
                        art_status: "10",
                        statusdesc: "N10",
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
                            url: "mak/makbah/" + scope.model.uid,
                            mockUrl: "plugins/data/makbah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshmakbah", {});
                        });
                    });
                },
                readord: function() {
                    var para = {
                        sure: "Y",
                        status: "10,20",
                        ismakbah: "makbah"
                    }
                    qwsys.getdocument("getmakordbat", para, function(selectmodel) {
                        scope.model.nbrdate = selectmodel.nbrdate;
                        scope.model.ord_nbr = selectmodel.nbr;
                        scope.model.ord_uid = selectmodel.uid;
                        scope.model.item_nbr = selectmodel.item_nbr;
                        scope.model.item_desc = selectmodel.item_desc;
                        scope.model.pro_nbr = selectmodel.pro_nbr;
                        scope.model.unit = selectmodel.unit;
                        scope.model.qty = selectmodel.qty - selectmodel.mioqty;
                        scope.model.plan_date = selectmodel.plan_date;
                        scope.model.desc_no = selectmodel.desc_no;
                        scope.action.getdetail();
                    });


                },
                getdetail: function() {
                    // 根据 产品编号 查找到 生产流程 和 用料明细两张表的内容
                    // 生产流程
                    var obj = {
                        item_nbr: scope.model.item_nbr,
                        // pro_nbr: "",
                        // filterfields: "item_nbr,pro_nbr",
                    }
                    utils.ajax({
                        method: 'POST',
                        url: "bas/invpps/invpro",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: obj
                    }).then(function(res) {
                        scope.model.makbats = [];
                        res.data.body.content.forEach(element => {
                            scope.model.makbats.push({
                                item_nbr: scope.model.item_nbr,
                                item_name: element.item_name,
                                pro_nbr: element.pro_nbr,
                                pro_desc: element.pro_desc,
                                unit: element.unit,
                                un_desc: element.un_desc,
                                ware_nbr: element.ware_nbr,
                                ware_desc: element.ware_desc,
                                qty: scope.model.qty,
                                pro_qty: scope.model.qty * element.pro_qty,
                                plan_date: scope.model.plan_date
                            })
                        });

                    });

                    qwsys.show_bom(scope.model.item_nbr, "", scope.model.qty, "N", "Y", "N").then(function(res) {
                        var ret = res.data.body;
                        scope.model.makbat1s = [];
                        ret.forEach(element => {
                            scope.model.makbat1s.push({
                                item_nbr: element.item_nbr,
                                item_name: element.item_name,
                                item_desc: element.item_desc,
                                pro_nbr: element.pro_nbr,
                                unit: element.unit,
                                ware_nbr: element.ware_nbr,
                                qty: element.qty * element.over_qty
                            })
                        });
                        // scope.model.makbat1 = ret;
                    })

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
                            url: "mak/makbah/" + scope.uid,
                            mockUrl: "plugins/data/makbah.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.formstatus = "view";
                            scope.model.statusdesc = scope.model.ctl + scope.model.status;
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
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/makbah",
                        mockUrl: "plugins/data/makbah.detail.json",
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
                        scope.refreshtab("refreshmakbah", {});
                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                audit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/makbah/audit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("审核成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshordbah", {});

                    });

                },
                unaudit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "mak/makbah/unaudit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshordbah", {});

                    });
                },
                getun_desc: function(item) {
                    var page = {
                        page: 0,
                        size: 1
                    };
                    var filter = {
                        unit: item.unit,
                    };
                    qwsys.getlovrecord(filter, page, "getunit").then(function(res) {
                        rec = res.data.body.content[0];
                        if (rec) {
                            item.un_desc = rec.un_desc
                        }
                    });
                }
            };
            scope.action.load();
        });

});