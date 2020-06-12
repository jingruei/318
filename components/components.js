(function () { application.plugin = {"queryFormComponents":{"base":[],"bas":["checkboxes","datepicker","default","esydatetime","lov","love","number","radiosinline","rangedate","selectmultiple","string"],"bpm":[],"sanan":[]},"schemaFormComponents":{"base":[],"bas":["addgrid","array","button","checkbox","checkboxes","columns","columnsremark","datepicker","datetimepicker","default","detail","editgrid","endline","esydatetime","esydatetimepicker","formatnumber","getgallery","image","label","line","lov","love","lovm","number","numberamt","numberpas","password","radiosinline","region","relationfield","remark","select","selectmultiple","status","string","table","tablerow","tabs","textarea","titlefield","ueditor","ueditord","uploader","viewgrid"],"bpm":[],"sanan":[]}}}());
angular.module('app').directive('jqChart', ['$timeout', function ($timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            config: '='
        },
        template: "<div class='jq-chart'></div>",
        link: function (scope, element, attr) {
            var render = function () {
                if (scope.config && element.highcharts) {
                    $timeout(
                        function () {
                            element.highcharts(scope.config);
                        }, 0
                    );
                }
            }
            scope.$watchCollection('config', function () {
                render();
            });
        }
    };
}]);
angular.module('app').directive('jqMarquee', ['$timeout', function ($timeout) {
    function init(element, $ul, options) {
        var defaults = {
            speed: 40,
            rowHeight: 24
        };
        $ul.height(819);
        var opts = $.extend({}, defaults, options), intId = [];
        function marquee(obj, step) {
            $ul.animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($ul.css("margin-top")));
                if (s >= step) {
                    $ul.find("li").slice(0, 1).appendTo($ul);
                    $ul.css("margin-top", 0);
                }
            });
        }
        element.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"];
            intId[i] = setInterval(function () {
                if ($ul.height() <= element.height()) {
                    clearInterval(intId[i]);
                }
                else {
                    marquee(element, sh);
                }
            }, speed);
            element.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if ($ul.height() <= element.height()) {
                        clearInterval(intId[i]);
                    }
                    else {
                        marquee(element, sh);
                    }
                }, speed);
            });
        });
    }
    return {
        restrict: "E",
        replace: true,
        scope: {
            ngModel: '=',
            option: '='
        },
        transclude: true,
        require: 'ngModel',
        template: "\n                <div class='jq-marquee'>\n                    <ul>\n                        <li ng-repeat=\"quota in ngModel\" ng-class-even=\"'lieven'\">\n                            <p>{{quota.name}}\uFF1A{{quota.value}}</p>\n                            <p>\n                                <a target=\"_blank\" class=\"btn_lh\">\u540C\u6BD4 \n                                    <i ng-show='quota.yoy==0' style=\"color: #28BD19;\">- -</i>\n                                    <i ng-show='quota.yoy>0' style=\"color: #FF3300;\">\u2191 {{quota.yoy}} %</i>\n                                    <i ng-show='quota.yoy<0' style=\"color: #28BD19;\">\u2193 {{quota.yoy}} %</i>\n                                     \n                                </a>\n                                <em>\u73AF\u6BD4\n                                    <i ng-show='quota.mom==0' style=\"color: #28BD19;\">- -</i>\n                                    <i ng-show='quota.mom>0' style=\"color: #FF3300;\">\u2191 {{quota.mom}} %</i>\n                                    <i ng-show='quota.mom<0' style=\"color: #28BD19;\">\u2193 {{quota.mom}} %</i>\n                                </em>\n                            </p>\n                        </li>\n                    </ul>\n                </div>",
        link: function (scope, element, attr) {
            var $ul = element.find('ul');
            init(element, $ul, {
                speed: 30,
                rowHeight: 68
            });
        }
    };
}]);
var yes;
(function (yes) {
    (function () {
        angular.module('app')
            .directive('addGrid', function ($compile, $templateCache, $http) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        ngModel: "=",
                        form: "=",
                        model: "="
                    },
                    require: '^ngModel',
                    templateUrl: 'plugins/bas/components/addgrid.html',
                    controller: ['$rootScope', 'uiGridConstants', 'toastr', '$timeout', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                        function ($rootScope, uiGridConstants, toastr, $timeout, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                            if (!$scope.ngModel) {
                                $scope.ngModel = [];
                            }
                            $scope.rowmodel = {};
                            $scope.gridconfig = {
                                schema: {
                                    "type": "object",
                                    "properties": {
                                        "uid": {
                                            "title": "不动产单元号",
                                            "type": "string"
                                        }
                                    }
                                },
                                form: [{
                                    title: "",
                                    type: "basRegion",
                                    css: "max-4",
                                    items: []
                                },
                                ]
                            };
                            if ($scope.form.hasOwnProperty("form")) {
                                $scope.gridconfig = angular.copy($scope.form.form);
                            }
                            var isfoot = false;
                            $scope.bakheaders = angular.copy($scope.form.headers);
                            angular.forEach($scope.form.headers, function (col, key) {
                                col.title = col.displayName;
                                col.key = key;
                                if (!$scope.form.hasOwnProperty("form")) {
                                    if (!col.hasOwnProperty("type")) {
                                        col.type = "string";
                                    }
                                    $scope.gridconfig.form[0].items.push(col);
                                }
                                col.enableFiltering = false;
                                if (!col.hasOwnProperty("enableColumnMenu")) {
                                    col.enableColumnMenu = false;
                                }
                                if (col.hasOwnProperty("summsg")) {
                                    col.aggregationType = uiGridConstants.aggregationTypes.sum;
                                    isfoot = true;
                                    if (col.summsg.auto) {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{ ( col.getAggregationValue() | number :col.colDef.num ) }}</div></div>";
                                    }
                                    else {
                                        if (angular.isString(col.summsg.sumval)) {
                                            col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval)}}</div></div>";
                                        }
                                        else {
                                            col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval | number :col.colDef.num)}}</div></div>";
                                        }
                                    }
                                }
                                if (col) {
                                    if (col.readonly) {
                                        col.enableCellEdit = false;
                                        if (col.type == "number" || col.type == "basNumber") {
                                            col.cellTemplate = "ui-grid/gridcellnumber";
                                            col.headerCellClass = "esy-number";
                                        }
                                        else if (col.type == "basLov") {
                                            col.cellTemplate = "ui-grid/gridcelllov";
                                        }
                                    }
                                    else {
                                        if (col.type == "basLov") {
                                            col.cellTemplate = "ui-grid/gridcelllov";
                                        }
                                        else if (col.type == "basNumber" || col.type == "number") {
                                            col.headerCellClass = "esy-number";
                                            col.cellTemplate = "ui-grid/gridcellnumber";
                                        }
                                    }
                                }
                            });
                            if (angular.isUndefined($scope.form.existdel)) {
                                $scope.form.existdel = true;
                            }
                            $scope.gridOptions = angular.extend({
                                data: 'ngModel',
                                enableCellEditOnFocus: false,
                                // enableFiltering: true,
                                enableSorting: true,
                                enableColumnMenu: true,
                                suppressRemoveSort: false,
                                showGridFooter: false,
                                showColumnFooter: isfoot,
                                columnFooterHeight: 24,
                                multiSelect: true,
                                enableFullRowSelection: false,
                                enableGridMenu: true,
                                gridMenuCustomItems: [{
                                    title: '重置',
                                    action: function ($event) {
                                        $scope.resetgridmsg();
                                        $scope.resetstatus();
                                        $scope.gridOptions.columnDefs = angular.copy($scope.readgridmsg($scope.bakheaders, $scope.form.gridkey ? $scope.form.gridkey : ""));
                                    },
                                    order: 210
                                }],
                                onRegisterApi: function (gridApi) {
                                    $scope.form.gridApi = gridApi;
                                    $scope.gridApi = gridApi;
                                    if ($scope.form.existdel) {
                                        $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
                                    }
                                    gridApi.core.on.renderingComplete($scope, function (ar1) {
                                        $timeout(function () {
                                            angular.element(window).trigger('resize');
                                            if ($scope.gridApi.grid.rows.length > 0) {
                                                $scope.gridApi.grid.rows.forEach(function (element) {
                                                    if (!element.entity.isdel) {
                                                        $scope.rowmodel = $scope.gridApi.grid.rows[0].entity;
                                                        $scope.rowmodel.formstatus = $scope.model.formstatus;
                                                    }
                                                });
                                            }
                                            else {
                                                $scope.rowmodel = { formstatus: "view" };
                                            }
                                            $timeout(function () {
                                                $scope.$broadcast('changeadddetail');
                                            });
                                        }, 0);
                                    });
                                    gridApi.core.on.columnVisibilityChanged($scope, function (ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    });
                                    gridApi.colMovable.on.columnPositionChanged($scope, function (ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    });
                                    gridApi.colResizable.on.columnSizeChanged($scope, function (ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    });
                                },
                                rowTemplate: "<div  ng-click=\"grid.appScope.onDblClick($event,row);grid.appScope.hoveredIndex = rowRenderIndex\" " +
                                    "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                                    "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader,'selecthoverclass': grid.appScope.hoveredIndex === rowRenderIndex }\" " +
                                    "ui-grid-cell ></div>"
                            }, settings.uiGrid);
                            if ($scope.form.sortable) {
                                $scope.gridOptions.sortable = $scope.form.sortable;
                            }
                            if ($scope.form.height) {
                                $scope.gridstyle = {
                                    height: $scope.form.height + "px"
                                };
                            }
                            $scope.onDblClick = function (event, row) {
                                if (row && row.entity) {
                                    $scope.rowmodel = row.entity;
                                    $timeout(function () {
                                        $scope.$broadcast('changeadddetail');
                                    });
                                }
                            };
                            $scope.$on("changeadddetail", function (event, id) {
                                if (event.currentScope.$id != event.targetScope.$id) {
                                    $scope.rowmodel = { formstatus: "view" };
                                    if ($scope.gridApi.grid.rows.length > 0) {
                                        $scope.gridApi.grid.rows.forEach(function (element) {
                                            if (!element.entity.isdel) {
                                                $scope.rowmodel = $scope.gridApi.grid.rows[0].entity;
                                                $scope.rowmodel.formstatus = $scope.model.formstatus;
                                            }
                                        });
                                    }
                                    if ($scope.form.hasOwnProperty("onchangerecord")) {
                                        $scope.form.onchangerecord($scope.rowmodel);
                                    }
                                }
                            });
                            $scope.singleFilter = function (renderableRows) {
                                renderableRows.forEach(function (row) {
                                    row.visible = !row.entity["isdel"];
                                });
                                return renderableRows;
                            };
                            $scope.resetgridmsg = function () {
                                localStorage.setItem($scope.form.gridkey + "_grid", "{}");
                            };
                            $scope.savegridmsg = function (gridcols) {
                                var cols = {};
                                angular.forEach(gridcols, function (column) {
                                    cols[column.field] = {
                                        width: column.width,
                                        visible: column.visible
                                    };
                                });
                                localStorage.setItem($scope.form.gridkey + "_grid", angular.toJson(cols, true));
                            };
                            $scope.readgridmsg = function (headers, localStorageKey) {
                                var columns = [];
                                var colsmsg = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                                angular.forEach(colsmsg, function (col, key) {
                                    if (headers.hasOwnProperty(key)) {
                                        var item = angular.extend(headers[key], col);
                                        if (angular.isObject(headers[key]) && key) {
                                            item.name = key;
                                            item.displayName = headers[key].displayName;
                                        }
                                        if (angular.isUndefined(item.headerCellFilter))
                                            item.headerCellFilter = "translate";
                                        columns.push(item);
                                    }
                                });
                                angular.forEach(headers, function (col, key) {
                                    if (!colsmsg.hasOwnProperty(key)) {
                                        if (angular.isString(col)) {
                                            col = {
                                                name: key,
                                                original: col,
                                                displayName: col
                                            };
                                        }
                                        else if (angular.isObject(col) && key) {
                                            col.name = key;
                                        }
                                        if (angular.isUndefined(col.headerCellFilter))
                                            col.headerCellFilter = "translate";
                                        columns.push(col);
                                    }
                                });
                                return columns;
                            };
                            $scope.resetstatus = function () {
                                var nowgridmsg = $scope.gridOptions.columnDefs;
                                angular.forEach($scope.bakheaders, function (col, key) {
                                    angular.forEach($scope.gridOptions.columnDefs, function (column) {
                                        if (column.name == key) {
                                            if (column.hasOwnProperty("readonly")) {
                                                col.readonly = column.readonly;
                                            }
                                        }
                                    });
                                });
                            };
                            $scope.action = [];
                            if ($scope.form.action) {
                                angular.forEach($scope.form.action, function (op, key) {
                                    var item = {};
                                    if (key == "add") {
                                        item = {
                                            'name': '新增',
                                            'icon': 'fa-plus',
                                            'preclick': function () {
                                                //$scope.form.action[key].click();
                                                op.click($scope.ngModel);
                                                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                                $timeout(function (resource) {
                                                    $scope.gridApi.grid.appScope.hoveredIndex = $scope.gridApi.grid.rows.length - 1;
                                                    $scope.rowmodel = $scope.gridApi.grid.rows[$scope.gridApi.grid.rows.length - 1].entity;
                                                    $timeout(function () {
                                                        $scope.$broadcast('changeadddetail');
                                                    });
                                                });
                                            }
                                        };
                                    }
                                    else if (key == "del") {
                                        item = {
                                            'name': '删除',
                                            'icon': 'fa-remove',
                                            'preclick': function () {
                                                var rows = $scope.gridApi.selection.getSelectedRows() || [];
                                                if (rows.length == 0) {
                                                    toastr.info("请选择删除记录！");
                                                }
                                                else {
                                                    angular.forEach(rows, function (row) {
                                                        op.click(row);
                                                        $scope.gridApi.grid.refresh();
                                                        $scope.rowmodel = { formstatus: "view" };
                                                        $scope.gridApi.grid.rows.forEach(function (element) {
                                                            if (!element.entity.isdel) {
                                                                $scope.rowmodel = element.entity;
                                                                $timeout(function () {
                                                                    $scope.$broadcast('changeadddetail');
                                                                });
                                                            }
                                                        });
                                                        // $scope.form.action[key].click(row);
                                                        // $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                                    });
                                                }
                                            }
                                        };
                                    }
                                    else {
                                        item = {
                                            'name': op.name,
                                            'icon': op.icon,
                                            'preclick': function () {
                                                op.click();
                                                // $scope.form.action[key].click();
                                                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                            }
                                        };
                                    }
                                    item = angular.extend(item, op);
                                    $scope.action.push(item);
                                });
                            }
                            $scope.$watch("form.headers", function (newValue, oldValue) {
                                if ($scope.form.headers) {
                                    $scope.gridOptions.columnDefs = angular.copy($scope.readgridmsg($scope.form.headers, $scope.form.gridkey ? $scope.form.gridkey : ""));
                                }
                            }, true); ///
                            $scope.$watch("ngModel", function (newValue, oldValue) {
                                if ($scope.ngModel) {
                                    $scope.gridOptions.totalItems = $scope.ngModel.count;
                                }
                            }, true); ///
                            $scope.$watch("model.formstatus", function (newValue, oldValue) {
                                if ($scope.model.formstatus && $scope.ngModel) {
                                    $scope.ngModel.forEach(function (element) {
                                        element.formstatus = $scope.model.formstatus;
                                    });
                                }
                            }, true); ///
                            $scope.$on('RefreshGrid', function () {
                                $scope.gridApi.grid.refresh();
                            });
                        }
                    ]
                };
            });
    }());
})(yes || (yes = {}));

//# sourceMappingURL=addgrid.js.map

angular.module('app')
    .directive('authority', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                authorityOption: "="
            },
            require: '^ngModel',
            controller: ['$rootScope', '$scope', '$location', '$element', '$attrs', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $element, $attrs, utils, ngDialog, $filter) {
                    var scope = $scope;
                    if (scope.authorityOption.authoritykey) {
                        var authorityList = $rootScope.authorityList;
                        var readonly = true;
                        authorityList.forEach(function (item) {
                            if (item.bas_cuscus_add == scope.authorityOption.authoritykey) {
                                readonly = false;
                            }
                        });
                        scope.authorityOption.readonly = readonly;
                    }
                    //scope.dataNgDisabled="disabled"
                    //  $element.addClass("disabled");
                }]
        };
    });

//# sourceMappingURL=authority.js.map

angular.module('app.core.layout')
    .directive('autoWidth', ['settings', '$timeout', '$window',
        function (settings, $timeout, $window) {
            // var _docHeight = document.documentElement.clientHeight;
            function resetwidth(scope, element, attr) {
                var width = element.parent().width();
                angular.element(element).width(width);
            }
            return {
                restrict: "A",
                link: function (scope, element, attr) {
                    scope.$on('layout-responsive:changed', function () {
                        resetwidth(scope, element, attr);
                    });
                }
            };
        }]);

//# sourceMappingURL=autowidth.js.map

"use strict";
angular.module('app')
    .controller('app.baslov', ['$scope', '$translate', 'ngDialog', 'utils', 'toastr',
        function($scope, $translate, ngDialog, utils, toastr) {
            var scope = $scope;

            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20
            }
            scope.promise = null;

            scope.filter = scope.lovpara;

            scope.action = {

                load: function() {
                    //  scope.$emit("loadIsShow");
                    scope.filter.conditionRelatiion = "and";
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: scope.config.queryUrl + "?page=" + scope.datapage.page + "&size=" + scope.datapage.size,
                        mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                        //  scope.$emit("loadIsHide");
                    });


                },
                reset: function() {
                    scope.filter = scope.lovpara;

                },
                sure: function() {

                    var rows = scope.gridApi.selection.getSelectedRows() || [];
                    if (rows.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    scope.$parent.action.lovback(rows)

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    var rows = [];
                    rows.push(entity);
                    scope.$parent.action.lovback(rows)
                },

            }
            scope.action.load();

        }
    ]);
angular.module('app')
    .directive('basRemark', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/basremark.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }
                    // scope.model = {
                    //     field: scope.ngModel
                    // }
                    // scope.$watch('model.field', function (newValue, oldValue) {
                    //     scope.ngModel = newValue;
                    // }, true); ///
                    // scope.$watch('ngModel', function (newValue, oldValue) {
                    //     scope.model.field = newValue;
                    // }, true); ///
                    //  scope.remarktemplateUrl="plugins/bas/components/remarkpop.html"
                    scope.dialog = function () {
                        var injector = angular.element(document).injector();
                        var ngDialog = injector.get('ngDialog');
                        var toastr = injector.get('toastr');
                        ngDialog.open({
                            className: "ngdialog-sm",
                            template: 'plugins/bas/components/remarkpop.html',
                            scope: $scope,
                            controller: function ($scope) {
                            }
                        });
                    };
                }]
        };
    });

//# sourceMappingURL=basremark.js.map

angular.module('app')
    .directive('basString', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/basstring.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.model = {
                        field: scope.ngModel
                    };
                    scope.$watch('model.field', function (newValue, oldValue) {
                        scope.ngModel = newValue;
                    }, true); ///
                    scope.$watch('ngModel', function (newValue, oldValue) {
                        scope.model.field = newValue;
                    }, true); ///
                    scope.$watch('$parent.model.formstatus', function (newValue, oldValue) {
                        var formstatus = "00"; //初始状态
                        if (newValue) {
                            formstatus = newValue;
                        }
                        if (formstatus == "99") {
                            scope.form.readonly = true;
                        }
                        else {
                            if (scope.form.readonlystatus) {
                                var readonlystatus = scope.form.readonlystatus.split(",");
                                var readonly = false;
                                readonlystatus.forEach(function (element) {
                                    if (element == formstatus) {
                                        readonly = true;
                                    }
                                });
                                scope.form.readonly = readonly;
                            }
                        }
                    }, true); ///
                }]
        };
    });

//# sourceMappingURL=basstring.js.map

angular.module('app')
    .directive('checkboxs', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                option: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/checkboxs.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.fieldval = [];
                    scope.$watch('ngModel', function(newValue, oldValue) {
                        if (angular.isUndefined(newValue)) {
                            scope.fieldval = [];
                        }
                        if (!angular.isUndefined(newValue) && newValue) {
                            scope.fieldval = newValue.split(",");
                        }


                    }, true); ///

                    scope.$watch('fieldval', function(newValue, oldValue) {
                        if (newValue.length > 0) {
                            scope.ngModel = newValue.join(",");
                        } else if (!angular.isUndefined(scope.ngModel)) {
                            scope.ngModel = "";
                        }

                    }, true); ///








                }
            ]
        }
    });
/**
 * Checklist-model
 * AngularJS directive for list of checkboxes
 * https://github.com/vitalets/checklist-model
 * License: MIT http://opensource.org/licenses/MIT
 */

