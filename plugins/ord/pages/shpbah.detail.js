define(function() {
    angular.module('app').controller('ord.shpbah.detail',
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
                                { field: "is_sure", status: "N" }
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
                                { field: "is_sure", status: "N" }
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
                                { field: "is_sure", status: "N" } //已审核
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
                                { field: "is_sure", status: "Y" } //已审核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.unaudit(event);
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
                    print: {
                        name: "打印",
                        icon: "fa-print",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表单新增状态
                                { field: "is_sure", status: "Y" } //已审核
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

                            "ctot_amt": {
                                "title": "币别总金额",
                                "type": "number"
                            },
                            "cus_nbr": {
                                "title": "客户代号",
                                "type": "string"
                            },
                            "sale_nbr": {
                                "title": "业务员",
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
                                    title: "单据类别",
                                    key: 'io_p',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表单为新增，修改状态
                                        ]
                                    },
                                    required: true,
                                    type: 'basLov',
                                    titleMap: [
                                        { value: "1", name: "出" },
                                        { value: "2", name: "退" }
                                    ],
                                    lovtype: 'select'
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
                                    lovtype: '',
                                    onchange: function() {

                                        qwsys.getCusAcrmon(scope.model.cus_nbr, scope.model.nbrdate).then(function(res) {
                                            scope.model.acr_mon = res.data.body;
                                        })
                                    }
                                },
                                {
                                    title: "税别",
                                    key: 'tax_type',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function(item) {
                                        scope.counttot_amt();
                                    },
                                    type: 'basLov',
                                    lovtype: 'gettax'
                                },
                                {
                                    title: "客户代号",
                                    key: 'cus_nbr',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "cus_alias", tofield: "cus_alias" },
                                        { findfield: "cus_nbr", tofield: "cen_cus" },
                                        { findfield: "cus_alias", tofield: "cen_alias" },
                                        { findfield: "tax_type", tofield: "tax_type" },
                                        { findfield: "sale_nbr", tofield: "sale_nbr" },
                                        { findfield: "pay_term", tofield: "pay_term" },
                                        { findfield: "coin_nbr", tofield: "coin_nbr" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getcus',
                                    additionalField: {
                                        key: "cus_alias",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    nameField: "cus_alias",
                                    onchange: function(item) {
                                        qwsys.getcoin_per(scope.model.coin_nbr).then(function(res) {
                                            item.coin_per = res.data.body;
                                        })
                                        qwsys.getsysvar("ord", "sys_wareo").then(function(res) {
                                            item.ware_nbr = res.data.body;
                                        })

                                        qwsys.getCusAcrmon(item.cus_nbr, item.nbrdate).then(function(res) {
                                            item.acr_mon = res.data.body;
                                        })

                                        scope.counttot_amt();


                                    }

                                },
                                {
                                    title: "结帐月份",
                                    key: 'acr_mon',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: "basEsydatetime",
                                    format: "YYYYMM",
                                    lovtype: ''
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
                                        scope.counttot_amt();


                                    },
                                    type: 'basLov',
                                    nameField: "coin_desc",
                                    lovtype: 'getcoin'
                                },
                                {
                                    title: "税额",
                                    key: 'ctax_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "指送客户",
                                    key: 'cen_cus',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "cus_alias", tofield: "cen_alias" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getcus',
                                    additionalField: {
                                        key: "cen_alias",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    nameField: "cen_alias",
                                    onchange: function(item) {

                                    }

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
                                    lovtype: '',
                                    onchange: function() {
                                        scope.counttot_amt();
                                    }
                                },

                                {
                                    title: "未税总额",
                                    key: 'ctot_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "出货仓库",
                                    key: 'ware_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    nameField: "ware_desc",
                                    lovtype: 'getwar'
                                },
                                {
                                    title: "业务员",
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
                                    title: "状态",
                                    key: 'is_sure',
                                    readonly: true,
                                    titleMap: [
                                        { value: "Y", name: "【已审核】" },
                                        { value: "N", name: "【未审核】" }

                                    ],
                                    type: 'basStatus',
                                    lovtype: ''
                                },
                                {
                                    title: "出货总额",
                                    key: 'cttot_amt',
                                    readonly: true,
                                    type: 'basNumber',
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
                                },

                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "订单行"
                        },
                        {
                            title: "订单行",
                            key: 'shpbats',
                            type: "basEditgrid",
                            gridkey: "ord.shpbah.detail",
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
                                            ware_nbr: scope.model.ware_nbr,
                                            isdel: false
                                        }
                                        scope.model.shpbats.push(item);
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
                                        scope.counttot_amt();
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
                                "cus_item": {
                                    displayName: "客户产品编号",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    onchange: function(item) {
                                        qwsys.getcusitm(scope.model.cus_nbr, item.cus_item).then(function(res) {
                                            var cusitm = res.data.body;
                                            item.item_nbr = cusitm.item_nbr;
                                            item.item_name = cusitm.item_name;
                                            item.item_desc = cusitm.item_desc;
                                            item.pro_nbr = cusitm.pro_nbr;
                                            item.unit = cusitm.unit;
                                            item.un_desc = cusitm.un_desc;
                                            qwsys.f_shp_cusitm(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                                cusitm = res.data.body;
                                                item.c_price = cusitm.price;
                                                item.in_box = cusitm.in_box;
                                                item.qty_pbox = cusitm.qty_pbox;
                                                item.n_wight = cusitm.n_wight;
                                                item.g_wight = cusitm.g_wight;
                                                item.cuft = cusitm.cuft;
                                                if (item.qty) {
                                                    item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                                    scope.counttot_amt();
                                                }
                                            })


                                        })
                                    },
                                    lovtype: '',
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
                                        { findfield: "sales_un", tofield: "unit" },
                                        { findfield: "unit_price", tofield: "unit_price" }
                                    ],
                                    onchange: function(item) {
                                        qwsys.f_shp_cusitm(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                            cusitm = res.data.body;
                                            item.c_price = cusitm.price;
                                            item.in_box = cusitm.in_box;
                                            item.qty_pbox = cusitm.qty_pbox;
                                            item.n_wight = cusitm.n_wight;
                                            item.g_wight = cusitm.g_wight;
                                            item.cuft = cusitm.cuft;
                                            if (item.qty) {
                                                item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                                scope.counttot_amt();
                                            }
                                        })
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
                                    },
                                    type: 'basLov',
                                    nameField: "item_name",
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
                                        { findfield: "item_un", tofield: "unit" }
                                    ],
                                    onchange: function(item) {
                                        qwsys.f_shp_cusitm(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                            cusitm = res.data.body;
                                            item.c_price = cusitm.price;
                                            item.in_box = cusitm.in_box;
                                            item.qty_pbox = cusitm.qty_pbox;
                                            item.n_wight = cusitm.n_wight;
                                            item.g_wight = cusitm.g_wight;
                                            item.cuft = cusitm.cuft;
                                            if (item.qty) {
                                                item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                                scope.counttot_amt();
                                            }
                                        })
                                    },
                                    type: 'basLov',
                                    nameField: "pro_desc",
                                    lovtype: 'getinvpro',
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
                                        if (item.qty_pbox) {
                                            item.pack_qty = Math.ceil(item.qty / item.qty_pbox);
                                        } else {
                                            item.pack_qty = 0;
                                        }
                                        item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                        scope.counttot_amt();
                                    },
                                    lovtype: '',
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
                                        qwsys.f_shp_cusitm(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                            cusitm = res.data.body;
                                            item.c_price = cusitm.price;
                                            item.in_box = cusitm.in_box;
                                            item.qty_pbox = cusitm.qty_pbox;
                                            item.n_wight = cusitm.n_wight;
                                            item.g_wight = cusitm.g_wight;
                                            item.cuft = cusitm.cuft;
                                            if (item.qty) {
                                                item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                                scope.counttot_amt();
                                            }
                                        })
                                    },
                                    type: 'basLov',
                                    nameField: "un_desc",
                                    lovtype: 'getuns', //获取辅助单位
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
                                        item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                        scope.counttot_amt();
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "unit_price": {
                                    displayName: "标准售价",
                                    readonly: true,
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
                                "ware_nbr": {
                                    displayName: "仓库",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basLov',
                                    nameField: "ware_desc",
                                    lovtype: 'getwar',
                                    width: 110
                                },
                                "in_box": {
                                    displayName: "内盒",
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
                                "qty_pbox": {
                                    displayName: "外箱",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function(entity) {
                                        if (entity.qty_pbox) {
                                            entity.pack_qty = Math.ceil(entity.qty / entity.qty_pbox);
                                        } else {
                                            entity.pack_qty = 0;
                                        }
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "n_wight": {
                                    displayName: "净重",
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
                                "g_wight": {
                                    displayName: "毛重",
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
                                "cuft": {
                                    displayName: "才数",
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
                                "pack_qty": {
                                    displayName: "总箱数",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 60
                                },
                                "cut": {
                                    displayName: "折数",
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
                        is_sure: "N",
                        status: "10",
                        io_p: "1",
                        nbrdate: qwsys.gettoday(),
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
                            url: "ord/shpbah/" + scope.model.uid,
                            mockUrl: "plugins/data/shpbah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshshpbah", {});

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
                            url: "ord/shpbah/" + scope.uid,
                            mockUrl: "plugins/data/shpbah.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            // scope.model.statusdesc = (scope.model.is_sure ? scope.model.is_sure : "N") + (scope.model.status ? scope.model.status : "10")
                            scope.model.formstatus = "view";
                            scope.model.cttot_amt = scope.model.ctot_amt + scope.model.ctax_amt;
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
                        url: "ord/shpbah",
                        mockUrl: "plugins/data/shpbah.detail.json",
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
                        scope.refreshtab("refreshshpbah", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                audit: function() {

                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "ord/shpbah/audit",
                        mockUrl: "plugins/data/shpbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("审核成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshshpbah", {});

                    });

                },
                unaudit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "ord/shpbah/unaudit",
                        mockUrl: "plugins/data/shpbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshshpbah", {});

                    });
                },
                readord: function() {

                    if (!scope.model.cus_nbr || !scope.model.coin_nbr) {
                        toastr.info("请选择业客户/币别!!!");
                        return
                    }
                    var para = {
                            cus_nbr: scope.model.cus_nbr,
                            coin_nbr: scope.model.coin_nbr,
                            sure: "Y",
                            status: scope.model.io_p == "1" ? "10,20" : "30"
                        }
                        // var cols = scope.config.form.form[2].headers;
                    qwsys.getdocuments("getordbat", para, function(selectmodel) {
                        var tag = false;
                        if (selectmodel.type == "rep") {
                            scope.model.shpbats.forEach(function(element) {
                                element.isdel = true;
                            }, this);
                        }
                        if (selectmodel.records.length > 0) {
                            selectmodel.records.forEach(function(element) {
                                var item = {
                                    ord_uid: element.uid,
                                    desc_no: element.desc_no,
                                    cus_item: element.cus_item,
                                    item_nbr: element.item_nbr,
                                    item_name: element.item_name,
                                    item_desc: element.item_desc,
                                    pro_nbr: element.pro_nbr,
                                    ware_nbr: scope.model.ware_nbr,
                                    unit: element.unit,
                                    qty: scope.model.io_p == "1" ? element.qty - element.ioqty : element.ioqty,
                                    c_price: element.c_price,
                                    c_amt: element.c_amt,
                                    remark: element.remark
                                }
                                scope.model.shpbats.push(item)
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
                    qwsys.exportReportPdfurl("shpbah", "ord/shpbah/getreportdata", para);
                }
            };



            scope.counttot_amt = function() {
                var ctot_amt = 0,
                    tot_amt = 0;
                scope.model.shpbats.forEach(function(item) {
                    if (!item.isdel) {
                        ctot_amt = ctot_amt + (item.c_amt ? item.c_amt : 0);
                        item.price = (item.c_price * scope.model.coin_per).toFixed(2);
                        item.amt = ((item.price * item.qty).toFixed(2)) * 1; //转成数字
                        tot_amt = tot_amt + item.amt;


                    }
                }, this);
                scope.model.ctot_amt = ctot_amt;

                qwsys.calculateTax(scope.model.tax_type, ctot_amt, "1").then(function(res) {
                    var map = res.data.body;
                    if (map) {
                        scope.model.ctot_amt = map.tot_amt;
                        scope.model.ctax_amt = map.tax_amt;
                        scope.model.cttot_amt = map.stot_amt;
                    }
                })
                qwsys.calculateTax(scope.model.tax_type, tot_amt, "2").then(function(res) {
                    var map = res.data.body;
                    if (map) {
                        scope.model.tot_amt = map.tot_amt;
                        scope.model.tax_amt = map.tax_amt;
                    }
                })
            }
            scope.action.load();
        });

});