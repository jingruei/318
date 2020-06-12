define(function() {
    angular.module('app').controller('bas.cuscus.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            let scope = $scope;
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
                                { field: "formstatus", status: "view" } //查詢狀態                              
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
                                { field: "formstatus", status: "view" } //表單查詢狀態                             
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
                            "cus_nbr": {
                                "title": "客戶編號",
                                "type": "string"
                            },
                            "big_key": {
                                "title": "譯音碼",
                                "type": "string"
                            },
                            "area_nbr": {
                                "title": "地區名稱",
                                "type": "string"
                            },
                            "cus_alias": {
                                "title": "客戶簡稱",
                                "type": "string"
                            },
                            "cus_name": {
                                "title": "客戶名稱",
                                "type": "string"
                            },
                            "cus_addr": {
                                "title": "客戶地址",
                                "type": "string"
                            },
                            "sen_addr": {
                                "title": "送貨地址",
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
                                "title": "英文名稱",
                                "type": "string"
                            },
                            "addr_e": {
                                "title": "英文地址",
                                "type": "string"
                            },
                            "cus_gun": {
                                "title": "統一編號",
                                "type": "string"
                            },
                            "cus_fax": {
                                "title": "傳真機號碼",
                                "type": "string"
                            },
                            "attname": {
                                "title": "負責人",
                                "type": "string"
                            },
                            "oew_amt": {
                                "title": "資本額",
                                "type": "number"
                            },
                            "acc_amt": {
                                "title": "年營業額",
                                "type": "number"
                            },
                            "beg_date": {
                                "title": "創立日期",
                                "type": "datePicker"
                            },
                            "remark1": {
                                "title": "訂貨習慣",
                                "type": "string"
                            },
                            "remark2": {
                                "title": "客戶評等",
                                "type": "string"
                            },
                            "remark3": {
                                "title": "廠商性質",
                                "type": "string"
                            },
                            "remark4": {
                                "title": "廠商類別",
                                "type": "string"
                            },
                            "remark5": {
                                "title": "開发票方式",
                                "type": "string"
                            },
                            "remark6": {
                                "title": "業種別",
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
                                "title": "稅別",
                                "type": "string"
                            },
                            "days": {
                                "title": "月結日",
                                "type": "string"
                            },
                            "days1": {
                                "title": "付票票期",
                                "type": "number"
                            },
                            "days2": {
                                "title": "請款日",
                                "type": "number"
                            },
                            "days3": {
                                "title": "付款日",
                                "type": "number"
                            },
                            "ddate": {
                                "title": "開始交易日",
                                "type": "datePicker"
                            },
                            "sale_inv": {
                                "title": "營業項目",
                                "type": "string"
                            },
                            "cus_lev": {
                                "title": "單價等級",
                                "type": "string"
                            },
                            "sale_nbr": {
                                "title": "業務員",
                                "type": "string"
                            },
                            "tot_amt": {
                                "title": "授信額度",
                                "type": "number"
                            },
                            "remark": {
                                "title": "備注",
                                "type": "string"
                            },
                            "l_update": {
                                "title": "最近異動日期",
                                "type": "datePicker"
                            },
                            "l_shpdate": {
                                "title": "最近交易日期",
                                "type": "datePicker"
                            },

                            "m_date": {
                                "title": "嘜頭最後編輯日期",
                                "type": "datePicker"
                            },
                            "logtype": {
                                "title": "嘜頭LOG圖形",
                                "type": "string"
                            },
                            "logtxt": {
                                "title": "嘜頭LOG文字",
                                "type": "string"
                            },
                            "fmiltle": {
                                "title": "正嘜頭",
                                "type": "string"
                            },
                            "dmiltle": {
                                "title": "側嘜頭",
                                "type": "string"
                            },
                            "cellphone": {
                                "title": "大哥大",
                                "type": "string"
                            },
                            "acounter": {
                                "title": "會計",
                                "type": "string"
                            },
                            "a_tel": {
                                "title": "電話3",
                                "type": "string"
                            },
                            "a_oth": {
                                "title": "分機3",
                                "type": "string"
                            },
                            "http": {
                                "title": "網站",
                                "type": "string"
                            },
                            "mail_nbr": {
                                "title": "郵遞區號",
                                "type": "string"
                            },
                            "mail_no1": {
                                "title": "郵遞區號",
                                "type": "string"
                            },
                            "mail_no2": {
                                "title": "郵遞區號",
                                "type": "string"
                            },
                            "shp_desc": {
                                "title": "業務性質",
                                "type": "string"
                            },
                            "shp_1": {
                                "title": "業務說明",
                                "type": "string"
                            },
                            "service_tp": {
                                "title": "服務別",
                                "type": "string"
                            },
                            "tax_cal": {
                                "title": "稅額計算方式",
                                "type": "number"
                            }

                        }
                    },
                    form: [{
                            title: "基本信息",
                            type: "region",
                            css: "max-4",
                            items: [{
                                    title: "客戶編號",
                                    key: 'cus_nbr',
                                    placeholder: "空白自動產生",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "客戶名稱",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    key: 'cus_name',
                                    css: "cell2",
                                    type: 'basString'
                                },
                                {
                                    title: "客戶簡稱",
                                    key: 'cus_alias',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "譯音碼",
                                    key: 'big_key',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "負責人",
                                    key: 'attname',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "組別",
                                    key: 'group_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                        ]
                                    },
                                    relationfield: [
                                        {findfield: "group_name", tofield: "group_name"},
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getgroup',
                                    additionalField: {
                                        key: "group_name",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    nameField: "group_name"
                                },
                                {
                                    title: "主辦會計",
                                    key: 'attname3',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "稱謂",
                                    key: 'call1',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                            ]
                        },
                        {
                            title: "基本訊息",
                            type: "tabs",
                            css: "max-4",
                            tabs: [{
                                    title: "基本資料",
                                    items: [
                                        {
                                            title: "客戶電話1",
                                            key: 'cus_tel1',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "分機1",
                                            key: 'cus_oth1',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "營業項目",
                                            key: 'sale_inv',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            css: "cell2",
                                            type: 'basString'
                                        },
                                        {
                                            title: "手機",
                                            key: 'cellphone',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "傳真機號碼",
                                            key: 'cus_fax',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "稅籍編號",
                                            key: 'tax_nbr',
                                            type: 'basString'
                                        },
                                        {
                                            title: "稽徵機關代號",
                                            key: 'chk_nbr',
                                            type: 'basString'
                                        },
                                        {
                                            title: "統一編號",
                                            key: 'cus_gun',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "業務性質",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            key: 'shp_desc',
                                            css: "cell100",
                                            type: 'basTextarea'
                                        }
                                        

                                    ]
                                },
                                {
                                    title: "稅務服務1",
                                    items: [
                                        {
                                            title: "每期憑證收取方式",
                                            key: 'buy_invo',
                                            titleMap: [
                                                { value: 1, name: "是" },
                                                { value: 2, name: "否，自行購買" }
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
                                        //T
                                        {
                                            title: "每期幾日前送交",
                                            key: 'day4',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: "basNumber"
                                        },
                                        {
                                            title: "每期憑證收取方式",
                                            key: 'tax_get',
                                            titleMap: [
                                                { value: 1, name: "客戶寄來或送來" },
                                                { value: 2, name: "親自收取" },
                                                { value: 3, name: "不一定" }
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
                                            title: "每期憑證收取日期",
                                            key: 'vou_day',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: "basNumber"
                                        },
                                        {
                                            title: "營業稅申報方式",
                                            key: 'sal_tax',
                                            titleMap: [
                                                { value: 1, name: "401" },
                                                { value: 2, name: "403" },
                                                { value: 3, name: "直接扣抵法" },
                                                { value: 4, name: "間接扣抵法" },
                                                { value: 5, name: "按月" },
                                                { value: 6, name: "按期" },
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
                                            title: "發票開立方式",
                                            key: 'mak_invo',
                                            titleMap: [
                                                { value: 1, name: "手開" },
                                                { value: 2, name: "收銀機" },
                                                { value: 3, name: "電子計算機" },
                                                { value: 4, name: "電子發票" },
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
                                            title: "營利事業所得稅結算申報方式",
                                            key: 'set_ment',
                                            titleMap: [
                                                { value: 1, name: "書審" },
                                                { value: 2, name: "成本逕決" },
                                                { value: 3, name: "查帳" },
                                                { value: 4, name: "簽證" },
                                                { value: 5, name: "其它" },
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

                                    ]
                                },
                                {
                                    title: "稅務服務2",
                                    items: [
                                        {
                                            title: "特殊交易問題",
                                            key: 'spe_que',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basTextarea'
                                        },
                                    ]
                                },
                                {
                                    title: "稅務服務3",
                                    items: [
                                        {
                                            title: "營業稅",
                                            key: 'note_sal',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basTextarea'
                                        },
                                        {
                                            title: "帳務",
                                            key: 'note_acc',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basTextarea'
                                        },
                                        {
                                            title: "扣繳",
                                            key: 'note_acc1',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basTextarea'
                                        },
                                        {
                                            title: "所得稅",
                                            key: 'note_sal1',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basTextarea'
                                        }
                                    ]
                                },
                                {
                                    title: "聯絡人",
                                    items:[{}]
                                },
                                {
                                    title: "地址/備註",
                                    items: [{
                                            title: "登記地址",
                                            key: 'cus_addr',
                                            css: "cell2",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "聯絡地址",
                                            css: "cell2",
                                            key: 'sen_addr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "郵遞區號",
                                            key: 'mail_nbr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
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
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "網站",
                                            css: "cell2",
                                            key: 'http',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "備註",
                                            key: 'remark',
                                            css: "cell100",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                                ]
                                            },
                                            type: 'basTextarea'
                                        }

                                    ]
                                },
                               
                            ]
                        }
                    ],
                }
            };
            scope.action = {
                add: function(event) {
                    scope.model = {
                        formstatus: "add", //edit,view
                    }
                    $scope.$broadcast('schemaFormRedraw');
                },
                edit: function() {
                    scope.model.formstatus = "edit"
                    scope.$broadcast("GridRedraw");
                },
                del: function() {
                    dialog.confirm('確定刪除當前數據?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "bas/cuscus/" + scope.model.uid,
                            mockUrl: "plugins/data/cuscus.detail.json"
                        }).then(function(res) {
                            toastr.info("數據刪除成功!!!");
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
                            url: `customer/${scope.uid}`,
                            mockUrl: "plugins/data/cuscus.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data;
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
                            url: `customer/${scope.uid}`,
                            mockUrl: "plugins/data/cuscus.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data;
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

                    console.log(scope.model);
                    

                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "customer",
                        mockUrl: "plugins/data/cuscus.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        scope.cus_nbr = res.data.cus_nbr;
                        scope.uid = res.data.uid
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