angular.module('app')
    .directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
        // contains
        function contains(arr, item, comparator) {
            if (angular.isArray(arr)) {
                for (var i = arr.length; i--;) {
                    if (comparator(arr[i], item)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // add
        function add(arr, item, comparator) {
            arr = angular.isArray(arr) ? arr : [];
            if (!contains(arr, item, comparator)) {
                arr.push(item);
            }
            return arr;
        }

        // remove
        function remove(arr, item, comparator) {
            if (angular.isArray(arr)) {
                for (var i = arr.length; i--;) {
                    if (comparator(arr[i], item)) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            return arr;
        }

        // http://stackoverflow.com/a/19228302/1458162
        function postLinkFn(scope, elem, attrs) {
            // exclude recursion, but still keep the model
            var checklistModel = attrs.checklistModel;
            attrs.$set("checklistModel", null);
            // compile with `ng-model` pointing to `checked`
            $compile(elem)(scope);
            attrs.$set("checklistModel", checklistModel);

            // getter / setter for original model
            var getter = $parse(checklistModel);
            var setter = getter.assign;
            var checklistChange = $parse(attrs.checklistChange);
            var checklistBeforeChange = $parse(attrs.checklistBeforeChange);

            // value added to list
            var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;


            var comparator = angular.equals;

            if (attrs.hasOwnProperty('checklistComparator')) {
                if (attrs.checklistComparator[0] == '.') {
                    var comparatorExpression = attrs.checklistComparator.substring(1);
                    comparator = function(a, b) {
                        return a[comparatorExpression] === b[comparatorExpression];
                    };

                } else {
                    comparator = $parse(attrs.checklistComparator)(scope.$parent);
                }
            }

            // watch UI checked change
            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                    scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);
                    return;
                }

                setValueInChecklistModel(value, newValue);

                if (checklistChange) {
                    checklistChange(scope);
                }
            });

            function setValueInChecklistModel(value, checked) {
                var current = getter(scope.$parent);
                if (angular.isFunction(setter)) {
                    if (checked === true) {
                        setter(scope.$parent, add(current, value, comparator));
                    } else {
                        setter(scope.$parent, remove(current, value, comparator));
                    }
                }

            }

            // declare one function to be used for both $watch functions
            function setChecked(newArr, oldArr) {
                if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                    setValueInChecklistModel(value, scope[attrs.ngModel]);
                    return;
                }
                scope[attrs.ngModel] = contains(newArr, value, comparator);
            }

            // watch original model change
            // use the faster $watchCollection method if it's available
            if (angular.isFunction(scope.$parent.$watchCollection)) {
                scope.$parent.$watchCollection(checklistModel, setChecked);
            } else {
                scope.$parent.$watch(checklistModel, setChecked, true);
            }
        }

        return {
            restrict: 'A',
            priority: 1000,
            terminal: true,
            scope: true,
            compile: function(tElement, tAttrs) {
                if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && (tElement[0].tagName !== 'MD-CHECKBOX') && (!tAttrs.btnCheckbox)) {
                    throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
                }

                if (!tAttrs.checklistValue && !tAttrs.value) {
                    throw 'You should provide `value` or `checklist-value`.';
                }

                // by default ngModel is 'checked', so we set it if not specified
                if (!tAttrs.ngModel) {
                    // local scope var storing individual checkbox model
                    tAttrs.$set("ngModel", "checked");
                }

                return postLinkFn;
            }
        };
    }]);
angular.module('app')
    .directive('dateTimepicker', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/datetimepicker.html',
            controller: ['$timeout', '$rootScope', '$scope', '$location', '$log', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($timeout, $rootScope, $scope, $location, $log, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.mytime = new Date();
                    var minu = scope.mytime.getMinutes();
                    minu = minu.toString().substring(0, minu.toString().length - 1) + "0";
                    scope.mytime.setMinutes(minu);
                    scope.$watch('ngModel', function (newValue, oldValue) {
                        if (newValue) {
                            scope.mytime = new Date(scope.ngModel.replace(/-/g, "/"));
                            scope.datefield = new moment(scope.mytime).format("YYYY-MM-DD");
                            scope.timefield = new moment(scope.mytime).format("HH:mm");
                        }
                        else {
                            scope.datefield = "";
                            scope.timefield = "";
                        }
                    }, true); ///
                    scope.changeddate = function () {
                        if (!scope.datefield) {
                            return;
                        }
                        if (!scope.timefield) {
                            scope.timefield = new moment(scope.mytime).format("HH:mm");
                        }
                        scope.ngModel = scope.datefield + " " + scope.timefield;
                        scope.mytime = new Date(scope.ngModel);
                        $timeout(function () {
                            scope.form.change();
                        }, 100);
                    };
                    scope.changetimestr = function () {
                        if (!scope.datefield) {
                            scope.datefield = new moment(scope.mytime).format("YYYY-MM-DD");
                        }
                        scope.ngModel = scope.datefield + " " + scope.timefield;
                        scope.mytime = new Date(scope.ngModel.replace(/-/g, "/"));
                    };
                    scope.changedtime = function () {
                        scope.timefield = new moment(scope.mytime).format("HH:mm");
                        if (!scope.datefield) {
                            scope.datefield = new moment(scope.mytime).format("YYYY-MM-DD");
                        }
                        scope.ngModel = scope.datefield + " " + scope.timefield;
                        $timeout(function () {
                            if (scope.form.change) {
                                scope.form.change();
                            }
                        }, 100);
                        //this.mytime.setHours(14);
                        //this.mytime.setMinutes(0);
                    };
                    scope.hstep = 1;
                    scope.mstep = 10;
                }]
        };
    });

//# sourceMappingURL=datetimepicker.js.map

var yes;
(function (yes) {
    (function () {
        var module = angular.module('app');
        module.directive('uiGridSelect', ['uiGridConstants', 'uiGridEditConstants',
            function (uiGridConstants, uiGridEditConstants) {
                return {
                    require: ['?^uiGrid', '?^uiGridRenderContainer'],
                    scope: true,
                    compile: function () {
                        return {
                            pre: function ($scope, $elm, $attrs) {
                            },
                            post: function ($scope, $elm, $attrs, controllers) {
                                var uiGridCtrl = controllers[0];
                                var renderContainerCtrl = controllers[1];
                                //set focus at start of edit
                                $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
                                    $elm[0].focus();
                                    $elm[0].style.width = ($elm[0].parentElement.offsetWidth - 1) + 'px';
                                    // $scope.grid.disableScrolling = true;
                                    $elm.on('blur', function (evt) {
                                        //  $scope.stopEdit(evt);
                                    });
                                });
                                $scope.stopEdit = function (evt) {
                                    // no need to validate a dropdown - invalid values shouldn't be
                                    // available in the list
                                    $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                                };
                                $elm.on('keydown', function (evt) {
                                    switch (evt.keyCode) {
                                        case uiGridConstants.keymap.ESC:
                                            evt.stopPropagation();
                                            $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                                            break;
                                    }
                                    if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                                        evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                                        if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                                            $scope.stopEdit(evt);
                                        }
                                    }
                                    else {
                                        //handle enter and tab for editing not using cellNav
                                        switch (evt.keyCode) {
                                            case uiGridConstants.keymap.ENTER: // Enter (Leave Field)
                                            case uiGridConstants.keymap.TAB:
                                                evt.stopPropagation();
                                                evt.preventDefault();
                                                $scope.stopEdit(evt);
                                                break;
                                        }
                                    }
                                    return true;
                                });
                            }
                        };
                    }
                };
            }
        ]);
        angular.module('app')
            .directive('editGrid', function ($compile, $templateCache, $http) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        ngModel: "=",
                        form: "=",
                        model: "="
                    },
                    require: '^ngModel',
                    templateUrl: 'plugins/bas/components/editgrid.html',
                    controller: ['$rootScope', 'uiGridConstants', 'toastr', '$timeout', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                        function ($rootScope, uiGridConstants, toastr, $timeout, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                            if (!$scope.ngModel) {
                                $scope.ngModel = [];
                            }
                            var isfoot = false;
                            $scope.bakheaders = angular.copy($scope.form.headers);
                            angular.forEach($scope.form.headers, function (col, key) {
                                col.enableFiltering = false;
                                // if (col.aggregationType) {
                                //     isfoot = true
                                // }
                                if (!col.hasOwnProperty("enableColumnMenu")) {
                                    col.enableColumnMenu = false;
                                }
                                if (col.hasOwnProperty("summsg")) {
                                    col.aggregationType = uiGridConstants.aggregationTypes.sum;
                                    isfoot = true;
                                    if (col.summsg.auto) {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{ ( col.getAggregationValue() | number :col.colDef.num ) }}</div></div>";
                                    }
                                    else {
                                        if (angular.isString(col.summsg.sumval)) {
                                            col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval)}}</div></div>";
                                        }
                                        else {
                                            col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval | number :col.colDef.num)}}</div></div>";
                                        }
                                    }
                                }
                                if (col) {
                                    if (col.readonly) {
                                        col.enableCellEdit = false;
                                        if (col.type == "number" || col.type == "basNumber") {
                                            col.cellTemplate = "ui-grid/gridcellnumber";
                                            col.headerCellClass = "esy-number";
                                        }
                                        else if (col.type == "basLov") {
                                            col.cellTemplate = "ui-grid/gridcelllov";
                                        }
                                    }
                                    else {
                                        if (col.type == "basLov") {
                                            col.editableCellTemplate = "ui-grid/celllov";
                                            //  if (col.nameField) {
                                            col.cellTemplate = "ui-grid/gridcelllov";
                                        }
                                        else if (col.type == "basLove") {
                                            col.editableCellTemplate = "ui-grid/celllove";
                                        }
                                        else if (col.type == "date-picker") {
                                            col.editableCellTemplate = "ui-grid/celldatePicker";
                                        }
                                        else if (col.type == "basEsydatetime") {
                                            col.editableCellTemplate = "ui-grid/cellesydatetime";
                                        }
                                        else if (col.type == "basRemark") {
                                            col.editableCellTemplate = "ui-grid/cellremark";
                                        }
                                        else if (col.type == "basNumber" || col.type == "number") {
                                            col.headerCellClass = "esy-number";
                                            col.editableCellTemplate = "ui-grid/cellnumber";
                                            col.cellTemplate = "ui-grid/gridcellnumber";
                                        }
                                        else {
                                            col.editableCellTemplate = "ui-grid/cellDefault";
                                        }
                                    }
                                    if (col.required) {
                                        col.headerCellClass = (col.headerCellClass ? col.headerCellClass : "") + " required ";
                                    }
                                }
                            });
                            if (angular.isUndefined($scope.form.existdel)) {
                                $scope.form.existdel = true;
                            }
                            $scope.gridOptions = angular.extend({
                                data: 'ngModel',
                                enableCellEditOnFocus: true,
                                // enableFiltering: true,
                                enableSorting: false,
                                columnFooterHeight: 24,
                                showColumnFooter: isfoot,
                                gridMenuCustomItems: [{
                                    title: '重置',
                                    action: function ($event) {
                                        $scope.resetgridmsg();
                                        $scope.resetstatus();
                                        $scope.gridOptions.columnDefs = angular.copy($scope.readgridmsg($scope.bakheaders, $scope.form.gridkey ? $scope.form.gridkey : ""));
                                    },
                                    order: 210
                                }],
                                onRegisterApi: function (gridApi) {
                                    $scope.form.gridApi = gridApi;
                                    $scope.gridApi = gridApi;
                                    if ($scope.form.existdel) {
                                        $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
                                    }
                                    gridApi.core.on.renderingComplete($scope, function (ar1) {
                                        $timeout(function () {
                                            angular.element(window).trigger('resize');
                                        }, 0);
                                    });
                                    gridApi.core.on.columnVisibilityChanged($scope, function (ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    });
                                    gridApi.colMovable.on.columnPositionChanged($scope, function (ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    });
                                    gridApi.colResizable.on.columnSizeChanged($scope, function (ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    });
                                },
                                rowTemplate: "<div  " +
                                    "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                                    "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" " +
                                    "ui-grid-cell   ></div>"
                            }, settings.uiGrid);
                            if ($scope.form.sortable) {
                                $scope.gridOptions.sortable = $scope.form.sortable;
                            }
                            if ($scope.form.height) {
                                $scope.gridstyle = {
                                    height: $scope.form.height + "px"
                                };
                            }
                            $scope.singleFilter = function (renderableRows) {
                                renderableRows.forEach(function (row) {
                                    row.visible = !row.entity["isdel"];
                                });
                                return renderableRows;
                            };
                            $scope.resetgridmsg = function () {
                                localStorage.setItem($scope.form.gridkey + "_grid", "{}");
                            };
                            $scope.savegridmsg = function (gridcols) {
                                var cols = {};
                                angular.forEach(gridcols, function (column) {
                                    cols[column.field] = {
                                        width: column.width,
                                        visible: column.visible
                                    };
                                });
                                localStorage.setItem($scope.form.gridkey + "_grid", angular.toJson(cols, true));
                            };
                            $scope.readgridmsg = function (headers, localStorageKey) {
                                var columns = [];
                                var colsmsg = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                                angular.forEach(colsmsg, function (col, key) {
                                    if (headers.hasOwnProperty(key)) {
                                        var item = angular.extend(headers[key], col);
                                        if (angular.isObject(headers[key]) && key) {
                                            item.name = key;
                                            item.displayName = headers[key].displayName;
                                        }
                                        if (angular.isUndefined(item.headerCellFilter))
                                            item.headerCellFilter = "translate";
                                        columns.push(item);
                                    }
                                });
                                angular.forEach(headers, function (col, key) {
                                    if (!colsmsg.hasOwnProperty(key)) {
                                        if (angular.isString(col)) {
                                            col = {
                                                name: key,
                                                original: col,
                                                displayName: col
                                            };
                                        }
                                        else if (angular.isObject(col) && key) {
                                            col.name = key;
                                        }
                                        if (angular.isUndefined(col.headerCellFilter))
                                            col.headerCellFilter = "translate";
                                        columns.push(col);
                                    }
                                });
                                return columns;
                            };
                            $scope.resetstatus = function () {
                                var nowgridmsg = $scope.gridOptions.columnDefs;
                                angular.forEach($scope.bakheaders, function (col, key) {
                                    angular.forEach($scope.gridOptions.columnDefs, function (column) {
                                        if (column.name == key) {
                                            if (column.hasOwnProperty("readonly")) {
                                                col.readonly = column.readonly;
                                            }
                                        }
                                    });
                                });
                            };
                            $scope.action = [];
                            if ($scope.form.action) {
                                angular.forEach($scope.form.action, function (op, key) {
                                    var item = {};
                                    if (key == "add") {
                                        item = {
                                            'name': '新增',
                                            'icon': 'fa-plus',
                                            'preclick': function () {
                                                //$scope.form.action[key].click();
                                                op.click($scope.ngModel);
                                                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                            }
                                        };
                                    }
                                    else if (key == "del") {
                                        item = {
                                            'name': '删除',
                                            'icon': 'fa-remove',
                                            'preclick': function () {
                                                var rows = $scope.gridApi.selection.getSelectedRows() || [];
                                                if (rows.length == 0) {
                                                    toastr.info("请选择删除记录！");
                                                }
                                                else {
                                                    angular.forEach(rows, function (row) {
                                                        op.click(row);
                                                        $scope.gridApi.grid.refresh();
                                                        // $scope.form.action[key].click(row);
                                                        // $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                                    });
                                                }
                                            }
                                        };
                                    }
                                    else {
                                        item = {
                                            'name': op.name,
                                            'icon': op.icon,
                                            'preclick': function () {
                                                op.click();
                                                // $scope.form.action[key].click();
                                                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                            }
                                        };
                                    }
                                    item = angular.extend(item, op);
                                    $scope.action.push(item);
                                });
                            }
                            $scope.$watch("form.headers", function (newValue, oldValue) {
                                if ($scope.form.headers) {
                                    $scope.gridOptions.columnDefs = angular.copy($scope.readgridmsg($scope.form.headers, $scope.form.gridkey ? $scope.form.gridkey : ""));
                                }
                            }, true); ///
                            $scope.$watch("ngModel", function (newValue, oldValue) {
                                if ($scope.ngModel) {
                                    $scope.gridOptions.totalItems = $scope.ngModel.count;
                                }
                            }, true); ///
                            $scope.$on('RefreshGrid', function () {
                                $scope.gridApi.grid.refresh();
                            });
                            //  $scope.$on('GridRedraw', function () {
                            //     // var resource = angular.copy($scope.ngModel)
                            //     // $scope.ngModel = [];
                            //     $timeout(function(resource) {
                            //        $scope.gridApi.grid.refresh();
                            //     }, 300);
                            // });
                        }
                    ]
                };
            });
    }());
})(yes || (yes = {}));

//# sourceMappingURL=editgrid.js.map

angular.module('app')
    .directive('esyDatetime', ['$parse', '$timeout', function($parse, $timeout) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function(scope, ele, attrs, ctrl) {
                scope.timeoption = {
                    isinitVal: false,
                    festival: false,
                    ishmsVal: true,
                    format: "YYYY-MM-DD hh:mm:ss",
                    zIndex: 30000,
                    choosefun: function(elem, val, date) {
                        // str = date.replace(/-/g, "/");
                        // var date = new Date(str);
                        // date = new moment(date).format(scope.timeoption.format);
                        $parse(attrs['ngModel']).assign(scope, val);
                        scope.onchange();

                    },
                    okfun: function(elem, val, date) {
                        // str = date.replace(/-/g, "/");
                        // var date = new Date(str);
                        // date = new moment(date).format(scope.timeoption.format);
                        $parse(attrs['ngModel']).assign(scope, val);
                        scope.onchange();
                    },
                    clearfun: function(elem, val) {
                        $parse(attrs['ngModel']).assign(scope, "");
                        scope.onchange();
                    }
                };

                scope.onchange = function() {
                    if (scope.timeoption.onchange) {
                        $timeout(function() {
                            scope.timeoption.onchange(scope.model ? scope.model : scope.row.entity);
                        });
                    }
                }

                if (scope.form) {
                    angular.extend(scope.timeoption, scope.form);
                };
                if (scope.col && scope.col.colDef) {
                    angular.extend(scope.timeoption, scope.col.colDef);
                };
                if (scope.option) {
                    angular.extend(scope.timeoption, scope.option);
                };
                $(ele).jeDate(scope.timeoption);

                //页面显示值转为model
                ctrl.$parsers.unshift(function(ele) { //注意，指令这里用的是=号引入，formatnumber改变会同时反映在controller上，所以下面的格式化不能直接用formatnumber操作
                    var val = ele;
                    return val; //
                });

            }
        }

    }]);
angular.module('app')
    .directive('esyUeditor', function($compile, $templateCache, $http, $parse, settings) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            //  templateUrl: 'plugins/bas/components/esyueditor.html',
            controller: ['$rootScope', '$scope', '$location', '$element', '$attrs',
                function($rootScope, $scope, $location, $element, $attrs) {
                    var scope = $scope;

                    scope.id = scope.form.key.slice(-1)[0] + scope.$id;



                }
            ],
            link: function(scope, ele, attrs, ctrl) {
                scope.id = scope.form.key.slice(-1)[0] + scope.$id;
                var html = "<div>" +
                    // "<input ng-model=\"ngModel\" style=\"width:100%\">" +
                    "<div id=\"" + scope.id + "\"  ng-required=\"true\" ng-model=\"ngModel\"  type=\"text/plain\" style=\"width:100%;height:200px;\"></div>" +
                    "</div>"

                ele.html('').append($compile(html)(scope));
                setTimeout(function() {
                    scope.UE = UE.getEditor(scope.id, { enableAutoSave: false, saveInterval: 0, autoSyncData: false })

                    scope.UE.ready(function() {
                        //加载编辑器数据  

                        scope.UE.setContent(scope.ngModel ? scope.ngModel : "", false);
                        scope.$watch('form.readonly', function(newValue, oldValue) {
                            setTimeout(function() {

                                if (scope.form.readonly) {
                                    if (scope.UE) { //一开启就关,则无法写入数据
                                        scope.UE.setDisabled('fullscreen');
                                    }
                                } else {
                                    if (scope.UE) { //一开启就关,则无法写入数据
                                        scope.UE.setEnabled();
                                    }

                                }

                            }, 1500);
                        }, true); ///



                        scope.$watch('ngModel', function(newValue, oldValue) {
                            if (!scope.UE.isFocus()) {
                                setTimeout(function() {
                                    if (scope.UE) { //一开启就关,则无法写入数据
                                        scope.UE.setContent(scope.ngModel ? scope.ngModel : "", false);
                                    }
                                }, 1000);
                            }

                        }, true); ///



                        scope.UE.addListener('contentChange', function() {
                            if (!scope.$$phase) {
                                scope.$apply(function() {
                                    var dd = scope.UE.getContent();
                                    ctrl.$setViewValue(dd);
                                });
                            }
                        });



                    });

                    ele.on('$destroy', function() {
                        scope.UE.destroy();
                    });
                })

            }
        }
    });
