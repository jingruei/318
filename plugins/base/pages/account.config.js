define(function () {
    return {
        listOperations: {
            add: {
                name: "新增",
                icon: "fa-plus",
                action: function (event, scope) {
                    scope.action.add(event);
                }
            },
            edit: {
                name: "編輯",
                icon: "fa-edit",
                action: function (event, scope) {
                    scope.action.edit(event);
                }
            },
            del: {
                name: "刪除",
                icon: "fa-remove",
                action: function (event, scope) {
                    scope.action.del(event);
                }
            }
        },

        headers: {
            "name": {
                displayName: "名稱",
                minWidth: 100
            },
            "aid": {
                displayName: "賬號",
                minWidth: 100
            },
            "alias": {
                displayName: "別名",
                width: 150
            },
            "type": {
                displayName: "類型",
                width: 70,
                cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.type | translate}}</div>"
            },
            "matrixNo": {
                displayName: "關聯編號",
                minWidth: 130
            },
            "mobile": {
                displayName: "手機號碼",
                width: 90
            },
            "mail": {
                displayName: "電子郵箱",
                width: 170
            },
            "enable": {
                displayName: "狀態",
                width: 70,
                cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已啟用':'未啟用' | translate}}</div>"
            }
        },
        
        filterItems: {
            0: {
                type: "input",
                name: "name$match",
                title: "名稱"
            },
            1: {
                type: "input",
                name: "aid$match",
                title: "賬號"
            },
            2: {
                type: "input",
                name: "mail$match",
                title: "電子郵箱"
            },
            3: {
                type: "input",
                name: "mobile$match",
                title: "手機號碼"
            },
            4: {
                type: "select",
                name: "enable$eq",
                title: "狀態",
                titleMap: [{
                    value: '1',
                    name: "已啟用"
                }, {
                    value: '0',
                    name: "未啟用"
                }]
            },
            6: {
                type: "select",
                name: "type$eq",
                title: "賬號類型",
                titleMap: []
            },
            7: {
                type: "select",
                name: "eid$eq",
                title: "企業",
                titleMap: []
            }
        }
    }
});