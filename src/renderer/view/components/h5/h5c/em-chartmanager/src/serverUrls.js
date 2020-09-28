
module.exports = {
    /**
     * emcharts CDN地址
     */
    emchartscdn: (function (env) {
        return env === 'production' ? '//hqres.eastmoney.com/emcharts/v3/lts/emcharts.min.js' : '//172.16.58.95/emchart_test/EMCharts3/bundle/emcharts.js';
    })(window.environment),
    /**
     * 行情图数据
     */
    chartDataUrl: '//pdfm.eastmoney.com/EM_UBG_PDTI_Fast/api/js?token=4f1862fc3b5e77c150a2b985b12db0fd',
    //新分时图数据    
    //chartDataUrl_new: '//push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b&iscca=0&iscr=0',    
    //chartDataUrl_k_new: '//push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b',
    chartDataUrl_new: '//push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b',    //&iscca=0&iscr=0

    chartDataUrl_k_new: '//push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b',
    /**
     * 盘口异动接口地址
     */ 
    // positionChangeDataUrl: '//nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api/js?style=top&js=([(x)])&ac=normal&check=itntcd',
    positionChangeDataUrl: '//push2.eastmoney.com/api/qt/pkyd/get?fields=f1,f2,f4,f5,f6,f7&lmt=20&ut=fa5fd1943c7b386f172d6893dbfba10b',
    /**
     * 新闻接口地址
     */
    newsApiUrl: '//cmsdataapi.eastmoney.com/api/infomine',
    /**
     * 除复权数据地址
     */
    exrightsDataUrl: '//push2.eastmoney.com/api/qt/stock/cqcx/get',
    /**
     * 兼容版图片地址
     */
    imageUrl: '//pifm.eastmoney.com/EM_Finance2014PictureInterface/Index.aspx',
    /**
     * 兼容版分时图片地址
     */
    timeImageUrl: '//webquotepic.eastmoney.com/GetPic.aspx',
}