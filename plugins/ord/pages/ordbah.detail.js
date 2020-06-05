define(function() {
    angular.module('app').controller('ord.ordbah.detail',
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
                                { field: "formstatus", status: "add,edit,read" } //表單新增狀態
                            ]
                        },
                        action: function(event, form) {
                            scope.action.add(event);
                        }
                    },
                    save: {
                        name: "存檔",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //表單為新增，修改狀態
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
                                { field: "formstatus", status: "add,edit" }, //表單為新增，修改狀態
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
                                { field: "formstatus", status: "view" }, //查詢狀態   
                                { field: "sure", status: "N" }
                            ]
                        },
                        action: function(event, form) {
                            scope.action.edit(event);
                        }
                    },
                    del: { //分配狀態下還可以刪除
                        name: "刪除",
                        icon: "fa-remove",
                        htmlClass: "deletestyle",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //查詢狀態   
                                { field: "sure", status: "N" }
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
                        }
                    },
                    audit: {
                        name: "審核",
                        icon: "fa-calendar-check-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表單新增狀態
                                { field: "sure", status: "N" } //已審核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.audit(event);
                        }
                    },
                    unaudit: {
                        name: "反審",
                        icon: "fa-calendar-times-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表單新增狀態
                                { field: "status", status: "10" },
                                { field: "sure", status: "Y" } //已審核
                            ]
                        },
                        action: function(event, form) {
                            scope.action.unaudit(event);
                        }
                    },
                    readquo: {
                        name: "讀取報價單",
                        icon: "fa-file-text-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "edit,add" }, //表單為新增，修改狀態
                            ]
                        },
                        action: function(event, form) {
                            scope.action.readquo(event);
                        }
                    },
                    refresh: {
                        name: "刷新",
                        icon: "fa-refresh",
                        htmlClass: "refresh",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表單為新增，修改狀態
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
                                "title": "單據號碼",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "日期",
                                "type": "string"
                            },
                            "plan_date": {
                                "title": "預計出貨日",
                                "type": "string"
                            },
                            "ctot_amt": {
                                "title": "幣別總金額",
                                "type": "number"
                            },
                            "cus_nbr": {
                                "title": "客戶代號",
                                "type": "string"
                            },
                            "sale_nbr": {
                                "title": "業務員",
                                "type": "string"
                            },
                            "coin_nbr": {
                                "title": "幣別",
                                "type": "string"
                            },
                            "pay_term": {
                                "title": "交易方式",
                                "type": "string"
                            },
                            "remark": {
                                "title": "備註",
                                "type": "string"
                            },
                            "status": {
                                "title": "狀態",
                                "type": "string"
                            }

                        }
                    },
                    form: [{
                            type: "group",
                            title: "基礎訊息",
                            items: [{
                                    title: "單據號碼",
                                    key: 'nbr',
                                    readonly: true,
                                    placeholder: "自動生成",
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
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "預計出貨日",
                                    key: 'plan_date',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "訂購總額",
                                    key: 'ctot_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "客戶代號",
                                    key: 'cus_nbr',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "cus_alias", tofield: "cus_alias" },
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
                                    }

                                },
                                {
                                    title: "業務員",
                                    key: 'sale_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
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
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getpay'
                                },
                                {
                                    title: "幣別",
                                    key: 'coin_nbr',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "coin_per", tofield: "coin_per" }
                                    ],
                                    onchange: function(item) {
                                        if (item.coin_nbr == sysConstant.SYS_COIN) {
                                            item.coin_per = 1;
                                        }

                                    },
                                    type: 'basLov',
                                    nameField: "coin_desc",
                                    lovtype: 'getcoin'
                                },
                                {
                                    title: "備注",
                                    key: 'remark',
                                    css: "cell2",
                                    editStatus: {
                                        relation: "and",
                                        filedList: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "狀態",
                                    key: 'statusdesc',
                                    readonly: true,
                                    titleMap: [
                                        { value: "N10", name: "【未審核】【未出貨】" },
                                        { value: "Y10", name: "【已審核】【未出貨】" },
                                        { value: "Y20", name: "【已審核】【出貨中】" },
                                        { value: "Y30", name: "【已審核】【已結案】" },
                                        { value: "Y40", name: "【已審核】【手動結案】" }
                                    ],
                                    type: 'basStatus',
                                    lovtype: ''
                                },
                                {
                                    title: "匯率",
                                    key: 'coin_per',
                                    required: true,
                                    readonlystatus: {
                                        relation: "or",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單為新增，修改狀態
                                            { field: "coin_nbr", status: sysconstant.SYS_COIN }
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                            ]
                        },
                        //下面為行明細
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "訂單行"
                        },
                        {
                            title: "訂單行",
                            key: 'ordbats',
                            type: "basEditgrid",
                            gridkey: "ord.ordbah.detail",
                            css: "cell100",
                            action: {
                                add: {
                                    editstatus: {
                                        relation: "or",
                                        editstatus: {
                                            relation: "and",
                                            filedlist: [
                                                { field: "formstatus", status: "add,edit" }, //表單為新增，修改狀態
                                            ]
                                        },
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" }, //表單新增狀態
                                        ]
                                    },
                                    click: function() {
                                        var item = {
                                            isdel: false,
                                            status: "10",
                                            plan_date: scope.model.plan_date
                                        }
                                        scope.model.ordbats.push(item);
                                    }
                                },
                                del: {
                                    editstatus: {
                                        relation: "or",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" }, //表單新增狀態
                                        ]
                                    },
                                    click: function(item) {
                                        item.isdel = true;
                                    }
                                }
                            },
                            headers: {
                                "desc_no": {
                                    displayName: "客戶訂單號",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    type: 'basDefault',
                                    width: 110
                                },
                                "cus_item": {
                                    displayName: "客戶產品編號",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                    displayName: "產品編號",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                    lovtype: 'getitm',
                                    width: 110
                                },
                                "item_name": {
                                    displayName: "產品名稱",
                                    readonly: true,
                                    width: 110
                                },
                                "item_desc": {
                                    displayName: "規格",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                    displayName: "數量",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                    displayName: "單位",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    onchange: function(item) {
                                        qwsys.f_shp_pri(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                            item.price = res.data.body;
                                            if (item.qty) {
                                                item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                                scope.counttot_amt();
                                            }
                                        })
                                    },
                                    type: 'basLov',
                                    nameField: "un_desc",
                                    lovtype: 'getuns', //獲取輔助單位
                                    width: 110
                                },
                                "c_price": {
                                    displayName: "單價",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                    displayName: "標準售價",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "c_amt": {
                                    displayName: "金額",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "plan_date": {
                                    displayName: "預計出貨日",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: '',
                                    width: 110
                                },
                                "in_box": {
                                    displayName: "內盒",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                    displayName: "凈重",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "cuft": {
                                    displayName: "才數",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "cut": {
                                    displayName: "折數",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "pack_qty": {
                                    displayName: "總箱數",
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 60
                                },
                                "remark": {
                                    displayName: "備注",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
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
                                    title: "創建人",
                                    labelHtmlClass: "inherit",
                                    fieldHtmlClass: "inherit",
                                    type: 'basLabel',
                                    key: 'createPid'
                                },
                                {
                                    title: "創建時間",
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
                                    title: "修改時間",
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
                    dialog.confirm('確定刪除當前數據?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "ord/ordbah/" + scope.model.uid,
                            mockUrl: "plugins/data/ordbah.detail.json"
                        }).then(function(res) {
                            toastr.info("數據刪除成功!!!");
                            scope.uid = "";
                            scope.action.add();


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
                            url: "ord/ordbah/" + scope.uid,
                            mockUrl: "plugins/data/ordbah.detail.json"
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
                        toastr.warning("請輸入必填項！");
                        return
                    }
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "ord/ordbah",
                        mockUrl: "plugins/data/ordbah.detail.json",
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
                        scope.refreshtab("refreshordbah", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                audit: function() {

                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "ord/ordbah/audit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("審核成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshordbah", {});

                    });

                },
                unaudit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "ord/ordbah/unaudit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反審成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshordbah", {});

                    });
                },
                readquo: function() {

                    if (!scope.model.cus_nbr || !scope.model.coin_nbr) {
                        toastr.info("請選擇業客戶/幣別!!!");
                        return
                    }
                    var para = {
                            cus_nbr: scope.model.cus_nbr,
                            over_date: scope.model.nbrdate,
                            coin_nbr: scope.model.coin_nbr

                        }
                        // var cols = scope.config.form.form[2].headers;
                    qwsys.getdocuments("getquobat", para, function(selectmodel) {
                        var tag = false;
                        if (selectmodel.type == "rep") {
                            scope.model.ordbats.forEach(function(element) {
                                element.isdel = true;
                            }, this);
                        }
                        if (selectmodel.records.length > 0) {
                            selectmodel.records.forEach(function(element) {
                                var item = {
                                    desc_no: scope.model.desc_no,
                                    cus_item: element.cus_item,
                                    item_nbr: element.item_nbr,
                                    item_name: element.item_name,
                                    item_desc: element.item_desc,
                                    pro_nbr: element.pro_nbr,
                                    unit: element.unit,
                                    qty: element.qty,
                                    c_price: element.c_price,
                                    c_amt: element.c_amt,
                                    remark: element.remark
                                }
                                scope.model.ordbats.push(item)
                            }, this);
                            scope.counttot_amt();
                        }
                    });


                }
            };



            scope.counttot_amt = function() {
                var tot_amt = 0;
                scope.model.ordbats.forEach(function(item) {
                    if (!item.isdel) {
                        tot_amt = tot_amt + (item.c_amt ? item.c_amt : 0);
                    }
                }, this);
                scope.model.ctot_amt = tot_amt;
            }
            scope.action.load();
        });

});