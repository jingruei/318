define(function() {
    angular.module('app').controller('acr.acptemp.detail',
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
                        name: "保存",
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
                                { field: "status", status: "10" }
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
                                { field: "formstatus", status: "view" }, //表單查詢狀態
                                { field: "status", status: "10" }
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
                                { field: "status", status: "10" } //已審核
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
                                { field: "status", status: "30" } //已審核
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
                                "title": "付款單代號",
                                "type": "string"
                            },
                            "ven_nbr": {
                                "title": "廠商代號",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "付款日期",
                                "type": "string"
                            },
                            "acr_mon": {
                                "title": "結帳月份",
                                "type": "string"
                            },
                            "aft_amt": {
                                "title": "累計應收",
                                "type": "number"
                            },
                            "chk_amt": {
                                "title": "票據付款",
                                "type": "number"
                            },
                            "other_amt": {
                                "title": "其他金額",
                                "type": "number"
                            },
                            "tot_acr": {
                                "title": "本期應收",
                                "type": "number"
                            },
                            "cash_amt": {
                                "title": "現金付款",
                                "type": "number"
                            },
                            "sale_nbr": {
                                "title": "業務員代號",
                                "type": "string"
                            },
                            "pre_amt": {
                                "title": "計入預收金額",
                                "type": "number"
                            },
                            "acc_nbr": {
                                "title": "會計傳票",
                                "type": "string"
                            },
                            "tot_amt": {
                                "title": "可用沖款金額",
                                "type": "number"
                            },
                            "cut_amt": {
                                "title": "折讓",
                                "type": "number"
                            },
                            "status": {
                                "title": "狀態",
                                "type": "string"
                            },
                            "acr_class": {
                                "title": "交易類別",
                                "type": "string"
                            },
                            "ar_amt": {
                                "title": "金額",
                                "type": "number"
                            },
                            "chk_date": {
                                "title": "票據到期日",
                                "type": "string"
                            },
                            "io_nbr": {
                                "title": "票據號碼",
                                "type": "string"
                            },
                            "b_nbr": {
                                "title": "銀行代號",
                                "type": "string"
                            },
                            "remark": {
                                "title": "備注",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                        type: "group",
                        title: "付款頭信息",
                        items: [{
                            title: "代墊單號",
                            key: 'nbr',
                            readonly: true,
                            placeholder: "自動產生",
                            type: 'basDefault',
                            lovtype: ''
                        },
                            {
                                title: "客戶編號",
                                key: 'cus_nbr',
                                required: true,
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    { findfield: "cus_alias", tofield: "cus_alias" }
                                ],
                                type: 'basLov',
                                lovtype: 'getcus',
                                additionalField: {
                                    key: "cus_alias",
                                    readonly: true,
                                    type: "basString"
                                },
                                onchange: function(item) {
                                }
                            },
                            {
                                title: "合約編號",
                                key: 'hx_nbr',
                                required: true,
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    { findfield: "cus_alias", tofield: "cus_alias" }
                                ],
                                type: 'basLov',
                                lovtype: 'getcus',
                                additionalField: {
                                    key: "cus_alias",
                                    readonly: true,
                                    type: "basString"
                                },
                                onchange: function(item) {
                                }
                            }
                        ]
                    },
                        //下面為行明細
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "代墊明細訊息"
                        },
                        {
                            title: "代墊明細訊息",
                            key: 'acpbats',
                            type: "basEditgrid",
                            gridkey: "acr.acpbah.detail",
                            css: "cell100",
                            action: {
                                add: {
                                    editstatus: {
                                        relation: "or",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" }, //表單新增狀態
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
                                            { field: "formstatus", status: "add,edit" }, //表單新增狀態
                                        ]
                                    },
                                    click: function(item) {
                                        item.isdel = true;
                                    }
                                }
                            },
                            headers: {
                                "chk_nbr": {
                                    displayName: "項目編號",
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
                                "chkddd_nbr": {
                                    displayName: "代墊內容",
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
                                "ar_amt": {
                                    displayName: "金額",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    onchange: function() {
                                        scope.counttot_amt();

                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "chkddd_nbra": {
                                    displayName: "請款月份",
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
                                "status": {
                                    displayName: "狀態",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表單新增狀態
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'select',
                                    onchange: function() {
                                        scope.counttot_amt();
                                    },
                                    titleMap: [
                                        { value: "1", name: "已付" },
                                        { value: "2", name: "未付" },
                                    ],
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
                    dialog.confirm('確定刪除當前數據?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "acr/acpbah/" + scope.model.uid,
                            mockUrl: "plugins/data/acpbah.detail.json"
                        }).then(function(res) {
                            toastr.info("數據刪除成功!!!");
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
                        toastr.warning("請輸入必填項！");
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
                        toastr.info("審核成功！");
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
                        toastr.info("反審成功！");
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