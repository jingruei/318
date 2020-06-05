define(function() {
    angular.module('app').controller('acr.acpbah.detail',
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
                                { field: "status", status: "10" }
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
                                { field: "status", status: "10" }
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
                                { field: "status", status: "10" } //已审核
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
                                { field: "status", status: "30" } //已审核
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
                                "title": "付款单代号",
                                "type": "string"
                            },
                            "ven_nbr": {
                                "title": "厂商代号",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "付款日期",
                                "type": "string"
                            },
                            "acr_mon": {
                                "title": "结帐月份",
                                "type": "string"
                            },
                            "aft_amt": {
                                "title": "累计应收",
                                "type": "number"
                            },
                            "chk_amt": {
                                "title": "票据付款",
                                "type": "number"
                            },
                            "other_amt": {
                                "title": "其他金额",
                                "type": "number"
                            },
                            "tot_acr": {
                                "title": "本期应收",
                                "type": "number"
                            },
                            "cash_amt": {
                                "title": "现金付款",
                                "type": "number"
                            },
                            "sale_nbr": {
                                "title": "业务员代号",
                                "type": "string"
                            },
                            "pre_amt": {
                                "title": "计入预收金额",
                                "type": "number"
                            },
                            "acc_nbr": {
                                "title": "会计传票",
                                "type": "string"
                            },
                            "tot_amt": {
                                "title": "可用冲款金额",
                                "type": "number"
                            },
                            "cut_amt": {
                                "title": "折让",
                                "type": "number"
                            },
                            "status": {
                                "title": "状态",
                                "type": "string"
                            },
                            "acr_class": {
                                "title": "交易类别",
                                "type": "string"
                            },
                            "ar_amt": {
                                "title": "金额",
                                "type": "number"
                            },
                            "chk_date": {
                                "title": "票据到期日",
                                "type": "string"
                            },
                            "io_nbr": {
                                "title": "票据号码",
                                "type": "string"
                            },
                            "b_nbr": {
                                "title": "银行代号",
                                "type": "string"
                            },
                            "remark": {
                                "title": "备注",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "付款头信息",
                            items: [{
                                    title: "付款单号",
                                    key: 'nbr',
                                    readonly: true,
                                    placeholder: "自动产生",
                                    type: 'basDefault',
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
                                        { findfield: "ven_alias", tofield: "ven_alias" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'getven',
                                    additionalField: {
                                        key: "ven_alias",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    onchange: function(item) {
                                        qwsys.getVenAcrmon(scope.model.ven_nbr, scope.model.nbrdate).then(function(res) {
                                            scope.model.acr_mon = res.data.body;
                                            qwsys.get_acp(scope.model.ven_nbr, scope.model.acr_mon).then(function(res) {
                                                var acrbal = res.data.body;
                                                if (acrbal) {
                                                    scope.model.tot_acr = acrbal.shp_amt + acrbal.tax_amt - acrbal.rshp_amt - acrbal.rtax_amt - acrbal.cut_amt;
                                                    scope.model.aft_amt = acrbal.bal_amt + acrbal.shp_amt + acrbal.tax_amt - acrbal.rshp_amt - acrbal.rtax_amt - acrbal.rec_amt - acrbal.cut_amt;
                                                }

                                            })
                                        })

                                    }
                                },

                                {
                                    title: "付款日期",
                                    key: 'nbrdate',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function() {
                                        qwsys.getVenAcrmon(scope.model.ven_nbr, scope.model.nbrdate).then(function(res) {
                                            scope.model.acr_mon = res.data.body;
                                            qwsys.get_acp(scope.model.ven_nbr, scope.model.acr_mon).then(function(res) {
                                                var acrbal = res.data.body;
                                                if (acrbal) {
                                                    scope.model.tot_acr = acrbal.shp_amt + acrbal.shp_tax - acrbal.rshp_amt - acrbal.rshp_tax - acrbal.cut_amt;
                                                    scope.model.aft_amt = acrbal.bal_amt + acrbal.shp_amt + acrbal.shp_tax - acrbal.rshp_amt - acrbal.rshp_tax - acrbal.rec_amt - acrbal.cut_amt;
                                                }


                                            })
                                        })
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "结帐月份",
                                    required: true,
                                    key: 'acr_mon',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function() {
                                        qwsys.get_acp(scope.model.ven_nbr, scope.model.acr_mon).then(function(res) {
                                            var acrbal = res.data.body;
                                            if (acrbal) {
                                                scope.model.tot_acr = acrbal.shp_amt + acrbal.shp_tax - acrbal.rshp_amt - acrbal.rshp_tax - acrbal.cut_amt;
                                                scope.model.aft_amt = acrbal.bal_amt + acrbal.shp_amt + acrbal.shp_tax - acrbal.rshp_amt - acrbal.rshp_tax - acrbal.rec_amt - acrbal.cut_amt;
                                            }

                                        })
                                    },
                                    type: "basEsydatetime",
                                    format: "YYYYMM"
                                },
                                {
                                    title: "本期应收",
                                    key: 'tot_acr',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "现金金额",
                                    key: 'cash_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "票据金额",
                                    key: 'chk_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "折让金额",
                                    key: 'cut_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },

                                {
                                    title: "累计应收",
                                    key: 'aft_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "其他金额",
                                    key: 'other_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
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
                                    title: "付款金额",
                                    key: 'tot_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "状态",
                                    key: 'status',
                                    readonly: true,
                                    titleMap: [
                                        { value: "10", name: "【未审核】" },
                                        { value: "30", name: "【已审核】" }
                                    ],
                                    type: 'basStatus'
                                }
                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "付款行信息"
                        },
                        {
                            title: "付款行信息",
                            key: 'acpbats',
                            type: "basEditgrid",
                            gridkey: "acr.acpbah.detail",
                            css: "cell100",
                            action: {
                                add: {
                                    editstatus: {
                                        relation: "or",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                        ]
                                    },
                                    click: function() {
                                        var item = {
                                            isdel: false,
                                            acr_class: "1"
                                        }
                                        scope.model.acpbats.push(item);
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
                                "acr_class": {
                                    displayName: "交易类别",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'select',
                                    onchange: function() {
                                        scope.counttot_amt();
                                    },
                                    titleMap: [
                                        { value: "1", name: "现金" },
                                        { value: "2", name: "票据" },
                                        { value: "3", name: "折让" },
                                        { value: "4", name: "其他" },
                                        { value: "5", name: "退现" },
                                        { value: "6", name: "退票" },
                                    ],
                                    width: 110
                                },
                                "ar_amt": {
                                    displayName: "金额",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    onchange: function() {
                                        scope.counttot_amt();

                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "chk_date": {
                                    displayName: "票据到期日",
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
                                "chk_nbr": {
                                    displayName: "票据号码",
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
                                "b_nbr": {
                                    displayName: "银行代号",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getbank',
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
                        status: "10",
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
                            url: "acr/acpbah/" + scope.model.uid,
                            mockUrl: "plugins/data/acpbah.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshacpbah", {});

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
                            url: "acr/acpbah/" + scope.uid,
                            mockUrl: "plugins/data/acpbah.detail.json"
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
                        url: "acr/acpbah",
                        mockUrl: "plugins/data/acpbah.detail.json",
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
                        scope.refreshtab("refreshacpbah", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                audit: function() {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "acr/acpbah/audit",
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
                        url: "acr/acpbah/unaudit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshordbah", {});

                    });
                },
            };
            scope.counttot_amt = function() {
                var tot_amt = 0;
                var cash_amt = 0;
                var cut_amt = 0;
                var chk_amt = 0;
                var other_amt = 0;
                scope.model.acpbats.forEach(function(item) {
                    var amt = ((item.acr_class == "5" || item.acr_class == "6") ? -1 : 1) * (item.ar_amt ? item.ar_amt : 0);
                    if (!item.isdel) {
                        tot_amt = tot_amt + amt;
                    }
                    if (item.acr_class == "1" || item.acr_class == "5") {
                        cash_amt = cash_amt + amt;
                    }
                    if (item.acr_class == "2" || item.acr_class == "6") {
                        chk_amt = chk_amt + amt;
                    }
                    if (item.acr_class == "3") {
                        cut_amt = cut_amt + amt;
                    }
                    if (item.acr_class == "4") {
                        other_amt = other_amt + amt;
                    }

                }, this);
                scope.model.tot_amt = tot_amt;
                scope.model.chk_amt = chk_amt;
                scope.model.cash_amt = cash_amt;
                scope.model.cut_amt = cut_amt;
                scope.model.other_amt = other_amt;
            }
            scope.action.load();
        });

});