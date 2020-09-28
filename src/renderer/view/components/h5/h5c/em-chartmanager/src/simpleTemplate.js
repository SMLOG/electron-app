/**
 * 模板处理器
 * @param {string} tpl 模板
 * @param {object} data 数据
 */
function simpleTemplate(tpl, data) {
    if (!data) return tpl;
    try {
        var result = tpl || '';
        var regex = new RegExp('{{(\\w+)}}', 'g');
        var matches, cacheKeys = [];
        while ((matches = regex.exec(tpl)) !== null) {
            var partten = matches[0],
                key = matches[1];
            if (cacheKeys.indexOf(key) >= 0) continue;
            cacheKeys.push(key);
            if (data.hasOwnProperty(key)) {
                result = result.replace(new RegExp(partten, 'g'), data[key]);
            }
        }
        return result;
    } catch (error) {
        console.error(error);
    }
    return '';
}
module.exports = simpleTemplate;