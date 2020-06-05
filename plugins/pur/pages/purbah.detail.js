define(function() {
    angular.module('app').controller('pur.purbah.detail',
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
                                { field: "formstatus", status: "view" }, //查询状态   
                                { field: "sure", status: "N" }
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
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
                                { field: "status", status: "10" },
                                { field: "sure", status: "Y" } //已审核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.unaudit(event);
                        }
                    },
                    readpuo: {
                        name: "读取询价单",
                        icon: "fa-file-text-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "edit,add" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.readpuo(event);
                        }
                    },
                    print: {
                        name: "打印",
                        icon: "fa-print",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表单新增状态
                                { field: "sure", status: "Y" } //已审核
                            ]
                        },
                        action: function(event, scope) {
                            scope.action.print(event);
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
                            "plan_date": {
                                "title": "预计进货日",
                                "type": "string"
                            },
                            "ctot_amt": {
                                "title": "币别总金额",
                                "type": "number"
                            },
                            "ven_nbr": {
                                "title": "厂商代号",
                                "type": "string"
                            },
                            "sale_nbr": {
                                "title": "采购人员",
                                "type": "string"
                            },
                            "coin_nbr": {
                                "title": "币别",
                                "type": "string"
                            },
                            "pay_term": {
                                "title": "交易方式",
                                "type": "string"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "status": {
                                "title": "状态",
                                "type": "string"
                            }

                        }
                    },
                    form: [{
                            type: "group",
                            title: "基础信息",
                            items: [{
                                    title: "单据号码",
                                    key: 'nbr',
                                    readonly: true,
                                    placeholder: "自动产生",
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
                                    title: "预计进货日",
                                    key: 'plan_date',
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
                                    title: "订购总额",
                                    key: 'ctot_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "厂商代号",
                                    key: 'ven_nbr',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "ven_nbr", tofield: "ven_nbr1" },
                                        { findfield: "ven_alias", tofield: "ven_alias" },
                                        { findfield: "ven_alias", tofield: "ven_alias1" },
                                        { findfield: "sale_nbr", tofield: "sale_nbr" },
                                        { findfield: "pay_term", tofield: "pay_term" },
                                        { findfield: "coin_nbr", tofield: "coin_nbr" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getven',
                                    additionalField: {
                                        key: "ven_alias",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    onchange: function(item) {
                                        qwsys.getcoin_per(scope.model.coin_nbr).then(function(res) {
                                            item.coin_per = res.data.body;
                                        })
                                    }

                                },
                                {
                                    title: "采购人员",
                                    key: 'sale_nbr',
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
                                    title: "交易方式",
                                    key: 'pay_term',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getpay'
                                },
                                {
                                    title: "币别",
                                    key: 'coin_nbr',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "coin_per", tofield: "coin_per" }
                                    ],
                                    onchange: function(item) {
                                        if (item.coin_nbr == sysconstant.SYS_COIN) {
                                            item.coin_per = 1;
                                        }

                                    },
                                    type: 'basLov',
                                    lovtype: 'getcoin'
                                },
                                {
                                    title: "指送厂商",
                                    key: 'ven_nbr1',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "ven_alias", tofield: "ven_alias1" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getven',
                                    additionalField: {
                                        key: "ven_alias1",
                                        readonly: true,
                                        type: "basString"
                                    }


                                },
                                {
                                    title: "订单单据号",
                                    key: 'cus_ord',
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
                                    titleMap: [
                                        { value: "N10", name: "【未审核】【未收料】" },
                                        { value: "Y10", name: "【已审核】【未收料】" },
                                        { value: "Y20", name: "【已审核】【收料中】" },
                                        { value: "Y30", name: "【已审核】【已结案】" },
                                        { value: "Y40", name: "【已审核】【手动结案】" }
                                    ],
                                    type: 'basStatus',
                                    lovtype: ''
                                },
                                {
                                    title: "汇率",
                                    key: 'coin_per',
                                    required: true,
                                    readonlystatus: {
                                        relation: "or",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单为新增，修改状态
                                            { field: "coin_nbr", status: sysconstant.SYS_COIN }
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "备注",
                                    key: 'remark',
                                    css: "cell100",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                }
                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "采购行"
                        },
                        {
                            title: "采购行",
                            key: 'purbats',
                            type: "basEditgrid",
                            gridkey: "pur.purbah.detail",
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
                                            isdel: false,
                                            status: "10",
                                            plan_date: scope.model.plan_date,
                                            desc_no: scope.model.cus_ord
                                        }
                                        scope.model.purbats.push(item);
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
                                "desc_no": {
                                    displayName: "客户订单号",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    width: 110
                                },
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
                                        { findfield: "rec_un", tofield: "t_unit" }
                                    ],
                                    onchange: function(item) {
                                        qwsys.f_rec_pri(scope.model.ven_nbr, item.item_nbr, item.pro_nbr, item.t_unit, scope.model.coin_nbr).then(function(res) {
                                            item.c_price = res.data.body;
                                            qwsys.fact_um(item.item_nbr, item.pro_nbr, item.unit, item.t_unit).then(function(res) {
                                                var ract = res.data.body;
                                                if (item.qty) {
                                                    item.t_qty = (item.qty ? item.qty : 0) * ract;
                                                    item.c_amt = (item.t_qty ? item.t_qty : 0) * (item.c_price ? item.c_price : 0);
                                                    scope.counttot_amt();
                                                }
                                            })
                                        })





                                    },
                                    type: 'basLov',
                                    lovtype: 'getitm',
                                    width: 110
                                },
                                "item_name": {
                                    displayName: "产品名称",
                                    readonly: true,
                                    width: 110
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
                                    relationfield: [
                                        { findfield: "item_un", tofield: "unit" },
                                        { findfield: "rec_un", tofield: "t_unit" }
                                    ],
                                    onchange: function(item) {
                                        qwsys.f_rec_pri(scope.model.ven_nbr, item.item_nbr, item.pro_nbr, item.t_unit, scope.model.coin_nbr).then(function(res) {
                                            item.c_price = res.data.body;
                                            qwsys.fact_um(item.item_nbr, item.pro_nbr, item.unit, item.t_unit).then(function(res) {
                                                var ract = res.data.body;
                                                if (item.qty) {
                                                    item.t_qty = (item.qty ? item.qty : 0) * ract;
                                                    item.c_amt = (item.t_qty ? item.t_qty : 0) * (item.c_price ? item.c_price : 0);
                                                    scope.counttot_amt();
                                                }
                                            })
                                        })

                                    },
                                    type: 'basLov',
                                    lovtype: 'getinvpro',
                                    width: 110
                                },
                                "unit": {
                                    displayName: "单位",
                                    readonly: true,
                                    type: 'basLov',
                                    lovtype: 'getuns', //获取辅助单位
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
                                    onchange: function(item) {
                                        qwsys.fact_um(item.item_nbr, item.pro_nbr, item.unit, item.t_unit).then(function(res) {
                                            var ract = res.data.body;
                                            if (item.qty) {
                                                item.t_qty = (item.qty ? item.qty : 0) * ract;
                                                item.c_amt = (item.t_qty ? item.t_qty : 0) * (item.c_price ? item.c_price : 0);
                                                scope.counttot_amt();
                                            }
                                        })
                                    },
                                    lovtype: '',
                                    width: 110
                                },
                                "t_unit": {
                                    displayName: "计价单位",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(item) {
                                        qwsys.f_rec_pri(scope.model.ven_nbr, item.item_nbr, item.pro_nbr, item.t_unit, scope.model.coin_nbr).then(function(res) {
                                            item.c_price = res.data.body;
                                            qwsys.fact_um(item.item_nbr, item.pro_nbr, item.unit, item.t_unit).then(function(res) {
                                                var ract = res.data.body;
                                                if (item.qty) {
                                                    item.t_qty = (item.qty ? item.qty : 0) * ract;
                                                    item.c_amt = (item.t_qty ? item.t_qty : 0) * (item.c_price ? item.c_price : 0);
                                                    scope.counttot_amt();
                                                }
                                            })
                                        })
                                    },
                                    type: 'basLov',
                                    lovtype: 'getuns', //获取辅助单位
                                    width: 110
                                },
                                "t_qty": {
                                    displayName: "计价数量",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },

                                "c_price": {
                                    displayName: "单价",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(item) {
                                        item.c_amt = (item.t_qty ? item.t_qty : 0) * (item.c_price ? item.c_price : 0);
                                        scope.counttot_amt();
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "c_amt": {
                                    displayName: "金额",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "plan_date": {
                                    displayName: "预计交货日",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
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

                        },
                        {
                            title: "",
                            type: "basRegion",
                            css: "max-4",
                            htmlClass: "myBlock",
                            items: [{
                                    title: "创建人",
                                    labelHtmlClass: "inherit",
                                    fieldHtmlClass: "inherit",
                                    type: 'basLabel',
                                    key: 'createPid'
                                },
                                {
                                    title: "创建时间",
                                    labelHtmlClass: "inherit",
                                    fieldHtmlClass: "inherit",
                                    type: 'basLabel',
                                    key: 'created'
                                },
                                {
                                    title: "修改人",
                                    labelHtmlClass: "inherit",
                                    fieldHtmlClass: "inherit",
                                    type: 'basLabel',
                                    key: 'lastEditpid'
                                },
                                {
                                    title: "修改时间",
                                    labelHtmlClass: "inherit",
                                    fieldHtmlClass: "inherit",
                                    type: 'basLabel',
                                    key: 'updated'
                                }

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
                        sure: "N",
                        status: "10",
                        nbrdate: qwsys.gettoday(),
                        plan_date: qwsys.getplanday(),
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
                            url: "pur/purbah/" + scope.model.uid,
                            mockUrl: "plugins/data/purbah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshpurbah", {});


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
                            url: "pur/purbah/" + scope.uid,
                            mockUrl: "plugins/data/purbah.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.statusdesc = (scope.model.sure ? scope.model.sure : "N") + (scope.model.status ? scope.model.status : "10")
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
                        url: "pur/purbah",
                        mockUrl: "plugins/data/purbah.detail.json",
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
                        scope.refreshtab("refreshpurbah", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                audit: function() {

                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "pur/purbah/audit",
                        mockUrl: "plugins/data/purbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("审核成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshpurbah", {});

                    });

                },
                unaudit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "pur/purbah/unaudit",
                        mockUrl: "plugins/data/purbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshpurbah", {});

                    });
                },
                readpuo: function() {

                    if (!scope.model.ven_nbr || !scope.model.coin_nbr) {
                        toastr.info("请选择业厂商/币别!!!");
                        return
                    }
                    var para = {
                            ven_nbr: scope.model.ven_nbr,
                            over_date: scope.model.nbrdate,
                            coin_nbr: scope.model.coin_nbr

                        }
                        // var cols = scope.config.form.form[2].headers;
                    qwsys.getdocuments("getpuobat", para, function(selectmodel) {
                        var tag = false;
                        if (selectmodel.type == "rep") {
                            scope.model.purbats.forEach(function(element) {
                                element.isdel = true;
                            }, this);
                        }
                        if (selectmodel.records.length > 0) {
                            selectmodel.records.forEach(function(element) {
                                var item = {
                                    status: "10",
                                    desc_no: scope.model.cus_ord,
                                    item_nbr: element.item_nbr,
                                    item_name: element.item_name,
                                    item_desc: element.item_desc,
                                    pro_nbr: element.pro_nbr,
                                    unit: element.unit,
                                    qty: element.qty,
                                    t_unit: element.t_unit,
                                    t_qty: element.t_qty,
                                    c_price: element.c_price,
                                    c_amt: element.c_amt,
                                    remark: element.remark,
                                    plan_date: scope.model.plan_date
                                }

                                scope.model.purbats.push(item)
                            }, this);
                            scope.counttot_amt();
                        }
                    });


                },
                print: function() {
                    var para = {
                        uid: scope.model.uid,
                        pagesize: 0
                    }
                    qwsys.exportReportPdfurl("purbah", "pur/purbah/getreportdata", para);
                }


            };



            scope.counttot_amt = function() {
                var tot_amt = 0;
                scope.model.purbats.forEach(function(item) {
                    if (!item.isdel) {
                        tot_amt = tot_amt + (item.c_amt ? item.c_amt : 0);
                    }
                }, this);
                scope.model.ctot_amt = tot_amt;
            }
            scope.action.load();
        });

});