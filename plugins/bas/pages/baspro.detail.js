define(function() {
    angular.module('app').controller('bas.baspro.detail',
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
                            "pro_nbr": {
                                "title": "工序代号",
                                "type": "string"
                            },
                            "pro_desc": {
                                "title": "工序说明",
                                "type": "string"
                            },
                            "pro_days": {
                                "title": "制程天数",
                                "type": "number"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "基础信息",
                            items: [{
                                    title: "工序代号",
                                    key: 'pro_nbr',
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
                                    title: "工序说明",
                                    key: 'pro_desc',
                                    css: "cell2",
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
                                    title: "制程天数",
                                    key: 'pro_days',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "库存单位",
                                    key: 'item_un',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [
                                        { findfield: "un_desc", tofield: "item_un_desc" },
                                        { findfield: "unit", tofield: "rec_un" },
                                        { findfield: "unit", tofield: "sales_un" },
                                    ],
                                    required: true,
                                    onchange: function() {
                                        scope.changebasuns();
                                    },
                                    type: 'basLov',
                                    lovtype: "getunit"
                                },
                                {
                                    title: "进货单位",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'rec_un',
                                    titleMap: [],
                                    type: 'basLov',
                                    lovtype: "select"
                                },
                                {
                                    title: "销售单位",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    key: 'sales_un',
                                    type: 'basLov',
                                    titleMap: [],
                                    lovtype: "select"
                                }
                            ]
                        },

                        //下面为分组B
                        //下面为分组C
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: "辅助单位"
                        },
                        {
                            key: 'basunss',
                            titleico: "fa-bus",
                            css: "max-4",
                            type: "basTable",
                            action: {
                                add: {
                                    title: "添加单位",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    click: function() {
                                        if (!scope.model.basunss) {
                                            scope.model.basunss = [];
                                        }
                                        scope.model.basunss.push({

                                        });
                                    }
                                },
                                del: {
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    click: function(data, index) {
                                        data.splice(index, 1);
                                        scope.changebasuns();
                                    }
                                }
                            },
                            schema: {
                                "type": "object",
                                "properties": {
                                    "unit": {
                                        "title": "单位",
                                        "type": "string"
                                    }

                                }
                            },
                            "items": [{
                                type: "basTablerow",
                                title: "",
                                items: [{
                                        title: "辅助单位",
                                        key: 'unit',
                                        editstatus: {
                                            relation: "and",
                                            filedlist: [
                                                { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                            ]
                                        },
                                        relationfield: [{
                                            findfield: "un_desc",
                                            tofield: "un_desc"
                                        }],
                                        onchange: function() {
                                            scope.changebasuns();

                                        },
                                        type: 'basLov',
                                        lovtype: "getunit"
                                    },
                                    {
                                        title: "系数",
                                        key: 'factor',
                                        editstatus: {
                                            relation: "and",
                                            filedlist: [
                                                { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                            ]
                                        },
                                        type: 'basNumber'
                                    }
                                ]
                            }]
                        }
                    ]
                }
            };

            scope.changebasuns = function() {
                var basunsmap = [];
                if (scope.model.item_un) {
                    var item = {
                        value: scope.model.item_un,
                        name: scope.model.item_un_desc
                    }
                    basunsmap.push(item);
                }
                scope.model.basunss.forEach(function(element) {
                    var item = {
                        value: element.unit,
                        name: element.un_desc
                    }
                    basunsmap.push(item);

                }, this);

                scope.config.form.form[0].items[4].titleMap = basunsmap;
                scope.config.form.form[0].items[5].titleMap = basunsmap;
            }

            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        basunss: [],
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
                            url: "bas/baspro/" + scope.model.uid,
                            mockUrl: "plugins/data/baspro.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                            }
                            scope.refreshtab("refreshbaspro", {});

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
                            url: "bas/baspro/" + scope.uid,
                            mockUrl: "plugins/data/baspro.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.formstatus = "view";
                            for (var p in scope.model) {
                                if (scope.model[p] === null) {
                                    delete scope.model[p];
                                }
                            }
                            scope.changebasuns();
                            scope.bakmodel = angular.copy(scope.model);
                        });
                    } else {
                        scope.action.add();
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
                        url: "bas/baspro",
                        mockUrl: "plugins/data/baspro.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        scope.uid = res.data.body.uid
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        var rootmap = "getproMap";
                        $rootScope[rootmap] = "";
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshbaspro", {});

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