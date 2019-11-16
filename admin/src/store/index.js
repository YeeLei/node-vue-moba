import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED", // 是否认证通过
  SET_USER: "SET_USER",
  SET_BREADCRUMBS: "SET_BREADCRUMBS" // 面包屑导航列表
};
const state = {
  //要设置的全局访问的state对象
  isAuthenticated: false, //默认是没有授权的
  user: {},
  breadcrumbs: []
};
// 获取状态信息
const getters = {
  //实时监听state值的变化(最新状态)
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  breadcrumbs: state => state.breadcrumbs
};
// 更改状态信息
const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    //已授权
    else state.isAuthenticated = false; //没授权
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  },
  [types.SET_BREADCRUMBS](state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  }
};
// 异步操作的actions
const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null);
  }
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
