import axios from 'axios';



let Base64 = require('js-base64').Base64;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + Base64.encode(escape(cvalue)) + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            var cnameValue = unescape(c.substring(name.length, c.length));
            return Base64.decode(cnameValue);
        }
    }
    return "";
}

function clearCookie(cname) {
    setCookie(cname, "", -1);
}

var utils = {
    clearCookie(cname) {
        setCookie(cname, "", -1);
    },
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                var cnameValue = unescape(c.substring(name.length, c.length));
                return Base64.decode(cnameValue);
            }
        }
        return "";
    },
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();

        document.cookie = cname + "=" + Base64.encode(escape(cvalue)) + "; " + expires;
    },
    ajax(url, method, params, trans, config) {
        var data = params.data;

        let config_ = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',

            },
            // baseURL: window.g.interfacePath, //接口配置

        };
        var baseConfig = Object.assign({}, config_, config);
        baseConfig.url = url;
        baseConfig.method = method;
        if (method == "post") {
            baseConfig.data = data;
        } else {
            baseConfig.params = data;
        }
        if (trans) {
            baseConfig.transformRequest = [function(data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
        }
        return axios(baseConfig).then((res) => {
            var data_ = res.data;
            if (data_.rescode == '707') {
                alert('登录过期，请重新登录');
                location.assign(window.g.path + 'login.html');
                return
            }
            if (params.successFn) {
                params.successFn(data_);
            }

        }, (res) => {
            console.log('网络出错了')
        });
    },

    'not_login': '707',
    'no_auth': '606'
}

export default utils;