angular.module('app')
    .directive('esyUeditord', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/esyueditord.html',
            controller: ['$rootScope', '$scope', '$location', 'qwsys', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, qwsys, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.edit = function() {
                        ngDialog.open({
                            className: "ngdialog-lg",
                            template: '<div class="modal-header"><h4 class="modal-title">文本编辑</h4></div>' +
                                '<esy-ueditor ng-model="$parent.ngModel" form="form"></esy-ueditor>' +
                                '<div class="modal-footer"><button type="submit" class="btn btn-primary fa fa-save" ng-click="confirm()" >确定</button></div>',
                            plain: true,
                            scope: $scope,
                            controller: function($scope) {
                                $scope.confirm = function() {
                                    $scope.closeThisDialog();
                                }
                            }
                        })
                    }

                }
            ]
        };
    });
angular.module('app')
    .directive('formatstep', ['$parse', function($parse) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function(scope, ele, attrs, ctrl, $ngModelCtrl) {

                // $ngModelCtrl.$formatters.push(function() {
                //     return numberFilter(elm.val(), num);
                // });


                //页面显示值转为model
                ctrl.$parsers.unshift(function(ele) { //注意，指令这里用的是=号引入，formatnumber改变会同时反映在controller上，所以下面的格式化不能直接用formatnumber操作
                    var val = ele;
                    val = parseFloat(val);
                    if (attrs.hasOwnProperty("num")) {
                        if (attrs["num"]) {
                            val = val.toFixed(attrs["num"]);
                        }

                    }
                    val = val + "";
                    return val; //
                });

            }
        }

    }]);
(function() {
    'use strict';
    angular.module('app')
        .directive('getGallery', ['$location', 'utils', '$log', 'FileUploader', 'settings',
            function($location, utils, $log, FileUploader, settings) {

                return {
                    restrict: 'EA',
                    templateUrl: 'plugins/bas/components/getgallery.html',
                    replace: true,
                    scope: {
                        options: "=",
                        readonly: "=",
                        ngModel: "=",
                    },
                    require: 'ngModel',
                    link: function link(scope, element, attrs, ngModelController) {
                        setTimeout(function() {
                            scope.attachmentId = ngModelController.$viewValue;
                            scope.options = angular.extend({
                                maxMB: 100,
                                multiple: 10
                            }, scope.options);
                            if (scope.options.multiple == false) {
                                scope.options.multiple = 1;
                            }
                            scope.showall = false
                            if (scope.options.hasOwnProperty("showall")) {
                                scope.showall = scope.options.showall;
                            }
                            // scope.init();

                            scope.$watch("attachmentId", function() {
                                var chkstr = ngModelController.$viewValue;
                                if (chkstr) {
                                    chkstr = chkstr.trim()
                                }
                                if (scope.attachmentId && !chkstr) {
                                    ngModelController.$setViewValue(scope.attachmentId);
                                }
                            });
                        }, 200);

                    },
                    controller: ['$scope', '$attrs', '$element', 'ngDialog',
                        function($scope, $attrs, $element, ngDialog) {

                            var scope = $scope;

                            scope.options = angular.extend({
                                maxMB: 100,
                                multiple: 10
                            }, scope.options);
                            if (scope.options.multiple == false) {
                                scope.options.multiple = 1;
                            }
                            scope.showall = false
                            if (scope.options.hasOwnProperty("showall")) {
                                scope.showall = scope.options.showall;
                            }


                            $scope.rootUrl = '';
                            var selfHost = location.protocol + "//" + location.host;
                            $scope.host = settings.host == "self" ? selfHost : settings.host;
                            if (settings.apiPrefix) {
                                $scope.rootUrl = [$scope.host, settings.apiPrefix].join('/');
                            } else {
                                $scope.rootUrl = $scope.host;
                            }


                            var url = $scope.rootUrl + settings.uploadUrl;

                            $scope.downUrl = $scope.rootUrl + settings.downloadUrl;
                            var uploader = $scope.uploader = new FileUploader({
                                url: url,
                                autoUpload: true
                            });
                            $scope.sumSize = 0;
                            $scope.showbigimage = function(item) {
                                ngDialog.open({
                                    className: "ngdialog-lg",
                                    template: 'plugins/bas/components/getgalleryimage.html',
                                    controller: function($scope) {
                                        $scope.form = {

                                        }
                                        $scope.item = item;
                                        $scope.bigimageurl = scope.downUrl + "?uid=" + item.uid;
                                        $scope.action = {

                                            lovcancel: function() {
                                                $scope.closeThisDialog();
                                            }
                                        }
                                    }
                                })
                            }
                            $scope.init = function() {
                                $scope.apiPrefix = settings.apiPrefix;
                                var chkstr = $scope.attachmentId;
                                if (chkstr) {
                                    chkstr = chkstr.trim()
                                }
                                if (!chkstr) {
                                    utils.async("GET", settings.getUuid).then(function(attId) {
                                        if (!$scope.attachmentId) {
                                            $scope.ngModel = attId.data;
                                            $scope.attachmentId = attId.data;
                                            uploader.formData = [{ 'attachmentId': $scope.attachmentId }, { 'isImage': true }];
                                        }
                                    });
                                } else {


                                    uploader.formData = [{ 'attachmentId': $scope.attachmentId }, { 'isImage': true }];
                                    utils.async("GET", $scope.showall ? settings.getallByAttIdUrl : settings.getByAttIdUrl, { "attId": $scope.attachmentId }).then(function(res) {
                                        $scope.items = res.data.body;
                                        if ($scope.items) {
                                            $scope.items.forEach(function(item) {
                                                item.thumbUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showthumb?uid=" + item.uid;
                                                item.downloadUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showMiddleThumb?uid=" + item.uid;
                                            });
                                        }
                                    });
                                }
                                uploader.onSuccessItem = function(item, res, status, headers) {
                                    item.uid = res.body.data[0].uid;
                                    item.thumbUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showthumb?uid=" + item.uid;
                                    item.downloadUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showMiddleThumb?uid=" + item.uid;
                                    $scope.message = res.message;
                                };
                            };

                            $scope.$watch("ngModel", function() {
                                $scope.attachmentId = scope.ngModel;
                                $scope.init();
                            });

                            $scope.remove = function(item) {
                                utils.async("DELETE", settings.delByUid + "/" + item.uid).then(function(res) {
                                    if (res.data.body) {
                                        if ($scope.items) {
                                            for (var i = 0, size = $scope.items.length; i < size; i++) {
                                                if ($scope.items[i] == item) {
                                                    $scope.items.splice(i, 1);
                                                }
                                            }
                                        }
                                    } else {
                                        console.log("后台删除出错!");
                                    }
                                });
                            };

                            uploader.filters.push({
                                name: 'sizeFilter',
                                fn: function(item /*{File|FileLikeObject}*/ , options) {
                                    var tsum = 0;
                                    if ($scope.items) {
                                        $scope.items.forEach(function(item) {
                                            tsum += item.fileSize ? item.fileSize : 0;
                                        });
                                    }
                                    uploader.queue.forEach(function(item) {
                                        tsum += item.size;
                                    });
                                    tsum += item.size;
                                    if (tsum > $scope.options.maxMB * 1048576) {
                                        alert("大小不能超过" + $scope.options.maxMB + "M!");
                                        return false;
                                    } else if (((uploader.queue ? uploader.queue.length : 0) + ($scope.items ? $scope.items.length : 0)) >= $scope.options.multiple) {
                                        alert("最多只能上传" + $scope.options.multiple + "个文件!");
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            });

                        }
                    ]
                };
            }
        ]);
})();
(function() {
    'use strict';
    angular.module('app')
        .directive('getImage', ['$location', 'utils', '$log', 'settings',
            function($location, utils, $log, settings) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope: {
                        ngModel: "=",
                        form: "="
                    },
                    require: '^ngModel',
                    templateUrl: 'plugins/bas/components/getimage.html',
                    controller: ['$scope', '$attrs', '$element',
                        function($scope, $attrs, $element) {
                            var scope = $scope;
                            scope.$on('layout-responsive:changed', function() {
                                var width = $element.width();
                                scope.imagestyle = { "max-width": width + "px" };
                                scope.$apply();
                            });

                            scope.downurl = "";
                            if (scope.form.downurl) {
                                if (scope.form.downurl.indexOf("http") >= 0) {
                                    scope.downurl = scope.form.downurl;
                                } else {
                                    scope.downurl = settings.rootUrl + "/" + scope.form.downurl;
                                }

                            }
                            scope.imageurl = "";
                            scope.$watch('ngModel', function(newValue, oldValue) {
                                if (newValue) {
                                    if (scope.ngModel.indexOf("http") >= 0) {
                                        scope.imageurl = scope.ngModel;
                                    } else {
                                        scope.imageurl = settings.rootUrl + "/" + scope.form.imageurl + scope.ngModel + "&bust=" + (new Date()).getTime();
                                    }

                                }
                                if (scope.form.downurl) {
                                    if (scope.ngModel.indexOf("http") >= 0) {
                                        scope.downurl = scope.ngModel;
                                    } else {
                                        scope.downurl = settings.rootUrl + "/" + scope.form.downurl + scope.ngModel + "&bust=" + (new Date()).getTime();
                                    }
                                }
                            })

                        }
                    ]
                };
            }
        ]);
})();
angular.module('app')
    .directive('getLov', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/getlov.html',
            controller: ['$rootScope', '$timeout', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $timeout, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;

                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }
                    scope.model = {
                        field: scope.ngModel
                    }

                    scope.isinit = true;
                    scope.config = { //设定预设配置,如果类型为select将起作用
                        initLoad: false, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "value",
                            nameField: "name",
                            smallField: "name"
                        },
                    };
                    if (scope.form.lovtype != "select") {
                        scope.form.titleMap = [];
                        scope.form.fieldAddonRight = 'fa-search';
                        if (!qwconfig.lov[scope.form.lovtype]) {
                            toastr.info("请配置[" + scope.form.title + "]速查!");
                            return
                        }
                        scope.config = angular.copy(qwconfig.lov[scope.form.lovtype]);
                        if (scope.config.lovfilter && !scope.form.lovfilter) {
                            scope.form.lovfilter = scope.config.lovfilter;
                        }
                        if (scope.config.small) {
                            scope.form.small = true;
                        }

                        if (!scope.config.showField.hasOwnProperty("smallField")) {
                            scope.config.showField.smallField = scope.config.showField.nameField;
                        }

                        if (scope.config.titleMap) { //有预设资料
                            scope.form.titleMap = scope.config.titleMap;
                            scope.config.queryUrl = "";
                        }

                        if (scope.config.initLoad) {
                            var rootmap = scope.form.lovtype + "Map";
                            if ($rootScope[rootmap]) {
                                scope.form.titleMap = $rootScope[rootmap];
                            } else {
                                var getmap = function() {

                                    if (scope.config.queryUrl) {
                                        var data = {};

                                        if (scope.form.lovfilter) {
                                            scope.form.lovfilter.forEach(function(element) {
                                                if (element.hasOwnProperty("constant")) {
                                                    data[element.field] = element.constant
                                                } else {
                                                    if (scope.$parent.model) {
                                                        data[element.field] = scope.$parent.model[element.modelfield]
                                                    } else if (scope.$parent.row) {
                                                        data[element.field] = scope.$parent.row.entity[element.modelfield];
                                                    } else if (scope.$parent.ngModel) {
                                                        data[element.field] = scope.$parent.ngModel[element.modelfield];
                                                    }
                                                }
                                            }, this);
                                        }

                                        utils.ajax({
                                            method: 'POST',
                                            url: scope.config.queryUrl + "?page=0&size=10000",
                                            mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                            data: data
                                        }).then(function(res) {
                                            $rootScope[rootmap] = [];
                                            if (res.data.length > 0) {
                                                $rootScope[rootmap] = [{ value: "", name: "重置" }];
                                            }
                                            res.data.forEach(function(e) {
                                                if (e) {
                                                    e.value = e[scope.config.showField.valueField];
                                                    e.name = e[scope.config.showField.nameField];
                                                    e.smallName = e[scope.config.showField.smallField];
                                                    $rootScope[rootmap].push(e);
                                                }
                                            })
                                            scope.form.titleMap = $rootScope[rootmap];
                                        });

                                    }

                                }
                                getmap();
                            }
                        } else {
                            scope.form.refresh = function(options, search) {
                                if (!search) {
                                    scope.form.titleMap = scope.initMap;
                                } else {
                                    scope.getsearchMap(search);
                                }
                            }
                        }

                        scope.initMap = [];



                        scope.selectmodel = { value: "" };

                        scope.onDropdown = function() {
                            if (!scope.config.initLoad) {
                                scope.form.titleMap = [];
                                scope.getsearchMap("");
                            }

                        }

                        if (scope.config.dialogConfig) {
                            scope.config.dialogConfig = angular.copy(qwconfig.dialog[scope.config.dialogConfig]);
                            $scope.dialog = function() {
                                scope.lovpara = {};

                                if (scope.form.lovfilter) {
                                    scope.form.lovfilter.forEach(function(element) {

                                        if (element.hasOwnProperty("constant")) {
                                            scope.lovpara[element.field] = element.constant
                                        } else {

                                            if (scope.$parent.model) {
                                                scope.lovpara[element.field] = scope.$parent.model[element.modelfield]
                                            } else if (scope.$parent.row) {
                                                scope.lovpara[element.field] = scope.$parent.row.entity[element.modelfield];
                                            } else if (scope.$parent.ngModel) {
                                                scope.lovpara[element.field] = scope.$parent.ngModel[element.modelfield];
                                            }

                                        }

                                    }, this);
                                }
                                var injector = angular.element(document).injector();
                                var ngDialog = injector.get('ngDialog');
                                var toastr = injector.get('toastr');
                                scope.config.gridkey = scope.form.lovtype + "_grid";
                                ngDialog.open({
                                    className: scope.config.dialogConfig.ngdialogSize,
                                    template: 'plugins/bas/components/baslov.html',
                                    scope: $scope,
                                    controller: function($scope) {
                                        $scope.multiSelect = false;
                                        $scope.lovpara = scope.lovpara;

                                        if (scope.form.lovfilter) {
                                            scope.form.lovfilter.forEach(function(element) {
                                                if (element.hasOwnProperty("constant")) {
                                                    data[element.field] = element.constant
                                                } else {
                                                    if (scope.$parent.model) {
                                                        data[element.field] = scope.$parent.model[element.modelfield]
                                                    } else if (scope.$parent.row) {
                                                        data[element.field] = scope.$parent.row.entity[element.modelfield];
                                                    } else if (scope.$parent.ngModel) {
                                                        data[element.field] = scope.$parent.ngModel[element.modelfield]; //查询条件
                                                    }
                                                }
                                            }, this);
                                        }


                                        $scope.action = {
                                            lovback: function(rows) {
                                                var en = rows[0];

                                                if (!scope.config.initLoad) {
                                                    scope.form.titleMap = [];
                                                    en.value = en[scope.config.showField.valueField];
                                                    en.name = en[scope.config.showField.nameField];
                                                    en.smallName = en[scope.config.showField.smallField];
                                                    scope.form.titleMap.push(en);
                                                }
                                                if (scope.form.relationfield) {
                                                    scope.form.relationfield.forEach(function(element) {
                                                        if (scope.$parent.model) {
                                                            if (en[element.findfield]) {
                                                                scope.$parent.model[element.tofield] = en[element.findfield];
                                                            }

                                                        } else if (scope.$parent.row) {
                                                            if (en[element.findfield]) {
                                                                scope.$parent.row.entity[element.tofield] = en[element.findfield];
                                                            }

                                                        } else {
                                                            if (en[element.findfield]) {
                                                                scope.$parent.ngModel[element.tofield] = en[element.findfield];
                                                            }

                                                        }
                                                    });
                                                }
                                                scope.ngModel = en[scope.config.showField.valueField];
                                                if (scope.form.onchange) {
                                                    var model = {};
                                                    if (scope.$parent.model) {
                                                        model = scope.$parent.model;
                                                    } else if (scope.$parent.row) {
                                                        model = scope.$parent.row.entity;
                                                    } else if (scope.$parent.ngModel) {
                                                        model = scope.$parent.ngModel;
                                                    }
                                                    $timeout(function() {
                                                        scope.form.onchange(model);
                                                    }, 100);
                                                }


                                                // $timeout(function() {
                                                //     scope.form.onchange(en);
                                                // }, 100);


                                                $scope.closeThisDialog();

                                            },
                                            lovcancel: function() {
                                                $scope.closeThisDialog();
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }

                    scope.getsearchMap = function(search) {

                        if (scope.config.queryUrl) {
                            var data = {};
                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {
                                    if (element.hasOwnProperty("constant")) {
                                        data[element.field] = element.constant;
                                    } else {

                                        if (scope.$parent.model) {
                                            data[element.field] = scope.$parent.model[element.modelfield];
                                        } else if (scope.$parent.row) {
                                            data[element.field] = scope.$parent.row.entity[element.modelfield];
                                        } else if (scope.$parent.ngModel) {
                                            data[element.field] = scope.$parent.ngModel[element.modelfield];
                                        }
                                    }
                                }, this);
                            }


                            data.lovsearchstr = search
                            utils.ajax({
                                method: 'POST',
                                url: scope.config.queryUrl + "?page=0&size=20",
                                mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                data: data
                            }).then(function(res) {
                                var titleMap = []
                                if (res.data.body.content.length > 0) {
                                    titleMap = [{ value: "", name: "空白", smallName: "空白" }];
                                }
                                var exist = false;
                                res.data.body.content.forEach(function(e) {
                                    if (e) {

                                        e.value = e[scope.config.showField.valueField];
                                        e.name = e[scope.config.showField.nameField];
                                        e.smallName = e[scope.config.showField.smallField];
                                        titleMap.push(e);
                                        if (scope.selectmodel.value && scope.selectmodel.value == e.value) {
                                            exist = true;
                                        }
                                    }
                                })
                                if (!exist) {
                                    titleMap.push(scope.selectmodel)
                                }
                                scope.form.titleMap = titleMap;
                                if (!search) {
                                    scope.initMap = titleMap
                                }
                            });
                        }

                    }

                    scope.getvalMap = function(modelval) {
                        if (!modelval) {
                            return
                        }
                        var exist = false;
                        scope.form.titleMap.forEach(function(element) {
                            if (modelval && element.value == modelval) {
                                exist = true;
                            }

                        }, this);
                        if (exist) {
                            return;
                        }

                        if (scope.config.showField.valueField == scope.config.showField.nameField) {
                            scope.form.titleMap = [];
                            var item = {
                                value: modelval,
                                name: modelval,
                                smallName: modelval
                            }

                            scope.initMap = scope.form.titleMap;
                            scope.form.titleMap.push(item);
                            scope.selectmodel = item;
                            return true;
                        }

                        if (scope.config.queryUrl) {

                            var data = {};
                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {
                                    if (element.hasOwnProperty("constant")) {
                                        data[element.field] = element.constant;
                                    } else {

                                        if (scope.$parent.model) {
                                            data[element.field] = scope.$parent.model[element.modelfield];
                                        } else if (scope.$parent.row) {
                                            data[element.field] = scope.$parent.row.entity[element.modelfield];
                                        } else if (scope.$parent.ngModel) {
                                            data[element.field] = scope.$parent.ngModel[element.modelfield];
                                        }
                                    }
                                }, this);
                            }
                            data[scope.config.showField.valueField] = modelval;
                            utils.ajax({
                                method: 'POST',
                                url: scope.config.queryUrl + "?page=0&size=1",
                                mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                data: data
                            }).then(function(res) {

                                if (res.data.body.content.length > 0) {
                                    var item = res.data.body.content[0];
                                    item.value = item[scope.config.showField.valueField];
                                    item.name = item[scope.config.showField.nameField];
                                    item.smallName = item[scope.config.showField.smallField];
                                    scope.form.titleMap.push(item);
                                    scope.selectmodel = item;
                                }

                            });
                        }

                    }


                    scope.$watch('model.field', function(newValue, oldValue) {
                        scope.ngModel = newValue;
                    }, true); ///

                    scope.$watch('ngModel', function(newValue, oldValue) {
                        scope.model.field = newValue;
                        if (!scope.config.initLoad) {
                            if (newValue) {
                                if (scope.isinit && scope.form.hasOwnProperty("nameField")) {
                                    var item = { value: newValue }
                                    if (scope.$parent.model) {
                                        item.name = scope.$parent.model[scope.form.nameField];
                                    } else if (scope.$parent.row) {
                                        item.name = scope.$parent.row.entity[scope.form.nameField];
                                    } else if (scope.$parent.ngModel) {
                                        item.name = scope.$parent.ngModel[scope.form.nameField];
                                    }
                                    item.smallName = item.name;
                                    if (item.name) {
                                        var existitem = false;
                                        scope.form.titleMap.forEach(function(element) {
                                            if (element.value == newValue) {
                                                existitem = true;
                                            }
                                        }, this);
                                        if (!existitem) {
                                            scope.form.titleMap.push(item);
                                        }
                                        scope.isinit = false;
                                    } else {
                                        scope.getvalMap(newValue);
                                    }

                                } else {
                                    scope.getvalMap(newValue);
                                }

                            }
                        }
                    }, true); ///

                    scope.onChange = function(selected) {
                        if (scope.form.nameField) {
                            if (scope.$parent.model) {
                                scope.$parent.model[scope.form.nameField] = selected[scope.config.showField.nameField];
                            } else if (scope.$parent.row) {
                                scope.$parent.row.entity[scope.form.nameField] = selected[scope.config.showField.nameField];
                            } else if (scope.$parent.ngModel) {
                                scope.$parent.ngModel[scope.form.nameField] = selected[scope.config.showField.nameField];
                            }
                        }

                        if (scope.form.relationfield) {
                            scope.form.relationfield.forEach(function(element) {

                                if (scope.$parent.model) {
                                    if (selected[element.findfield]) {
                                        scope.$parent.model[element.tofield] = selected[element.findfield];
                                    }

                                } else if (scope.$parent.row) {
                                    if (selected[element.findfield]) {
                                        scope.$parent.row.entity[element.tofield] = selected[element.findfield];
                                    }

                                } else {
                                    if (selected[element.findfield]) {
                                        scope.$parent.ngModel[element.tofield] = selected[element.findfield];
                                    }

                                }
                            })
                        }
                        if (scope.form.onchange) {
                            var model = {};
                            if (scope.$parent.model) {
                                model = scope.$parent.model
                            } else if (scope.$parent.row) {
                                model = scope.$parent.row.entity
                            } else if (scope.$parent.ngModel) {
                                model = scope.$parent.ngModel
                            }
                            $timeout(function() {
                                scope.form.onchange(model);
                            }, 100);

                        }

                    }


                }
            ]
        }
    });
