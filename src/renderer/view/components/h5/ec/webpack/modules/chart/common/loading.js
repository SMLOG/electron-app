
/**
 * 加载动画
 * @param {Object} par： 绘制动画的参数， 至少包含绘图的上下文和上下文的宽高
 */

var loading = function(par){
	this.par = par;
	
	this.cc = par.cc;
	this.w = par.width ;
	this.h = par.height;
	
	this.ani = null;
	
	this._init();
	
}

loading.prototype._init = function(){
	this.ing = false;			// 表示loading是否正在转动
	this.sstop = false;			// 是否启动了 stop 方法
	
	this.ri = 20;				// 内圆半径
	this.ro = 35;				// 外圆半径
	this.thicknes = 2;			// 粗细
	this.color = "#666666";		// 颜色
	this.fontsize = "16";
	this.count = 20;			// 数量
	this.flt = 0.15;
	this.filter = 0;
	this.x = this.w / 2;
	this.y = this.h * 0.4;
	this.txty = this.y + this.ro * 2;
	this.fps = 40;
	this.deg = 360 / this.count;
	this.i = 0;	
	this.txt = "loading...";
	
	this.cc.lineWidth = this.thicknes;
	this.cc.strokeStyle = this.color;
	
	for ( ; this.i < this.count ; this.i++) {
		this._drawOne(this.i * this.deg, this.filter);
	}
}


loading.prototype._drawOne = function(deg, filter){
	var td = Math.PI/180*deg;
	var flt = this.flt + (filter || 0);
	this.cc.beginPath();
	this.cc.moveTo(Math.sin(td)* this.ri + this.x, Math.cos(td) * this.ri + this.y);
	this.cc.lineTo(Math.sin(td)* this.ro + this.x, Math.cos(td) * this.ro + this.y);
	this.cc.closePath();
	this.cc.stroke();
	this.cc.fillStyle = "rgba(255,255,255," + flt + ")";
	this.cc.fillRect(0,0,this.w,this.h);

	if (this.txt) {
		this.cc.save();
		this.cc.globalAlpha = 1;
		this.cc.fillStyle = this.color;
		this.cc.strokeStyle = "none";
		this.cc.font = "normal lighter 20px console";
		var txtw = this.cc.measureText(this.txt).width;
		this.cc.fillText(this.txt, this.x - txtw / 2 , this.txty);
		this.cc.restore();
	}

}


loading.prototype.start = function(){
	var _this = this;
	this.ing = true;
	
	this.ani = setInterval(function(){
		_this._drawOne(_this.i * _this.deg, _this.filter);
		_this.i++;
		if (_this.sstop) {
			_this.filter += 0.05;
			if (_this.filter > 0.9) {
				clearInterval(_this.ani);
				_this.ing = false;
				_this.callback();
			}
		}
	}, _this.fps);
}

loading.prototype.stop = function(callback){
	var _this = this;
	this.callback = callback || function(){};
	this.sstop = true;
}

loading.prototype.log = function(txt){
	
}


module.exports = loading;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/loading.js
// module id = 24
// module chunks = 0