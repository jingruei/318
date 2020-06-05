define(function() {
    angular.module('app').controller('bas.bascoin.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys) {
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
                            "coin_nbr": {
                                "title": "币别代号",
                                "type": "string"
                            },
                            "coin_desc": {
                                "title": "币别说明",
                                "type": "string"
                            },
                            "ecoin_desc": {
                                "title": "币别英文说明",
                                "type": "string"
                            },
                            "coin_date": {
                                "title": "最近交易日",
                                "type": "string"
                            },
                            "coin_per": {
                                "title": "汇率",
                                "type": "number"
                            },
                            "coin_date": {
                                "title": "结汇日期",
                                "type": "string"
                            },
                            "coin_per": {
                                "title": "汇率",
                                "type": "number"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "币别信息",
                            items: [{
                                    title: "币别代号",
                                    key: 'coin_nbr',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "币别说明",
                                    key: 'coin_desc',
                                    required: true,
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
                                    title: "币别英文说明",
                                    required: true,
                                    key: 'ecoin_desc',
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
                                    title: "最近交易日",
                                    key: 'coin_date',
                                    readonly: true,
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "汇率",
                                    key: 'coin_per',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                }
                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "历史汇率"
                        },
                        {
                            title: "历史汇率",
                            key: 'hiscoins',
                            type: "basEditgrid",
                            gridkey: "bas.bascoin.detail",
                            css: "cell100",
                            action: {
                                // add: {
                                //     editstatus: {
                                //         relation: "or",
                                //         editstatus: {
                                //             relation: "and",
                                //             filedlist: [
                                //                 { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                                //             ]
                                //         },
                                //         filedlist: [
                                //             { field: "formstatus", status: "add,edit" }, //表单新增状态
                                //         ]
                                //     },
                                //     click: function() {
                                //         var item = {
                                //             isdel: false
                                //         }
                                //         scope.model.hiscoins.push(item);
                                //     }
                                // },
                                // del: {
                                //     editstatus: {
                                //         relation: "or",
                                //         filedlist: [
                                //             { field: "formstatus", status: "add,edit" }, //表单新增状态
                                //         ]
                                //     },
                                //     click: function(item) {
                                //         item.isdel = true;
                                //     }
                                // }
                            },
                            headers: {
                                "coin_date": {
                                    displayName: "结汇日期",
                                    readonly: true,
                                    type: 'basEsydatetime',
                                    lovtype: '',
                                    width: 110
                                },
                                "coin_per": {
                                    displayName: "汇率",
                                    readonly: true,
                                    type: 'basNumber',
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
                        formstatus: "add" //edit,view
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
                            url: "bas/bascoin/" + scope.model.uid,
                            mockUrl: "plugins/data/bascoin.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                            }
                            scope.refreshtab("refreshbascoin", {});

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
                            url: "bas/bascoin/" + scope.uid,
                            mockUrl: "plugins/data/bascoin.detail.json"
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
                        toastr.warning("请输入必填项！");
                        return
                    }
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "bas/bascoin",
                        mockUrl: "plugins/data/bascoin.detail.json",
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
                        scope.refreshtab("refreshbascoin", {});

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