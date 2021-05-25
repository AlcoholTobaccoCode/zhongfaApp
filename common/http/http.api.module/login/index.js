/*
 * @description: 登录页面接口管理
 * @Maintainer: duqings@foxmail.com
 * @Date: 2021年3月30日
 * @use: import login from '@/common/http/http.api.module/login/index';
*/

let Login = (vm) => {
  return {
    login: (params = {}) => {
      return vm.$u.post('Controller/Login.ashx', params);
    }
  }
}

export default Login;