angular.module('app')
    .directive('getLove', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/getlove.html',
            controller: ['$rootScope', '$timeout', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $timeout, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;

                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }
                    // scope.model = {
                    //     field: scope.ngModel
                    // }


                    scope.form.titleMap = [];

                    scope.form.fieldAddonRight = 'fa-search-minus';
                    if (!qwconfig.lov[scope.form.lovtype]) {
                        toastr.info("请配置[" + scope.form.title + "]速查!");
                        return
                    }
                    scope.config = angular.copy(qwconfig.lov[scope.form.lovtype]);

                    if (scope.form.hasOwnProperty("init")) {
                        scope.form.init(scope.form);
                    }

                    scope.onChange = function(selected) {
                        if (scope.config.hasOwnProperty("upperCase")) {
                            if (scope.config.upperCase) {
                                scope.ngModel = scope.ngModel.toUpperCase()
                            }
                        }
                        if (scope.form.onchange) {
                            var model = {};
                            if (scope.$parent.model) {
                                model = scope.$parent.model
                            } else if (scope.$parent.row) {
                                model = scope.$parent.row.entity
                            } else if (scope.$parent.ngModel) {
                                model = scope.$parent.ngModel
                            }
                            $timeout(function() {
                                scope.form.onchange(model);
                            }, 100);

                        }

                    }
                    var multiple = true;
                    if (scope.form.hasOwnProperty("multiple")) {
                        multiple = scope.form.multiple
                    }
                    scope.searchclass = "fa-search-plus";
                    if (!multiple) {
                        scope.searchclass = "fa-search";
                    }

                    if (scope.config.dialogConfig) {
                        scope.config.dialogConfig = angular.copy(qwconfig.dialog[scope.config.dialogConfig]);
                        $scope.dialog = function() {
                            scope.lovpara = {};

                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {
                                    if (element.hasOwnProperty("constant")) {
                                        scope.lovpara[element.field] = element.constant
                                    } else {
                                        if (scope.$parent.model) {
                                            scope.lovpara[element.field] = scope.$parent.model[element.modelfield]
                                        } else if (scope.$parent.row) {
                                            scope.lovpara[element.field] = scope.$parent.row.entity[element.modelfield];
                                        } else if (scope.$parent.ngModel) {
                                            scope.lovpara[element.field] = scope.$parent.ngModel[element.modelfield];
                                        }
                                    }

                                }, this);
                            }
                            var injector = angular.element(document).injector();
                            var ngDialog = injector.get('ngDialog');
                            var toastr = injector.get('toastr');
                            multiple = true;
                            if (scope.form.hasOwnProperty("multiple")) {
                                multiple = scope.form.multiple
                            }

                            scope.config.gridkey = scope.form.lovtype + "_grid";
                            ngDialog.open({
                                className: scope.config.dialogConfig.ngdialogSize,
                                template: 'plugins/bas/components/' + (multiple ? "baslove.html" : "baslov.html"),
                                scope: $scope,
                                controller: function($scope) {

                                    $scope.lovpara = scope.lovpara;
                                    $scope.multiSelect = true;

                                    // if (scope.form.lovfilter) {
                                    //     scope.form.lovfilter.forEach(function(element) {
                                    //         if (element.hasOwnProperty("constant")) {
                                    //             data[element.field] = element.constant
                                    //         } else {
                                    //             data[element.field] = scope.$parent.model[element.modelfield]
                                    //         }
                                    //     }, this);
                                    // }


                                    $scope.action = {
                                        lovback: function(rows) {
                                            var fieldname = scope.config.showField.valueField;
                                            if (scope.form.hasOwnProperty("takefield")) {
                                                fieldname = scope.form.takefield;
                                            }
                                            rows.forEach(function(element) {
                                                if (multiple) {
                                                    scope.ngModel = (!scope.ngModel || angular.isUndefined(scope.ngModel) ? "" : scope.ngModel + ",") + element[fieldname];
                                                } else {
                                                    scope.ngModel = element[fieldname];
                                                }

                                            }, this);

                                            if (scope.form.relationfield) {
                                                var en = rows[0];
                                                scope.form.relationfield.forEach(function(element) {
                                                    if (scope.$parent.model) {
                                                        scope.$parent.model[element.tofield] = en[element.findfield];
                                                    } else {
                                                        if (scope.$parent.row) {
                                                            scope.$parent.row.entity[element.tofield] = en[element.findfield];
                                                        } else {
                                                            if (scope.$parent.ngModel) {
                                                                scope.$parent.ngModel[element.tofield] = en[element.findfield];
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                            if (scope.form.onChange) {
                                                scope.form.onChange(rows[0]);
                                            }
                                            $scope.closeThisDialog();
                                        },
                                        lovcancel: function() {
                                            $scope.closeThisDialog();
                                        }
                                    }
                                }
                            })
                        }
                    } else {
                        $scope.form.dialog = function() {
                            toastr.info("请配置[" + scope.form.title + "]速查!");
                        }
                    }


                }
            ]
        }
    });
angular.module('app')
    .directive('getLovm', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/getlovm.html',
            controller: ['$rootScope', '$timeout', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $timeout, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;

                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }





                    scope.form.titleMap = [];

                    scope.form.fieldAddonRight = 'fa-search-minus';
                    if (!qwconfig.lov[scope.form.lovtype]) {
                        toastr.info("请配置[" + scope.form.title + "]速查!");
                        return
                    }
                    scope.config = angular.copy(qwconfig.lov[scope.form.lovtype]);


                    scope.load = function() {
                        var rootmap = scope.form.lovtype + "Map";
                        var data = {};
                        if (scope.form.lovfilter) {
                            scope.form.lovfilter.forEach(function(element) {
                                if (element.hasOwnProperty("constant")) {
                                    data[element.field] = element.constant
                                } else {
                                    if (scope.$parent.model) {
                                        data[element.field] = scope.$parent.model[element.modelfield]
                                    } else {
                                        data[element.field] = scope.$parent.row.entity[element.modelfield];
                                    }
                                }
                            }, this);
                        }

                        utils.ajax({
                            method: 'POST',
                            url: scope.config.queryUrl + "?page=0&size=10000",
                            mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                            data: data
                        }).then(function(res) {
                            $rootScope[rootmap] = [];
                            res.data.body.content.forEach(function(e) {
                                if (e) {
                                    e.value = e[scope.config.showField.valueField];
                                    e.name = e[scope.config.showField.nameField];
                                    $rootScope[rootmap].push(e);
                                }
                            })
                            scope.form.titleMap = $rootScope[rootmap];


                        });
                    }

                    scope.load();

                    scope.selectvalue = [];
                    scope.$watch('ngModel', function(newValue, oldValue) {
                        if (scope.ngModel) {
                            scope.selectvalue = scope.ngModel.split(",");
                        } else {
                            scope.selectvalue = [];
                        }
                    }, true); ///

                    scope.$watch('selectvalue', function(newValue, oldValue) {
                        if (scope.selectvalue.length > 0) {
                            scope.ngModel = scope.selectvalue.toString();
                        } else {
                            scope.ngModel = "";
                        }

                    }, true); ///



                    if (scope.config.dialogConfig) {
                        scope.config.dialogConfig = angular.copy(qwconfig.dialog[scope.config.dialogConfig]);
                        $scope.form.dialog = function() {
                            scope.lovpara = {};

                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {

                                    if (element.hasOwnProperty("constant")) {
                                        scope.lovpara[element.field] = element.constant
                                    } else {
                                        if (scope.$parent.model) {
                                            scope.lovpara[element.field] = scope.$parent.model[element.modelfield]
                                        } else {
                                            scope.lovpara[element.field] = scope.$parent.row.entity[element.modelfield];
                                        }

                                    }

                                }, this);
                            }
                            if (!angular.isUndefined(scope.ngModel)) {
                                scope.lovpara.notinfield = scope.ngModel ? scope.ngModel : "";
                            }
                            var injector = angular.element(document).injector();
                            var ngDialog = injector.get('ngDialog');
                            var toastr = injector.get('toastr');
                            scope.config.gridkey = scope.form.lovtype + "_grid";
                            ngDialog.open({
                                className: scope.config.dialogConfig.ngdialogSize,
                                template: 'plugins/bas/components/baslove.html',
                                scope: $scope,
                                controller: function($scope) {
                                    $scope.multiSelect = false;
                                    $scope.lovpara = scope.lovpara;
                                    $scope.config = scope.config;


                                    if (scope.form.lovfilter) {
                                        scope.form.lovfilter.forEach(function(element) {
                                            if (element.hasOwnProperty("constant")) {
                                                data[element.field] = element.constant
                                            } else {
                                                if (scope.$parent.model) {
                                                    data[element.field] = scope.$parent.model[element.modelfield]
                                                } else {
                                                    data[element.field] = scope.$parent.row.entity[element.modelfield];
                                                }
                                            }
                                        }, this);
                                    }


                                    $scope.action = {
                                        lovback: function(rows) {
                                            // var en = rows[0];
                                            // scope.ngModel = en[scope.config.showField.valueField];

                                            rows.forEach(function(element) {
                                                var isfound = false;
                                                scope.selectvalue.forEach(val => {
                                                    if (val == element[scope.config.showField.valueField]) {
                                                        isfound = true;
                                                    }
                                                });
                                                if (!isfound) {
                                                    scope.selectvalue.push(element[scope.config.showField.valueField])
                                                }
                                            }, this);


                                            if (scope.form.onchange) {
                                                var model = {};
                                                if (scope.$parent.model) {
                                                    model = scope.$parent.model;
                                                } else {
                                                    model = scope.$parent.row.entity;
                                                }
                                                $timeout(function() {
                                                    scope.form.onchange(model);
                                                }, 100);
                                            }


                                            $scope.closeThisDialog();

                                        },
                                        lovcancel: function() {
                                            $scope.closeThisDialog();
                                        }
                                    }
                                }
                            })
                        }
                    }



                }
            ]
        }
    });
angular.module('app')
    .directive('gridCellIoc', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                gridField: "@",
                form: "=",
                entity: "="
            },
            templateUrl: 'plugins/bas/components/gridcellioc.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                }]
        };
    });

//# sourceMappingURL=gridcellioc.js.map

angular.module('app')
    .directive('gridCellLov', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                gridField: "@",
                form: "="
            },
            templateUrl: 'plugins/bas/components/gridcelllov.html',
            controller: ['$rootScope', '$scope', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $scope, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;
                    scope.name = "";



                    if (!qwconfig.lov[scope.form.lovtype] && scope.form.lovtype != "select") {
                        scope.showField = scope.gridField;
                        return
                    }

                    if (scope.form.lovtype != "select") {
                        scope.form.titleMap = [];
                        scope.config = qwconfig.lov[scope.form.lovtype];
                        if (scope.config.small) {
                            scope.form.small = true;
                        }
                        if (!scope.config.queryUrl) {
                            scope.config.initLoad = true;
                        }
                        if (scope.config.titleMap) {
                            scope.form.titleMap = scope.config.titleMap;
                        }

                        if (scope.config.lovfilter && !scope.form.lovfilter) {
                            scope.form.lovfilter = scope.config.lovfilter;
                        }
                    }



                    scope.getMapName = function(modelval) {
                        scope.form.titleMap.forEach(function(element) {
                            if (modelval && element.value == modelval) {
                                scope.showvalue = element.name;
                            }
                        }, this);
                    }

                    scope.downitem = function(modelval) {
                        if (scope.config.showField.valueField == scope.config.showField.nameField) {
                            scope.showvalue = modelval;
                            return;
                        }

                        var exist = false;
                        scope.form.titleMap.forEach(function(element) {
                            if (modelval && element.value == modelval) {
                                scope.showvalue = element.name;
                                exist = true;
                            }

                        }, this);
                        if (exist) {
                            return;
                        }
                        if (scope.config.queryUrl) {
                            var data = {};

                            data[scope.config.showField.valueField] = modelval;
                            utils.ajax({
                                method: 'POST',
                                url: scope.config.queryUrl + "?page=0&size=1",
                                mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                data: data
                            }).then(function(res) {

                                if (res.data.body.content.length > 0) {
                                    if (!scope.form.titleMap) {
                                        scope.form.titleMap = [];
                                    }
                                    var item = res.data.body.content[0];
                                    item.value = item[scope.config.showField.valueField];
                                    item.name = item[scope.config.showField.nameField];
                                    scope.form.titleMap.push(item);
                                    scope.showvalue = item.name;
                                }

                            });
                        }

                    }


                    scope.$watch('gridField', function(newValue, oldValue) {

                        if (newValue) {
                            if (scope.form.hasOwnProperty("nameField")) {
                                if (scope.$parent.model) {
                                    scope.showvalue = scope.$parent.model[scope.form.nameField];
                                } else {
                                    scope.showvalue = scope.$parent.row.entity[scope.form.nameField];
                                }
                            } else {


                                if (scope.form.lovtype == "select") {
                                    scope.getMapName(newValue);
                                    return
                                }

                                if (scope.config.titleMap) {
                                    scope.getMapName(newValue);
                                    return
                                }

                                if (scope.config.showField.valueField == scope.config.showField.nameField) {
                                    scope.showvalue = newValue;
                                    return;
                                }

                                if (scope.config.initLoad) {
                                    var rootmap = scope.form.lovtype + "Map";
                                    if ($rootScope[rootmap]) {
                                        scope.form.titleMap = $rootScope[rootmap];
                                        scope.getMapName(newValue);
                                    } else {
                                        var initMap = function() {
                                            var data = {};
                                            if (scope.form.lovfilter) {
                                                scope.form.lovfilter.forEach(function(element) {
                                                    if (element.hasOwnProperty("constant")) {
                                                        data[element.field] = element.constant
                                                    } else {
                                                        if (scope.$parent.model) {
                                                            data[element.field] = scope.$parent.model[element.modelfield]
                                                        } else if (scope.$parent.row) {
                                                            data[element.field] = scope.$parent.row.entity[element.modelfield];
                                                        } else if (scope.$parent.ngModel) {
                                                            data[element.field] = scope.$parent.ngModel[element.modelfield];
                                                        }
                                                    }
                                                }, this);
                                            }
                                            utils.ajax({
                                                method: 'POST',
                                                url: scope.config.queryUrl + "?page=0&size=10000",
                                                mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                                data: data
                                            }).then(function(res) {
                                                $rootScope[rootmap] = [];
                                                if (res.data.body.content.length > 0) {
                                                    $rootScope[rootmap] = [{ value: "", name: "重置" }];
                                                }
                                                res.data.body.content.forEach(function(e) {
                                                    if (e) {
                                                        e.value = e[scope.config.showField.valueField];
                                                        e.name = e[scope.config.showField.nameField];
                                                        $rootScope[rootmap].push(e);
                                                    }
                                                })
                                                scope.form.titleMap = $rootScope[rootmap];
                                                scope.getMapName(newValue);

                                            });
                                        }
                                        initMap();
                                    }
                                } else {
                                    scope.downitem(newValue);
                                }

                            }

                        }

                    }, true); ///


                }
            ]
        }
    });
angular.module('app')
    .directive('gridCellNumber', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                gridField: "@",
                form: "="
            },
            templateUrl: 'plugins/bas/components/gridcellnumber.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    if (scope.form.showchange) {
                        scope.showprice = localStorage.getItem("price") == "Y" ? true : false;
                    }
                    else {
                        scope.showprice = true;
                    }
                }]
        };
    });

//# sourceMappingURL=gridcellnumber.js.map

angular.module('app')
    .directive('gridCellRemark', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/gridcellremark.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    // scope.gridField = scope.ngModel;
                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }

                    scope.dialog = function() {
                        var injector = angular.element(document).injector();
                        var ngDialog = injector.get('ngDialog');
                        var toastr = injector.get('toastr');
                        ngDialog.open({
                            className: "ngdialog-sm",
                            template: 'plugins/bas/components/remarkpop.html',
                            scope: $scope,
                            controller: function($scope) {}
                        })
                    }



                }
            ]


        }
    });
angular.module('app')
    .directive('gridcolControl', function ($compile, $templateCache, $http) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                ngModel: "=",
                model: "=",
                form: "="
            },
            require: '^ngModel',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$translate', 'utils', '$element', '$timeout', 'uiGridConstants',
                function ($rootScope, $scope, $location, $templateCache, $translate, utils, $element, $timeout, uiGridConstants) {
                    var scope = $scope;
                    var watchstr = "", tag = "+";
                    var watfld = "";
                    angular.forEach(scope.form.headers, function (col, key) {
                        if (col.editstatus) {
                            col.editstatus.filedlist.forEach(function (element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }
                            });
                        }
                        if (col.readonlystatus) {
                            col.readonlystatus.filedlist.forEach(function (element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }
                            });
                        }
                        if (col.hidestatus) {
                            col.hidestatus.filedlist.forEach(function (element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }
                            });
                        }
                        if (col.showstatus) {
                            col.showstatus.filedlist.forEach(function (element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }
                            });
                        }
                    });
                    if (watchstr) {
                        watchstr = watchstr.substr(1, watchstr.length - 2);
                        scope.$watch(watchstr, function (newValue, oldValue) {
                            angular.forEach(scope.form.headers, function (col, key) {
                                if (col.editstatus) {
                                    var arrayObj = new Array();
                                    col.editstatus.filedlist.forEach(function (element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var editstatus = element.status.split(",");
                                            var itemval = false;
                                            editstatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    });
                                    var edit = false;
                                    if (arrayObj.length > 0) {
                                        edit = arrayObj[0];
                                        arrayObj.forEach(function (element) {
                                            edit = col.editstatus.relation == "or" ? edit || element : edit && element;
                                        }, this);
                                    }
                                    col.readonly = !edit;
                                    col.enableCellEdit = !col.readonly;
                                }
                                if (col.readonlystatus) {
                                    var arrayObj = new Array();
                                    col.readonlystatus.filedlist.forEach(function (element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var readonlystatus = element.status.split(",");
                                            var itemval = false;
                                            readonlystatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    });
                                    var readonly = false;
                                    if (arrayObj.length > 0) {
                                        readonly = arrayObj[0];
                                        arrayObj.forEach(function (element) {
                                            readonly = col.readonlystatus.relation == "or" ? readonly || element : readonly && element;
                                        }, this);
                                    }
                                    col.readonly = readonly;
                                    col.enableCellEdit = !col.readonly;
                                }
                                if (col.showstatus) {
                                    var arrayObj = new Array();
                                    col.showstatus.filedlist.forEach(function (element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var showstatus = element.status.split(",");
                                            var itemval = false;
                                            showstatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    });
                                    var show = true;
                                    if (arrayObj.length > 0) {
                                        show = arrayObj[0];
                                        arrayObj.forEach(function (element) {
                                            show = col.showstatus.relation == "or" ? show || element : show && element;
                                        }, this);
                                    }
                                    col.visible = show;
                                }
                                if (col.hidestatus) {
                                    var arrayObj = new Array();
                                    col.hidestatus.filedlist.forEach(function (element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var hidestatus = element.status.split(",");
                                            var itemval = false;
                                            hidestatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    });
                                    var hide = false;
                                    if (arrayObj.length > 0) {
                                        hide = arrayObj[0];
                                        arrayObj.forEach(function (element) {
                                            hide = col.hidestatus.relation == "or" ? hide || element : hide && element;
                                        }, this);
                                    }
                                    col.visible = !hide;
                                }
                                if (scope.form.gridApi) {
                                }
                                // var resource = angular.copy(scope.ngModel);
                                // scope.ngModel = resource;
                                // $timeout(function() {
                                //     scope.ngModel = resource;
                                // }, 100);
                            });
                        }, true); ///
                    }
                }
            ]
        };
    });

