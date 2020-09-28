/**
 * 判断对象是否为dom
 * @param {object} obj 对象
 * @returns {Boolean} true表示是dom对象，否则不是
 */
function isDOM(obj) {
    //首先要对HTMLElement进行类型检查，因为即使在支持HTMLElement
    //的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的
    //类型为function，此时就不能用它来判断了
    if (typeof HTMLElement === 'object') {
        return obj instanceof HTMLElement;
    } else {
        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    }
}
module.exports = isDOM;