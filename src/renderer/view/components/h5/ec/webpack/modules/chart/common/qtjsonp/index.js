module.exports = function (pars, callback) {

    var url = pars.url;
    var cbname = pars.cbname;
    var params = pars.params;

    var arr = [];
    for (var k in params) {
        if (params.hasOwnProperty(k)) {
            arr.push(k + "=" + params[k])
        }
    }

    var fullurl = url + "?" + arr.join("&");

    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("charset", "utf-8");
    jsonpScript.setAttribute("src", fullurl);
    document.getElementsByTagName("head")[0].appendChild(jsonpScript)

    // console.log(cbname);
    window[cbname] = function (json) {
        callback(json)
        try {
            // document.getElementsByTagName("head")[0].removeChild(jsonpScript);
            // delete window[cbname];
        } catch (e) {
            window[cbname] = undefined;
        }
    };
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/qtjsonp/index.js
// module id = 16
// module chunks = 0