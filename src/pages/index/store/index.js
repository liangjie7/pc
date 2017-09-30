import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

export default new VueX.Store({
    state: {
        currentView: "resourceManage",
        vmode: 'list'
    },
    mutations: {
        changeView(state, view) {
            state.currentView = view;
        },
        vmode(state, vmode) {
            state.vmode = vmode;
        }

    }
})