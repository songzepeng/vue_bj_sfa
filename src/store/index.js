import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //解决刷新没数据的问题，直接从存到sessionStorage里的数据拿
    LoginUser: sessionStorage.getItem('LoginUser') // 如果里面返回数据为真的时候，就把字符串转换过来
      ? JSON.parse(sessionStorage.getItem('LoginUser'))
      : null,
    NoticeList: []
  },
  mutations: {
    initUser(state, payload) {
      state.LoginUser = payload;
    },
    initNoticeList(state, payload) {
      // 使用插件lodash对数据进行过滤去重，解决两次调用数据返回重复数据问题
      state.NoticeList = _.uniqBy(payload, 'id');
      //vuex存一条数据，公告信息
    },
    unshiftMoreNotice(state, payload) {
      state.NoticeList.unshift(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    pushMoreNotice(state, payload) {
      state.NoticeList.push(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    setNoticeReaded(state, payload) {
      let itemIndex = state.NoticeList.findIndex(item => item.id == payload);
      let k = state.NoticeList[itemIndex];
      k.isRead = true;
      state.NoticeList.splice(itemIndex, 1, k);
    }
  },
  actions: {},
  modules: {},
  getters: {
    getLoginUser(state) {
      return state.LoginUser;
    }
  }
});
