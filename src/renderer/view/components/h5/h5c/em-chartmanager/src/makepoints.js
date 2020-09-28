var merge = _.merge
var jsonp = require('../../em-utils/lib/jsonp');
var simpleTemplate = require('./simpleTemplate');

var cache = {};
var infomineTypes = ['r', 't2', 't3', 't4', 't5', 'k', 'wk', 'mk'];
var exrightsTypes = ['k', 'wk', 'mk'];
var newsTypeMap = {
    '1': '[新闻]',
    '2': '[公告]',
    '3': '[研报]'
};

/**
 * 新闻公告打点
 * @param {*} chart emchart
 * @param {object} args 参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场
 * @param {Object.<string,string>} args.serverUrls 服务端地址
 */
function newsnoticepoints(chart, args) {
    if (infomineTypes.indexOf(args.type) < 0) return false;
    var istimechart = ['r', 't2', 't3', 't4', 't5'].indexOf(args.type) >= 0;
    var data = istimechart ? chart.getData() : chart.getData().data;
    if (data instanceof Array && data.length > 0) {
        var starttime = data[0][0],
            endtime = data[data.length - 1][0];
        var param = {
            code: args.entry.code,
            marketType: args.entry.market,
            types: '1,2',
            startTime: starttime,
            endTime: endtime,
            format: istimechart ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
        };
        jsonp(args.serverUrls.newsApiUrl, param, 'cb', function (json) {
            if (json && json.Data instanceof Array) {
                /** 
                 * @typedef {{type: string, url: string, title: string, date: string}} InfoMine
                 * @type {Array.<InfoMine>} 
                 */
                var points = [];
                for (var i = 0; i < json.Data.length; i++) {
                    /** @type {{Time: string, Type: number, Title: string, Url: string, Code: string}} */
                    var element = json.Data[i];
                    if (!element.Time) continue;
                    points.push({
                        type: newsTypeMap[element.Type],
                        date: element.Time,
                        content: element.Title,
                        url: element.Url
                    });
                }
                var newstpl = '<a href="{{url}}" title="{{content}}" target="_blank">{{date}}&nbsp;{{type}}&nbsp;{{content}}</a>';
                chart.setData({
                    dot: {
                        infomine: merge({
                            position: 'top',
                            width: 9,
                            height: 9,
                            className: 'icon-mine',
                            /**
                             * @param {InfoMine} point
                             */
                            formatter: function (point) {
                                if (!point) return '';
                                return simpleTemplate(newstpl, point);
                            },
                            multiple: {
                                className: 'icon-mine-muti'
                            },
                            points: points
                        }, args.styles.infomine)
                    }
                });
                if (istimechart) chart.redraw();
                else chart.draw();
                //chart.redraw();
            }
        }, function (err) {
            console.error('新闻打点异常', err);
        });
    }
}

/**
 * 除权除息打点
 * @param {*} chart emchart
 * @param {object} args 参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场
 * @param {Object.<string,string>} args.serverUrls 服务端地址
 */
function exrightspoints(chart, args) {
    if (exrightsTypes.indexOf(args.type) < 0) return false;
    if (cache['exrightsdata']) {
        draw(cache['exrightsdata']);
    }
    // console.info(args.serverUrls.exrightsDataUrl)
    if (!args.serverUrls.exrightsDataUrl) return false;
    // type: 1（派现）2（送股，转增）4（拆细合并）8（配股，供股）16（增发）
    jsonp(args.serverUrls.exrightsDataUrl, {
        id: (args.entry.shortmarket + args.entry.code).toUpperCase(),
        ut: 'e1e6871893c6386c5ff6967026016627'
    }, 'cb', function (json) {
        if (!json) return false;
        if (json.rc === 0 && json.data) {
            cache['exrightsdata'] = json.data.records;
            draw(json.data.records);
        }
    }, function (err) {
        console.error('除权除息打点异常', err);
    });

    function draw(data) {
        chart.setData({
            dot: {
                exrights: merge({
                    position: 'bottom',
                    width: 7,
                    height: 13,
                    className: 'icon-exrights',
                    formatter: formatter,
                    points: data
                }, args.styles.exrights)
            }
        });
        chart.draw();
    }

    /**
     * 格式化器
     * @param {object} point 除权除息数据
     * @param {string} point.date 日期
     * @param {number} point.type 1:派现,2:送股、转增,4:拆细、合并,8:配股、供股,16:增发
     * @param {number} point.pxbl 派现比例
     * @param {number} point.sgbl 送股（转增）比例
     * @param {number} point.cxbl 拆细比例
     * @param {number} point.pgbl 配股（供股）比例
     * @param {number} point.pgjg 配股（供股）价格
     * @param {number} point.zfbl 增发比例
     * @param {number} point.zfgs 增发股数（万股）
     * @param {number} point.zfjg 增发价格
     * @param {number} point.ggflag 为1表示外盘供股价格高于除净日前一日收盘价，此时不做前复权
     */
    function formatter(point) {
        var px = 1,
            sg = 2,
            pg = 8,
            zf = 16;
        if (!point || !point.date) return '';
        var data = merge({}, point);
        var result = '<p>' + data.date + '</p>';
        if ((data.type & px) === px) {
            data.name = '派息';
            data.pxbl = (data.pxbl * 10).toFixed(2);
            result += simpleTemplate('<p>{{name}}: 每10股派{{pxbl}}元</p>', data);
        }
        if ((data.type & sg) === sg) {
            data.name = '送股';
            data.sgbl = (data.sgbl * 10).toFixed(2);
            result += simpleTemplate('<p>{{name}}: 每10股送{{sgbl}}股</p>', data);
        }
        if ((data.type & pg) === pg) {
            data.name = '配股';
            data.pgbl = (data.pgbl * 10).toFixed(2);
            data.pgjg = data.pgjg.toFixed(2);
            result += simpleTemplate('<p>{{name}}: 每10股配{{pgbl}}股&nbsp;配股价格{{pgjg}}元</p>', data);
        }
        if ((data.type & zf) === zf) {
            data.name = '增发';
            data.zfgs = data.zfgs > 100 ? data.zfgs.toFixed(0) : data.zfgs;
            data.zfjg = data.zfjg.toFixed(2);
            result += simpleTemplate('<p>{{name}}: {{zfgs}}万股&nbsp;增发价格{{zfjg}}元</p>', data);
        }
        return result;
    }
}

module.exports = {
    infomine: newsnoticepoints,
    exrights: exrightspoints
};