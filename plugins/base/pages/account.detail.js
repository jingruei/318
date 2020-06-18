angular.module('app').controller('base.account.detail',
    function($scope, $rootScope, utils, path) {

        var scope = $scope;
        scope.detail = {
            schema: {
                type: "object",
                properties: {
                    mail: {
                        title: "電子郵箱",
                        type: "string",
                        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                        maxLength: 128
                    },
                    name: {
                        title: "名稱",
                        type: "string",
                        required: true,
                        maxLength: 32
                    },
                    alias: {
                        title: "別名",
                        type: "string",
                        maxLength: 32
                    },
                    enable: {
                        title: "是否啟用",
                        type: "boolean"
                    },
                    aid: {
                        title: "賬號",
                        type: "string"
                    },
                    type: {
                        title: "類型",
                        type: "string",
                        required: true
                    },
                    password: {
                        title: "密碼",
                        type: "string",
                        required: true,
                        maxLength: 64
                    },
                    mobile: {
                        title: "手機號碼",
                        type: "string",
                        pattern: "^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$",
                        maxLength: 128
                    },
                    group: {
                        title: "賬號組",
                        type: "string",
                        maxLength: 64
                    },
                    matrixNo: {
                        "title": "關聯編號",
                        "type": "string",
                        readonly: true,
                        maxLength: 64
                    }
                }
            },
            form: [{
                type: "region",
                title: "主要信息",
                items: [{
                        key: 'aid',
                        placeholder: "賬號自動生成"
                    }, {
                        key: 'name',
                        placeholder: "請輸入名稱"
                    },
                    {
                        key: "password",
                        type: "password"
                    },
                    'alias',
                    {
                        key: 'type',
                        type: "select",
                        titleMap: []
                    },
                    'matrixNo',
                    'mail',
                    'mobile',
                    'group',
                    {
                        key: 'enable'
                    }
                ]
            }],
            
        };

        var model = scope.$parent.model;
        scope.init = function() { //初始設置model

            if (model.uid) { //如果是編輯
                model.password = "******";
            } else {
                model.type = "user";
                model.enable = true;
            }
            loadModelAccountType();

            scope.backmodel = angular.extend({}, model);
        };

        scope.detailReset = function() {
            model = scope.$parent.model = angular.copy(scope.backmodel);
        };

        scope.init();

        function loadModelAccountType() {
            var types = $rootScope.ACCOUNT_TYPES;
            var temp = [];
            for (var i = 0; i < types.length; i++) {
                if (types[i] == "admin" || types[i] == "user") {
                    temp.push({ "name": types[i], "value": types[i] });
                } else if (model.type == types[i]) {
                    temp.push({ "name": types[i], "value": types[i] });
                }
            }
            var typesConfig = path.find(scope.detail, ['form', '[title:主要信息]', 'items', '[key:type]'], []);
            typesConfig.titleMap = temp;
        }
    });