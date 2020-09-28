/**
 * JSONP实现
 * @param {string} url url
 * @param {object} [data] 请求参数
 * @param {string} [method] 回调参数
 * @param {function} callback 回调方法
 * @param {function} [error] 异常回调
 */
function JSONP(url, data, method, callback, error) {
    //Set the defaults
    url = url || '';
    data = data || {};
    method = method || '';
    callback = callback || function () {};

    //Gets all the keys that belong
    //to an object
    var getKeys = function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    //Turn the data object into a query string.
    //Add check to see if the second parameter is indeed
    //a data object. If not, keep the default behaviour
    if (typeof data == 'object') {
        var queryString = '';
        var keys = getKeys(data);
        for (var i = 0; i < keys.length; i++) {
            queryString += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data[keys[i]])
            if (i != keys.length - 1) {
                queryString += '&';
            }
        }
        url += queryString ? (url.indexOf('?') > 0 ? '&' : '?') + queryString : '';
    } else if (typeof data == 'function') {
        method = data;
        callback = method;
    }

    //If no method was set and they used the callback param in place of
    //the method param instead, we say method is callback and set a
    //default method of "callback"
    if (typeof method == 'function') {
        callback = method;
        method = 'callback';
    }

    //Check to see if we have Date.now available, if not shim it for older browsers
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }

    //Use timestamp + a random factor to account for a lot of requests in a short time
    //e.g. jsonp1394571775161 
    var timestamp = Date.now();
    var generatedFunction = 'jsonp' + Math.round(timestamp + Math.random() * 1000001)

    //Generate the temp JSONP function using the name above
    //First, call the function the user defined in the callback param [callback(json)]
    //Then delete the generated function from the window [delete window[generatedFunction]]
    window[generatedFunction] = function (json) {



        callback(json);

        // IE8 throws an exception when you try to delete a property on window
        // http://stackoverflow.com/a/1824228/751089
        try {
            delete window[generatedFunction];
        } catch (e) {
            window[generatedFunction] = undefined;
        }

        try {
            document.getElementById(generatedFunction).parentNode.removeChild(document.getElementById(generatedFunction));
        } catch (error) {
            throw error;
        }

    };

    //Check if the user set their own params, and if not add a ? to start a list of params
    //If in fact they did we add a & to add onto the params
    //example1: url = http://url.com THEN http://url.com?callback=X
    //example2: url = http://url.com?example=param THEN http://url.com?example=param&callback=X
    if (url.indexOf('?') === -1) {
        url = url + '?';
    } else {
        url = url + '&';
    }

    //This generates the <script> tag
    var jsonpScript = document.createElement('script');
    jsonpScript.id = generatedFunction;
    jsonpScript.className = 'jsonp';
    jsonpScript.setAttribute("src", url + method + '=' + generatedFunction);
    if (typeof error === "function") {
        jsonpScript.onerror = function (e) {
            removeScript();
            error(e);
        };
    }

    jsonpScript.abort = function () {
        removeScript();
        trigger(jsonpScript, 'error');
    }
    removeScript();
    return jsonpScript;

    function removeScript() {
        document.getElementsByTagName("head")[0].appendChild(jsonpScript);
    }
}

/**
 * 事件触发器
 * @param {HTMLElement} element DOM元素
 * @param {string} event 事件类型
 */
function trigger(element, event) {
    if (typeof event !== 'string') throw 'Unknown event type' + event;
    if (element.dispatchEvent) {
        var evt = document.createEvent('Events'); // initEvent接受3个参数
        evt.initEvent(event, true, true);
        element.dispatchEvent(evt);
    } else if (element.fireEvent) { //IE
        element.fireEvent('on' + event);
    } else {
        element['on' + event]();
    }
}


module.exports = JSONP;