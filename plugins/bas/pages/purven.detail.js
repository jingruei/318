define(function() {
    angular.module('app').controller('bas.purven.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            var scope = $scope;
            scope.uid = "";
            if ($rootScope.uid) {
                scope.uid = $rootScope.uid;
                $rootScope.uid = "";
            };
            scope.ven_nbr = "";
            if ($rootScope.ven_nbr) {
                scope.ven_nbr = $rootScope.ven_nbr;
                $rootScope.ven_nbr = "";
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
                            "ven_nbr": {
                                "title": "厂商编号",
                                "type": "string",
                                required: true
                            },
                            "big_key": {
                                "title": "译音码",
                                "type": "string"
                            },
                            "ven_alias": {
                                "title": "厂商简称",
                                "type": "string"
                            },
                            "area_nbr": {
                                "title": "地区名称",
                                "type": "string"
                            },
                            "ven_name": {
                                "title": "厂商名称",
                                "type": "string"
                            },
                            "ven_addr": {
                                "title": "公司地址",
                                "type": "string"
                            },
                            "sen_addr": {
                                "title": "工厂地址",
                                "type": "string"
                            },
                            "ivc_addr": {
                                "title": "发票地址",
                                "type": "string"
                            },
                            "ven_gun": {
                                "title": "统一编号",
                                "type": "string"
                            },
                            "ven_num": {
                                "title": "营利事业登记证",
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
                            "http": {
                                "title": "网站",
                                "type": "string"
                            },
                            "ven_fax": {
                                "title": "传真机号码",
                                "type": "string"
                            },
                            "staffs": {
                                "title": "员工人数",
                                "type": "number"
                            },
                            "attname": {
                                "title": "负责人",
                                "type": "string"
                            },
                            "attname1": {
                                "title": "连络人1",
                                "type": "string"
                            },
                            "attname2": {
                                "title": "连络人2",
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
                            "ven_bank": {
                                "title": "往来银行&帐号",
                                "type": "string"
                            },
                            "remark7": {
                                "title": "付款方式",
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
                            "pro_nbr": {
                                "title": "主要制程",
                                "type": "string"
                            },
                            "sale_inv": {
                                "title": "营业项目",
                                "type": "string"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            },
                            "ware_nbr": {
                                "title": "委外仓库",
                                "type": "string"
                            },
                            "l_update": {
                                "title": "最近异动日期",
                                "type": "string"
                            },
                            "l_shpdate": {
                                "title": "最近交易日期",
                                "type": "string"
                            },

                            "email_addr": {
                                "title": "E-MAIL地址",
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
                            "chk_desc": {
                                "title": "票据抬头",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            title: "厂商信息",
                            type: "region",
                            css: "max-4",
                            items: [{
                                    title: "厂商编号",
                                    placeholder: "空白自动产生",
                                    key: 'ven_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "厂商名称",
                                    required: true,
                                    key: 'ven_name',
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
                                    title: "厂商简称",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'ven_alias',
                                    type: 'basString'
                                },
                                {
                                    title: "译音码",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'big_key',
                                    type: 'basString'
                                },
                                {
                                    title: "票据抬头",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'chk_desc',
                                    type: 'basString'
                                }


                            ]
                        },


                        {
                            title: "基本信息",
                            type: "tabs",
                            css: "max-4",
                            tabs: [{
                                    title: "基本信息",
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
                                            title: "电话",
                                            key: 'ven_tel',
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
                                            title: "传真机号码",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'ven_fax',
                                            type: 'basString'
                                        },
                                        {
                                            title: "分机",
                                            key: 'pur_oth',
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
                                            css: "cell100",
                                            type: 'basLovm',
                                            lovtype: "getword"
                                        },
                                        {
                                            title: "建档日期",
                                            key: 'created',
                                            readonly: true,
                                            type: 'basString'
                                        },
                                        {
                                            title: "建档人员",
                                            readonly: true,
                                            key: 'crt_user',
                                            type: 'basString'
                                        },
                                        {
                                            title: "最近修改日期",
                                            readonly: true,
                                            key: 'updated',
                                            type: 'basString'
                                        },
                                        {
                                            title: "最近修改人员",
                                            readonly: true,
                                            key: 'edit_user',
                                            type: 'basString'
                                        }
                                    ]
                                },
                                {
                                    title: "进阶",
                                    items: [{
                                            title: "资本额",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'oew_amt',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "年营业额",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'acc_amt',
                                            type: 'basNumber'
                                        },
                                        {
                                            title: "营利事业登记证",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'ven_num',
                                            type: 'basString'
                                        },
                                        {
                                            title: "员工人数",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'staffs',
                                            type: 'basNumber'
                                        }


                                    ]
                                },
                                {
                                    title: "地址/备注",
                                    items: [{
                                            title: "公司地址",
                                            css: "cell2",
                                            key: 'ven_addr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "邮递区号",
                                            key: 'mail_nbr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "工厂地址",
                                            css: "cell2",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'sen_addr',
                                            type: 'basString'
                                        },
                                        {
                                            title: "邮递区号",
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
                                            css: "cell2",
                                            key: 'ivc_addr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "邮递区号",
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
                                            title: "网站",
                                            key: 'http',
                                            css: "cell100",
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
                                            type: 'textarea'
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
                                            title: "业务性质",
                                            key: 'shp_desc',
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
                                            key: 'ven_gun',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "交易方式",
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            key: 'pay_term',
                                            type: "basLov",
                                            lovtype: 'getpay'
                                        },
                                        {
                                            title: "往来银行",
                                            key: 'ven_bank',
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
                                            title: "银行帐号",
                                            key: 'ven_bankcode',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            css: "cell2",
                                            type: 'basString'
                                        }
                                    ]
                                },
                                {
                                    title: "仓库/制程",
                                    items: [{
                                            title: "委外仓库",
                                            key: 'ware_nbr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: "basLov",
                                            lovtype: 'getwar'
                                        },
                                        {
                                            title: "主要制程",
                                            key: 'pro_nbr',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: "basLov",
                                            lovtype: 'getpro'
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
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        coin_nbr: sysconstant.SYS_COIN,
                        tax_type: sysconstant.SYS_TAX,
                        pay_term: sysconstant.SYS_PAY
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
                            url: "bas/purven/" + scope.model.uid,
                            mockUrl: "plugins/data/purven.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                            }
                            scope.refreshtab("refreshpurven", {});

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
                    if (scope.ven_nbr) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "bas/purven/getbyvennbr/" + scope.ven_nbr,
                            mockUrl: "plugins/data/purven.detail.json"
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
                            url: "bas/purven/" + scope.uid,
                            mockUrl: "plugins/data/purven.detail.json"
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
                        url: "bas/purven",
                        mockUrl: "plugins/data/purven.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        scope.uid = res.data.body.uid
                        scope.ven_nbr = "";
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshpurven", {});

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