//# sourceMappingURL=gridcolcontrol.js.map

angular.module('app')
    .directive('listGrid', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                headers: "=",
                rowDblclick: "=",
                onchangepage: "=",
                resource: "=",
                gridApi: "=",
                gridKey: "=",
                sortable: "=",
                gridheight: "=",
                onHoveredIndexChange: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/listgrid.html',
            controller: ['$rootScope', '$timeout', 'uiGridConstants', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $timeout, uiGridConstants, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    var isfoot = false;
                    scope.bakheaders = angular.copy($scope.headers);
                    angular.forEach($scope.headers, function (col, key) {
                        if (col) {
                            col.readonly = true;
                            if (col.type == "basLov") {
                                col.cellTemplate = "ui-grid/gridcelllov";
                            }
                            else if (col.type == "basNumber" || col.type == "number") {
                                col.headerCellClass = "esy-number";
                                col.type = "number";
                                col.cellTemplate = "ui-grid/gridcellnumber";
                            }
                            else if (col.type == "basRemark") {
                                col.cellTemplate = "ui-grid/gridcellremark";
                            }
                            else if (col.type == "basIcos") {
                                col.cellTemplate = "ui-grid/gridcellioc";
                            }
                            else {
                                if (!col.cellTemplate) {
                                    col.cellTemplate = "ui-grid/gridcelldefault";
                                }
                            }
                            if (!col.hasOwnProperty("enableColumnMenu")) {
                                col.enableColumnMenu = false;
                            }
                            if (col.hasOwnProperty("summsg")) {
                                col.aggregationType = uiGridConstants.aggregationTypes.sum;
                                isfoot = true;
                                if (col.summsg.auto) {
                                    col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{ ( col.getAggregationValue() | number :col.colDef.num ) }}</div></div>";
                                }
                                else {
                                    if (angular.isString(col.summsg.sumval)) {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval)}}</div></div>";
                                    }
                                    else {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval | number :col.colDef.num)}}</div></div>";
                                    }
                                }
                            }
                        }
                    });
                    scope.paginationOptions = {
                        pageNumber: 0,
                        pageSize: 30,
                        sort: ""
                    };
                    scope.gridOptions = angular.extend({
                        data: 'entries',
                        height: 200,
                        enableSorting: true,
                        enableColumnMenu: true,
                        suppressRemoveSort: false,
                        showGridFooter: false,
                        showColumnFooter: isfoot,
                        columnFooterHeight: 24,
                        multiSelect: true,
                        enableFullRowSelection: false,
                        enableGridMenu: true,
                        gridMenuCustomItems: [{
                            title: '重置',
                            action: function ($event) {
                                scope.resetgridmsg();
                                scope.gridOptions.columnDefs = scope.readgridmsg(scope.bakheaders, scope.gridKey ? scope.gridKey : "");
                            },
                            order: 210
                        }],
                        onRegisterApi: function (gridApi) {
                            gridApi.headers = scope.headers;
                            scope.gridApi = gridApi;
                            scope.$parent.gridApi = gridApi;
                            gridApi.core.on.sortChanged(scope, function (grid, sortColumns) {
                                if (sortColumns.length == 0) {
                                    scope.paginationOptions.sort = null;
                                }
                                else {
                                    scope.paginationOptions.sort = sortColumns[0].colDef.name + "," + sortColumns[0].sort.direction;
                                }
                                if (scope.onchangepage) {
                                    scope.onchangepage(scope.paginationOptions.pageNumber, scope.paginationOptions.pageSize, scope.paginationOptions.sort);
                                }
                            });
                            gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                                if (scope.onchangepage) {
                                    scope.paginationOptions.pageNumber = newPage - 1;
                                    scope.paginationOptions.pageSize = pageSize;
                                    scope.onchangepage(scope.paginationOptions.pageNumber, scope.paginationOptions.pageSize, scope.paginationOptions.sort);
                                }
                            });
                            gridApi.core.on.renderingComplete(scope, function (ar1) {
                                $timeout(function () {
                                    angular.element(window).trigger('resize');
                                }, 0);
                            });
                            gridApi.core.on.columnVisibilityChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                            gridApi.colMovable.on.columnPositionChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                            gridApi.colResizable.on.columnSizeChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                                // var cols = [];
                                // angular.forEach(gridApi.grid.columns, function(column) {
                                //     cols.push(column.width);
                                // });
                                // if (scope.option.gridKey) {
                                //     localStorage.setItem(scope.gridKey + "_grid", cols);
                                // }
                            });
                        },
                        rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick($event,row)\"  ng-click=\"grid.appScope.hoveredIndex = rowRenderIndex\" " +
                            "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                            "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader,'selecthoverclass': grid.appScope.hoveredIndex === rowRenderIndex }\" " +
                            "ui-grid-cell ></div>"
                    }, settings.uiGrid);
                    if ($scope.sortable) {
                        $scope.gridOptions.sortable = $scope.sortable;
                    }
                    if ($scope.gridheight) {
                        $scope.gridstyle = {
                            height: $scope.gridheight + "px"
                        };
                    }
                    scope.onDblClick = function (event, row) {
                        if (row && row.entity)
                            scope.backentry = angular.copy(row.entity);
                        if (scope.rowDblclick) {
                            scope.rowDblclick(scope.backentry);
                        }
                    };
                    scope.$watch("headers", function (newValue, oldValue) {
                        if (scope.headers) {
                            scope.gridOptions.columnDefs = scope.readgridmsg(scope.headers, scope.gridKey ? scope.gridKey : "");
                        }
                    }, true); ///
                    scope.$watch("resource", function (newValue, oldValue) {
                        if (scope.resource) {
                            scope.entries = scope.resource.content;
                            scope.gridOptions.totalItems = scope.resource.records;
                            scope.hoveredIndex = null; //对象改变的时候,重置选中状态
                        }
                    }, true); ///
                    scope.$watch("hoveredIndex", function (newValue, oldValue) {
                        scope.onHoveredIndexChange && scope.onHoveredIndexChange(scope.hoveredIndex != null ? scope.entries[scope.hoveredIndex] : null, scope.hoveredIndex);
                    }, true);
                    scope.resetgridmsg = function () {
                        localStorage.setItem(scope.gridKey + "_grid", "{}");
                    };
                    scope.savegridmsg = function (gridcols) {
                        var cols = {};
                        angular.forEach(gridcols, function (column) {
                            cols[column.field] = {
                                width: column.width,
                                visible: column.visible
                            };
                            // var item ={ //selectionRowHeaderCol
                            //     key: column.field,
                            //     width: column.width,
                            //     visible: column.visible
                            // }
                            // cols.push(item);
                        });
                        localStorage.setItem(scope.gridKey + "_grid", angular.toJson(cols, true));
                    };
                    scope.readgridmsg = function (headers, localStorageKey) {
                        var columns = [];
                        var colsmsg = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                        angular.forEach(colsmsg, function (col, key) {
                            if (headers.hasOwnProperty(key)) {
                                var item = angular.extend(headers[key], col);
                                if (angular.isObject(headers[key]) && key) {
                                    item.name = key;
                                }
                                if (angular.isUndefined(item.headerCellFilter))
                                    item.headerCellFilter = "translate";
                                columns.push(item);
                            }
                        });
                        angular.forEach(headers, function (col, key) {
                            if (!colsmsg.hasOwnProperty(key)) {
                                if (angular.isString(col)) {
                                    col = {
                                        name: key,
                                        original: col,
                                        displayName: col
                                    };
                                }
                                else if (angular.isObject(col) && key) {
                                    col.name = key;
                                }
                                if (angular.isUndefined(col.headerCellFilter))
                                    col.headerCellFilter = "translate";
                                columns.push(col);
                            }
                        });
                        return columns;
                    };
                }
            ]
        };
    });

//# sourceMappingURL=listgrid.js.map

angular.module('app')
    .directive('modalGrid', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                headers: "=",
                rowDblclick: "=",
                onchangepage: "=",
                resource: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/modalgrid.html',
            controller: ['$rootScope', '$timeout', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $timeout, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    var pageSize = 20;
                    $scope.gridOptions = {
                        gridMenuTitleFilter: function (title) {
                            return $translate.instant(title);
                        },
                        data: 'entries',
                        enableGridMenu: true,
                        exporterMenuAllData: false,
                        exporterMenuCsv: true,
                        exporterMenuPdf: false,
                        enablePaginationControls: true,
                        enableFiltering: true,
                        enableRowHeaderSelection: true,
                        exporterOlderExcelCompatibility: true,
                        useExternalPagination: true,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;
                            $scope.$parent.gridApi = gridApi;
                            gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                                var start = (newPage - 1) * pageSize;
                                var count = pageSize;
                                if (scope.onchangepage) {
                                    scope.onchangepage(start, count);
                                }
                            });
                        },
                        selectedItems: [],
                        paginationPageSizes: [pageSize, 200, 1000],
                        paginationPageSize: pageSize,
                        virtualizationThreshold: 1000,
                        appScopeProvider: {
                            onDblClick: function (row) {
                            }
                        }
                    };
                    scope.onDblClick = function (event, row) {
                        if (row && row.entity)
                            scope.backentry = angular.copy(row.entity);
                        if (scope.rowDblclick) {
                            scope.rowDblclick(scope.backentry);
                        }
                    };
                    scope.$watch("headers", function (newValue, oldValue) {
                        if (scope.headers) {
                            scope.gridOptions.columnDefs = utils.gridDefine(scope.headers, "");
                        }
                    }, true); ///
                    scope.$watch("resource", function (newValue, oldValue) {
                        if (scope.resource) {
                            scope.entries = scope.resource;
                        }
                    }, true); ///
                }]
        };
    });

//# sourceMappingURL=modalgrid.js.map

angular.module('app').directive('textFormat', function() {
    return {
        require: 'ngModel',
        scope: {
            model: '=ngModel'
        },
        link: function(scope, elm, iAttrs, modelCtrl) {
            var num = iAttrs.textFormat;
            //   $(elm).number(true, num); 

        }
    };
});

angular.module('app').directive('numFormat', function() {
    return {
        scope: {
            model: '=ngModel'
        },
        link: function(scope, elm, attrs, ctrl) {

            function format() {
                if (isNaN(scope.model) || scope.model == "") {
                    scope.model = "0.00";
                } else {
                    //最多保留两位小数
                    var f = parseFloat(scope.model);
                    var f = Math.round(scope.model * 100) / 100;
                    var s = f.toString();
                    var rs = s.indexOf('.');
                    if (rs < 0) {
                        s = s + ".00";
                    } else {
                        while (s.length <= rs + 2) { s += '0'; }
                    }
                    scope.model = s;
                }
            }

            format(); //初始化
            $(elm).bind("blur", format); //jq方式绑定事件

        }
    };
});

angular.module('app').directive('numberFormat', ['$filter', '$parse', function($filter, $parse) { //这个指令的作用是在view层和model层存放不同格式的数据
    var numberFilter = $filter('number');
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModelCtrl) {
            //model 转为页面显示值
            var num = 0; //小数点位数     
            if (attrs.numberFormat) {
                var num = attrs.numberFormat;
            }
            var position = 0; //实际光标位置
            var numposition = 0; //数字+点号光标位置
            var mdposttion = ""; //仅移动光标
            var ismove = false; //是否左右移动


            ngModelCtrl.$formatters.push(function() {
                return numberFilter(elm.val(), num);
            });


            //页面显示值转为model
            ngModelCtrl.$parsers.unshift(function(element) { //注意，指令这里用的是=号引入，formatnumber改变会同时反映在controller上，所以下面的格式化不能直接用formatnumber操作
                //把input输入框的非数字替换为空且第一位要求是1-9，然后格式化数值

                var mat = elm.val().indexOf(".");
                var intstr = elm.val();
                var memstr = "";
                var mtag = "";
                if (mat != -1) {
                    intstr = elm.val().substr(0, mat);
                    memstr = elm.val().substring(mat + 1);
                    mtag = ".";
                }
                var val = intstr.replace(/[^0-9]*/g, "") + mtag + memstr.replace(/[^0-9]*/g, "");
                elm.val(numberFilter(val, num)); //view中的数据需要格式化
                // $parse(attrs['ngModel']).assign(scope, val);
                return val; //返回model中的数据不需要格式化
            });

            function mkeydown(e) {
                mdposttion = ""; // 初始化输入小数点;
                position = getPositionForInput(this); //获取真实光标位置
                if (position == 0 && this.value.substr(0, 1) == "0") {
                    this.value = this.value.substring(1);
                    numposition = 0;
                } else if (position == 1 && this.value.substr(0, 1) == "0") {
                    numposition = 0;
                } else {
                    numposition = getnumpostion(elm.val(), position); //获取数字光标位置
                }



                var ss = window.event || e;
                if (!((ss.keyCode >= 48 && ss.keyCode <= 57) || ss.keyCode == 189 || ss.keyCode == 190 || ss.keyCode == 8 || ss.keyCode == 46 || ss.keyCode == 37 || ss.keyCode == 39 || ss.keyCode == 17 || ss.keyCode == 86)) {
                    ss.preventDefault();
                } else {
                    if (ss.keyCode >= 48 && ss.keyCode <= 57) {
                        numposition = numposition + 1;
                    }

                }

                if (ss.keyCode == 190) { //如果输入的是小数点
                    var mat = elm.val().indexOf(".");
                    if (mat != -1) {
                        mdposttion = mat + 1;
                        ss.preventDefault();
                    }
                }



                if (ss.keyCode == 8) { //向前删除
                    numposition = numposition - 1;
                    if (this.value.substr(position - 1, 1) == ".") { //如果删除的是小数点
                        mdposttion = position - 1;
                        ss.preventDefault();
                    }
                }
                if (ss.keyCode == 46) { //向后删除
                    //  numposition = numposition +1;
                    if (this.value.substr(position, 1) == ".") { //如果删除的是小数点
                        mdposttion = position + 1;
                        ss.preventDefault();
                    }
                }
                if (ss.keyCode == 37 || ss.keyCode == 39) { //左右移动
                    ismove = true;
                } else {
                    ismove = false;
                }
            }

            function mkeyup(e) {
                if (!ismove) {
                    position = getPositionFornum(this.value, numposition); //获取真实光标位置
                    if (mdposttion) { //如果输入是小数点
                        position = mdposttion;
                    } else {
                        position = getPositionFornum(this.value, numposition); //获取真实光标位置
                    }
                    setCursorPosition(this, position);
                }

            }

            function mfocus(e) { //改变输入法状态,只能为英文
                this.style.imeMode = 'inactive'
            }


            $(elm).bind("keydown", mkeydown); //jq方式绑定事件
            $(elm).bind("keyup", mkeyup); //jq方式绑定事件
            $(elm).bind("focus", mfocus); //jq方式绑定事件

            function getPositionForInput(ctrl) {
                var CaretPos = 0;
                if (document.selection) { // IE Support 
                    ctrl.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    CaretPos = Sel.text.length;
                } else if (ctrl.selectionStart || ctrl.selectionStart == '0') { // Firefox support 
                    CaretPos = ctrl.selectionStart;
                }
                return (CaretPos);
            }

            function getPositionFornum(textstr, numposition) {

                var ret = 0;
                var num = 0
                for (var i = 0; i <= textstr.length && num <= numposition; i++) {
                    if (textstr.substr(i, 1) != ",") {
                        num = num + 1;
                    }
                    ret = i;

                }
                return ret;
            }

            //获取数字光标位置(不包含,号)
            function getnumpostion(textstr, position) {
                var numpos = 0;
                for (var i = 0; i <= textstr.length && i < position; i++) {
                    if (textstr.substr(i, 1) != ",") {
                        numpos = numpos + 1;
                    }
                }
                return numpos
            }

            //设置光标位置函数 
            function setCursorPosition(ctrl, pos) {
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                } else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }


            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                elm.val(numberFilter(newValue, num));
            })





        }
    };
}]);



angular.module('app').directive('toChange', function($parse) {
    return {
        link: function(scope, element, attrs, ctrl) {
            //控制输入框只能输入数字和小数点  
            function limit() {
                var limitV = element[0].value;
                limitV = limitV.replace(/[^0-9.]/g, "");
                element[0].value = limitV;
                $parse(attrs['ngModel']).assign(scope, limitV);
                format();
            }

            //对输入数字的整数部分插入千位分隔符  
            function format() {


                var formatV = element[0].value;
                var array = new Array();
                array = formatV.split(".");
                var re = /(-?\d+)(\d{3})/;
                while (re.test(array[0])) {
                    array[0] = array[0].replace(re, "$1,$2")
                }
                var returnV = array[0];
                for (var i = 1; i < array.length; i++) {
                    returnV += "." + array[i];
                }
                element[0].value = returnV;
                $parse(attrs['ngModel']).assign(scope, formatV);
            }

            scope.$watch(attrs.ngModel, function(newValue, oldValue) {

                limit();
            })


        }
    };

})
angular.module('app')
    .directive('objControl', function ($compile, $templateCache, $http) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                dmodel: "=",
                form: "="
            },
            require: '^ngModel',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$translate', 'utils', '$element',
                function ($rootScope, $scope, $location, $templateCache, $translate, utils, $element) {
                    var scope = $scope;
                    if (angular.isUndefined(scope.form.hide)) {
                        scope.form.hide = false;
                    }
                    var tmodel = "";
                    var tfield = "";
                    if (scope.form.readonlystatus) {
                        if (!scope.form.readonlystatus.relation) {
                            scope.form.readonlystatus.relation = "or";
                        }
                        if (scope.form.readonlystatus.filedlist) {
                            var watchstr = "", tag = "";
                            scope.form.readonlystatus.filedlist.forEach(function (element) {
                                tmodel = scope.model;
                                tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield ? "dmodel" : "model") + '.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function (newValue, oldValue) {
                                var arrayObj = new Array();
                                scope.form.readonlystatus.filedlist.forEach(function (element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var readonlystatus = element.status.split(",");
                                            var itemval = false;
                                            readonlystatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    }
                                });
                                var readonly = false;
                                if (arrayObj.length > 0) {
                                    readonly = arrayObj[0];
                                    arrayObj.forEach(function (element) {
                                        readonly = scope.form.readonlystatus.relation == "or" ? readonly || element : readonly && element;
                                    }, this);
                                }
                                scope.form.readonly = readonly;
                            }, true); ///
                        }
                    }
                    if (scope.form.editstatus) {
                        if (!scope.form.editstatus.relation) {
                            scope.form.editstatus.relation = "or";
                        }
                        if (scope.form.editstatus.filedlist) {
                            var watchstr = "", tag = "";
                            scope.form.editstatus.filedlist.forEach(function (element) {
                                tmodel = scope.model;
                                tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield ? "dmodel" : "model") + '.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function (newValue, oldValue) {
                                //  var edit = true;
                                var arrayObj = new Array();
                                scope.form.editstatus.filedlist.forEach(function (element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var editstatus = element.status.split(",");
                                            var itemval = false;
                                            editstatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    }
                                });
                                var edit = false;
                                if (arrayObj.length > 0) {
                                    edit = arrayObj[0];
                                    arrayObj.forEach(function (element) {
                                        edit = scope.form.editstatus.relation == "or" ? edit || element : edit && element;
                                    }, this);
                                }
                                scope.form.readonly = !edit;
                            }, true); ///
                        }
                    }
                    if (scope.form.hidestatus) {
                        if (!scope.form.hidestatus.relation) {
                            scope.form.hidestatus.relation = "or";
                        }
                        if (scope.form.hidestatus.filedlist) {
                            var watchstr = "", tag = "";
                            scope.form.hidestatus.filedlist.forEach(function (element) {
                                tmodel = scope.model;
                                tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield ? "dmodel" : "model") + '.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function (newValue, oldValue) {
                                //  var hide = false;
                                var arrayObj = new Array();
                                scope.form.hidestatus.filedlist.forEach(function (element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var hidestatus = element.status.split(",");
                                            var itemval = false;
                                            hidestatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    }
                                });
                                var hide = false;
                                if (arrayObj.length > 0) {
                                    hide = arrayObj[0];
                                    arrayObj.forEach(function (element) {
                                        hide = scope.form.hidestatus.relation == "or" ? hide || element : hide && element;
                                    }, this);
                                }
                                scope.form.hide = hide;
                            }, true); ///
                        }
                    }
                    if (scope.form.showstatus) {
                        if (!scope.form.showstatus.relation) {
                            scope.form.showstatus.relation = "or";
                        }
                        if (scope.form.showstatus.filedlist) {
                            var watchstr = "", tag = "";
                            scope.form.showstatus.filedlist.forEach(function (element) {
                                tmodel = scope.model;
                                tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield ? "dmodel" : "model") + '.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function (newValue, oldValue) {
                                var arrayObj = new Array();
                                scope.form.showstatus.filedlist.forEach(function (element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var showstatus = element.status.split(",");
                                            var itemval = false;
                                            showstatus.forEach(function (item) {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    }
                                });
                                var show = true;
                                if (arrayObj.length > 0) {
                                    show = arrayObj[0];
                                    arrayObj.forEach(function (element) {
                                        show = scope.form.showstatus.relation == "or" ? show || element : show && element;
                                    }, this);
                                }
                                scope.form.hide = !show;
                            }, true); ///
                        }
                    }
                    if (scope.form.requiredtatus) {
                        if (!scope.form.requiredtatus.relation) {
                            scope.form.requiredtatus.relation = "or";
                        }
                        if (scope.form.requiredtatus.filedlist) {
                            var watchstr = "", tag = "";
                            scope.form.requiredtatus.filedlist.forEach(function (element) {
                                tmodel = scope.model;
                                tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield ? "dmodel" : "model") + '.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function (newValue, oldValue) {
                                var arrayObj = new Array();
                                scope.form.requiredtatus.filedlist.forEach(function (element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var requiredtatus = tmodel[tfield];
                                        if (angular.isUndefined(requiredtatus)) {
                                            requiredtatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var showstatus = element.status.split(",");
                                            var itemval = false;
                                            showstatus.forEach(function (item) {
                                                if (item == requiredtatus) {
                                                    itemval = itemval || true;
                                                }
                                                else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);
                                        }
                                        else if (requiredtatus == element.status) {
                                            arrayObj.push(true);
                                        }
                                        else {
                                            arrayObj.push(false);
                                        }
                                    }
                                });
                                var show = true;
                                if (arrayObj.length > 0) {
                                    show = arrayObj[0];
                                    arrayObj.forEach(function (element) {
                                        show = scope.form.requiredtatus.relation == "or" ? show || element : show && element;
                                    }, this);
                                }
                                scope.form.hide = !show;
                            }, true); ///
                        }
                    }
                }
            ]
        };
    });

