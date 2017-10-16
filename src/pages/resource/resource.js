// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import store from './store'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'normalize.css'
import '../../../node_modules/element-ui/lib/theme-default/index.css'

import utils from '../assets/js/utils' //公用文件
Vue.prototype.utils = utils;


Vue.use(ElementUI);
import App from './App'
import router from './router'
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})