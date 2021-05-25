/*
 * @description: 组装模块并导出 store 的地方
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021-04-18 01:39:54
 * @LastEditors: duQings duqings@foxmail.com
 * @LastEditTime: 2021-04-18 02:28:57
 * @FilePath: \workreport-app\workreport-app\store\index.js
 */

//* 引用 vuex
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//* 实例 store 并导出
export default new Vuex.Store({
  state: {
    login: {
      state: false, //* 登录状态
      params: {} //* 登录存储参数
    },
    
  },
  mutations: {
    // TODO    
  }
})