//# sourceMappingURL=objcontrol.js.map

angular.module('app')
    .directive('onRepeat', ['$timeout', '$compile', function($timeout, $compile) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                scope.rowform = angular.copy(scope.form.items);
                if (scope.$first == true) {}
                if (scope.$last === true) {

                }
            }
        }

    }]);
angular.module('app')
    .directive('rangedate', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                option: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/rangedate.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;

                    scope.dateval = "";
                    scope.dateformat = "yyyy-mm-dd";
                    if (scope.option.dateconfig) {
                        if (scope.option.dateconfig.dateformat) {
                            scope.dateformat = scope.option.dateconfig.dateformat;
                        }
                    }

                    scope.$watch('ngModel', function(newValue, oldValue) {
                        newValue = newValue ? newValue : "";
                        if (scope.option.dateconfig) {
                            if (scope.option.dateconfig) {
                                datearr = newValue.split("~");
                                if (scope.option.dateconfig.type == "to") {
                                    if (datearr.length > 1) {
                                        scope.dateval = datearr[1];
                                    } else {
                                        scope.dateval = "";
                                    }

                                } else {
                                    scope.dateval = datearr[0];
                                }
                            } else {
                                scope.dateval = newValue;
                            }

                        } else {
                            scope.dateval = ngModel ? newValue : "";
                        }



                    }, true); ///

                    scope.$watch('dateval', function(newValue, oldValue) {

                        newValue = newValue ? newValue : "";
                        if (scope.option.dateconfig) {
                            if (scope.option.dateconfig) {
                                datearr = (scope.ngModel ? scope.ngModel : "~").split("~");
                                if (scope.option.dateconfig.type == "to") {
                                    if (datearr.length > 1) {
                                        datearr[1] = newValue;
                                    } else {
                                        datearr.push(newValue);
                                    }

                                } else {
                                    datearr[0] = newValue;
                                }
                                scope.ngModel = datearr.join("~");
                            } else {
                                scope.ngModel = newValue;
                            }

                        } else {
                            scope.ngModel = newValue;
                        }


                    }, true); ///








                }
            ]
        }
    });
"use strict";
angular.module('app')
    .controller('app.readdocument', ['$scope', '$translate', 'ngDialog', 'utils', 'toastr',
        function($scope, $translate, ngDialog, utils, toastr) {
            var scope = $scope;
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20
            }
            scope.promise = null;
            scope.filter = angular.copy(scope.para);

            scope.action = {

                load: function() {
                    // scope.$emit("loadIsShow");
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: scope.config.queryUrl + "?page=" + scope.datapage.page + "&size=" + scope.datapage.size + (scope.config.sort ? "&sort=" + scope.config.sort : ""),
                        mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                        data: scope.filter
                    }).then(function(res) {
                        if (res.data.body.content) {
                            scope.model = res.data.body;
                        } else {
                            scope.model = {
                                content: res.data.body.items,
                                records: res.data.body.count
                            }
                        }



                        //   scope.$emit("loadIsHide");
                    });


                },
                reset: function() {
                    scope.filter = angular.copy(scope.para);
                },
                sure: function() {

                    var row = scope.gridApi.selection.getSelectedRows() || [];
                    if (row.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    scope.$parent.action.lovback(row[0])

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    scope.$parent.action.lovback(entity)
                },

            }
            scope.action.load();

        }
    ]);
"use strict";
angular.module('app')
    .controller('app.readdocuments', ['$scope', '$translate', 'ngDialog', 'utils', 'toastr',
        function($scope, $translate, ngDialog, utils, toastr) {
            var scope = $scope;
            var theRequest = new Object();
            var tag = scope.config.queryUrl.indexOf("?");
            if (tag != -1) {
                theRequest["url"] = scope.config.queryUrl.substr(0, tag);
                var str = scope.config.queryUrl.substr(tag + 1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            } else {
                theRequest["url"] = scope.config.queryUrl;
            }
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20
            }
            if (theRequest["page"]) {
                scope.datapage.page = theRequest["page"];
            }
            if (theRequest["size"]) {
                scope.datapage.size = theRequest["size"];
            }
            if (theRequest["sort"]) {
                scope.datapage.sort = theRequest["sort"];
            }
            scope.url = theRequest["url"];
            scope.promise = null;
            scope.filter = angular.copy(scope.para);

            scope.action = {

                load: function() {
                    // scope.$emit("loadIsShow");
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: scope.url + "?page=" + scope.datapage.page + "&size=" + scope.datapage.size + (scope.datapage.sort ? "&sort=" + scope.datapage.sort : ""),
                        mockUrl: "plugins/" + scope.url + "/article.json",
                        data: scope.filter
                    }).then(function(res) {
                        if (res.data.body.content) {
                            scope.model = res.data.body;
                        } else {
                            scope.model = {
                                content: res.data.body.items,
                                records: res.data.body.count
                            }
                        }
                        //   scope.$emit("loadIsHide");
                    });


                },
                reset: function() {
                    scope.filter = angular.copy(scope.para);
                },
                repsure: function() {

                    var row = scope.gridApi.selection.getSelectedRows() || [];
                    if (row.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    var basmodel = {
                        type: "rep",
                        records: row
                    }
                    scope.$parent.action.lovback(basmodel)

                },
                addsure: function() {

                    var row = scope.gridApi.selection.getSelectedRows() || [];
                    if (row.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    var basmodel = {
                        type: "add",
                        records: row
                    }
                    scope.$parent.action.lovback(basmodel)

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {

                },

            }
            scope.action.load();

        }
    ]);
angular.module('app.core.layout')
    .directive('selfAdaption', ['settings', '$timeout', '$window', '$templateCache', '$http', '$compile', '$rootScope',
        function(settings, $timeout, $window, $templateCache, $http, $compile, $rootScope) {
            return {
                restrict: 'AE',
                // scope: {
                //     postion: "@",
                //     buttontitle: "@"
                // },
                link: function(scope, ele, attrs, ctrl) {
                    if (scope.root == null) {
                        scope.root = true;
                    }
                    if (!scope.leftbuttons) {
                        scope.leftbuttons = [];
                    }

                    if (!scope.rightbuttons) {
                        scope.rightbuttons = [];
                    }

                    if (!attrs.id) {
                        attrs.id = "selfadaptionid" + new Date().getTime().toString();
                    }

                    // scope.$on('selfadaption:hide', function() {
                    //     angular.element(document.querySelector('.drawer-right')).removeClass('toggled');
                    //     angular.element(document.querySelector('.drawer-left')).removeClass('toggled');
                    // });

                    if (attrs.postion == "left") {
                        ele.addClass("drawer-left toggled");
                        scope.leftbuttons.push({
                            id: attrs.id,
                            name: attrs.buttontitle,
                            onFooterbuttonclick: function(item) {
                                if (ele.hasClass("toggled")) {
                                    //    scope.$emit("selfadaption:hide", event);
                                    item.name = "返回";
                                    ele.addClass("auto-height");
                                    ele.removeClass("toggled");
                                } else {
                                    item.name = attrs.buttontitle;
                                    // scope.$emit("selfadaption:hide", event);
                                    ele.removeClass("auto-height");
                                    ele.addClass("toggled");
                                }

                            }
                        })
                    }


                    if (attrs.postion == "right") {
                        ele.addClass("drawer-right toggled");
                        scope.rightbuttons.push({
                            id: attrs.id,
                            name: attrs.buttontitle,
                            onFooterbuttonclick: function(item) {
                                if (ele.hasClass("toggled")) {
                                    // scope.$emit("selfadaption:hide", event);
                                    item.name = "返回";
                                    ele.addClass("auto-height");
                                    ele.removeClass("toggled");
                                } else {
                                    // scope.$emit("selfadaption:hide", event);
                                    item.name = attrs.buttontitle;
                                    ele.removeClass("auto-height");
                                    ele.addClass("toggled");
                                }

                            }
                        })
                    }
                    // scope.$on('treenode:click', function() {
                    //     console.log("on event:", "ddddd");
                    // });
                    if (attrs.postion == "bottom") {
                        $http.get('plugins/bas/components/selfadaptionbutton.html', { cache: $templateCache })
                            .success(function(html) {
                                ele.html(ele.html()).append($compile(html)(scope));
                            });
                    }

                }
            }


        }
    ]);
angular.module('app')
    .directive('showOnFocus', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var focused = false,
                    opened = false;
                var select = element.children('.selectize-input');
                var toggleInput = element.find('input')[0];
                var span = element.children('.ui-select-match-text');


                var onfocus = function() {
                    if (!focused && !opened) {
                        toggleInput.click();
                        opened = focused = true;
                    } else if (opened) {
                        opened = false;
                    }
                };
                var onhover = function() {
                    if (!focused && !opened) {
                        toggleInput.click();
                        opened = focused = true;
                    };
                };

                var onblur = function(event) {
                    focused = false;
                    //  event.keyCode = 13;
                    console.log("aaaddd");
                };
                var lostfocus = function(event) {
                    focused = false;
                    //  event.keyCode = 13;
                    console.log("gggggggg");
                };
                element.bind('mouseenter', onhover);
                element.bind('click', onblur);
                select.bind('blur', onblur);
                select.bind('focus', onfocus);
                span.bind('blur', lostfocus);

                //show on pageload
                onhover();
            }
        };
    });
var yes;
(function (yes) {
    angular.module('app').directive('basTree', [
        '$templateCache', '$http', '$compile',
        function ($templateCache, $http, $compile) {
            return {
                restrict: "EA",
                scope: {
                    resource: "=",
                    option: "=",
                    bootValue: "@",
                    levelValue: "@" //显示层级
                },
                transclude: true,
                controller: ['$scope', '$location', '$templateCache', '$interpolate',
                    function ($scope, $location, $templateCache, $interpolate) {
                        var scope = $scope;
                        scope.items = [];
                        scope.$watch('resource', function (newValue, oldValue) {
                            if (newValue) {
                                scope.items = scope.resource.filter(function (t) {
                                    if (!scope.bootValue && !t[scope.option.parent]) {
                                        t.hasnextlevel = (scope.findnextlevel(t[scope.option.id]).length > 0 ? true : false);
                                        if (!t.icon) {
                                            t.icon = "fa-book";
                                        }
                                        return t;
                                    }
                                    if (t[scope.option.parent] == scope.bootValue) {
                                        t.hasnextlevel = (scope.findnextlevel(t[scope.option.id]).length > 0 ? true : false);
                                        if (!t.icon) {
                                            t.icon = "fa-book";
                                        }
                                        return t;
                                    }
                                });
                            }
                        }, true); ///
                        scope.findnextlevel = function (parentval) {
                            var nextitems = scope.resource.filter(function (t) {
                                if (t[scope.option.parent] == parentval) {
                                    return t;
                                }
                            });
                            return nextitems;
                        };
                        angular.element(".sidebar").on('mousedown', function (e) {
                            angular.element(document.querySelector('.sidebar .tree-selected')).removeClass('tree-selected');
                        });
                        scope.clearactive = function () {
                            scope.resource.forEach(function (element) {
                                element.active = false;
                            }, this);
                        };
                        //scope.crentnode=null;
                        scope.nodeadd = function (node) {
                            scope.option.addfn(node);
                        };
                        scope.nodeedit = function (node) {
                            scope.option.editfn(node);
                        };
                        scope.nodeSelect = function (event, node) {
                            scope.clearactive();
                            node.active = true;
                            if (scope.option.clicknode) {
                                scope.option.lowerlevels = scope.findnextlevel(node[scope.option.id]);
                                scope.option.clicknode(node, scope.levelValue);
                            }
                            // scope.$emit("selfadaption:hide", event);
                            //angular.element(event.currentTarget).addClass('tree-selected');
                            // scope.$emit('nav:open-tab', node);
                        };
                    }
                ],
                link: function (scope, ele, attrs, ctrl) {
                    if (scope.root == null) {
                        scope.root = true;
                    }
                    $http.get('plugins/bas/components/tree.html', { cache: $templateCache })
                        .success(function (html) {
                            // scope.selectChanged = scope.selectChanged || function (node) {
                            //         walkChildren(node.children, node.selected);
                            //         walkParent(node, node.selected);
                            //     };
                            ele.html('').append($compile(html)(scope));
                        });
                }
            };
        }
    ]);
})(yes || (yes = {}));

//# sourceMappingURL=tree.js.map

angular.module('app')
    .directive('viewGrid', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/viewgrid.html',
            controller: ['$rootScope', '$timeout', 'uiGridConstants', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $timeout, uiGridConstants, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    //  var form={
                    //     headers: "=",
                    //     rowDblclick: "=",
                    //     onchangepage: "=",
                    //     resource: "=",
                    //     gridApi: "=",
                    //     gridKey: "=",
                    //     sortable: "=",
                    //     records:"=",
                    //     onHoveredIndexChange: "="
                    //   }
                    var scope = $scope;
                    var isfoot = false;
                    scope.bakheaders = angular.copy($scope.form.headers);
                    angular.forEach($scope.form.headers, function (col, key) {
                        if (col) {
                            col.readonly = true;
                            if (col.type == "basLov") {
                                col.cellTemplate = "ui-grid/gridcelllov";
                            }
                            else if (col.type == "basNumber" || col.type == "number") {
                                col.headerCellClass = "esy-number";
                                col.type = "number";
                                col.cellTemplate = "ui-grid/gridcellnumber";
                            }
                            else if (col.type == "basRemark") {
                                col.cellTemplate = "ui-grid/gridcellremark";
                            }
                            else {
                                if (!col.cellTemplate) {
                                    col.cellTemplate = "ui-grid/gridcelldefault";
                                }
                            }
                            if (!col.hasOwnProperty("enableColumnMenu")) {
                                col.enableColumnMenu = false;
                            }
                            if (col.hasOwnProperty("summsg")) {
                                col.aggregationType = uiGridConstants.aggregationTypes.sum;
                                isfoot = true;
                                if (col.summsg.auto) {
                                    col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{ ( col.getAggregationValue() | number :col.colDef.num ) }}</div></div>";
                                }
                                else {
                                    if (angular.isString(col.summsg.sumval)) {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval)}}</div></div>";
                                    }
                                    else {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval | number :col.colDef.num)}}</div></div>";
                                    }
                                }
                            }
                        }
                    });
                    scope.paginationOptions = {
                        pageNumber: 0,
                        pageSize: 30,
                        sort: ""
                    };
                    scope.gridOptions = angular.extend({
                        data: 'entries',
                        height: 200,
                        enableSorting: true,
                        enableColumnMenu: true,
                        suppressRemoveSort: false,
                        showGridFooter: false,
                        showColumnFooter: isfoot,
                        columnFooterHeight: 24,
                        multiSelect: true,
                        enableFullRowSelection: false,
                        enableGridMenu: true,
                        gridMenuCustomItems: [{
                            title: '重置',
                            action: function ($event) {
                                scope.resetgridmsg();
                                scope.gridOptions.columnDefs = scope.readgridmsg(scope.bakheaders, scope.form.gridKey ? scope.form.gridKey : "");
                            },
                            order: 210
                        }],
                        onRegisterApi: function (gridApi) {
                            gridApi.headers = scope.form.headers;
                            scope.form.gridApi = gridApi;
                            gridApi.core.on.sortChanged(scope, function (grid, sortColumns) {
                                if (sortColumns.length == 0) {
                                    scope.paginationOptions.sort = null;
                                }
                                else {
                                    scope.paginationOptions.sort = sortColumns[0].colDef.name + "," + sortColumns[0].sort.direction;
                                }
                                if (scope.form.onchangepage) {
                                    scope.form.onchangepage(scope.paginationOptions.pageNumber, scope.paginationOptions.pageSize, scope.paginationOptions.sort);
                                }
                            });
                            gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                                if (scope.form.onchangepage) {
                                    scope.paginationOptions.pageNumber = newPage - 1;
                                    scope.paginationOptions.pageSize = pageSize;
                                    scope.form.onchangepage(scope.paginationOptions.pageNumber, scope.paginationOptions.pageSize, scope.paginationOptions.sort);
                                }
                            });
                            gridApi.core.on.renderingComplete(scope, function (ar1) {
                                $timeout(function () {
                                    angular.element(window).trigger('resize');
                                }, 0);
                            });
                            gridApi.core.on.columnVisibilityChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                            gridApi.colMovable.on.columnPositionChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                            gridApi.colResizable.on.columnSizeChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                                // var cols = [];
                                // angular.forEach(gridApi.grid.columns, function(column) {
                                //     cols.push(column.width);
                                // });
                                // if (scope.option.gridKey) {
                                //     localStorage.setItem(scope.gridKey + "_grid", cols);
                                // }
                            });
                        },
                        rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick($event,row)\"  ng-click=\"grid.appScope.hoveredIndex = rowRenderIndex\" " +
                            "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                            "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader,'selecthoverclass': grid.appScope.hoveredIndex === rowRenderIndex }\" " +
                            "ui-grid-cell ></div>"
                    }, settings.uiGrid);
                    if ($scope.form.sortable) {
                        $scope.gridOptions.sortable = $scope.form.sortable;
                    }
                    scope.onDblClick = function (event, row) {
                        if (row && row.entity)
                            scope.backentry = angular.copy(row.entity);
                        if (scope.form.rowDblclick) {
                            scope.form.rowDblclick(scope.backentry);
                        }
                    };
                    scope.$watch("form.headers", function (newValue, oldValue) {
                        if (scope.form.headers) {
                            scope.gridOptions.columnDefs = scope.readgridmsg(scope.form.headers, scope.form.gridKey ? scope.form.gridKey : "");
                        }
                    }, true); ///
                    scope.$watch("ngModel", function (newValue, oldValue) {
                        if (scope.ngModel) {
                            scope.entries = scope.ngModel;
                            scope.gridOptions.totalItems = scope.form.records;
                            scope.hoveredIndex = null; //对象改变的时候,重置选中状态
                        }
                    }, true); ///
                    scope.$watch("hoveredIndex", function (newValue, oldValue) {
                        scope.form.onHoveredIndexChange && scope.form.onHoveredIndexChange(scope.hoveredIndex != null ? scope.entries[scope.hoveredIndex] : null, scope.hoveredIndex);
                    }, true);
                    scope.resetgridmsg = function () {
                        localStorage.setItem(scope.form.gridKey + "_grid", "{}");
                    };
                    scope.savegridmsg = function (gridcols) {
                        var cols = {};
                        angular.forEach(gridcols, function (column) {
                            cols[column.field] = {
                                width: column.width,
                                visible: column.visible
                            };
                            // var item ={ //selectionRowHeaderCol
                            //     key: column.field,
                            //     width: column.width,
                            //     visible: column.visible
                            // }
                            // cols.push(item);
                        });
                        localStorage.setItem(scope.form.gridKey + "_grid", angular.toJson(cols, true));
                    };
                    scope.readgridmsg = function (headers, localStorageKey) {
                        var columns = [];
                        var colsmsg = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                        angular.forEach(colsmsg, function (col, key) {
                            if (headers.hasOwnProperty(key)) {
                                var item = angular.extend(headers[key], col);
                                if (angular.isObject(headers[key]) && key) {
                                    item.name = key;
                                }
                                if (angular.isUndefined(item.headerCellFilter))
                                    item.headerCellFilter = "translate";
                                columns.push(item);
                            }
                        });
                        angular.forEach(headers, function (col, key) {
                            if (!colsmsg.hasOwnProperty(key)) {
                                if (angular.isString(col)) {
                                    col = {
                                        name: key,
                                        original: col,
                                        displayName: col
                                    };
                                }
                                else if (angular.isObject(col) && key) {
                                    col.name = key;
                                }
                                if (angular.isUndefined(col.headerCellFilter))
                                    col.headerCellFilter = "translate";
                                columns.push(col);
                            }
                        });
                        return columns;
                    };
                }
            ]
        };
    });

