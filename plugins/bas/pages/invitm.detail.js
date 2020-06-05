define(function() {
    angular.module('app').controller('bas.invitm.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys) {
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
                            "item_nbr": {
                                "title": "产品编号",
                                "type": "string"
                            },
                            "big_key": {
                                "title": "译音码",
                                "type": "string"
                            },
                            "q_code": {
                                "title": "查询码",
                                "type": "string"
                            },
                            "item_desc": {
                                "title": "产品描述",
                                "type": "string"
                            },
                            "item_name": {
                                "title": "产品名称",
                                "type": "string"
                            },
                            "item_alias": {
                                "title": "产品简称",
                                "type": "string"
                            },
                            "eng_name": {
                                "title": "英文说明",
                                "type": "string"
                            },
                            "rec_un": {
                                "title": "进货单位",
                                "type": "string"
                            },
                            "item_un": {
                                "title": "库存单位",
                                "type": "string"
                            },
                            "sales_un": {
                                "title": "销售单位",
                                "type": "string"
                            },
                            "ud_oh_ctl": {
                                "title": "异动库存",
                                "type": "string"
                            },
                            "safety_qty": {
                                "title": "安全存量",
                                "type": "number"
                            },
                            "ware_nbr": {
                                "title": "储存仓库",
                                "type": "string"
                            },
                            "item_type": {
                                "title": "料品型态",
                                "type": "string"
                            },
                            "m_type": {
                                "title": "料品类别",
                                "type": "string"
                            },
                            "i_type": {
                                "title": "料品来源",
                                "type": "string"
                            },
                            "a_in_qty": {
                                "title": "采购单位量",
                                "type": "number"
                            },
                            "ven_nbr": {
                                "title": "采购厂商",
                                "type": "string"
                            },
                            "item_nbr1": {
                                "title": "原料代号",
                                "type": "string"
                            },
                            "pro_nbr": {
                                "title": "原料制程",
                                "type": "string"
                            },
                            "mat_qty": {
                                "title": "原料耗用量",
                                "type": "number"
                            },
                            "mat_un": {
                                "title": "原料耗用单位",
                                "type": "string"
                            },
                            "unit_price": {
                                "title": "标准售价",
                                "type": "number"
                            },
                            "bot_price": {
                                "title": "最低售价",
                                "type": "number"
                            },
                            "pri_type": {
                                "title": "售价方式",
                                "type": "string"
                            },
                            "price_1": {
                                "title": "1级客户售价",
                                "type": "number"
                            },
                            "price_2": {
                                "title": "2级客户售价",
                                "type": "number"
                            },
                            "price_3": {
                                "title": "3级客户售价",
                                "type": "number"
                            },
                            "price_4": {
                                "title": "4级客户售价",
                                "type": "number"
                            },
                            "price_5": {
                                "title": "5级客户售价",
                                "type": "number"
                            },
                            "unit_cost": {
                                "title": "总成本",
                                "type": "number"
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
                            "in_box": {
                                "title": "内盒",
                                "type": "number"
                            },
                            "qty_pbox": {
                                "title": "外箱",
                                "type": "number"
                            },
                            "cuft": {
                                "title": "才数",
                                "type": "number"
                            },
                            "n_wight": {
                                "title": "净重",
                                "type": "number"
                            },
                            "g_wight": {
                                "title": "毛重",
                                "type": "number"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "oh_qty": {
                                "title": "库存量",
                                "type": "number"
                            },
                            "pur_qty": {
                                "title": "已定未进量",
                                "type": "number"
                            },
                            "ord_qty": {
                                "title": "已接单未出货量",
                                "type": "number"
                            },
                            "sub_qty": {
                                "title": "已委外未收回量",
                                "type": "number"
                            },
                            "newdate": {
                                "title": "新价实施日",
                                "type": "string"
                            },
                            "l_shpdate": {
                                "title": "最後交易日",
                                "type": "string"
                            },
                            "l_update": {
                                "title": "最近异动日期",
                                readonly: true,
                                "type": "string"
                            },
                            "image": {
                                "title": "图档",
                                "type": "String"
                            },
                            "status": {
                                "title": "状态",
                                "type": "number"
                            },
                            "shp_desc": {
                                "title": "业务性质",
                                "type": "string"
                            },
                            "isedit": {
                                "title": "选取",
                                "type": "boolean"
                            },
                            "p_weight": {
                                "title": "产品单重",
                                "type": "string"
                            },
                            "cyc_time": {
                                "title": "加工总数",
                                "type": "number"
                            },
                            "item_ctl": {
                                "title": "种类",
                                "type": "string"
                            },
                            "cadfile": {
                                "title": "CAD文件",
                                "type": "string"
                            },
                            "l_edtdate": {
                                "title": "最近修改日",
                                readonly: true,
                                "type": "string"
                            },
                            "l_crtdate": {
                                "title": "最近建立日",
                                readonly: true,
                                "type": "string"
                            },
                            "sys_type": {
                                "title": "料号共用种类",
                                "type": "string"
                            },
                            "stock_desc": {
                                "title": "储位",
                                "type": "string"
                            },
                            "bar_code": {
                                "title": "条码编号",
                                "type": "string"
                            },
                            "bar_code2": {
                                "title": "自编码",
                                "type": "string"
                            },
                            "l_recdate": {
                                "title": "最後交易日",
                                "type": "string"
                            },
                            "last_price": {
                                "title": "最近进价",
                                "type": "number"
                            },
                            "last_ven": {
                                "title": "采购厂商",
                                "type": "string"
                            },
                            "itmdm": {
                                type: 'basDefault',
                                title: "产品DM"
                            }
                        },
                        required: ["item_nbr", "item_name", "item_desc", "item_alias", "item_un"]
                    },
                    form: [{
                            title: "基本信息",
                            type: "region",
                            css: "max-4",
                            items: [{
                                    title: "产品编号",
                                    placeholder: "空白自动产生",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'item_nbr',
                                    type: 'basString'
                                },
                                {
                                    title: "查询码",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'q_code',
                                    type: 'basDefault'
                                },
                                {
                                    title: "产品名称",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'item_name',
                                    css: "cell2",
                                    type: 'basDefault'
                                },
                                {
                                    title: "产品简称",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'item_alias',
                                    type: 'basDefault'
                                },
                                {
                                    title: "英文说明",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'eng_name',
                                    css: 'cell100',
                                    type: 'basDefault'
                                }

                            ]
                        },
                        {
                            type: "basTabs",
                            css: "max-4",
                            tabs: [{
                                    title: "一般",
                                    items: [{
                                            title: "规格说明",
                                            key: 'item_desc',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            css: 'cell100',
                                            type: 'basTextarea'
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
                                            css: 'cell100',
                                            type: 'basTextarea'
                                        },
                                        {
                                            title: "库存单位",
                                            key: 'item_un',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            relationfield: [
                                                { findfield: "un_desc", tofield: "item_un_desc" },
                                                { findfield: "unit", tofield: "rec_un" },
                                                { findfield: "unit", tofield: "sales_un" },
                                            ],
                                            required: true,
                                            onchange: function() {
                                                scope.changebasuns();
                                            },
                                            type: 'basLov',
                                            lovtype: "getunit"
                                        },
                                        {
                                            title: "进货单位",
                                            required: true,
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'rec_un',
                                            titleMap: [],
                                            type: 'basLov',
                                            lovtype: "select"
                                        },
                                        {
                                            title: "销售单位",
                                            required: true,
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'sales_un',
                                            type: 'basLov',
                                            titleMap: [],
                                            lovtype: "select"
                                        },
                                        {
                                            title: "料品类别",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'm_type',
                                            type: 'basLov',
                                            lovtype: "getmtype"
                                        },

                                        {
                                            title: "标准售价",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'unit_price',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "最低售价",
                                            key: 'bot_price',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basNumber'
                                        },

                                        {
                                            title: "新价实施日",

                                            key: 'newdate',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basEsydatetime'
                                        },
                                        {
                                            title: "最後出货日",

                                            key: 'l_shpdate',
                                            readonly: true,
                                            type: 'basString'
                                        },
                                        {
                                            title: "最後进货日",
                                            key: 'l_recdate',
                                            readonly: true,
                                            type: 'basString'
                                        },
                                        {
                                            title: "最近异动日期",
                                            key: 'l_update',
                                            readonly: true,
                                            type: 'basString'
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
                                            css: "cell2",
                                            titleMap: [
                                                { value: 1, name: "正常供货" },
                                                { value: 2, name: "缺货中" },
                                                { value: 3, name: "即将停产" },
                                                { value: 4, name: "停产" }
                                            ],
                                            type: 'basRadiosinline'
                                        },

                                        {
                                            title: "最近修改日",
                                            key: 'updated',
                                            readonly: true,
                                            type: 'basString'
                                        },
                                        {
                                            title: "建档日期",
                                            key: 'created',
                                            readonly: true,
                                            type: 'basString'
                                        }

                                    ]
                                },
                                {
                                    title: "制程",
                                    items: [{
                                            title: "原料代号",
                                            key: 'item_nbr1',
                                            css: "cell2",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            relationfield: [
                                                { findfield: "item_un", tofield: "mat_un" },
                                                { findfield: "item_name", tofield: "item_name1" },
                                            ],
                                            additionalField: {
                                                type: "string",
                                                key: "item_name1",
                                                readonly: true,
                                                title: "原料名称"
                                            },
                                            type: 'basLov',
                                            lovtype: "getitm"
                                        },
                                        {
                                            title: "原料单位",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'mat_un',
                                            type: 'basLov',
                                            lovfilter: [
                                                { field: "item_nbr", modelfield: "item_nbr1" },
                                                { field: "pro_nbr", modelfield: "pro_nbr" }
                                            ],
                                            lovtype: "getuns"
                                        },
                                        {
                                            title: "原料制程",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'pro_nbr',
                                            type: 'basLov',
                                            lovtype: "getpro"
                                        },
                                        {
                                            title: "耗用量",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'mat_qty',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "加工天数",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'cyc_time',
                                            type: 'basNumber'
                                        },

                                        {
                                            title: "原料成本",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'matl_cost',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "制程成本",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'labor_cost',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "其他成本",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'other_cost',
                                            type: 'basNumber'
                                        }

                                    ]
                                },
                                {
                                    title: "库存",
                                    items: [{
                                            title: "仓库",
                                            key: 'ware_nbr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            required: true,
                                            type: 'basLov',
                                            lovtype: "getwar"
                                        },
                                        {
                                            title: "安全存量",
                                            key: 'safety_qty',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "料品来源",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'i_type',
                                            titleMap: [
                                                { value: "1", name: "采购品" },
                                                { value: "2", name: "制成品" }

                                            ],
                                            type: 'basLov',
                                            lovtype: "select"
                                        },
                                        {
                                            title: "每次采购量",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'a_in_qty',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "采购厂商",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'ven_nbr',
                                            type: 'basLov',
                                            lovtype: "getven"
                                        },
                                        {
                                            title: "异动库存",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'ud_oh_ctl',
                                            titleMap: [
                                                { value: "Y", name: "是" },
                                                { value: "N", name: "否" }

                                            ],
                                            type: 'basLov',
                                            lovtype: "select"
                                        },
                                        {
                                            title: "总成本",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'unit_cost',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "储位",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'stock_desc',
                                            type: 'basDefault'
                                        },
                                        {
                                            title: "最近进价",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'last_price',
                                            type: 'basNumber'
                                        }

                                    ]
                                },
                                {
                                    title: "图示",
                                    items: [{
                                        title: "产品图档",
                                        key: "image",
                                        css: "cell100",
                                        editstatus: {
                                            relation: "and",
                                            filedlist: [
                                                { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                            ]
                                        },
                                        type: "basGetgallery",
                                        options: {
                                            multiple: 5,
                                            maxMB: 20
                                        }
                                    }]
                                },
                                {
                                    title: "产品售价",
                                    items: [{
                                            type: "basColumns",
                                            items: [{
                                                    title: "A级折扣",
                                                    key: 'aprice_1',
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    type: 'basNumberpas'
                                                },
                                                {
                                                    title: "B级折扣",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    key: 'aprice_2',
                                                    type: 'basNumberpas'
                                                },
                                                {
                                                    title: "C级折扣",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    key: 'aprice_3',
                                                    type: 'basNumberpas'
                                                },
                                                {
                                                    title: "D级折扣",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    key: 'aprice_4',
                                                    type: 'basNumberpas'
                                                },
                                                {
                                                    title: "E级折扣",
                                                    key: 'aprice_5',
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    type: 'basNumberpas'
                                                }
                                            ]
                                        },
                                        {

                                            type: "basColumns",
                                            items: [{
                                                    title: "A级实价",
                                                    key: 'bprice_1',
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    type: 'basNumberamt'
                                                },
                                                {
                                                    title: "B级实价",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    key: 'bprice_2',
                                                    type: 'basNumberamt'
                                                },
                                                {
                                                    title: "C级实价",
                                                    key: 'bprice_3',
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    type: 'basNumberamt'
                                                },
                                                {
                                                    title: "D级实价",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    key: 'bprice_4',
                                                    type: 'basNumberamt'
                                                },
                                                {
                                                    title: "E级实价",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    key: 'bprice_5',
                                                    type: 'basNumberamt'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: "辅助单位",
                                    items: [{
                                            key: 'basunss',
                                            titleico: "fa-bus",
                                            css: "max-4",
                                            type: "basTable",
                                            action: {
                                                add: {
                                                    title: "添加单位",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    click: function() {
                                                        if (!scope.model.basunss) {
                                                            scope.model.basunss = [];
                                                        }
                                                        scope.model.basunss.push({

                                                        });
                                                    }
                                                },
                                                del: {
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                        ]
                                                    },
                                                    click: function(data, index) {
                                                        data.splice(index, 1);
                                                        scope.changebasuns();
                                                    }
                                                }
                                            },
                                            schema: {
                                                "type": "object",
                                                "properties": {
                                                    "unit": {
                                                        "title": "单位",
                                                        "type": "string"
                                                    }

                                                }
                                            },
                                            "items": [{
                                                type: "basTablerow",
                                                title: "",
                                                items: [{
                                                        title: "辅助单位",
                                                        key: 'unit',
                                                        editstatus: {
                                                            relation: "and",
                                                            filedlist: [
                                                                { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                            ]
                                                        },
                                                        relationfield: [{
                                                            findfield: "un_desc",
                                                            tofield: "un_desc"
                                                        }],
                                                        onchange: function() {
                                                            scope.changebasuns();

                                                        },
                                                        type: 'basLov',
                                                        lovtype: "getunit"
                                                    },
                                                    {
                                                        title: "系数",
                                                        key: 'factor',
                                                        editstatus: {
                                                            relation: "and",
                                                            filedlist: [
                                                                { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                            ]
                                                        },
                                                        type: 'basNumber'
                                                    }
                                                ]
                                            }]
                                        }

                                    ]
                                }

                            ]
                        }

                    ],
                }
            };
            scope.changebasuns = function() {
                    var basunsmap = [];
                    if (scope.model.item_un) {
                        var item = {
                            value: scope.model.item_un,
                            name: scope.model.item_un_desc
                        }
                        basunsmap.push(item);
                    }
                    scope.model.basunss.forEach(function(element) {
                        var item = {
                            value: element.unit,
                            name: element.un_desc
                        }
                        basunsmap.push(item);

                    }, this);

                    scope.config.form.form[1].tabs[0].items[3].titleMap = basunsmap;
                    scope.config.form.form[1].tabs[0].items[4].titleMap = basunsmap;
                }
                // scope.$watch("model.basunss", function(newvalue, oldvalue) {
                //     scope.changebasuns();

            // })
            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        i_type: "1",
                        basunss: []
                    }
                },
                edit: function() {
                    scope.model.formstatus = "edit"
                    scope.$broadcast("GridRedraw");
                },
                del: function() {
                    dialog.confirm('确定删除当前数据?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "bas/invitm/" + scope.model.uid,
                            mockUrl: "plugins/data/invitm.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                            }
                            scope.refreshtab("refreshinvitm", {});

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
                            url: "bas/invitm/" + scope.uid,
                            mockUrl: "plugins/data/invitm.detail.json"
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
                            scope.changebasuns();
                        });
                    } else {
                        scope.action.add();
                        scope.bakmodel = angular.copy(scope.model);
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
                        url: "bas/invitm",
                        mockUrl: "plugins/data/invitm.detail.json",
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
                        scope.refreshtab("refreshinvitm", {});

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