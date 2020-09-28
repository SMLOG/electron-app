module.exports = {

    // 返回一个数组中的最大值和最小值
    findMaxMin: function (arr) {
        if (arr.length == 0) {
            arr = [0];
        }
        var temp = arr.slice().filter(function(val){
            if (val != undefined && val != null && val != "") {
                return true;
            } else {
                return false;
            }
        });
        if (temp.length == 0) {
            temp = [0];
        }
        temp.sort(function (a, b) { 
            return a - b 
        });

        return {
            max: temp[temp.length - 1] / 1,
            min: temp[0] / 1
        }
    }
}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/arrayExtension.js
// module id = 3
// module chunks = 0