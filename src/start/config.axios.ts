import axios from 'axios';
import history from '../shared/history';
import store from '../store';
import actions from '../store/actions';

const { auth } = actions;

/** 配置axios拦截器 */
axios.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response;
    } else {
      if ([20000, 20001].indexOf(response.data.code) !== -1) {
        store.dispatch(auth.clearAuth());
        history.push('/login');
      }
    }
    return Promise.reject(response.data);
  },
  error => {
    console.debug('request error: ', error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.dispatch(auth.clearAuth());
          history.push('/login');
          break;
        case 500:
          history.push('500');
          break;
        default:
      }
    }
    return Promise.reject(error.response.data);   // 返回接口返回的错误信息
  }
);
