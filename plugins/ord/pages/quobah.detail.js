define(function() {
    angular.module('app').controller('ord.quobah.detail',
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
                            "nbr": {
                                "title": "单据号码",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "日期",
                                "type": "string"
                            },
                            "over_date": {
                                "title": "有效日期",
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
                                    title: "有效日期",
                                    key: 'over_date',
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
                                    title: "币别总金额",
                                    key: 'ctot_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
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
                                        { findfield: "sale_nbr", tofield: "sale_nbr" },
                                        { findfield: "pay_term", tofield: "pay_term" },
                                        { findfield: "coin_nbr", tofield: "coin_nbr" }
                                    ],
                                    type: 'basLov',
                                    nameField: "cus_alias",
                                    lovtype: 'getcus',
                                    additionalField: {
                                        key: "cus_alias",
                                        readonly: true,
                                        type: "basString"
                                    }
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
                                        if (item.coin_nbr == sysconstant.sys_coin) {
                                            item.coin_per = 1;
                                        }

                                    },
                                    type: 'basLov',
                                    nameField: "coin_desc",
                                    lovtype: 'getcoin'
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
                                    key: 'status',
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: ''
                                }
                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "报价行"
                        },
                        {
                            title: "报价行",
                            key: 'quobats',
                            type: "basEditgrid",
                            gridkey: "ord.quobah.detail",
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
                                        scope.model.quobats.push(item);
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
                                            qwsys.f_shp_pri(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                                item.c_price = res.data.body;
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
                                        qwsys.f_shp_pri(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                            item.c_price = res.data.body;
                                            if (item.qty) {
                                                item.c_amt = (item.qty ? item.qty : 0) * (item.c_price ? item.c_price : 0);
                                                scope.counttot_amt();
                                            }
                                        })
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
                                        qwsys.f_shp_pri(scope.model.nbrdate, scope.model.cus_nbr, item.item_nbr, item.pro_nbr, item.unit, scope.model.coin_nbr).then(function(res) {
                                            item.c_price = res.data.body;
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

                        }


                    ]
                }
            };
            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        nbrdate: qwsys.gettoday(),
                        plan_date: qwsys.getplanday(),
                        over_date: qwsys.getplanday()
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
                            url: "ord/quobah/" + scope.model.uid,
                            mockUrl: "plugins/data/quobah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                            }
                            scope.refreshtab("refreshquobah", {});

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
                            url: "ord/quobah/" + scope.uid,
                            mockUrl: "plugins/data/quobah.detail.json"
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
                        url: "ord/quobah",
                        mockUrl: "plugins/data/quobah.detail.json",
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
                        scope.refreshtab("refreshquobah", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                }
            };

            scope.counttot_amt = function() {
                var tot_amt = 0;
                scope.model.quobats.forEach(function(item) {
                    tot_amt = tot_amt + item.c_amt;
                }, this);
                scope.model.ctot_amt = tot_amt;
            }
            scope.action.load();
        });

});