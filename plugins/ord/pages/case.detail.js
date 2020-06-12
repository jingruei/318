define(function () {
    angular.module('app').controller('ord.case.detail',
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
                            filedlist: [
                                {field: "formstatus", status: "add,edit,read"} //表單新增狀態
                            ]
                        },
                        action: function (event, form) {
                            scope.action.add(event);
                        }
                    },
                    save: {
                        name: "存檔",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                {field: "formstatus", status: "add,edit"}, //表單為新增，修改狀態
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
                            filedlist: [
                                {field: "formstatus", status: "add,edit"}, //表單為新增，修改狀態
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
                            filedlist: [
                                {field: "formstatus", status: "view"}, //查詢狀態
                                {field: "is_sure", status: "N"}
                            ]
                        },
                        action: function (event, form) {
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
                                {field: "formstatus", status: "view"}, //查詢狀態
                                {field: "is_sure", status: "N"}
                            ]
                        },
                        action: function (event, form) {
                            scope.action.del(event);
                        }
                    },
                    print: {
                        name: "打印",
                        icon: "fa-print",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                {field: "formstatus", status: "view"}, //表單新增狀態
                                {field: "is_sure", status: "Y"} //已審核
                            ]
                        },
                        action: function (event, scope) {
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
                                {field: "formstatus", status: "view"}, //表單為新增，修改狀態
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
                                "title": "單據號碼",
                                "type": "string"
                            },
                            "nbrdate": {
                                "title": "日期",
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
                                "title": "備注",
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
                        items: [
                            {
                                title: "專案編號",
                                key: 'con_nbr',
                                readonly: true,
                                placeholder: "自動產生",
                                type: 'basDefault',
                                lovtype: ''
                            },
                            {
                                title: "委任日期",
                                key: 'date',
                                required: true,
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                    ]
                                },
                                type: 'basEsydatetime',
                                lovtype: '',
                            },
                            {
                                title: "客戶編號",
                                key: 'cus_nbr',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    {findfield: "cus_alias", tofield: "cus_alias"},
                                ],
                                type: 'basLov',
                                lovtype: 'getcus',
                                additionalField: {
                                    key: "cus_alias",
                                    readonly: true,
                                    type: "basString"
                                },
                                nameField: "cus_alias"
                            },
                            {
                                title: "合約編號",
                                key: 'cus_nbr',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    {findfield: "cus_alias", tofield: "cus_alias"},
                                ],
                                type: 'basLov',
                                lovtype: 'getcus',
                                additionalField: {
                                    key: "cus_alias",
                                    readonly: true,
                                    type: "basString"
                                },
                                nameField: "cus_alias"
                            },
                            {
                                title: "接案人員",
                                key: 'cus_nbr',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    {findfield: "cus_alias", tofield: "cus_alias"},
                                ],
                                type: 'basLov',
                                lovtype: 'getcus',
                                additionalField: {
                                    key: "cus_alias",
                                    readonly: true,
                                    type: "basString"
                                },
                                nameField: "cus_alias"
                            },
                            {
                                title: "處理人員1",
                                key: 'cus_nbr',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    {findfield: "cus_alias", tofield: "cus_alias"},
                                ],
                                type: 'basLov',
                                lovtype: 'getcus',
                                additionalField: {
                                    key: "cus_alias",
                                    readonly: true,
                                    type: "basString"
                                },
                                nameField: "cus_alias"
                            },
                            {
                                title: "處理人員2",
                                key: 'cus_nbr',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    {findfield: "cus_alias", tofield: "cus_alias"},
                                ],
                                type: 'basLov',
                                lovtype: 'getcus',
                                additionalField: {
                                    key: "cus_alias",
                                    readonly: true,
                                    type: "basString"
                                },
                                nameField: "cus_alias"
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
                                title: "預計完成日",
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
                                title: "主管核准",
                                key: 'status',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                    ]
                                },
                                css: "cell2",
                                titleMap: [
                                    { value: 1, name: "已核准" },
                                    { value: 2, name: "未核准" },
                                ],
                                type: 'basRadiosinline'
                            },
                            {
                                title: "委任書(上傳)",
                                key: 'cont_year',
                                type: 'basDefault',
                                css:'css100',
                                lovtype: ''
                            },
                            {
                                title: "合約年度",
                                key: 'cont_year',
                                type: 'basDefault',
                                lovtype: ''
                            },
                            {
                                title: "工作內容",
                                key: 's_nbr',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        {field: "formstatus", status: "add,edit"} //表單為新增，修改狀態
                                    ]
                                },
                                relationfield: [
                                    {findfield: "desc", tofield: "desc"},
                                ],
                                type: 'basLov',
                                lovtype: 'getwork',
                                additionalField: {
                                    key: "desc",
                                    readonly: true,
                                    type: "basString"
                                },
                                nameField: "desc"
                            },
                            {
                                title: "工作細項",
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                    ]
                                },
                                key: 'shp_desc',
                                css: "cell100",
                                type: 'basTextarea'
                            },
                            {
                                title: "完成日期",
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                    ]
                                },
                                key: 'time1',
                                css: "cell100",
                                type: 'basEsydatetime'
                            },
                            {
                                title: "結案日期",
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                    ]
                                },
                                key: 'time1',
                                css: "cell100",
                                type: 'basEsydatetime'
                            },
                            {
                                title: "結案核准",
                                key: 'status',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                    ]
                                },
                                css: "cell2",
                                titleMap: [
                                    { value: 1, name: "已核准" },
                                    { value: 2, name: "未核准" },
                                ],
                                type: 'basRadiosinline'
                            },

                            // basEsydatetime
                        ]
                    },
                    ]
                }
            };
            scope.action = {
                add: function (event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        is_sure: "N",
                        status: "10",
                        io_p: "1",
                        nbrdate: qwsys.gettoday(),
                    }


                },
                edit: function () {
                    scope.model.formstatus = "edit"
                    $scope.$broadcast('schemaFormRedraw');
                },
                del: function () {
                    dialog.confirm('確定刪除當前數據?').then(function () {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: `contact/${scope.model.uid}`,
                            mockUrl: "plugins/data/shpbah.detail.json"
                        }).then(function (res) {
                            toastr.info("數據刪除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshshpbah", {});

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
                            url: `contract/${scope.uid}`,
                            mockUrl: "plugins/data/shpbah.detail.json"
                        }).then(function (res) {
                            var data = res.data;
                            scope.model = res.data;
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
                save: function (event, form) {
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
                    console.log('save===',scope.model);
                    
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "contract",
                        mockUrl: "plugins/data/shpbah.detail.json",
                        data: scope.model
                    }).then(function (res) {
                        console.log(res)
                        scope.uid = res.data
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshshpbah", {});

                    }, function (error) {
                        $timeout(function () {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                print: function () {
                    var para = {
                        uid: scope.model.uid,
                        pagesize: 0
                    }
                    qwsys.exportReportPdfurl("shpbah", "ord/shpbah/getreportdata", para);
                }
            };


            scope.counttot_amt = function () {
                let tot_amt=0, rec_amt=0;
                scope.model.contacrs.forEach(function (item) {
                    if (!item.isdel) {
                        tot_amt = tot_amt + (item.amt ? item.amt : 0);
                        rec_amt = rec_amt + (item.rec_amt ? item.rec_amt:0);
                    }
                }, this);
                scope.model.tot_amt = rec_amt;
                scope.model.amt = tot_amt;
            }

            

            scope.action.load();
        });

});