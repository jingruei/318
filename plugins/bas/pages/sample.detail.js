define(function() {
    angular.module('app').controller('bas.sample.detail',
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
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "tpye_1": {
                                "title": "類型1",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            title: "Type樣式",
                            type: "group",
                            items: [{
                                    title: "類型1-輸入框",
                                    key: 'tpye_1',
                                    type: 'basString'
                                },
                                {
                                    title: "類型2-預設+Css",
                                    key: 'tpye_2',
                                    css: "cell2",
                                    type: 'basDefault'
                                },
                                {
                                    title: "類型3-單選",
                                    key: 'tpye_3',
                                    type: 'basRadiosinline',
                                    css: "cell2",
                                    titleMap: [
                                        { value: "1", name: "one" },
                                        { value: "2", name: "two" },
                                        { value: "3", name: "three" },
                                    ],
                                    
                                },
                                {
                                    title: "類型4-狀態",
                                    key: 'tpye_4',
                                    type: 'basStatus'
                                },
                                // {
                                //     title: "類型5-備註",
                                //     key: 'tpye_5',
                                //     type: 'basRemark'
                                // },
                                {
                                    title: "類型6-速查1",
                                    key: 'tpye_6',
                                    titleMap: [
                                        { value: 1, name: "one" },
                                        { value: 2, name: "two" },
                                        { value: 3, name: "three" }
                                    ],
                                    type: 'basLov',
                                    lovtype: 'select'
                                },
                                {
                                    title: "類型6-速查2",
                                    key: 'tpye_6',
                                    type: 'basLov',
                                    lovtype: 'getgroup',
                                },
                                {
                                    title: "類型6-速查3",
                                    key: 'tpye_6',
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
                                    title: "類型7-長文本",
                                    key: 'tpye_7',
                                    type: 'basTextarea'
                                    
                                },
                                {
                                    title: "類型7-長文本+Css",
                                    key: 'tpye_7',
                                    css: "cell100",
                                    type: 'basTextarea'
                                    
                                },
                                {
                                    title: "類型8-數字",
                                    key: 'tpye_8',
                                    type: 'basNumber'
                                },
                                {
                                    title: "類型9-圖檔",
                                    key: 'tpye_9',
                                    //css: "cell100",
                                    type: 'basGetgallery'
                                    // Options: {
                                    //     multiple: 3,
                                    //     maxMB: 20,
                                    //     clip: {
                                    //         pc: [560, 280],
                                    //         small: [180, 180],
                                    //         middle: [360, 180],
                                    //     }
                                    // }
                                },
                                {
                                    title: "類型10-上傳文件",
                                    key: 'tpye_10',
                                    type: 'basUploader'
                                }, 
                                {
                                    title: "類型11-日期(含時間)",
                                    key: 'tpye_11',
                                    type: 'basEsydatetime'
                                },
                                {
                                    title: "類型11-日期(一般)",
                                    key: 'tpye_11',
                                    type: 'basEsydatetime',
                                    format: "YYYYMMDD"
                                },
                                {
                                    title: "類型11-結帳月份",
                                    key: 'tpye_11',
                                    type: 'basEsydatetime',
                                    format: "YYYYMM"
                                },
                                {
                                    title: "類型12-多選",
                                    key: 'tpye_12',
                                    type: 'basCheckboxes',
                                    css: "cell2",
                                    titleMap: [
                                        { value: "1", name: "one" },
                                        { value: "2", name: "two" },
                                        { value: "3", name: "three" },
                                    ],
                                },
                                {
                                    title: "類型13-富文本",
                                    key: 'tpye_13',
                                    type: 'basUeditor',
                                    css: "cell100",
                                },
                                // {
                                //     title: "表格",
                                //     key: 'type14',
                                //     type: "basEditgrid",
                                //     css: "cell100",
                                //     headers: {
                                //         "test1": {
                                //             displayName: "第一格",
                                //             width: 110
                                //         },
                                //         "test2": {
                                //             displayName: "第二格",
                                //             width: 110
                                //         },
                                //         "test3": {
                                //             displayName: "第三格",
                                //             width: 110,
                                           
                                //         }
                                //     }
                                // },
                            ]
                        }
                    ]
                }
            };
        });
});