//# sourceMappingURL=viewgrid.js.map

angular.module('app')
    .directive('viewsingleGrid', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                headers: "=",
                rowDblclick: "=",
                onchangepage: "=",
                resource: "=",
                gridApi: "=",
                gridKey: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/viewsinglegrid.html',
            controller: ['$rootScope', '$timeout', 'uiGridConstants', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $timeout, uiGridConstants, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.bakheaders = angular.copy($scope.headers);
                    var isfoot = false;
                    angular.forEach($scope.headers, function (col, key) {
                        if (col) {
                            if (col.aggregationType) {
                                isfoot = true;
                            }
                        }
                        col.readonly = true;
                        if (col.type == "basLov") {
                            col.cellTemplate = "ui-grid/gridcelllov";
                        }
                        else if (col.type == "basNumber" || col.type == "number") {
                            col.headerCellClass = "esy-number";
                            col.type = "number";
                            col.cellTemplate = "ui-grid/gridcellnumber";
                        }
                        else if (col.type == "basRemark") {
                            col.cellTemplate = "ui-grid/gridcellremark";
                        }
                        else if (col.type == "basIcos") {
                            col.cellTemplate = "ui-grid/gridcellioc";
                        }
                        else {
                            if (!col.cellTemplate) {
                                col.cellTemplate = "ui-grid/gridcelldefault";
                            }
                        }
                        if (!col.hasOwnProperty("enableColumnMenu")) {
                            col.enableColumnMenu = false;
                        }
                        if (col.hasOwnProperty("summsg")) {
                            col.aggregationType = uiGridConstants.aggregationTypes.sum;
                            isfoot = true;
                            if (col.summsg.auto) {
                                col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{ ( col.getAggregationValue() | number :col.colDef.num ) }}</div></div>";
                            }
                            else {
                                if (angular.isString(col.summsg.sumval)) {
                                    col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval)}}</div></div>";
                                }
                                else {
                                    col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval | number :col.colDef.num)}}</div></div>";
                                }
                            }
                        }
                        if (!col.hasOwnProperty("enableColumnMenu")) {
                            col.enableColumnMenu = false;
                        }
                    });
                    scope.gridOptions = angular.extend({
                        data: 'entries',
                        height: 320,
                        enableSorting: false,
                        enableColumnMenu: true,
                        suppressRemoveSort: false,
                        showGridFooter: false,
                        showColumnFooter: isfoot,
                        columnFooterHeight: 24,
                        enableRowSelection: false,
                        multiSelect: false,
                        enableFullRowSelection: true,
                        enableGridMenu: true,
                        gridMenuCustomItems: [{
                            title: '重置',
                            action: function ($event) {
                                scope.resetgridmsg();
                                scope.gridOptions.columnDefs = scope.readgridmsg(scope.bakheaders, scope.gridKey ? scope.gridKey : "");
                            },
                            order: 210
                        }],
                        onRegisterApi: function (gridApi) {
                            scope.gridApi = gridApi;
                            scope.$parent.gridApi = gridApi;
                            gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                                if (scope.onchangepage) {
                                    scope.onchangepage(newPage - 1, pageSize);
                                }
                            });
                            gridApi.core.on.renderingComplete(scope, function (ar1) {
                                $timeout(function () {
                                    angular.element(window).trigger('resize');
                                }, 0);
                            });
                            gridApi.core.on.columnVisibilityChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                            gridApi.colMovable.on.columnPositionChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                            gridApi.colResizable.on.columnSizeChanged(scope, function (ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                        },
                        rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick($event,row)\" " +
                            "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                            "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" " +
                            "ui-grid-cell ></div>"
                    }, settings.uiGrid);
                    scope.onDblClick = function (event, row) {
                        if (row && row.entity)
                            scope.backentry = angular.copy(row.entity);
                        if (scope.rowDblclick) {
                            scope.rowDblclick(scope.backentry);
                        }
                    };
                    scope.$watch("headers", function (newValue, oldValue) {
                        if (scope.headers) {
                            scope.gridOptions.columnDefs = scope.readgridmsg(scope.headers, scope.gridKey ? scope.gridKey : "");
                        }
                    }, true); ///
                    scope.$watch("resource", function (newValue, oldValue) {
                        if (scope.resource) {
                            scope.entries = scope.resource.content;
                            scope.gridOptions.totalItems = scope.resource.records;
                        }
                    }, true); ///
                    scope.resetgridmsg = function () {
                        localStorage.setItem(scope.gridKey + "_grid", "{}");
                    };
                    scope.savegridmsg = function (gridcols) {
                        var cols = {};
                        angular.forEach(gridcols, function (column) {
                            cols[column.field] = {
                                width: column.width,
                                visible: column.visible
                            };
                            // var item ={ //selectionRowHeaderCol
                            //     key: column.field,
                            //     width: column.width,
                            //     visible: column.visible
                            // }
                            // cols.push(item);
                        });
                        localStorage.setItem(scope.gridKey + "_grid", angular.toJson(cols, true));
                    };
                    scope.readgridmsg = function (headers, localStorageKey) {
                        var columns = [];
                        var colsmsg = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                        angular.forEach(colsmsg, function (col, key) {
                            if (headers.hasOwnProperty(key)) {
                                var item = angular.extend(headers[key], col);
                                if (angular.isObject(headers[key]) && key) {
                                    item.name = key;
                                }
                                if (angular.isUndefined(item.headerCellFilter))
                                    item.headerCellFilter = "translate";
                                columns.push(item);
                            }
                        });
                        angular.forEach(headers, function (col, key) {
                            if (!colsmsg.hasOwnProperty(key)) {
                                if (angular.isString(col)) {
                                    col = {
                                        name: key,
                                        original: col,
                                        displayName: col
                                    };
                                }
                                else if (angular.isObject(col) && key) {
                                    col.name = key;
                                }
                                if (angular.isUndefined(col.headerCellFilter))
                                    col.headerCellFilter = "translate";
                                columns.push(col);
                            }
                        });
                        return columns;
                        // var columns = [];
                        // var colWidth = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                        // colWidth = "";
                        // colWidth = colWidth.split(',');
                        // var index = 1;
                        // angular.forEach(headers, function(col, key) {
                        //     if (angular.isString(col)) {
                        //         col = {
                        //             name: key,
                        //             original: col,
                        //             displayName: col
                        //         };
                        //     } else if (angular.isObject(col) && key) {
                        //         col.name = key;
                        //     }
                        //     if (angular.isUndefined(col.headerCellFilter))
                        //         col.headerCellFilter = "translate";
                        //     if (colWidth.length > index) {
                        //         col.width = colWidth[index - 1];
                        //     }
                        //     index++;
                        //     columns.push(col);
                        // });
                        // return columns;
                    };
                }]
        };
    });

//# sourceMappingURL=viewsinglegrid.js.map

"use strict";
angular.module('app')
    .directive('departmentTree', function ($compile, $templateCache, $http) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                items: '=',
                isChild: '=',
                openLevel: '=',
                hide: '=',
                onSelect: '=',
                onOperate: '=',
                onFooterbuttonclick:'='
            },
            link: function (scope, element, attr) {
                $http.get("plugins/base/directives/department.tree.html", { cache: $templateCache })
                    .success(function (html) {
                        element.html('').append($compile(html)(scope));
                    });
            },
            controller: ["$scope", 'utils', function ($scope, utils) {
                $scope.treeSelect = function (item, $event) {
                    $scope.onSelect(item);
                    $event.stopPropagation();
                    $scope.onFooterbuttonclick('selector_col_1','buttonSection');
                };
                if ($scope.openLevel) {
                    $scope.$watch("items", function () {
                        if ($scope.items) {
                            autoOpen(1, $scope.openLevel, $scope.items);
                        }
                    });
                }
                function autoOpen(nowLevel, openLevel, items) {
                    if (nowLevel <= openLevel) {
                        items.forEach(function (it) {
                            if (it.children) {
                                it.opened = true;
                                autoOpen(nowLevel + 1, openLevel, it.children);
                            }
                        });
                    }
                }

                $scope.open = function (item) {
                    item.opened = !item.opened;
                };
            }]
        }
    });
(function () {
    'use strict';
    angular.module('app')
        .directive('yesGallery', ['$location', 'utils', '$log', 'FileUploader', 'settings',
            function ($location, utils, $log, FileUploader, settings) {

                return {
                    restrict: 'EA',
                    templateUrl: 'plugins/base/directives/gallery.html',
                    replace: true,
                    scope: {
                        options: "=",
                        readonly: "="
                    },
                    require: 'ngModel',
                    link: function link(scope, element, attrs, ngModelController) {
                        setTimeout(function () {
                            scope.attachmentId = ngModelController.$viewValue;
                            scope.options = angular.extend({
                                maxMB: 100,
                                multiple: 10
                            }, scope.options);
                            if (scope.options.multiple == false) {
                                scope.options.multiple = 1;
                            }
                            scope.init();
                            scope.$watch("attachmentId", function () {
                                if (scope.attachmentId && !ngModelController.$viewValue) {
                                    ngModelController.$setViewValue(scope.attachmentId);
                                }
                            });
                        }, 200);

                    },
                    controller: ['$scope', '$attrs', '$element',
                        function ($scope, $attrs, $element) {
                            var url = (settings.host == "self" ? "" : settings.host) + "/" + settings.apiPrefix + settings.uploadUrl;
                            $scope.downUrl = settings.host + "/" + settings.apiPrefix + settings.downloadUrl;
                            var uploader = $scope.uploader = new FileUploader({
                                url: url,
                                autoUpload: true
                            });
                            $scope.sumSize = 0;
                            $scope.init = function () {
                                $scope.apiPrefix = settings.apiPrefix;
                                if (!$scope.attachmentId) {
                                    utils.async("GET", settings.getUuid).then(function (attId) {
                                        $scope.attachmentId = attId.data;
                                        uploader.formData = [{'attachmentId': $scope.attachmentId}, {'isImage': true}];
                                    });
                                } else {
                                    uploader.formData = [{'attachmentId': $scope.attachmentId}, {'isImage': true}];
                                    utils.async("GET", settings.getByAttIdUrl, {"attId": $scope.attachmentId}).then(function (res) {
                                        $scope.items = res.data.body;
                                        if($scope.items){
                                            $scope.items.forEach(function(item){
                                                item.thumbUrl = "/"+$scope.apiPrefix+"/base/attachment/showthumb?uid="+item.uid;
                                            });
                                        }
                                    });
                                }
                                uploader.onSuccessItem = function (item, res, status, headers) {
                                    item.uid = res.body.data[0].uid;
                                    item.thumbUrl = "/"+$scope.apiPrefix+"/base/attachment/showthumb?uid="+item.uid;
                                    $scope.message = res.message;
                                };
                            };

                            $scope.remove = function (item) {
                                utils.async("DELETE", settings.delByUid + "/" + item.uid).then(function (res) {
                                    if (res.data.body) {
                                        if ($scope.items) {
                                            for (var i = 0, size = $scope.items.length; i < size; i++) {
                                                if ($scope.items[i] == item) {
                                                    $scope.items.splice(i, 1);
                                                }
                                            }
                                        }
                                    } else {
                                        console.log("后台删除出错!");
                                    }
                                });
                            };

                            uploader.filters.push({
                                name: 'sizeFilter',
                                fn: function (item /*{File|FileLikeObject}*/, options) {
                                    var tsum = 0;
                                    if ($scope.items) {
                                        $scope.items.forEach(function (item) {
                                            tsum += item.fileSize ? item.fileSize : 0;
                                        });
                                    }
                                    uploader.queue.forEach(function (item) {
                                        tsum += item.size;
                                    });
                                    tsum += item.size;
                                    if (tsum > $scope.options.maxMB * 1048576) {
                                        alert("大小不能超过" + $scope.options.maxMB + "M!");
                                        return false;
                                    } else if (((uploader.queue ? uploader.queue.length : 0) + ($scope.items ? $scope.items.length : 0)) >= $scope.options.multiple) {
                                        alert("最多只能上传" + $scope.options.multiple + "个文件!");
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            });

                            //if (angular.isFunction(options.resolve)) {
                            //    options.resolve.apply(uploader);
                            //}
                        }]
                };
            }]);
})();
angular.module('app')
    .directive('getPerson', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/base/components/getperson.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }
                    scope.model = {
                        field: scope.ngModel
                    };
                    scope.$watch('model.field', function (newValue, oldValue) {
                        scope.ngModel = newValue;
                    }, true); ///
                    scope.$watch('ngModel', function (newValue, oldValue) {
                        scope.model.field = newValue;
                    }, true); ///
                    scope.$watch('$parent.model.formstatus', function (newValue, oldValue) {
                        var formstatus = "00"; //初始状态
                        if (newValue) {
                            formstatus = newValue;
                        }
                        if (formstatus == "99") {
                            scope.form.readonly = true;
                        }
                        else {
                            if (scope.form.readonlystatus) {
                                var readonlystatus = scope.form.readonlystatus.split(",");
                                var readonly = false;
                                readonlystatus.forEach(function (element) {
                                    if (element == formstatus) {
                                        readonly = true;
                                    }
                                });
                                scope.form.readonly = readonly;
                            }
                        }
                    }, true); ///
                    scope.form.titleMap = [];
                    scope.form.small = false;
                    scope.form.fieldAddonRight = 'fa-search-minus';
                    scope.form.refresh = function (options, search) {
                        if (!search) {
                            return;
                        }
                        var params = {
                            count: 10,
                            oid$eq: "203500010799",
                            cname$match: search
                        };
                        utils.ajax({
                            method: 'GET',
                            url: 'base/person',
                            mockUrl: "plugins/vehicle/data/vehicleInfo.json",
                            params: params
                        }).then(function (res) {
                            scope.form.titleMap = [];
                            res.data.body.items.forEach(function (e) {
                                var item = {
                                    value: e.pid,
                                    name: e.cname
                                };
                                if (scope.form.relationfield) {
                                    scope.form.relationfield.forEach(function (element) {
                                        item[element.findfield] = e[element.findfield];
                                    });
                                }
                                scope.form.titleMap.push(item);
                            });
                        });
                    };
                    scope.onChange = function (selected) {
                        if (scope.form.relationfield) {
                            scope.form.relationfield.forEach(function (element) {
                                if (scope.$parent.model) {
                                    scope.$parent.model[element.tofield] = selected[element.findfield];
                                }
                                else {
                                    scope.$parent.row.entity[element.tofield] = selected[element.findfield];
                                }
                            });
                        }
                    };
                    var init = function () {
                        if (scope.ngModel) {
                            var params = {
                                count: 10,
                                oid$eq: "203500010799",
                                pid$eq: scope.ngModel
                            };
                            utils.ajax({
                                method: 'GET',
                                url: 'base/person',
                                mockUrl: "plugins/vehicle/data/vehicleInfo.json",
                                params: params
                            }).then(function (res) {
                                scope.form.titleMap = [];
                                res.data.body.items.forEach(function (e) {
                                    var item = {
                                        value: e.pid,
                                        name: e.cname
                                    };
                                    if (scope.form.relationfield) {
                                        scope.form.relationfield.forEach(function (element) {
                                            item[element.findfield] = e[element.findfield];
                                        });
                                    }
                                    scope.form.titleMap.push(item);
                                });
                            });
                        }
                    };
                    init();
                    $scope.form.dialog = function () {
                        ngDialog.open({
                            className: 'ngdialog-theme-default dialog-people-selector',
                            template: 'plugins/base/pages/people.selector.html',
                            controller: function ($scope) {
                                $scope.callback = function (justPersons, selects) {
                                    if (justPersons.length > 0) {
                                        justPersons.forEach(function (person) {
                                            if (person.pid && person.cname) {
                                                scope.ngModel = person.pid;
                                                var item = {
                                                    value: person.pid,
                                                    name: person.cname
                                                };
                                                if (scope.form.relationfield) {
                                                    scope.form.relationfield.forEach(function (element) {
                                                        if (scope.$parent.model) {
                                                            scope.$parent.model[element.tofield] = person[element.findfield];
                                                        }
                                                        else {
                                                            scope.$parent.row.entity[element.tofield] = person[element.findfield];
                                                        }
                                                    });
                                                }
                                                scope.form.titleMap.push(item);
                                                scope.ngModel = person.pid;
                                            }
                                        });
                                        ngDialog.closeAll();
                                    }
                                    else {
                                        ngDialog.closeAll();
                                    }
                                };
                            }
                        });
                    };
                }]
        };
    });

//# sourceMappingURL=getperson.js.map

angular.module('app')
    .directive('importUploader', ['$location', 'utils', '$log', 'FileUploader',
        function ($location, utils, $log, FileUploader) {
            return {
                restrict: 'EA',
                templateUrl: 'base/directives/import.html',
                replace: true,
                scope: {
                    options: "="
                },
                controller: ['$scope', '$attrs', '$element',
                    function ($scope, $attrs, $element) {
                        var options = $scope.options || {};

                        $scope.title = options.title;

                        var url = options.url || "/upload";

                        var uploader = $scope.uploader = new FileUploader({
                            url: url
                        });

                        uploader.filters.push({
                            name: 'customFilter',
                            fn: function (item, options) {
                                return this.queue.length < 10;
                            }
                        });

                        uploader.onSuccessItem = function (item, res, status, headers) {
                            $scope.message = res.message;
                            if (angular.isFunction(options.resolve)) {
                                options.resolve.apply();
                            }
                        };
                    }]
            };
        }]);
