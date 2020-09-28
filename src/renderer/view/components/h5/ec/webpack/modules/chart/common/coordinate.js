/**
 * 坐标相关
 */

module.exports = {

    /**
     * 格式化坐标，使之出现0.5
     * 进行四舍五入， 舍就+0.5， 入就-0.5
     */
    format: function(num){
        var num2 = Math.round(num);
        if (num2 < num) {
            return num2 + 0.5;
        } else {
            return num2 - 0.5;
        }
    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/coordinate.js
// module id = 2
// module chunks = 0