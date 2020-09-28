var jsonp = require('../../em-utils/lib/jsonp');
/*
config = {
	channel: 'abc',
	// [optional]
	// sign_url usually link to a app server to get a token,
	// if icomet do not need athentication, this parameter could be omitted.
	signUrl: 'http://...',
	// sub_url link directly to icomet server
	subUrl: 'http://...',
	[pubUrl: 'http://...',]
	// be called when receive a msg
	callback: function(content, type){}
};
*/
function iComet(config) {
    var self = this;
    // callback timeout id
    var cid;
    if (iComet.id__ == undefined) {
        iComet.id__ = 0;
    }
    config.sub_url = config.sub_url || config.subUrl;
    config.pub_url = config.pub_url || config.pubUrl;
    config.sign_url = config.sign_url || config.signUrl;
    config.data_seq = config.data_seq || config.dataSeq;
    config.delay = config.delay || 0;
    config.onerror = config.onerror || new Function();
    this.cname = config.channel;
    self.sub_cb = function (msg) {
        self.log('proc', JSON.stringify(msg));
        var cb = config.callback || config.sub_callback;
        if (cb) {
            try {
                cb(msg.content, msg.type);
            } catch (e) {
                self.log(e);
            }
        }
    }
    this.sub_timeout = config.sub_timeout || (60 * 1000);

    this.id = iComet.id__++;
    this.cb = 'icomet_cb_' + (+new Date()) + "_" + this.id;
    this.timer = null;
    this.stopped = true;
    this.last_msg_time = 0;
    this.token = '';

    this.data_seq = config.data_seq;
    this.noop_seq = 0;
    this.sign_cb = null;

    this.pub_url = config.pub_url;
    if (config.sub_url.indexOf('?') == -1) {
        this.sub_url = config.sub_url + '?';
    } else {
        this.sub_url = config.sub_url + '&';
    }
    this.sub_url += 'cb=' + self.cb;
    if (config.sign_url) {
        if (config.sign_url.indexOf('?') == -1) {
            this.sign_url = config.sign_url + '?';
        } else {
            this.sign_url = config.sign_url + '&';
        }
        this.sign_url += 'cb=' + this.cb + '&cname=' + this.cname;
    }

    this.onmessage = function (msg) {
        // batch repsonse
        if (msg instanceof Array) {
            self.log('batch response', msg.length);
            self.long_polling_pause = true;
            for (var i = 0; i < msg.length; i++) {
                if (i === msg.length - 1) {
                    self.long_polling_pause = false;
                }
                self.proc_message(msg[i]);
            }
            // go on subscribing
            //self.long_polling_pause = false;
            self.proc_message({
                type: "next_seq",
                seq: self.data_seq
            });
        } else {
            self.proc_message(msg);
        }
    }

    this.proc_message = function (msg) {
        self.log('resp', JSON.stringify(msg));
        if (self.stopped) {
            return;
        }
        if (!msg) {
            return;
        }
        self.last_msg_time = (new Date()).getTime();

        if (msg.type == '404') {
            // TODO channel id error!
            console.error('channel not exists!');
            return;
        }
        if (msg.type == '401') {
            // TODO token error!
            console.error('token error!');
            return;
        }
        if (msg.type == '429') {
            //alert('too many connections');
            self_sub(5000 + Math.random() * 5000);
            return;
        }
        if (msg.type == 'sign') {
            self.sign_cb(msg);
            return;
        }
        if (msg.type == 'noop') {
            self.onmessage_noop(msg);
            return;
        }
        if (msg.type == 'next_seq') {
            self.onmessage_next_seq(msg);
            return;
        }
        if (msg.type == 'data' || msg.type == 'broadcast') {
            self.onmessage_data(msg);
            return;
        }
    }

    this.onmessage_noop = function (msg) {
        if (msg.seq == self.noop_seq) {
            if (self.noop_seq == 2147483647) {
                self.noop_seq = -2147483648;
            } else {
                self.noop_seq++;
            }
            // if the channel is empty, it is probably empty next time,
            // so pause some seconds before sub again
            self_sub(Math.random() * 1000);
        } else {
            // we have created more than one connection, ignore it
            self.log('ignore exceeded connections');
        }
    }

    this.onmessage_next_seq = function (msg) {
        self.data_seq = msg.seq;
        // disconnect & connect
        self_sub();
    }

    this.onmessage_data = function (msg) {
        if (msg.seq != self.data_seq) {
            if (msg.seq == 0 || msg.seq == 1) {
                self.log('server restarted');
                // TODO: lost_cb(msg);
                self.sub_cb(msg);
            } else if (msg.seq < self.data_seq) {
                self.log('drop', msg);
            } else {
                self.log('msg lost', msg);
                // TODO: lost_cb(msg);
                self.sub_cb(msg);
            }

            self.data_seq = msg.seq;
        } else {
            self.sub_cb(msg);
        }
        if (self.data_seq == 2147483647) {
            self.data_seq = -2147483648;
        } else {
            self.data_seq++;
        }
        self_sub();
    }

    var self_sub = function (delay) {
        if (self.stopped) return;
        var url = self.sub_url +
            '&cname=' + self.cname +
            '&seq=' + self.data_seq +
            '&noop=' + self.noop_seq +
            '&token=' + self.token +
            '&_=' + new Date().getTime();
        if (typeof (EventSource) !== "undefined") {
            if (self.EventSource) {
                return;
            }
            self.stopped = false;
            self.last_msg_time = (new Date()).getTime();
            url = url.replace('/sub?', '/sse?');
            // console.info(url); 
            self.log('sub SSE ' + url);
            try { 
                self.EventSource = new EventSource(url);
                self.EventSource.onmessage = function (e) {
                    self.onmessage(JSON.parse(e.data));
                }
                self.EventSource.onerror = function () {
                    self.log('EventSource error');
                    self.EventSource.close();
                    self.EventSource = null;
                    config.onerror();
                }
            } catch (e) {
                self.log(e.message);
            }
        } else {
            if (self.long_polling_pause) {
                return;
            }
            delay = delay || config.delay;
            clearTimeout(cid);
            self.stopped = false;
            cid = setTimeout(function () {
                self.last_msg_time = (new Date()).getTime();
                self.log('sub Long-Polling ' + url);
                jsonp(url, {}, self.cb, function (data) {
                    //console.info(data);
                }, config.onerror);
            }, delay);
        }
    }

    this.sign_cb = function (msg) {
        if (self.stopped) {
            return;
        }
        self.cname = msg.cname;
        self.token = msg.token;
        try {
            var a = parseInt(msg.sub_timeout) || 0;
            self.sub_timeout = (a * 1.3) * 1000;
        } catch (e) {}
        self_sub();
    }

    this.start = function () {
        // sign, long-polling 需要注册此函数
        // 网络异常后, 函数注册会丢失, 需要重新注册.
        window[self.cb] = self.onmessage;

        self.log('start');
        self.stopped = false;
        self.last_msg_time = (new Date()).getTime();

        if (!self.timer) {
            self.timer = setInterval(function () {
                var now = (new Date()).getTime();
                if (now - self.last_msg_time > self.sub_timeout) {
                    self.log('timeout');
                    self.stop();
                    self.start();
                }
            }, 1000);
        }

        if (self.sign_url) {
            self.log('sign in icomet server...');
            var url = self.sign_url + '&_=' + new Date().getTime();
            jsonp(url, {}, self.cb, function (data) {
                //console.info(data);
            }, config.onerror);
        } else {
            self_sub();
        }
    }

    this.stop = function () {
        self.log('stop');
        self.stopped = true;
        self.last_msg_time = 0;
        if (self.timer) {
            clearTimeout(self.timer);
            self.timer = null;
        }
        if (self.EventSource) {
            self.EventSource.close();
            self.EventSource = undefined;
        }
    }

    // msg must be string
    this.pub = function (content, callback) {
        if (typeof (content) != 'string' || !self.pub_url) {
            alert(self.pub_url);
            return false;
        }
        if (callback == undefined) {
            callback = function () {};
        }
        var data = {};
        data.cname = self.cname;
        data.content = content;

        jsonp(self.pub_url, data, self.cb, callback, config.onerror);
    }

    this.log = function () {
        try {
            var v = arguments;
            var p = 'icomet[' + self.id + ']';
            var t = new Date().toTimeString().substr(0, 8);
            if (v.length == 1) {
                console.log(t, p, v[0]);
            } else if (v.length == 2) {
                // console.log(t, p, v[0], v[1]);
            } else if (v.length == 3) {
                console.log(t, p, v[0], v[1], v[2]);
            } else if (v.length == 4) {
                console.log(t, p, v[0], v[1], v[2], v[3]);
            } else if (v.length == 5) {
                console.log(t, p, v[0], v[1], v[2], v[3], v[4]);
            } else {
                console.log(t, p, v);
            }
        } catch (e) {}
    }

    this.start();
}
module.exports = iComet;