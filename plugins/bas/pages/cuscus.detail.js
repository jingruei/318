define(function() {
    angular.module('app').controller('bas.cuscus.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            var scope = $scope;
            scope.uid = "";
            if ($rootScope.uid) {
                scope.uid = $rootScope.uid;
                $rootScope.uid = "";
            };
            if ($rootScope.cus_nbr) {
                scope.cus_nbr = $rootScope.cus_nbr;
                $rootScope.cus_nbr = "";
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
                            "cus_nbr": {
                                "title": "客户编号",
                                "type": "string"
                            },
                            "big_key": {
                                "title": "译音码",
                                "type": "string"
                            },
                            "area_nbr": {
                                "title": "地区名称",
                                "type": "string"
                            },
                            "cus_alias": {
                                "title": "客户简称",
                                "type": "string"
                            },
                            "cus_name": {
                                "title": "客户名称",
                                "type": "string"
                            },
                            "cus_addr": {
                                "title": "客户地址",
                                "type": "string"
                            },
                            "sen_addr": {
                                "title": "送货地址",
                                "type": "string"
                            },
                            "ivc_addr": {
                                "title": "发票地址",
                                "type": "string"
                            },
                            "email_addr": {
                                "title": "E-MAIL地址",
                                "type": "string"
                            },
                            "eng_name": {
                                "title": "英文名称",
                                "type": "string"
                            },
                            "addr_e": {
                                "title": "英文地址",
                                "type": "string"
                            },
                            "cus_gun": {
                                "title": "统一编号",
                                "type": "string"
                            },
                            "cus_fax": {
                                "title": "传真机号码",
                                "type": "string"
                            },
                            "attname": {
                                "title": "负责人",
                                "type": "string"
                            },
                            "oew_amt": {
                                "title": "资本额",
                                "type": "number"
                            },
                            "acc_amt": {
                                "title": "年营业额",
                                "type": "number"
                            },
                            "beg_date": {
                                "title": "创立日期",
                                "type": "datePicker"
                            },
                            "remark1": {
                                "title": "订货习惯",
                                "type": "string"
                            },
                            "remark2": {
                                "title": "客户评等",
                                "type": "string"
                            },
                            "remark3": {
                                "title": "厂商性质",
                                "type": "string"
                            },
                            "remark4": {
                                "title": "厂商类别",
                                "type": "string"
                            },
                            "remark5": {
                                "title": "开发票方式",
                                "type": "string"
                            },
                            "remark6": {
                                "title": "业种别",
                                "type": "string"
                            },
                            "remark7": {
                                "title": "收款方式",
                                "type": "string"
                            },
                            "pay_term": {
                                "title": "交易方式",
                                "type": "string"
                            },
                            "tax_type": {
                                "title": "税别",
                                "type": "string"
                            },
                            "days": {
                                "title": "月结日",
                                "type": "string"
                            },
                            "days1": {
                                "title": "付票票期",
                                "type": "number"
                            },
                            "days2": {
                                "title": "请款日",
                                "type": "number"
                            },
                            "days3": {
                                "title": "付款日",
                                "type": "number"
                            },
                            "ddate": {
                                "title": "开始交易日",
                                "type": "datePicker"
                            },
                            "sale_inv": {
                                "title": "营业项目",
                                "type": "string"
                            },
                            "cus_lev": {
                                "title": "单价等级",
                                "type": "string"
                            },
                            "sale_nbr": {
                                "title": "业务员",
                                "type": "string"
                            },
                            "tot_amt": {
                                "title": "授信额度",
                                "type": "number"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "l_update": {
                                "title": "最近异动日期",
                                "type": "datePicker"
                            },
                            "l_shpdate": {
                                "title": "最近交易日期",
                                "type": "datePicker"
                            },

                            "m_date": {
                                "title": "唛头最後编辑日期",
                                "type": "datePicker"
                            },
                            "logtype": {
                                "title": "唛头LOG图形",
                                "type": "string"
                            },
                            "logtxt": {
                                "title": "唛头LOG文字",
                                "type": "string"
                            },
                            "fmiltle": {
                                "title": "正唛头",
                                "type": "string"
                            },
                            "dmiltle": {
                                "title": "侧唛头",
                                "type": "string"
                            },
                            "cellphone": {
                                "title": "大哥大",
                                "type": "string"
                            },
                            "acounter": {
                                "title": "会计",
                                "type": "string"
                            },
                            "a_tel": {
                                "title": "电话3",
                                "type": "string"
                            },
                            "a_oth": {
                                "title": "分机3",
                                "type": "string"
                            },
                            "http": {
                                "title": "网站",
                                "type": "string"
                            },
                            "mail_nbr": {
                                "title": "邮递区号",
                                "type": "string"
                            },
                            "mail_no1": {
                                "title": "邮递区号",
                                "type": "string"
                            },
                            "mail_no2": {
                                "title": "邮递区号",
                                "type": "string"
                            },
                            "shp_desc": {
                                "title": "业务性质",
                                "type": "string"
                            },
                            "shp_1": {
                                "title": "业务说明",
                                "type": "string"
                            },
                            "service_tp": {
                                "title": "服务别",
                                "type": "string"
                            },
                            "tax_cal": {
                                "title": "税额计算方式",
                                "type": "number"
                            }

                        }
                    },
                    form: [{
                            title: "基本信息",
                            type: "region",
                            css: "max-4",
                            items: [{
                                    title: "客户编号",
                                    key: 'cus_nbr',
                                    placeholder: "空白自动产生",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "客户名称",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'cus_name',
                                    css: "cell2",
                                    type: 'basString'
                                },
                                {
                                    title: "客户简称",
                                    required: true,
                                    key: 'cus_alias',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "译音码",
                                    key: 'big_key',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
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
                                    type: 'basString'
                                },



                            ]
                        },
                        {
                            title: "基本信息",
                            type: "tabs",
                            css: "max-4",
                            tabs: [{
                                    title: "基本资料",
                                    items: [{
                                            title: "负责人",
                                            key: 'attname',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "客户电话",
                                            key: 'cus_tel',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "分机",
                                            key: 'cus_oth',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "传真机号码",
                                            key: 'cus_fax',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "手机",
                                            key: 'cellphone',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "营业项目",
                                            key: 'sale_inv',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            css: "cell2",
                                            type: 'basString'
                                        },
                                        {
                                            title: "业务性质",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'shp_desc',
                                            css: "cell100",
                                            type: 'basLovm',
                                            lovtype: "getword"
                                        },
                                        {
                                            title: "税额计算方式",
                                            key: 'tax_cal',
                                            titleMap: [
                                                { value: 1, name: "依发票税额" },
                                                { value: 2, name: "依结帐月份" }
                                            ],
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basLov',
                                            lovtype: "select"
                                        },
                                        {
                                            title: "开始交易日",
                                            key: 'ddate',
                                            readonly: true,
                                            type: 'basString'
                                        },
                                        {
                                            title: "最近交易日期",
                                            key: 'l_shpdate',
                                            readonly: true,
                                            type: 'basString'
                                        },
                                        {
                                            title: "最近异动日期",
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
                                    title: "交易",
                                    items: [{
                                            title: "币别",
                                            key: 'coin_nbr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: "basLov",
                                            lovtype: 'getcoin'
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
                                            type: "basLov",
                                            lovtype: 'gettax'
                                        },
                                        {
                                            title: "统一编号",
                                            key: 'cus_gun',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "授信额度",
                                            key: 'tot_amt',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basNumber'
                                        },

                                        {
                                            title: "月结日",
                                            key: 'days',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "付款条件",
                                            key: 'pay_term',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: "basLov",
                                            lovtype: 'getpay'
                                        },
                                        {
                                            title: "单价等级",
                                            key: 'cus_lev',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            titleMap: [
                                                { value: "A", name: "A" },
                                                { value: "B", name: "B" },
                                                { value: "C", name: "C" },
                                                { value: "D", name: "D" },
                                                { value: "E", name: "E" }
                                            ],
                                            type: "basLov",
                                            lovtype: 'select'
                                        },
                                        {
                                            title: "请款日",
                                            key: 'days2',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "付款日",
                                            key: 'days3',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basNumber'
                                        }


                                    ]
                                },
                                {
                                    title: "进阶",
                                    items: [{
                                            title: "创立日期",
                                            key: 'beg_date',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basEsydatetime'
                                        },
                                        {
                                            title: "资本额",
                                            key: 'oew_amt',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "年营业额",
                                            key: 'acc_amt',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basNumber'
                                        }

                                        ,
                                        {
                                            title: "订货习惯",
                                            key: 'remark1',
                                            type: 'basString'
                                        },
                                        {
                                            title: "客户类别",
                                            key: 'remark4',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        }


                                    ]
                                },
                                {
                                    title: "地址/备注",
                                    items: [{
                                            title: "客户地址",
                                            key: 'cus_addr',
                                            css: "cell2",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "送货地址",
                                            css: "cell2",
                                            key: 'sen_addr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "地区",
                                            key: 'area_nbr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basLov',
                                            lovtype: "getare"
                                        },
                                        {
                                            title: "邮区",
                                            key: 'mail_no1',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "发票地址",
                                            key: 'ivc_addr',
                                            css: "cell2",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "发票区号",
                                            key: 'mail_no2',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "E-MAIL地址",
                                            key: 'email_addr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "网站",
                                            css: "cell2",
                                            key: 'http',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
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
                                            type: 'basTextarea'
                                        }



                                    ]
                                },
                                {
                                    title: "贸易",
                                    items: [

                                        {
                                            title: "英文名称",
                                            key: 'eng_name',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basTextarea'
                                        },
                                        {
                                            title: "英文地址",
                                            key: 'addr_e',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basTextarea'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                }
            };
            scope.action = {
                add: function(event) {
                    scope.model = {
                        formstatus: "add", //edit,view
                        coin_nbr: sysconstant.SYS_COIN,
                        tax_type: sysconstant.SYS_TAX,
                        pay_term: sysconstant.SYS_PAY,
                        days: 25,
                    }
                    $scope.$broadcast('schemaFormRedraw');
                },
                edit: function() {
                    scope.model.formstatus = "edit"
                    scope.$broadcast("GridRedraw");
                },
                del: function() {
                    dialog.confirm('确定删除当前数据?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "bas/cuscus/" + scope.model.uid,
                            mockUrl: "plugins/data/cuscus.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                            }
                            scope.refreshtab("refreshcuscus", {});

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
                    if (scope.cus_nbr) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "bas/cuscus/getbycusnbr/" + scope.cus_nbr,
                            mockUrl: "plugins/data/cuscus.detail.json"
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
                    } else if (scope.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "bas/cuscus/" + scope.uid,
                            mockUrl: "plugins/data/cuscus.detail.json"
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
                        url: "bas/cuscus",
                        mockUrl: "plugins/data/cuscus.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        scope.cus_nbr = "";
                        scope.uid = res.data.body.uid
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshcuscus", {});

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