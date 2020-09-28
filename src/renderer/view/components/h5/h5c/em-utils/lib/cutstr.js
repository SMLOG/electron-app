/** 
 * js截取字符串，中英文都能用 
 * @param {string} str: 需要截取的字符串 
 * @param {number} len: 需要截取的长度
 * @param {string} ellipsis: 溢出文字
 * @returns {string} 截取后的字符串
 */
function cutstr(str, len, ellipsis) {
    if (typeof ellipsis != "string") ellipsis = "...";
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    for (var i = 0; i < str.length; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        //str_cut = str_cut.concat(a);
        if (str_length <= len) {
            str_len++;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length <= len) {
        return str.toString();
    } else {
        return str.substr(0, str_len).concat(ellipsis);
    }
}

module.exports = cutstr;