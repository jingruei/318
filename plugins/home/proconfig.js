angular.module('app.core.proconfig', [])
    .factory('proconfig', ['utils', 'ngDialog', 'settings', '$sce',
        function(utils, ngDialog, settings, $sce) {
            return {
                lov: {
                    getenterprise: {
                        title: "企业查询",
                        queryUrl: "base/enterprise/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "eid",
                            nameField: "cname"
                        }
                    },
                    getwar: {
                        title: "仓库查询",
                        queryUrl: "bas/baswar/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "ware_nbr",
                            nameField: "ware_desc"
                        }
                    },
                    getunit: {
                        title: "单位查询",
                        queryUrl: "bas/basun/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "unit",
                            nameField: "un_desc"
                        }
                    },
                    getuns: {
                        title: "获取单位",
                        queryUrl: "bas/basuns/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        lovfilter: [
                            { field: "item_nbr", modelfield: "item_nbr" },
                            { field: "pro_nbr", modelfield: "pro_nbr" }
                        ],
                        showField: { //速查基本栏位
                            valueField: "unit",
                            nameField: "un_desc",
                        }
                    },
                    getpro: {
                        title: "制程查询",
                        queryUrl: "bas/baspro/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "pro_nbr",
                            nameField: "pro_desc"
                        }
                    },
                    getinvpro: {
                        title: "料品制程查询",
                        queryUrl: "bas/invpps/invpro", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        lovfilter: [
                            { field: "item_nbr", modelfield: "item_nbr" }
                        ],
                        showField: { //速查基本栏位
                            valueField: "pro_nbr",
                            nameField: "pro_desc"
                        }
                    },
                    getword: {
                        title: "业务性质查询",
                        queryUrl: "bas/basword/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "shp_desc",
                            nameField: "shp_desc"
                        }
                    },
                    getare: {
                        title: "地区查询",
                        queryUrl: "bas/basare/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "area_nbr",
                            nameField: "area_desc"
                        }
                    },
                    gettax: {
                        title: "税别查询",
                        queryUrl: "bas/bastax/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "tax_type",
                            nameField: "tax_desc"
                        }
                    },
                    getpay: {
                        title: "付款方式查询",
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        titleMap: [
                            { value: "1", name: "票据" },
                            { value: "2", name: "现金" }
                        ],
                        showField: { //速查基本栏位
                            valueField: "value",
                            nameField: "name"
                        }
                    },
                    getcoin: {
                        title: "币别查询",
                        queryUrl: "bas/bascoin/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "coin_nbr",
                            nameField: "coin_desc"
                        }
                    },
                    getmtype: {
                        title: "类别查询",
                        queryUrl: "bas/bastype/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "m_type",
                            nameField: "type_desc"
                        }
                    },
                    getitm: {
                        title: "产品查询",
                        queryUrl: "bas/invitm/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "item_nbr",
                            nameField: "item_nbr",
                            smallField: "item_name"
                        },
                        dialogConfig: "getitm"
                    },
                    getven: {
                        title: "厂商查询",
                        queryUrl: "bas/purven/query", //查询地址
                        initLoad: true, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "ven_nbr",
                            nameField: "ven_alias"
                        },
                        dialogConfig: "getven"

                    },
                    getcus: {
                        title: "客户查询",
                        queryUrl: "bas/cuscus/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "cus_nbr",
                            nameField: "cus_nbr",
                            smallField: "cus_alias"
                        },
                        dialogConfig: "getcus",

                    },
                    getbank: {
                        title: "银行查询",
                        queryUrl: "chk/basbank/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "b_nbr",
                            nameField: "b_name",
                            smallField: "b_nbr"
                        },
                        dialogConfig: "getbank"

                    }
                },
                dialog: {
                    getitm: {
                        title: "料品资料",
                        ngdialogSize: "ngdialog-md", //视窗大小 ngdialog-xs 特小 ngdialog-sm 小,ngdialog-md 大,ngdialog-lg特大
                        queryUrl: "bas/invitm/query", //查询地址
                        headers: {
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },

                            "item_name": {
                                displayName: "产品名称",
                                width: 120
                            },

                            "item_alias": {
                                displayName: "产品简称",
                                width: 120
                            },
                            "item_desc": {
                                displayName: "产品规格",
                                width: 120
                            },
                            "big_key": {
                                displayName: "译音码",
                                width: 120
                            },
                            "q_code": {
                                displayName: "查询码",
                                width: 120
                            },
                            "eng_name": {
                                displayName: "英文说明",
                                width: 120
                            },
                            "safety_qty": {
                                displayName: "安全存量",
                                width: 120
                            }
                        },
                        filterItems: {
                            item_nbr: {
                                type: "input",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            big_key: {
                                type: "input",
                                name: "big_key",
                                label: "译音码"
                            },
                            q_code: {
                                type: "input",
                                name: "q_code",
                                label: "查询码"
                            },
                            item_name: {
                                type: "input",
                                name: "item_name",
                                label: "产品名称"
                            },
                            item_alias: {
                                type: "input",
                                name: "item_alias",
                                label: "产品简称"
                            },
                            item_desc: {
                                type: "input",
                                name: "item_desc",
                                label: "品名规格"
                            },
                            eng_name: {
                                type: "input",
                                name: "eng_name",
                                label: "英文说明"
                            }
                        }

                    },
                    getven: {
                        title: "厂商资料",
                        queryUrl: "bas/purven/query", //查询地址
                        ngdialogSize: "ngdialog-md", //视窗大小 ngdialog-xs 特小 ngdialog-sm 小,ngdialog-md 大,ngdialog-lg特大
                        headers: {
                            "ven_nbr": {
                                displayName: "厂商编号",
                                width: 120
                            },
                            "big_key": {
                                displayName: "译音码",
                                width: 120
                            },
                            "ven_alias": {
                                displayName: "厂商简称",
                                width: 120
                            },
                            "ven_name": {
                                displayName: "厂商名称",
                                width: 120
                            },
                            "ven_addr": {
                                displayName: "公司地址",
                                width: 120
                            },
                            "sen_addr": {
                                displayName: "工厂地址",
                                width: 120
                            },
                            "ven_gun": {
                                displayName: "统一编号",
                                width: 120
                            },
                            "ven_tel1": {
                                displayName: "厂商电话1",
                                width: 120
                            },
                            "ven_fax": {
                                displayName: "传真机号码",
                                width: 120
                            },
                            "staffs": {
                                displayName: "员工人数",
                                width: 120
                            },
                            "attname": {
                                displayName: "负责人",
                                width: 120
                            }
                        },
                        filterItems: {
                            ven_nbr: {
                                type: "input",
                                name: "ven_nbr",
                                label: "厂商编号"
                            },
                            ven_alias: {
                                type: "input",
                                name: "ven_alias$match",
                                label: "厂商简称"
                            },
                            ven_name: {
                                type: "input",
                                name: "ven_name",
                                label: "厂商名称"
                            },
                            sen_addr: {
                                type: "input",
                                name: "sen_addr",
                                label: "工厂地址"
                            },
                            ven_gun: {
                                type: "input",
                                name: "ven_gun",
                                label: "统一编号"
                            },
                            attname: {
                                type: "input",
                                name: "attname",
                                label: "负责人"
                            }
                        }
                    },
                    getcus: {
                        title: "客户资料",
                        queryUrl: "bas/cuscus/query", //查询地址
                        ngdialogSize: "ngdialog-md", //视窗大小 ngdialog-xs 特小 ngdialog-sm 小,ngdialog-md 大,ngdialog-lg特大
                        headers: {
                            "cus_nbr": {
                                displayName: "客商编号",
                                width: 120
                            },
                            "big_key": {
                                displayName: "译音码",
                                width: 120
                            },
                            "cus_alias": {
                                displayName: "客商简称",
                                width: 120
                            },
                            "cus_name": {
                                displayName: "客商名称",
                                width: 120
                            },
                            "cus_addr": {
                                displayName: "公司地址",
                                width: 120
                            },
                            "sen_addr": {
                                displayName: "工厂地址",
                                width: 120
                            },
                            "cus_gun": {
                                displayName: "统一编号",
                                width: 120
                            },
                            "cus_tel1": {
                                displayName: "客商电话1",
                                width: 120
                            },
                            "cus_fax": {
                                displayName: "传真机号码",
                                width: 120
                            },
                            "staffs": {
                                displayName: "员工人数",
                                width: 120
                            },
                            "attname": {
                                displayName: "负责人",
                                width: 120
                            }
                        },
                        filterItems: {
                            cus_nbr: {
                                type: "input",
                                name: "cus_nbr",
                                label: "客商编号"
                            },
                            cus_alias: {
                                type: "input",
                                name: "cus_alias",
                                label: "客商简称"
                            },
                            cus_name: {
                                type: "input",
                                name: "cus_name",
                                label: "客商名称"
                            },
                            sen_addr: {
                                type: "input",
                                name: "sen_addr",
                                label: "工厂地址"
                            },
                            cus_gun: {
                                type: "input",
                                name: "cus_gun",
                                label: "统一编号"
                            },
                            attname: {
                                type: "input",
                                name: "attname",
                                label: "负责人"
                            }
                        }
                    },
                    getbank: {
                        title: "银行资料",
                        queryUrl: "chk/basbank/query", //查询地址
                        ngdialogSize: "ngdialog-md", //视窗大小 ngdialog-xs 特小 ngdialog-sm 小,ngdialog-md 大,ngdialog-lg特大
                        headers: {
                            "b_nbr": {
                                displayName: "银行代号",
                                width: 120
                            },
                            "b_name": {
                                displayName: "银行名称",
                                width: 120
                            },
                            "b_alias": {
                                displayName: "银行简称",
                                width: 120
                            },
                            "eng_name": {
                                displayName: "英文名称",
                                width: 120
                            },
                            "nbrdate": {
                                displayName: "开帐日期",
                                width: 120
                            },
                            "b_code": {
                                displayName: "银行帐号",
                                width: 120
                            },
                            "b_amt": {
                                displayName: "开帐金额",
                                width: 120
                            },
                            "addr_e": {
                                displayName: "英文地址",
                                width: 120
                            },
                            "b_addr": {
                                displayName: "银行地址",
                                width: 120
                            },
                            "b_tel1": {
                                displayName: "银行电话1",
                                width: 120
                            },
                            "bal_amt": {
                                displayName: "余额",
                                width: 120
                            },
                            "acc_id": {
                                displayName: "会计科目",
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            },
                            "b_fax": {
                                displayName: "传真机号码",
                                width: 120
                            }
                        },
                        filterItems: {
                            b_nbr: {
                                type: "input",
                                lovtype: "",
                                name: "b_nbr",
                                label: "银行代号"
                            },
                            b_name: {
                                type: "input",
                                lovtype: "",
                                name: "b_name",
                                label: "银行名称"
                            },
                            b_alias: {
                                type: "input",
                                lovtype: "",
                                name: "b_alias",
                                label: "银行简称"
                            },
                            b_code: {
                                type: "input",
                                lovtype: "",
                                name: "b_code",
                                label: "银行帐号"
                            }
                        }
                    },
                    getquobat: {
                        title: "报价资料",
                        queryUrl: "ord/quobat/readquo", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "cus_item": {
                                displayName: "客户产品编号",
                                summsg: {
                                    auto: false,
                                    sumval: "合计"
                                },
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_alias": {
                                displayName: "产品简称",
                                width: 120
                            },
                            "unit": {
                                displayName: "单位",
                                width: 120
                            },
                            "un_desc": {
                                displayName: "单位名称",
                                width: 120
                            },
                            "pro_desc": {
                                displayName: "制程名称",
                                width: 120
                            },
                            "unit_price": {
                                type: "basNumber",
                                displayName: "标准售价",
                                width: 120
                            },
                            "qty": {
                                type: "basNumber",
                                displayName: "数量",
                                summsg: {
                                    auto: true,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "c_price": {
                                type: "basNumber",
                                displayName: "币别单价",
                                width: 120
                            },
                            "cost": {
                                type: "basNumber",
                                displayName: "成本",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "qty_pbox": {
                                type: "basNumber",
                                displayName: "外箱",
                                type: "basNumber",
                                width: 120
                            },
                            "c_amt": {
                                displayName: "金额",
                                type: "basNumber",
                                summsg: {
                                    auto: true,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "g_wight": {
                                type: "basNumber",
                                displayName: "毛重",
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            },
                            "coin_desc": {
                                displayName: "币别",
                                width: 120
                            },
                            "n_wight": {
                                type: "basNumber",
                                displayName: "净重",
                                width: 120
                            },
                            "in_box": {
                                type: "basNumber",
                                displayName: "内盒",
                                width: 120
                            },
                            "over_date": {
                                displayName: "有效日期",
                                width: 120
                            },
                            "cut": {
                                type: "basNumber",
                                displayName: "折数",
                                width: 120
                            },
                            "nbr": {
                                displayName: "单据号码",
                                width: 120
                            }
                        },
                        filterItems: {
                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            cus_item: {
                                type: "basDefault",
                                lovtype: "",
                                name: "cus_item",
                                label: "客户产品编号"
                            }

                        },
                        readfilterItems: { //速查filter条件
                            cus_nbr: {
                                type: "basLov",
                                lovtype: "getcus",
                                name: "cus_nbr",
                                label: "客户代号"
                            },
                            coin_nbr: {
                                type: "basLov",
                                lovtype: "getcoin",
                                readonly: true,
                                name: "coin_nbr",
                                label: "币别"
                            }
                        }
                    },
                    getordbat: {
                        title: "订单资料",
                        queryUrl: "ord/ordbat/readord", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "plan_date": {
                                displayName: "预计出货",
                                width: 120
                            },

                            "nbr": {
                                displayName: "单据号码",
                                width: 120
                            },
                            "cus_item": {
                                displayName: "客户产品编号",
                                width: 120
                            },
                            "desc_no": {
                                displayName: "客户订单号",
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_alias": {
                                displayName: "产品简称",
                                width: 120
                            },
                            "un_desc": {
                                displayName: "单位名称",
                                width: 120
                            },
                            "pro_desc": {
                                displayName: "制程名称",
                                width: 120
                            },
                            "qty": {
                                type: "basNumber",
                                displayName: "数量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "ioqty": {
                                type: "basNumber",
                                displayName: "已出数量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },

                            "c_price": {
                                type: "basNumber",
                                displayName: "单价",
                                width: 120
                            },
                            "c_amt": {
                                displayName: "金额",
                                type: "basNumber",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            }


                        },
                        filterItems: {

                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            cus_item: {
                                type: "basDefault",
                                lovtype: "",
                                name: "cus_item",
                                label: "客户产品编号"
                            },
                            plan_date: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "plan_date",
                                label: "有效日期F"
                            },
                            plan_dateb: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "plan_dateb",
                                label: "有效日期T"
                            }
                        },
                        readfilterItems: { //速查filter条件
                            cus_nbr: {
                                type: "basLov",
                                lovtype: "getcus",
                                readonly: true,
                                name: "cus_nbr",
                                label: "客户代号"
                            },
                            coin_nbr: {
                                type: "basLov",
                                lovtype: "getcoin",
                                readonly: true,
                                name: "coin_nbr",
                                label: "币别"
                            }
                        }
                    },
                    getmakordbat: {
                        title: "订单资料",
                        queryUrl: "ord/ordbat/readord", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "plan_date": {
                                displayName: "预计出货",
                                width: 120
                            },

                            "nbr": {
                                displayName: "单据号码",
                                width: 120
                            },
                            "cus_item": {
                                displayName: "客户产品编号",
                                width: 120
                            },
                            "desc_no": {
                                displayName: "客户订单号",
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_alias": {
                                displayName: "产品简称",
                                width: 120
                            },
                            "un_desc": {
                                displayName: "单位名称",
                                width: 120
                            },
                            "pro_desc": {
                                displayName: "制程名称",
                                width: 120
                            },
                            "qty": {
                                type: "basNumber",
                                displayName: "数量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "mioqty": {
                                type: "basNumber",
                                displayName: "已生制造量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            }


                        },
                        filterItems: {
                            cus_nbr: {
                                type: "basLov",
                                lovtype: "getcus",
                                name: "cus_nbr",
                                label: "客户代号"
                            },
                            coin_nbr: {
                                type: "basLov",
                                lovtype: "getcoin",
                                name: "coin_nbr",
                                label: "币别"
                            },
                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            cus_item: {
                                type: "basDefault",
                                lovtype: "",
                                name: "cus_item",
                                label: "客户产品编号"
                            },
                            plan_date: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "plan_date",
                                label: "有效日期F"
                            },
                            plan_dateb: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "plan_dateb",
                                label: "有效日期T"
                            }
                        },

                    },
                    getpuobat: {
                        title: "询价资料",
                        queryUrl: "pur/puobat/readpuo", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "ven_nbr": {
                                displayName: "厂商代号",
                                summsg: {
                                    auto: false,
                                    sumval: "合计"
                                },
                                width: 120
                            },
                            "ven_alias": {
                                displayName: "厂商简称",
                                width: 120
                            },
                            "ven_item": {
                                displayName: "厂商产品编号",
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_alias": {
                                displayName: "产品简称",
                                width: 120
                            },
                            "unit": {
                                displayName: "单位",
                                width: 120
                            },
                            "un_desc": {
                                displayName: "单位名称",
                                width: 120
                            },
                            "pro_desc": {
                                displayName: "制程名称",
                                width: 120
                            },
                            "qty": {
                                type: "basNumber",
                                displayName: "数量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "c_price": {
                                type: "basNumber",
                                displayName: "币别单价",
                                width: 120
                            },
                            "c_amt": {
                                displayName: "金额",
                                type: "basNumber",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "over_date": {
                                displayName: "有效日期",
                                width: 120
                            },
                            "nbr": {
                                displayName: "单据号码",
                                width: 120
                            }
                        },
                        filterItems: {
                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            item_name: {
                                type: "basString",
                                name: "item_nbr",
                                label: "产品名称"
                            },
                            ven_item: {
                                type: "basDefault",
                                lovtype: "",
                                name: "ven_item",
                                label: "厂商产品编号"
                            }

                        },
                        readfilterItems: { //速查filter条件
                            ven_nbr: {
                                type: "basLov",
                                lovtype: "getven",
                                readonly: true,
                                name: "ven_nbr",
                                label: "厂商"
                            },
                            coin_nbr: {
                                type: "basLov",
                                lovtype: "getcoin",
                                readonly: true,
                                name: "coin_nbr",
                                label: "币别"
                            }
                        }
                    },
                    getpurbat: {
                        title: "采购资料",
                        queryUrl: "pur/purbat/readpur", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "plan_date": {
                                displayName: "预计交货日",
                                width: 120
                            },
                            "status": {
                                displayName: "状态",
                                type: "basLov",
                                lovtype: "select",
                                titleMap: [
                                    { value: "10", name: "未收料" },
                                    { value: "20", name: "收料中" },
                                    { value: "30", name: "已结案" },
                                    { value: "40", name: "手动结案" }
                                ],
                                width: 120
                            },
                            "nbr": {
                                displayName: "单据号码",
                                width: 120
                            },
                            "desc_no": {
                                displayName: "厂商订单号",
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_alias": {
                                displayName: "产品简称",
                                width: 120
                            },
                            "pro_desc": {
                                displayName: "制程名称",
                                width: 120
                            },
                            "un_desc": {
                                displayName: "单位",
                                width: 120
                            },
                            "qty": {
                                type: "number",
                                displayName: "数量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "t_un_desc": {
                                displayName: "计价单位",
                                width: 120
                            },
                            "t_qty": {
                                type: "number",
                                displayName: "计价数量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "c_price": {
                                type: "basNumber",
                                displayName: "币别单价",
                                width: 120
                            },
                            "c_amt": {
                                displayName: "金额",
                                type: "basNumber",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "ioqty": {
                                type: "basNumber",
                                displayName: "进货量",
                                summsg: {
                                    auto: false,
                                    sumval: 0
                                },
                                width: 120
                            },
                            "coin_desc": {
                                displayName: "币别",
                                width: 120
                            },
                            "in_box": {
                                type: "basNumber",
                                displayName: "内盒",
                                width: 120
                            },
                            "qty_pbox": {
                                type: "basNumber",
                                displayName: "外箱",
                                type: "basNumber",
                                width: 120
                            },
                            "n_wight": {
                                type: "basNumber",
                                displayName: "净重",
                                width: 120
                            },
                            "g_wight": {
                                type: "basNumber",
                                displayName: "毛重",
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            }

                        },
                        filterItems: {
                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            item_name: {
                                type: "basString",
                                name: "item_nbr",
                                label: "产品名称"
                            },
                            desc_no: {
                                type: "basDefault",
                                lovtype: "",
                                name: "desc_no",
                                label: "客户订单号"
                            }

                        },
                        readfilterItems: { //速查filter条件
                            ven_nbr: {
                                type: "basLov",
                                lovtype: "getven",
                                readonly: true,
                                name: "ven_nbr",
                                label: "厂商"
                            },
                            coin_nbr: {
                                type: "basLov",
                                lovtype: "getcoin",
                                readonly: true,
                                name: "coin_nbr",
                                label: "币别"
                            }
                        }
                    },
                    getmakbah: {
                        title: "读取生产单",
                        queryUrl: "mak/makbah/query", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "nbr": {
                                displayName: "生产单号",
                                width: 120
                            },
                            "status": {
                                displayName: "状态",
                                type: "basLov",
                                lovtype: "select",
                                titleMap: [
                                    { value: "10", name: "未生产" },
                                    { value: "20", name: "制造中" },
                                    { value: "30", name: "已完工" }
                                ],
                                width: 120
                            },
                            "nbrdate": {
                                displayName: "生产日期",
                                width: 120
                            },
                            "desc_no": {
                                displayName: "客户订单号",
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_name": {
                                displayName: "产品名称",
                                width: 120
                            },
                            "item_desc": {
                                displayName: "产品规格",
                                width: 120
                            },
                            "qty": {
                                displayName: "数量",
                                width: 120
                            },
                            "ord_nbr": {
                                displayName: "订单编号",
                                width: 120
                            },
                            "plan_date": {
                                displayName: "预计完工日",
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            }
                        },
                        filterItems: {
                            desc_no: {
                                type: "basDefault",
                                lovtype: "",
                                name: "desc_no",
                                label: "客户订单编号"
                            },
                            ord_nbr: {
                                type: "basDefault",
                                lovtype: "",
                                name: "ord_nbr",
                                label: "订单编号"
                            },
                            nbr: {
                                type: "basDefault",
                                lovtype: "",
                                name: "nbr",
                                label: "生产单号"
                            },
                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            nbrdate: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "nbrdate",
                                label: "生产日期F"
                            },
                            nbrdateb: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "nbrdateb",
                                label: "生产日期T"
                            }
                        }

                    },
                    getmakbahtra: {
                        title: "读取生产单",
                        queryUrl: "mak/makbah/query", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "nbr": {
                                displayName: "生产单号",
                                width: 120
                            },
                            "status": {
                                displayName: "状态",
                                type: "basLov",
                                lovtype: "select",
                                titleMap: [
                                    { value: "10", name: "未生产" },
                                    { value: "20", name: "制造中" },
                                    { value: "30", name: "已完工" }
                                ],
                                width: 120
                            },
                            "nbrdate": {
                                displayName: "生产日期",
                                width: 120
                            },
                            "desc_no": {
                                displayName: "客户订单号",
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_name": {
                                displayName: "产品名称",
                                width: 120
                            },
                            "item_desc": {
                                displayName: "产品规格",
                                width: 120
                            },
                            "qty": {
                                displayName: "数量",
                                width: 120
                            },
                            "tra_qty": {
                                displayName: "已入库量",
                                width: 120
                            },
                            "itra_qty": {
                                displayName: "未入库量",
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            }
                        },
                        filterItems: {
                            desc_no: {
                                type: "basDefault",
                                lovtype: "",
                                name: "desc_no",
                                label: "客户订单编号"
                            },
                            ord_nbr: {
                                type: "basDefault",
                                lovtype: "",
                                name: "ord_nbr",
                                label: "订单编号"
                            },
                            nbr: {
                                type: "basDefault",
                                lovtype: "",
                                name: "nbr",
                                label: "生产单号"
                            },
                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            nbrdate: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "nbrdate",
                                label: "生产日期F"
                            },
                            nbrdateb: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "nbrdateb",
                                label: "生产日期T"
                            }
                        }

                    },
                    getmakbat: {
                        title: "读取生产明细",
                        queryUrl: "mak/makbat/query", //查询地址 --accountv
                        ngdialogSize: "ngdialog-lg",
                        headers: {
                            "nbr": {
                                displayName: "生产单号",
                                width: 120
                            },
                            "ord_nbr": {
                                displayName: "订单单据号",
                                width: 120
                            },
                            "desc_no": {
                                displayName: "客户订单号",
                                width: 120
                            },
                            "item_nbr": {
                                displayName: "产品编号",
                                width: 120
                            },
                            "item_name": {
                                displayName: "产品名称",
                                width: 120
                            },
                            "pro_desc": {
                                displayName: "工序说明",
                                width: 120
                            },
                            "qty": {
                                displayName: "制令数量",
                                width: 120
                            },
                            "pro_qty": {
                                displayName: "工序数量",
                                width: 120
                            },
                            "ipro_qty": {
                                displayName: "已完工量",
                                width: 120
                            },
                            "com_qty": {
                                displayName: "未完工量",
                                width: 120
                            },
                            "plan_date": {
                                displayName: "预计出货日",
                                width: 120
                            },
                            "remark": {
                                displayName: "备注",
                                width: 120
                            }
                        },
                        filterItems: {
                            nbr: {
                                type: "input",
                                lovtype: "",
                                name: "nbr",
                                label: "单据号码"
                            },
                            ord_nbr: {
                                type: "input",
                                lovtype: "",
                                name: "ord_nbr",
                                label: "订单单据号码"
                            },
                            desc_no: {
                                type: "input",
                                lovtype: "",
                                name: "desc_no",
                                label: "客户订单号码"
                            },
                            item_nbr: {
                                type: "basLov",
                                lovtype: "getitm",
                                name: "item_nbr",
                                label: "产品编号"
                            },
                            pro_nbr: {
                                type: "basLov",
                                lovtype: "getpro",
                                name: "pro_nbr",
                                label: "工序"
                            },
                            hnbrdate: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "hnbrdate",
                                label: "生产日期F"
                            },
                            hnbrdateb: {
                                type: "basEsydatetime",
                                lovtype: "",
                                name: "hnbrdateb",
                                label: "生产日期T"
                            },
                            remark: {
                                type: "input",
                                lovtype: "",
                                name: "remark",
                                label: "备注"
                            }
                        }

                    }
                }




            }
        }
    ]);