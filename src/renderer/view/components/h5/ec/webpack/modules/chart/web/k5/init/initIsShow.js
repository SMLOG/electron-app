module.exports = function(){
    var split2 = this.options.split2;
    // 不显示缩略图
    if (this.options.show.minimap == false) {
        split2 = {
            k: {
                marginTop: "auto",
                paddingTop: "none",
                body: 0.6,
                marginBottom: "auto",
                top: 0,
                x: 10,
                y: 8
            },
            trading: {
                marginTop: "none",
                paddingTop: "auto",
                body: 0.2,
                marginBottom: "none",
                top: 0.6,
                x: 10,
                y: 3
            },
            index: {
                marginTop: "none",
                marginBottom: "auto",
                paddingTop: "auto",
                paddingBottom: "auto",
                body: 0.2,
                top: 0.8,
                x: 10,
                y: 2
            },
            minimap: {
                marginTop: "none",
                paddingTop: "none",
                body: 0,
                marginBottom: "none",
                top: 0,
                x: 10,
                y: 1
            }
        };
    }


    if (this.options.show.index == false) {
        split2 = {
            k: {
                marginTop: "auto",
                paddingTop: "none",
                body: 0.65,
                marginBottom: "auto",
                top: 0,
                x: 10,
                y: 8
            },
            trading: {
                marginTop: "none",
                paddingTop: "auto",
                body: 0.25,
                marginBottom: "none",
                top: 0.65,
                x: 10,
                y: 3
            },
            index: {
                marginTop: "none",
                marginBottom: "none",
                paddingTop: "auto",
                paddingBottom: "none",
                body: 0,
                top: 0,
                x: 10,
                y: 2
            },
            minimap: {
                marginTop: "none",
                paddingTop: "none",
                body: 0.1,
                marginBottom: "none",
                top: 0.9,
                x: 10,
                y: 1
            }
        };
    }

    if (this.options.show.index == false && this.options.show.minimap == false) {
        split2 = {
            k: {
                marginTop: "auto",
                paddingTop: "none",
                body: 0.7,
                marginBottom: "auto",
                top: 0,
                x: 10,
                y: 8
            },
            trading: {
                marginTop: "none",
                marginBottom: "auto",
                paddingTop: "auto",
                body: 0.3,
                top: 0.7,
                x: 10,
                y: 3
            },
            index: {
                marginTop: "none",
                marginBottom: "none",
                paddingTop: "auto",
                paddingBottom: "none",
                body: 0,
                top: 0,
                x: 10,
                y: 2
            },
            minimap: {
                marginTop: "none",
                paddingTop: "none",
                body: 0,
                marginBottom: "none",
                top: 0,
                x: 10,
                y: 1
            }
        };
    }

    this.options.split2 = split2;
}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k5/init/initIsShow.js
// module id = 236
// module chunks = 0