angular.module('app.core.prosys', [])
    .factory('prosys', ['utils', 'ngDialog', 'settings', '$sce', 'toastr', '$location', '$ocLazyLoad',
        function(utils, ngDialog, settings, $sce, toastr, $location, $ocLazyLoad) {
            var sys = {
                getcusitm: function(cus_nbr, cus_item) {
                    var cusitm = {
                        cus_nbr: cus_nbr,
                        cus_item: cus_item
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/getcusitm",
                        data: cusitm,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                getcoin_per: function(coin_nbr) { //获取汇率
                    var bascoin = {
                        coin_nbr: coin_nbr
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/getcoinper",
                        data: bascoin,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                getohqty: function(ware_nbr, item_nbr, pro_nbr, unit) { //获取汇率
                    var invbal = {
                        ware_nbr: ware_nbr,
                        item_nbr: item_nbr,
                        pro_nbr: pro_nbr,
                        unit: unit
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/getohqty",
                        data: invbal,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                getsysvar: function(var_type, var_name) { //获取汇率
                    var sysvar = {
                        var_type: var_type,
                        var_name: var_name
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/getsysvar",
                        data: sysvar,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                f_shp_pri: function(nbrdate, cus_nbr, item_nbr, pro_nbr, unit, coin_nbr) {
                    var cusitm = {
                        nbrdate: nbrdate,
                        cus_nbr: cus_nbr,
                        item_nbr: item_nbr,
                        pro_nbr: pro_nbr,
                        unit: unit,
                        coin_nbr: coin_nbr,
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/f_shp_pri",
                        data: cusitm,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                f_shp_cusitm: function(nbrdate, cus_nbr, item_nbr, pro_nbr, unit, coin_nbr) {
                    var cusitm = {
                        nbrdate: nbrdate,
                        cus_nbr: cus_nbr,
                        item_nbr: item_nbr,
                        pro_nbr: pro_nbr,
                        unit: unit,
                        coin_nbr: coin_nbr,
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/f_shp_cusitm",
                        data: cusitm,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                f_rec_pri: function(ven_nbr, item_nbr, pro_nbr, unit, coin_nbr) {
                    var venitm = {
                        ven_nbr: ven_nbr,
                        item_nbr: item_nbr,
                        pro_nbr: pro_nbr,
                        unit: unit,
                        coin_nbr: coin_nbr,
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/f_rec_pri",
                        data: venitm,
                        mockUrl: "bas/ven_itm/ven_itm.json"
                    })
                },

                getplanday: function() { //获预计交货日
                    var date = new Date();
                    date.setDate(date.getDate() + 30);
                    return new moment(date).format("YYYY-MM-DD hh:mm:ss")
                },
                getAcrmon: function(date) { //获取客户结帐月份
                    return new moment(date).format("YYYYMM")

                },
                getCusAcrmon: function(cus_nbr, date) { //获取客户结帐月份
                    var paras = {
                        cus_nbr: cus_nbr,
                        nbrdate: date
                    }
                    return utils.ajax({
                        method: "GET",
                        url: "bas/public/getcusacrmon",
                        params: paras,
                        mockUrl: "bas/bastype/cuscus.json"
                    })

                },
                getVenAcrmon: function(ven_nbr, date) { //获取客户结帐月份
                    var paras = {
                        ven_nbr: ven_nbr,
                        nbrdate: date
                    }
                    return utils.ajax({
                        method: "GET",
                        url: "bas/public/getvenacrmon",
                        params: paras,
                        mockUrl: "bas/bastype/cuscus.json"
                    })

                },
                calculateTax: function(tax_type, tot_amt, coin) { //获取客户结帐月份
                    var paras = {
                        tax_type: tax_type,
                        tot_amt: tot_amt,
                        coin: coin
                    }
                    return utils.ajax({
                        method: "GET",
                        url: "bas/public/calculateTax",
                        params: paras,
                        mockUrl: "bas/bastype/cuscus.json"
                    })

                },
                fact_um: function(item_nbr, pro_nbr, unit, t_unit) { //获取产品单位转换系数
                    var para = {
                        item_nbr: item_nbr,
                        pro_nbr: pro_nbr,
                        unit1: unit,
                        unit2: t_unit,
                    }
                    return utils.ajax({
                        method: "GET",
                        url: "bas/public/fact_um",
                        mockUrl: "bas/bastype/bastype.del.json",
                        params: para
                    })


                },
                get_acr: function(cus_nbr, acr_mon) {
                    var acrbal = {
                        cus_nbr: cus_nbr,
                        acr_mond: acr_mon
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/get_acr",
                        data: acrbal,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                get_acp: function(ven_nbr, acr_mon) {
                    var acpbal = {
                        ven_nbr: ven_nbr,
                        acr_mond: acr_mon
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "bas/public/get_acp",
                        data: acpbal,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },

                show_bom: function(assy_nbr, assy_pro, qty, isbottom, istop, ispur) {
                    var paras = {
                        assy_nbr: assy_nbr,
                        assy_pro: assy_pro,
                        qty: qty,
                        isbottom: isbottom,
                        istop: istop,
                        ispur: ispur
                    }
                    return utils.ajax({
                        method: "GET",
                        url: "bas/public/show_bom",
                        params: paras,
                        mockUrl: "bom/invbom/invbom.json"
                    })
                }

            }
            return sys;
        }
    ]);