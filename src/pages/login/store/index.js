import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);
import axios from 'axios';

function ajax(url, method, data, trans, config) {
    let config_ = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

        },
        // baseURL: window.g.interfacePath, //接口配置

        // withCredentials: true
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
    return axios(baseConfig)
}



export default new VueX.Store({
    state: {

    },
    mutations: {


    },
    actions: {
        login({}, data) {
            return ajax('/jescloud/login', 'get', data, true);

        }
    }
})