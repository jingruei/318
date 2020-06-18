define(function () {
    angular.module('app').controller('acc.accInterface.detail',
        function ($rootScope, $scope, $location, utils, path, getSingleView, settings,
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
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "desc": {
                                "title": "會計說明",
                                "type": "string"
                            },

                        }
                    },
                    form: [{
                        type: "group",
                        title: "",
                        items: [
                            // {
                            //     title: "合約編號",
                            //     key: 'con_nbr',
                            //     readonly: true,
                            //     placeholder: "自動產生",
                            //     type: 'basDefault',
                            //     lovtype: ''
                            // }
                        ]
                    },
                        {
                            title: "會計明細",
                            key: 'basfac',
                            type: "basEditgrid",
                            gridkey: "acc.accInterface.detail",
                            css: "cell100",
                            action: {
                                add: {
                                    editstatus: {
                                        relation: "or",
                                        editstatus: {
                                            relation: "and",
                                            filedlist: [
                                                {field: "formstatus", status: "add,edit"}, //表單為新增，修改狀態
                                            ]
                                        },
                                        filedlist: [
                                            {field: "formstatus", status: "add,edit"}, //表單新增狀態
                                        ]
                                    },
                                    click: function () {
                                        var item = {
                                            isdel: false
                                        }
                                        scope.model.basfac.push(item);//model後.自己定義的key
                                    }
                                },
                                del: {
                                    editstatus: {
                                        relation: "or",
                                        filedlist: [
                                            {field: "formstatus", status: "add,edit"}, //表單新增狀態
                                        ]
                                    },
                                    click: function (item) {
                                        console.log(item);
                                        item.isdel = true;
                                    }
                                },
                                // save: {
                                //     name: "存檔",
                                //     icon: "fa-save",
                                //     editstatus: {
                                //         relation: "and",
                                //         filedlist: [
                                //             {field: "formstatus", status: "add,edit"}, //表單為新增，修改狀態
                                //         ]
                                //     },
                                //     action: function (event, form) {
                                //         console.log(event, form);
                                //         scope.action.save(event, form);
                                //     }
                                // },
                            },
                            headers: {
                                "desc": {
                                    displayName: "科目說明",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            {field: "formstatus", status: "view"}, //表單新增狀態
                                        ]
                                    },
                                    type: "basDefault",
                                    width: 110
                                },
                                "acc_id": {
                                    displayName: "會計科目",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            {field: "formstatus", status: "view"}, //表單新增狀態
                                        ]
                                    },
                                    type: 'basDefault',
                                    width: 110
                                },
                                "dept_id": {
                                    displayName: "會計部門代號",
                                    type: 'basDefault',
                                    width: 110,
                                },
                                "is_tran": {
                                    displayName: "是否轉對象",
                                    type: 'basDefault',
                                    width: 110
                                },
                            }

                        },


                    ]
                }
            };
            scope.action = {
                add: function (event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
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
                            url: `accInterface/${scope.model.uid}`,
                            mockUrl: "plugins/data/monk.json"
                        }).then(function (res) {
                            toastr.info("數據刪除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshcontract", {});
                        });
                    });
                },
            
                load: function () {
                    if (scope.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: `accInterface/${scope.uid}`,
                            mockUrl: "plugins/data/monk.json"
                        }).then(function (res) {
                            console.log(res);
                            
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
                    // scope.$broadcast("schemaFormValidate");
                    // if (!form.base_form.$valid) {
                    //     toastr.warning("請輸入必填項！");
                    //     return
                    // }
                    console.log('save===',scope.model);
                    
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "accInterface",
                        mockUrl: "plugins/data/monk.json",
                        data: scope.model
                    }).then(function (res) {
                        scope.uid = res.data
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshcontract", {});

                    }, function (error) {
                        $timeout(function () {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                // print: function () {
                //     var para = {
                //         uid: scope.model.uid,
                //         pagesize: 0
                //     }
                //     qwsys.exportReportPdfurl("shpbah", "acc/shpbah/getreportdata", para);
                // }
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