'use strict';
(function () {
    angular.module('app')
        .run(function ($templateCache) {

        }).directive('yesApplicationTree', function ($compile, $templateCache, $http) {

        var walkChildren = function (tree, state) {
            angular.forEach(tree, function (node) {
                node.selected = state;
                if (node.children) {
                    walkChildren(node.children, state);
                }
            });
        };

        return {
            restrict: 'EA',
            scope: {
                nodes: "=",
                root: "=",
                hide: "=",
                initial: "=",
                onSelect: "="
            },
            //templateUrl: 'plugins/base/templates/role-tree.html',
            //replace: true,
            link: function (scope, element, attrs) {
                $http.get("plugins/base/directives/tree.application.html", {cache: $templateCache})
                    .success(function (html) {
                        scope.selectChanged = function (node, pd) {
                            if(pd || !node.children || !node.children.length){
                                walkChildren(scope.initial,false);
                                node.selected = true;
                                scope.onSelect(node);
                            }
                        };
                        element.html('').append($compile(html)(scope));
                    });
            }
        };
    })
})();
'use strict';
(function () {
    angular.module('app')
        .run(function ($templateCache) {

        }).directive('yesOrganizationTree', function ($compile, $templateCache, $http) {

        var walkChildren = function (tree, state) {
            angular.forEach(tree, function (node) {
                node.selected = state;
                if (node.children) {
                    walkChildren(node.children, state);
                }
            });
        };

        return {
            restrict: 'EA',
            scope: {
                nodes: "=",
                root: "=",
                hide: "=",
                initial: "=",
                onSelect: "=",
                multiple: "=",
                sortable: "=",
                sortOption: "="
            },
            //templateUrl: 'plugins/base/templates/role-tree.html',
            //replace: true,
            link: function (scope, element, attrs) {
                var template = "tree.organization.html";
                if(scope.sortable){
                    template = "tree.organization.sortable.html";
                }
                $http.get("plugins/base/directives/"+template, {cache: $templateCache})
                    .success(function (html) {
                        scope.selectChanged = function (node, pd) {
                            if(pd || !node.children || !node.children.length){
                                if(scope.multiple){
                                    node.selected = !node.selected;
                                }else{
                                    walkChildren(scope.initial,false);
                                    node.selected = true;
                                }
                                scope.onSelect(node);
                            }
                        };
                        element.html('').append($compile(html)(scope));
                        scope.showMoveIco = function(brothers){
                            brothers.forEach(function(item){
                                item.showMove = true;
                            });
                        };
                        scope.hideMoveIco = function(brothers){
                            brothers.forEach(function(item){
                                item.showMove = false;
                            });
                        };
                    });
            }
        };
    })
})();
'use strict';
(function () {
    angular.module('app')
        .run(function ($templateCache) {

        }).directive('yesRoleTree', function ($compile, $templateCache, $http) {

        var walkChildren = function (tree, state) {
            angular.forEach(tree, function (node) {
                node.selected = state;
                if (node.children) {
                    walkChildren(node.children, state);
                }
            });
        };

        var walkParent = function (node, state) {
            if (node && node.parentNode && state) {
                node.parentNode.selected = state;
                walkParent(node.parentNode, state);
            }
        };

        return {
            restrict: 'EA',
            scope: {
                nodes: "=",
                root: "=",
                hide: "=",
                cantSelected: "="
            },
            //templateUrl: 'plugins/base/templates/role-tree.html',
            //replace: true,
            link: function (scope, element, attrs) {
                $http.get("plugins/base/directives/tree.roles.html", {cache: $templateCache})
                    .success(function (html) {
                        scope.selectChanged = scope.selectChanged || function (node) {
                            if(scope.cantSelected){
                                node.selected = !node.selected;
                            }else{
                                walkChildren(node.children, node.selected);
                                walkParent(node, node.selected);
                            }
                        };
                        element.html('').append($compile(html)(scope));
                    });
            }
        };
    })
})();
(function () {
    'use strict';
    angular.module('app')
        .directive('yesUploader', ['$location', 'utils', '$log', 'FileUploader',
            function ($location, utils, $log, FileUploader) {

                return {
                    restrict: 'EA',
                    templateUrl: 'plugins/base/directives/uploader.html',
                    replace: true,
                    scope: {
                        options: "=",
                        readonly: "="
                    },
                    require: 'ngModel',
                    link: function link(scope, element, attrs, ngModelController) {
                        setTimeout(function () {
                            scope.attachmentId = ngModelController.$viewValue;
                            scope.options = angular.extend({
                                maxMB: 10,
                                multiple: 10
                            }, scope.options);
                            if (scope.options.multiple == false) {
                                scope.options.multiple = 1;
                            }
                            scope.init();
                            scope.$watch("attachmentId", function () {
                                if (scope.attachmentId && !ngModelController.$viewValue) {
                                    ngModelController.$setViewValue(scope.attachmentId);
                                }
                            });
                        }, 200);

                    },
                    controller: ['$scope', '$attrs', '$element', 'utils', 'settings',
                        function ($scope, $attrs, $element, utils, settings) {
                            var host = settings.host == "self" ? "" : settings.host;
                            var rootUrl = [host, settings.apiPrefix].join('/');
                            function getApiUrl(relativeUrl) {
                                if (relativeUrl && relativeUrl.indexOf('http') === 0)
                                    return relativeUrl;
                                return [rootUrl, relativeUrl].join('/');
                            }


                            var url = getApiUrl( settings.uploadUrl);
                            $scope.downUrl = getApiUrl( settings.downloadUrl);
                            var uploader = $scope.uploader = new FileUploader({
                                url: url,
                                autoUpload: true
                            });
                            $scope.sumSize = 0;
                            $scope.init = function () {
                                $scope.apiPath = settings.apiPath;
                                if (!$scope.attachmentId) {
                                    utils.async("GET", settings.getUuid).then(function (attId) {
                                        $scope.attachmentId = attId.data;
                                        uploader.formData = [{'attachmentId': $scope.attachmentId}];
                                    });
                                } else {
                                    uploader.formData = [{'attachmentId': $scope.attachmentId}];
                                    utils.async("GET", settings.getByAttIdUrl, {"attId": $scope.attachmentId}).then(function (res) {
                                        $scope.items = res.data.body;
                                    });
                                }
                                uploader.onSuccessItem = function (item, res, status, headers) {
                                    item.uid = res.body.data[0].uid;
                                    $scope.message = res.message;
                                };
                            };

                            $scope.remove = function (item) {
                                utils.async("DELETE", settings.delByUid + "/" + item.uid).then(function (res) {
                                    if (res.data.body) {
                                        if ($scope.items) {
                                            for (var i = 0, size = $scope.items.length; i < size; i++) {
                                                if ($scope.items[i] == item) {
                                                    $scope.items.splice(i, 1);
                                                }
                                            }
                                        }
                                    } else {
                                        console.log("后台删除出错!");
                                    }
                                });
                            };

                            uploader.filters.push({
                                name: 'sizeFilter',
                                fn: function (item /*{File|FileLikeObject}*/, options) {
                                    var tsum = 0;
                                    if ($scope.items) {
                                        $scope.items.forEach(function (item) {
                                            tsum += item.fileSize ? item.fileSize : 0;
                                        });
                                    }
                                    uploader.queue.forEach(function (item) {
                                        tsum += item.size;
                                    });
                                    tsum += item.size;
                                    if (tsum > $scope.options.maxMB * 1048576) {
                                        alert("大小不能超过" + $scope.options.maxMB + "M!");
                                        return false;
                                    } else if (((uploader.queue ? uploader.queue.length : 0) + ($scope.items ? $scope.items.length : 0)) >= $scope.options.multiple) {
                                        alert("最多只能上传" + $scope.options.multiple + "个文件!");
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            });

                            //
                            //uploader.filters.push({
                            //    name: 'customFilter',
                            //    fn: function (item /*{File|FileLikeObject}*/, options) {
                            //        return this.queue.length < 10;
                            //    }
                            //});
                            //
                            //if (angular.isFunction(options.resolve)) {
                            //    options.resolve.apply(uploader);
                            //}
                        }]
                };
            }]);
})();
/*! bootstrap-timepicker v0.2.3 
* http://jdewit.github.com/bootstrap-timepicker 
* Copyright (c) 2013 Joris de Wit 
* MIT License 
*/(function(t,i,e,s){"use strict";var h=function(i,e){this.widget="",this.$element=t(i),this.defaultTime=e.defaultTime,this.disableFocus=e.disableFocus,this.isOpen=e.isOpen,this.minuteStep=e.minuteStep,this.modalBackdrop=e.modalBackdrop,this.secondStep=e.secondStep,this.showInputs=e.showInputs,this.showMeridian=e.showMeridian,this.showSeconds=e.showSeconds,this.template=e.template,this.appendWidgetTo=e.appendWidgetTo,this._init()};h.prototype={constructor:h,_init:function(){var i=this;this.$element.parent().hasClass("input-append")||this.$element.parent().hasClass("input-prepend")?(this.$element.parent(".input-append, .input-prepend").find(".add-on").on({"click.timepicker":t.proxy(this.showWidget,this)}),this.$element.on({"focus.timepicker":t.proxy(this.highlightUnit,this),"click.timepicker":t.proxy(this.highlightUnit,this),"keydown.timepicker":t.proxy(this.elementKeydown,this),"blur.timepicker":t.proxy(this.blurElement,this)})):this.template?this.$element.on({"focus.timepicker":t.proxy(this.showWidget,this),"click.timepicker":t.proxy(this.showWidget,this),"blur.timepicker":t.proxy(this.blurElement,this)}):this.$element.on({"focus.timepicker":t.proxy(this.highlightUnit,this),"click.timepicker":t.proxy(this.highlightUnit,this),"keydown.timepicker":t.proxy(this.elementKeydown,this),"blur.timepicker":t.proxy(this.blurElement,this)}),this.$widget=this.template!==!1?t(this.getTemplate()).prependTo(this.$element.parents(this.appendWidgetTo)).on("click",t.proxy(this.widgetClick,this)):!1,this.showInputs&&this.$widget!==!1&&this.$widget.find("input").each(function(){t(this).on({"click.timepicker":function(){t(this).select()},"keydown.timepicker":t.proxy(i.widgetKeydown,i)})}),this.setDefaultTime(this.defaultTime)},blurElement:function(){this.highlightedUnit=s,this.updateFromElementVal()},decrementHour:function(){if(this.showMeridian)if(1===this.hour)this.hour=12;else{if(12===this.hour)return this.hour--,this.toggleMeridian();if(0===this.hour)return this.hour=11,this.toggleMeridian();this.hour--}else 0===this.hour?this.hour=23:this.hour--;this.update()},decrementMinute:function(t){var i;i=t?this.minute-t:this.minute-this.minuteStep,0>i?(this.decrementHour(),this.minute=i+60):this.minute=i,this.update()},decrementSecond:function(){var t=this.second-this.secondStep;0>t?(this.decrementMinute(!0),this.second=t+60):this.second=t,this.update()},elementKeydown:function(t){switch(t.keyCode){case 9:switch(this.updateFromElementVal(),this.highlightedUnit){case"hour":t.preventDefault(),this.highlightNextUnit();break;case"minute":(this.showMeridian||this.showSeconds)&&(t.preventDefault(),this.highlightNextUnit());break;case"second":this.showMeridian&&(t.preventDefault(),this.highlightNextUnit())}break;case 27:this.updateFromElementVal();break;case 37:t.preventDefault(),this.highlightPrevUnit(),this.updateFromElementVal();break;case 38:switch(t.preventDefault(),this.highlightedUnit){case"hour":this.incrementHour(),this.highlightHour();break;case"minute":this.incrementMinute(),this.highlightMinute();break;case"second":this.incrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}break;case 39:t.preventDefault(),this.updateFromElementVal(),this.highlightNextUnit();break;case 40:switch(t.preventDefault(),this.highlightedUnit){case"hour":this.decrementHour(),this.highlightHour();break;case"minute":this.decrementMinute(),this.highlightMinute();break;case"second":this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}}},formatTime:function(t,i,e,s){return t=10>t?"0"+t:t,i=10>i?"0"+i:i,e=10>e?"0"+e:e,t+":"+i+(this.showSeconds?":"+e:"")+(this.showMeridian?" "+s:"")},getCursorPosition:function(){var t=this.$element.get(0);if("selectionStart"in t)return t.selectionStart;if(e.selection){t.focus();var i=e.selection.createRange(),s=e.selection.createRange().text.length;return i.moveStart("character",-t.value.length),i.text.length-s}},getTemplate:function(){var t,i,e,s,h,n;switch(this.showInputs?(i='<input type="text" name="hour" class="bootstrap-timepicker-hour" maxlength="2"/>',e='<input type="text" name="minute" class="bootstrap-timepicker-minute" maxlength="2"/>',s='<input type="text" name="second" class="bootstrap-timepicker-second" maxlength="2"/>',h='<input type="text" name="meridian" class="bootstrap-timepicker-meridian" maxlength="2"/>'):(i='<span class="bootstrap-timepicker-hour"></span>',e='<span class="bootstrap-timepicker-minute"></span>',s='<span class="bootstrap-timepicker-second"></span>',h='<span class="bootstrap-timepicker-meridian"></span>'),n='<table><tr><td><a href="#" data-action="incrementHour"><i class="glyphicon glyphicon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><i class="glyphicon glyphicon-chevron-up"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="glyphicon glyphicon-chevron-up"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-up"></i></a></td>':"")+"</tr>"+"<tr>"+"<td>"+i+"</td> "+'<td class="separator">:</td>'+"<td>"+e+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+s+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+h+"</td>":"")+"</tr>"+"<tr>"+'<td><a href="#" data-action="decrementHour"><i class="glyphicon glyphicon-chevron-down"></i></a></td>'+'<td class="separator"></td>'+'<td><a href="#" data-action="decrementMinute"><i class="glyphicon glyphicon-chevron-down"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="glyphicon glyphicon-chevron-down"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-down"></i></a></td>':"")+"</tr>"+"</table>",this.template){case"modal":t='<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+(this.modalBackdrop?"true":"false")+'">'+'<div class="modal-header">'+'<a href="#" class="close" data-dismiss="modal">×</a>'+"<h3>Pick a Time</h3>"+"</div>"+'<div class="modal-content">'+n+"</div>"+'<div class="modal-footer">'+'<a href="#" class="btn btn-primary" data-dismiss="modal">OK</a>'+"</div>"+"</div>";break;case"dropdown":t='<div class="bootstrap-timepicker-widget dropdown-menu">'+n+"</div>"}return t},getTime:function(){return this.formatTime(this.hour,this.minute,this.second,this.meridian)},hideWidget:function(){this.isOpen!==!1&&(this.showInputs&&this.updateFromWidgetInputs(),this.$element.trigger({type:"hide.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),"modal"===this.template?this.$widget.modal("hide"):this.$widget.removeClass("open"),t(e).off("mousedown.timepicker"),this.isOpen=!1)},highlightUnit:function(){this.position=this.getCursorPosition(),this.position>=0&&2>=this.position?this.highlightHour():this.position>=3&&5>=this.position?this.highlightMinute():this.position>=6&&8>=this.position?this.showSeconds?this.highlightSecond():this.highlightMeridian():this.position>=9&&11>=this.position&&this.highlightMeridian()},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":this.showSeconds?this.highlightSecond():this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"second":this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"meridian":this.highlightHour()}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMeridian();break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":this.showSeconds?this.highlightSecond():this.highlightMinute()}},highlightHour:function(){var t=this.$element.get(0);this.highlightedUnit="hour",t.setSelectionRange&&setTimeout(function(){t.setSelectionRange(0,2)},0)},highlightMinute:function(){var t=this.$element.get(0);this.highlightedUnit="minute",t.setSelectionRange&&setTimeout(function(){t.setSelectionRange(3,5)},0)},highlightSecond:function(){var t=this.$element.get(0);this.highlightedUnit="second",t.setSelectionRange&&setTimeout(function(){t.setSelectionRange(6,8)},0)},highlightMeridian:function(){var t=this.$element.get(0);this.highlightedUnit="meridian",t.setSelectionRange&&(this.showSeconds?setTimeout(function(){t.setSelectionRange(9,11)},0):setTimeout(function(){t.setSelectionRange(6,8)},0))},incrementHour:function(){if(this.showMeridian){if(11===this.hour)return this.hour++,this.toggleMeridian();12===this.hour&&(this.hour=0)}return 23===this.hour?(this.hour=0,s):(this.hour++,this.update(),s)},incrementMinute:function(t){var i;i=t?this.minute+t:this.minute+this.minuteStep-this.minute%this.minuteStep,i>59?(this.incrementHour(),this.minute=i-60):this.minute=i,this.update()},incrementSecond:function(){var t=this.second+this.secondStep-this.second%this.secondStep;t>59?(this.incrementMinute(!0),this.second=t-60):this.second=t,this.update()},remove:function(){t("document").off(".timepicker"),this.$widget&&this.$widget.remove(),delete this.$element.data().timepicker},setDefaultTime:function(t){if(this.$element.val())this.updateFromElementVal();else if("current"===t){var i=new Date,e=i.getHours(),s=Math.floor(i.getMinutes()/this.minuteStep)*this.minuteStep,h=Math.floor(i.getSeconds()/this.secondStep)*this.secondStep,n="AM";this.showMeridian&&(0===e?e=12:e>=12?(e>12&&(e-=12),n="PM"):n="AM"),this.hour=e,this.minute=s,this.second=h,this.meridian=n,this.update()}else t===!1?(this.hour=0,this.minute=0,this.second=0,this.meridian="AM"):this.setTime(t)},setTime:function(t){var i,e;this.showMeridian?(i=t.split(" "),e=i[0].split(":"),this.meridian=i[1]):e=t.split(":"),this.hour=parseInt(e[0],10),this.minute=parseInt(e[1],10),this.second=parseInt(e[2],10),isNaN(this.hour)&&(this.hour=0),isNaN(this.minute)&&(this.minute=0),this.showMeridian?(this.hour>12?this.hour=12:1>this.hour&&(this.hour=12),"am"===this.meridian||"a"===this.meridian?this.meridian="AM":("pm"===this.meridian||"p"===this.meridian)&&(this.meridian="PM"),"AM"!==this.meridian&&"PM"!==this.meridian&&(this.meridian="AM")):this.hour>=24?this.hour=23:0>this.hour&&(this.hour=0),0>this.minute?this.minute=0:this.minute>=60&&(this.minute=59),this.showSeconds&&(isNaN(this.second)?this.second=0:0>this.second?this.second=0:this.second>=60&&(this.second=59)),this.update()},showWidget:function(){if(!this.isOpen&&!this.$element.is(":disabled")){var i=this;t(e).on("mousedown.timepicker",function(e){0===t(e.target).closest(".bootstrap-timepicker-widget").length&&i.hideWidget()}),this.$element.trigger({type:"show.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),this.disableFocus&&this.$element.blur(),this.updateFromElementVal(),"modal"===this.template?this.$widget.modal("show").on("hidden",t.proxy(this.hideWidget,this)):this.isOpen===!1&&this.$widget.addClass("open"),this.isOpen=!0}},toggleMeridian:function(){this.meridian="AM"===this.meridian?"PM":"AM",this.update()},update:function(){this.$element.trigger({type:"changeTime.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),this.updateElement(),this.updateWidget()},updateElement:function(){this.$element.val(this.getTime()).change()},updateFromElementVal:function(){var t=this.$element.val();t&&this.setTime(t)},updateWidget:function(){if(this.$widget!==!1){var t=10>this.hour?"0"+this.hour:this.hour,i=10>this.minute?"0"+this.minute:this.minute,e=10>this.second?"0"+this.second:this.second;this.showInputs?(this.$widget.find("input.bootstrap-timepicker-hour").val(t),this.$widget.find("input.bootstrap-timepicker-minute").val(i),this.showSeconds&&this.$widget.find("input.bootstrap-timepicker-second").val(e),this.showMeridian&&this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)):(this.$widget.find("span.bootstrap-timepicker-hour").text(t),this.$widget.find("span.bootstrap-timepicker-minute").text(i),this.showSeconds&&this.$widget.find("span.bootstrap-timepicker-second").text(e),this.showMeridian&&this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))}},updateFromWidgetInputs:function(){if(this.$widget!==!1){var i=t("input.bootstrap-timepicker-hour",this.$widget).val()+":"+t("input.bootstrap-timepicker-minute",this.$widget).val()+(this.showSeconds?":"+t("input.bootstrap-timepicker-second",this.$widget).val():"")+(this.showMeridian?" "+t("input.bootstrap-timepicker-meridian",this.$widget).val():"");this.setTime(i)}},widgetClick:function(i){i.stopPropagation(),i.preventDefault();var e=t(i.target).closest("a").data("action");e&&this[e]()},widgetKeydown:function(i){var e=t(i.target).closest("input"),s=e.attr("name");switch(i.keyCode){case 9:if(this.showMeridian){if("meridian"===s)return this.hideWidget()}else if(this.showSeconds){if("second"===s)return this.hideWidget()}else if("minute"===s)return this.hideWidget();this.updateFromWidgetInputs();break;case 27:this.hideWidget();break;case 38:switch(i.preventDefault(),s){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}break;case 40:switch(i.preventDefault(),s){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}}}},t.fn.timepicker=function(i){var e=Array.apply(null,arguments);return e.shift(),this.each(function(){var s=t(this),n=s.data("timepicker"),o="object"==typeof i&&i;n||s.data("timepicker",n=new h(this,t.extend({},t.fn.timepicker.defaults,o,t(this).data()))),"string"==typeof i&&n[i].apply(n,e)})},t.fn.timepicker.defaults={defaultTime:"current",disableFocus:!1,isOpen:!1,minuteStep:15,modalBackdrop:!1,secondStep:15,showSeconds:!1,showInputs:!0,showMeridian:!0,template:"dropdown",appendWidgetTo:".bootstrap-timepicker"},t.fn.timepicker.Constructor=h})(jQuery,window,document);