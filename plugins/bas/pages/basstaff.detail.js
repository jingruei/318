define(function() {
    angular.module('app').controller('bas.staff.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            let scope = $scope;
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
                            "s_nbr": {
                                "title": "員工編號",
                                "type": "string"
                            },
                            "s_name": {
                                "title": "員工姓名",
                                "type": "string"
                            },
                            "eng_name": {
                                "title": "英文姓名",
                                "type": "string"
                            },
                            "sex": {
                                "title": "姓別",
                                "type": "string"
                            },
                            "s_id": {
                                "title": "身分證字號",
                                "type": "string"
                            },
                            "n_name": {
                                "title": "籍貫",
                                "type": "string"
                            },
                            "group_nbr": {
                                "title": "組別",
                                "type": "string"
                            },
                            "birthday": {
                                "title": "出生日期",
                                "type": "datePicker"
                            },
                            "marry": {
                                "title": "婚姻",
                                "type": "string"
                            },
                            "addr1": {
                                "title": "戶籍地址",
                                "type": "string"
                            },
                            "tel1": {
                                "title": "電話1",
                                "type": "string"
                            },
                            "addr2": {
                                "title": "通訊地址",
                                "type": "string"
                            },
                            "tel2": {
                                "title": "電話2",
                                "type": "string"
                            },
                            "callphone": {
                                "title": "行動電話",
                                "type": "string"
                            },
                            "chgdate": {
                                "title": "異動日期",
                                "type": "datePicker"
                            },
                            "redate": {
                                "title": "到職日期",
                                "type": "datePicker"
                            },
                            "oudate": {
                                "title": "離職日期",
                                "type": "datePicker"
                            },
                            "indate1": {
                                "title": "投保日期",
                                "type": "datePicker"
                            },
                            "sudate1": {
                                "title": "退保日期",
                                "type": "datePicker"
                            },
                            "surance1": {
                                "title": "勞保薪資",
                                "type": "number"
                            },
                            "sur1_amt": {
                                "title": "勞保費",
                                "type": "string"
                            },
                            "indate3": {
                                "title": "投保日期",
                                "type": "datePicker"
                            },
                            "sudate3": {
                                "title": "退保日期",
                                "type": "datePicker"
                            },
                            "sur3_amt": {
                                "title": "團保費",
                                "type": "number"
                            },
                            "in_nbr": {
                                "title": "保卡號碼",
                                "type": "string"
                            },
                            "post": {
                                "title": "郵局局號",
                                "type": "string"
                            },
                            "post_id": {
                                "title": "郵局帳號",
                                "type": "string"
                            },
                            "isman": {
                                "title": "役畢",
                                "type": "string"
                            },
                            "r_nbr": {
                                "title": "學歷",
                                "type": "string"
                            },
                            "school": {
                                "title": "學校",
                                "type": "string"
                            },
                            "subject": {
                                "title": "科系",
                                "type": "string"
                            },
                            "year_end": {
                                "title": "畢業年月",
                                "type": "string"
                            },
                            "sch_end": {
                                "title": "畢業肄業",
                                "type": "string"
                            },
                            "error": {
                                "title": "身分證錯誤註記",
                                "type": "string"
                            },
                            "towork": {
                                "title": "到職情況",
                                "type": "string"
                            },
                            "cname": {
                                "title": "聯絡人",
                                "type": "string"
                            },
                            "photo": {
                                "title": "相片",
                                "type": "string"
                            },
                            "b_nbr": {
                                "title": "銀行代號",
                                "type": "string"
                            },
                            "bank_code": {
                                "title": "銀行帳號",
                                "type": "datePicker"
                            }
                        }
                    },
                    form: [{
                            title: "基本訊息",
                            type: "region",
                            css: "max-4",
                            items: [{
                                    title: "員工編號",
                                    key: 's_nbr',
                                    required: true,
                                    // placeholder: "空白自動產生",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "員工姓名",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    key: 's_name',
                                    type: 'basString'
                                },
                                {
                                    title: "身分證號碼",
                                    required: true,
                                    key: 's_id',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "籍貫",
                                    key: 'n_name',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "出生年月日",
                                    key: 'birthday',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'date-picker'
                                },
                                {
                                    title: "組別",
                                    key: 'group_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function(item) {
                                        console.log(item)
                                    },
                                    type: 'basLov',
                                    lovtype: 'getgroup'
                                },
                                {
                                    title: "電話",
                                    key: 'tel1',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "戶籍地址",
                                    key: 'addr1',
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
                                    title: "通訊地址",
                                    key: 'addr2',
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
                                    key: 'callphone',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "緊急聯絡人",
                                    key: 'cname',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "到職日期",
                                    key: 'redate',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'date-picker'
                                },
                                {
                                    title: "時薪",
                                    key: 'hour',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "勞保生效日",
                                    key: 'indate1',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'date-picker'
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
                        formstatus: "add" //edit,view
                    }
                },
                edit: function() {
                    scope.model.formstatus = "edit"
                    scope.$broadcast("GridRedraw");
                },
                del: function() {
                    dialog.confirm('確定刪除當前數據?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: `staff/${scope.model.uid}`,
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
                    if (scope.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: `staff/${scope.uid}`,
                            mockUrl: "plugins/data/baswar.detail.json"
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
                        toastr.warning("請輸入必填項！");
                        return
                    }
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";

                    console.log('staff Save Model =>', scope.model)
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "staff",
                        mockUrl: "plugins/data/cuscus.detail.json",
                        data: scope.model
                    }).then(function(res) {
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