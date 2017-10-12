import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);
import axios from 'axios';

function ajax(url, method, data, trans, config) {
    // axios.defaults.withCredentials = true
    let config_ = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Origin': 'http://192.168.0.127:8080'
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
        getModules({}, info) {

            return ajax('/jescloud/route', 'get', info.data, true).then((res) => {
                var data_ = res.data;
                if (data_.rescode == '707') {
                    location.assign(window.g.path + 'login.html');
                    return
                }

                info.successFn(data_)



            }, (res) => {
                console.log('网络出错了')
            });
        },
        loginOut({}) {

        }
    }
})