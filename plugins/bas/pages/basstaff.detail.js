define(function() {
    angular.module('app').controller('bas.basstaff.detail',
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
                            "t_model": {
                                "title": "TModel",
                                "type": "string"
                            }        
                        }
                    },
                    form: [{
                            title: "基本信息",
                            type: "region",
                            items: [{
                                    title: "員工編號",
                                    key: 's_nbr',
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
                                    title: "員工名稱",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    key: 's_name',
                                    css: "cell2",
                                    type: 'basString'
                                },
                                {
                                    title: "身分證號碼",
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
                                    type: 'basEsydatetime'
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
                                    title: "B.B.Code",
                                    key: 'tel2',
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
                                    key: 'eng_name',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "到職日",
                                    key: 'indate1',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basString'
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
                                    title: "勞保生效日期",
                                    key: 'redate',
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
                                }
                            ]
                        }
                    ]
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
                            url: `staff/${scope.uid}`,
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
                            url: `staff/${scope.uid}`,
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