module.exports = function(){
    
    var ua = navigator.userAgent.toLocaleLowerCase();

    if (ua.indexOf("ipad") > -1) {
        return 1;
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/getDeviceType.js
// module id = 10
// module chunks = 0