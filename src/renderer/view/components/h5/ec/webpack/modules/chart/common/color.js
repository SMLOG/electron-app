/**
 * 颜色运算
 */
;
var color = {
	
	/**
	 * 对颜色进行一个等级调整
	 * @param {String} color: 一个将要调整的颜色
	 * @param {int} num： 调整的等级数量(正数往亮调整，负数往暗调整)
	 * return 返回调后的颜色
	 *  注意：当颜色超过ffffff时，全部返回ffffff
	 * 
	 * eg: rank("#666666", 1); 		// 返回  "#777777"
	 * eg: rank("#456789", -2);		// 返回  "#234567"
	 */
	rank: function(color, num){
		if (!color) {
			return "";
		}
		
		var colorarray = color.split('');
		for (var i = 1; i < colorarray.length; i++) {
			var temp = parseInt(colorarray[i], 16) + 1 * num;
			if (temp < 16) {
				colorarray[i] = temp.toString(16);
			} else {
				colorarray[i] = "F";
			}
		}
		return colorarray.join('');
	},
	
	/**
	 * 同 rank，这个转换的是一个数组，仅支持一纬数组
	 * @param {Array} arr
	 * @param {int} num
	 */
	ranks: function(arr, num){
		var rarr = [];
		for (var i = 0 , len = arr.length ; i < len ; i++) {
			var colorarray = arr[i].split('');
			for (var j = 1; j < colorarray.length; j++) {
				var temp = parseInt(colorarray[j], 16) + 1 * num;
				if (temp < 16) {
					colorarray[j] = temp.toString(16);
				} else {
					colorarray[j] = "F";
				}
			}
			rarr.push(colorarray.join(""));
		}
		
		return rarr;
	},



	toRGBA: function(color, alpha){  
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;  
		var sColor = color;  
		if(sColor && reg.test(sColor)){  
			if(sColor.length === 4){  
				var sColorNew = "#";  
				for(var i=1; i<4; i+=1){  
					sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
				}  
				sColor = sColorNew;  
			}  
			//处理六位的颜色值  
			var sColorChange = [];  
			for(var i=1; i<7; i+=2){  
				sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
			}  
			return "RGBA(" + sColorChange.join(",") + "," + (alpha || 1) + ")";  
		}else{  
			return sColor;    
		}  
	}
	
};

module.exports = color;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/color.js
// module id = 21
// module chunks = 0