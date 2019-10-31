// 服务层代码  登录完成后的所有请求必须在 请求的headers中添加token
import axios from 'axios';
// Add a request interceptor
let axiosIns = axios.interceptors.request.use(
  function(config) {
    let loginToken = sessionStorage.getItem('LoginToken');
    if (loginToken) {
      config.headers.Authorization = `Bearer ${loginToken}`;
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  // 登录用户名密码
  login(data) {
    return axios.post('/api/login', data);
  },
  logout() {
    // 当退出登录的时候，取消全局注册的依赖
    axios.interceptors.request.eject(axiosIns);
  },
  getUserProgress() {
    return axios.get('/api/getUserProgress');
  },
  getNoticeReaded(id) {
    return axios.post(`/api/auth/notice/${id}`);
  },
  //获取门店坐标
  getShops(data) {
    return axios.get(
      `/api/auth/shop?_page=1&_limit=20&_order=asc&_sort=distance&Lng=${
        data.Lng
      }&Lat=${data.Lat}&Lat=${data.lat}${data.q ? '&name_like=' + data.q : ''}`
    );
  },
  // 店内拜访数据
  getShopInfo(id) {
    return axios.get(`/api/auth/shopSales/${id}`);
  },
  getNotice(date, limit, isloadelater) {
    if (date) {
      date = date.getTime();
    }
    return axios.get('/api/message', {
      params: {
        date,
        limit,
        isloadelater
      }
    });
  }
};
