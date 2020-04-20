import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: plugins,
    //设置全局访问的state对象
    state: {
        isAuthenticated: false,
        user: {}
    },
    //实时监听state值的变化（最新状态）
    getters: {
        isAuthenticated: state => {
            return state.isAuthenticated;
        },
        user: state => {
            return state.user;
        }
    },
    mutations: {
        remove(state) {
            state.isAuthenticated = false;
            state.user = {};
        },
        setIsAuthenticated(state, isAuthenticated) {
            if(isAuthenticated) {
                state.isAuthenticated = isAuthenticated;
            } else {
                state.isAuthenticated = false;
            }
        },
        setUser(state, user) {
            if(user) {
                state.user = user;
            } else {
                state.user = {};
            }
        }
    },
    //触发更改
    actions: {
        setIsAuthenticatedData({commit}, isAuthenticated) {
            commit('setIsAuthenticated', isAuthenticated);
        },
        setUserData({commit}, user) {
            commit('setUser', user)
        }
    }
});

export default store;