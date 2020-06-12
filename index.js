(function() {
    var settings = {
        host: 'https://localhost:5001', //當前API調用的主機頭 http://211.78.333.22
        // host: 'http://211.72.117.90', //當前API調用的主機頭 http://211.78.333.22
        mock: false, //如果是mock狀態則API調取得靜態的目錄data下的json
        debug: false, //如啟用debug 則服務log 輸出日志
        apiPrefix: "api", //api調用的地址前綴
        language: 'zh-TW', //當前語言的設定
        pageSize: 30, //分頁默認大小,
        uiGrid: {
            enableGridMenu: true, //啟用表格菜單
            exporterMenuCsv: true, //啟用導出CSV的菜單
            exporterMenuPdf: false, //啟用導出PDF的菜單
            enablePaginationControls: true, //啟用表格自帶的分頁控件
            enableFiltering: false, //啟用表格內的查詢過濾輸入框
            enableRowHeaderSelection: true, //啟用左側選擇欄
            exporterOlderExcelCompatibility: true, //導出兼容舊版本excel的格式
            useExternalPagination: true, //使用服務端分頁,
            paginationPageSizes: [30, 60, 90], //表格分頁頁大小選項
            paginationPageSize: 30, //表格分頁頁大小
            minRowsToShow: 12,
            rowHeight: 28,
            virtualizationThreshold: 1000 //虛擬化閾值
        },
        company: {
            logoTitle: "JW",
            comAlias: "喬偉資訊"
        },
        ui: {
            openWithTabs: !window.noTabs && true, //默認打開方式為tab  
            toolbar: !window.noToolbar && false //默認有toolbar  
        },
        logo: "plugins/home/assets/images/logo.png",
        logoTitle: "JW",
        otherwise: 'home',
        templates: {},
        plugins: {},
        components: {},
        queryFormComponents: {},
        schemaFormComponents: {},
        pluginDefaultName: '$default',
        getByAttIdUrl: "/base/attachment/getByAttId",
        getallByAttIdUrl: "/base/attachment/getallByAttId",
        uploadUrl: "/base/attachment/upload",
        downloadUrl: "/base/attachment/download",
        getUuid: "/base/attachment/getUuid",
        delByUid: "/base/attachment/"
    };

    settings.templates = {
        'masterPage': `plugins/home${settings.ui.openWithTabs ? '/pages/master.tabs.html' : '/pages/master.html'}`, //根布局母模版
        'login': `plugins/home/pages/login.html`, //登錄頁面模版
        'home': `plugins/home${settings.ui.openWithTabs ? '/pages/tabs.html' : '/pages/home.html'}` //首頁
    };

    $(document).attr("title", settings.company.comAlias);
    if (window.UEDITOR_CONFIG) {
        var rootUrl = '';
        var selfHost = location.protocol + "//" + location.host;
        var host = settings.host == "self" ? selfHost : settings.host;
        if (settings.apiPrefix) {
            rootUrl = [host, settings.apiPrefix].join('/');
        } else {
            rootUrl = host;
        }
        window.UEDITOR_CONFIG.serverUrl = [rootUrl, "controller.jsp"].join('/');
    }


    var selfHost = location.protocol + "//" + location.host;
    var host = settings.host == "self" ? selfHost : settings.host;
    if (settings.apiPrefix) {
        settings.rootUrl = [host, settings.apiPrefix].join('/');
    } else {
        settings.rootUrl = host;
    }

    application.bootstrap(settings);
}());