module.exports = {
    getParam: function (name) {
        var urlpara = location.search;
        var par = {};
        if (urlpara != "") {
            urlpara = urlpara.substring(1, urlpara.length);
            var para = urlpara.split("&");
            var parname;
            var parvalue;
            for (var i = 0; i < para.length; i++) {
                parname = para[i].substring(0, para[i].indexOf("="));
                parvalue = para[i].substring(para[i].indexOf("=") + 1, para[i].length);
                par[parname] = parvalue;
            }
        }
        if (typeof (par[name]) != "undefined") {
            return par[name];
        } else {
            return null;
        }
    }
}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/query.js
// module id = 92
// module chunks = 0