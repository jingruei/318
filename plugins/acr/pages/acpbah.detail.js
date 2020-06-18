define(function () {
    angular.module('app').controller('acr.acpbah.detail',
        function ($rootScope, $scope, $location, utils, path, getSingleView, settings,
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
                            filedlist: [{
                                    field: "formstatus",
                                    status: "add,edit,read"
                                } //表单新增状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.add(event);
                        }
                    },
                    save: {
                        name: "保存",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "add,edit"
                                }, //表单为新增，修改状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.save(event, form);
                        }
                    },
                    undo: {
                        name: "取消",
                        icon: "fa-undo",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "add,edit"
                                }, //表单为新增，修改状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.undo(event);
                        }
                    },
                    edit: {
                        name: "修改",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                }, //查询状态     
                                {
                                    field: "status",
                                    status: "10"
                                }
                            ]
                        },
                        action: function (event, form) {
                            scope.action.edit(event);
                        }
                    },
                    del: { //分配状态下还可以删除
                        name: "删除",
                        icon: "fa-remove",
                        htmlClass: "deletestyle",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                }, //表单查询状态 
                                {
                                    field: "status",
                                    status: "10"
                                }
                            ]
                        },
                        action: function (event, form) {
                            scope.action.del(event);
                        }
                    },
                    audit: {
                        name: "审核",
                        icon: "fa-calendar-check-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                }, //表单新增状态
                                {
                                    field: "status",
                                    status: "10"
                                } //已审核
                            ]
                        },
                        action: function (event, form) {
                            scope.action.audit(event);
                        }
                    },
                    unaudit: {
                        name: "反审",
                        icon: "fa-calendar-times-o",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                }, //表单新增状态
                                {
                                    field: "status",
                                    status: "30"
                                } //已审核
                            ]
                        },
                        action: function (event, form) {
                            scope.action.unaudit(event);
                        }
                    },
                    refresh: {
                        name: "刷新",
                        icon: "fa-refresh",
                        htmlClass: "refresh",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                }, //表单为新增，修改状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.load();
                        }
                    }
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "nbr": {
                                "title": "收款單號",
                                "type": "string"
                            },
                        }
                    },
                    form: [{
                            type: "group",
                            title: "帳款信息",
                            items: [{
                                    title: "收款單號",
                                    key: 'nbr',
                                    type: 'basDefault',
                                },
                                {
                                    title: "客戶代號",
                                    key: 'cus_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [{
                                        findfield: "acrbah",
                                        tofield: "acrbah"
                                    }],
                                    type: 'basLov',
                                    lovtype: 'getven',
                                    additionalField: {
                                        key: "acrbah",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    onchange: function (item) {
                                        qwsys.getVenAcrmon(scope.model.ven_nbr, scope.model.nbrdate).then(function (res) {
                                            scope.model.acr_mon = res.data.body;
                                            qwsys.get_acp(scope.model.ven_nbr, scope.model.acr_mon).then(function (res) {
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
                                    title: "收款日期",
                                    key: 'date',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function () {
                                        qwsys.getVenAcrmon(scope.model.ven_nbr, scope.model.nbrdate).then(function (res) {
                                            scope.model.acr_mon = res.data.body;
                                            qwsys.get_acp(scope.model.ven_nbr, scope.model.acr_mon).then(function (res) {
                                                var acrbal = res.data.body;
                                                if (acrbal) {
                                                    scope.model.tot_acr = acrbal.shp_amt + acrbal.shp_tax - acrbal.rshp_amt - acrbal.rshp_tax - acrbal.cut_amt;
                                                    scope.model.aft_amt = acrbal.bal_amt + acrbal.shp_amt + acrbal.shp_tax - acrbal.rshp_amt - acrbal.rshp_tax - acrbal.rec_amt - acrbal.cut_amt;
                                                }


                                            })
                                        })
                                    },
                                    type: 'basEsydatetime',
                                },
                                {
                                    title: "结帳月份",
                                    key: 'acr_mon',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function () {
                                        qwsys.get_acp(scope.model.ven_nbr, scope.model.acr_mon).then(function (res) {
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
                                    title: "本月應收",
                                    key: 'tot_acr',
                                    type: 'basNumber',
                                },
                                {
                                    title: "累計應收餘額",
                                    key: 'aft_amt',
                                    type: 'basNumber',
                                },
                                {
                                    title: "計入預收金額",
                                    key: 'pre_amt',
                                    type: 'basNumber',
                                },
                                {
                                    title: "可用沖款之金額",
                                    key: 'tot_amt',
                                    type: 'basNumber',
                                },

                                {
                                    title: "實際沖款金額",
                                    key: 'wait_amt',
                                    type: 'basNumber',
                                },
                                {
                                    title: "代扣稅額",
                                    key: 'tax_amt',
                                    type: 'basNumber',
                                },

                                {
                                    title: "匯費、郵資",
                                    key: 'other_amt',
                                    type: 'basNumber',
                                },
                                {
                                    title: "現金金額",
                                    key: 'cash_amt',
                                    type: 'basNumber',
                                }, {
                                    title: "票據金額",
                                    key: 'chk_amt',
                                    type: 'basNumber',
                                }, {
                                    title: "折讓金額",
                                    key: 'cut_amt',
                                    type: 'basNumber',
                                }, {
                                    title: "其他金額",
                                    key: 'other_amt',
                                    type: 'basNumber',
                                }, {
                                    title: "抵扣金額",
                                    key: 'other_amt',
                                    type: 'basNumber',
                                },
                                {
                                    title: "状态",
                                    key: 'status',
                                    readonly: true,
                                    titleMap: [{
                                            value: "10",
                                            name: "【未审核】"
                                        },
                                        {
                                            value: "30",
                                            name: "【已审核】"
                                        }
                                    ],
                                    type: 'basStatus'
                                }
                            ]
                        },
                        //下面為明细
                        {
                            type: "tabs",
                            css: "max-4",
                            tabs: [{
                                    title: "明細",
                                    items: [{
                                        key: 'acpbats',
                                        type: "basEditgrid",
                                        gridkey: "acr.acpbah.detail",
                                        css: "cell100",
                                        // action: {
                                        //     add: {
                                        //         editstatus: {
                                        //             relation: "or",
                                        //             filedlist: [
                                        //                 { field: "formstatus", status: "add,edit" }, //表单新增状态
                                        //             ]
                                        //         },
                                        //         click: function() {
                                        //             var item = {
                                        //                 isdel: false,
                                        //                 acr_class: "1"
                                        //             }
                                        //             scope.model.acpbats.push(item);
                                        //         }
                                        //     },
                                        //     del: {
                                        //         editstatus: {
                                        //             relation: "or",
                                        //             filedlist: [
                                        //                 { field: "formstatus", status: "add,edit" }, //表单新增状态
                                        //             ]
                                        //         },
                                        //         click: function(item) {
                                        //             item.isdel = true;
                                        //         }
                                        //     }
                                        // },
                                        headers: {
                                            "status": {
                                                displayName: "科目",
                                                type: 'basstring',
                                                width: 110
                                            },
                                            "desc": {
                                                displayName: "說明",
                                                type: 'basstring',
                                                width: 110
                                            },
                                            "chk_date": {
                                                displayName: "票據到期日",
                                                type: 'basEsydatetime',
                                                width: 110
                                            },
                                            "chk_nbr": {
                                                displayName: "票據號碼",
                                                type: 'basstring',
                                                width: 110
                                            },
                                            "remark": {
                                                displayName: "摘要",
                                                type: 'basstring',
                                                width: 110
                                            },
                                            "pay_bank": {
                                                displayName: "付款行庫",
                                                type: 'basstring',
                                                width: 110
                                            }
                                        }

                                    }]
                                },
                                {
                                    title: "沖款",
                                    items: [{
                                            key: 'acpbats',
                                            type: "basEditgrid",
                                            gridkey: "acr.acpbah.detail",
                                            css: "cell100",
                                            // action: {
                                            //     add: {
                                            //         editstatus: {
                                            //             relation: "or",
                                            //             filedlist: [
                                            //                 { field: "formstatus", status: "add,edit" }, //表单新增状态
                                            //             ]
                                            //         },
                                            //         click: function() {
                                            //             var item = {
                                            //                 isdel: false,
                                            //                 acr_class: "1"
                                            //             }
                                            //             scope.model.acpbats.push(item);
                                            //         }
                                            //     },
                                            //     del: {
                                            //         editstatus: {
                                            //             relation: "or",
                                            //             filedlist: [
                                            //                 { field: "formstatus", status: "add,edit" }, //表单新增状态
                                            //             ]
                                            //         },
                                            //         click: function(item) {
                                            //             item.isdel = true;
                                            //         }
                                            //     }
                                            // },
                                            headers: {
                                                "nbr": {
                                                    displayName: "合約號碼",
                                                    type: 'basNumber',
                                                    width: 110
                                                },
                                                "desc": {
                                                    displayName: "說明",
                                                    type: 'basstring',
                                                    width: 110
                                                },
                                                "tot_amt": {
                                                    displayName: "可沖金額",
                                                    type: 'basNumber',
                                                    width: 110
                                                },
                                                "wait_amt": {
                                                    displayName: "實沖金額",
                                                    type: 'basNumber',
                                                    width: 110
                                                },
                                            }

                                        }
                                    ]
                                }
                            ]
                        }



                    ]
                }
            };
            scope.action = {
                add: function (event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        status: "10",
                        nbrdate: qwsys.gettoday(),
                    }
                },
                edit: function () {
                    scope.model.formstatus = "edit"
                    $scope.$broadcast('schemaFormRedraw');
                },
                del: function () {
                    dialog.confirm('确定删除当前数据?').then(function () {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "acr/acpbah/" + scope.model.uid,
                            mockUrl: "plugins/data/acpbah.detail.json"
                        }).then(function (res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshacpbah", {});

                        });
                    });
                },
                undo: function () {
                    if (scope.model.formstatus == "add") {
                        scope.model = angular.copy(scope.bakmodel);
                    } else {
                        scope.model = angular.copy(scope.bakmodel);
                        scope.$broadcast("GridRedraw");
                    }
                    scope.model.formstatus = "view";
                },
                load: function () {
                    if (scope.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "acr/acpbah/" + scope.uid,
                            mockUrl: "plugins/data/acpbah.detail.json"
                        }).then(function (res) {
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
                save: function (event, form) {
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
                    }).then(function (res) {
                        scope.uid = res.data.body.uid
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshacpbah", {});

                    }, function (error) {
                        $timeout(function () {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                audit: function () {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "acr/acpbah/audit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function (res) {
                        toastr.info("审核成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshordbah", {});

                    });

                },
                unaudit: function () {
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "acr/acpbah/unaudit",
                        mockUrl: "plugins/data/ordbah.detail.json",
                        data: scope.model
                    }).then(function (res) {
                        toastr.info("反审成功！");
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshordbah", {});

                    });
                },
            };
            scope.counttot_amt = function () {
                var tot_amt = 0;
                var cash_amt = 0;
                var cut_amt = 0;
                var chk_amt = 0;
                var other_amt = 0;
                scope.model.acpbats.forEach(function (item) {
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