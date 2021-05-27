import Vue from 'vue';
import App from './App';
//* uView UI框架支持
import uView from 'uview-ui';
//* 工具类支持
import * as util from '@/utils/util.js';
//* 缓存支持
import cache from '@/common/js/cache.js';
//* Store
import store from '@/store/index.js';
//* 扫码支持
import scan from '@/components/p-scan/scan.vue';
Vue.component('scan',scan);
//* 加密
import AES from '@/utils/AES/AES.js';

Vue.config.productionTip = false;

Vue.use(uView);

Vue.prototype.$util = util;
Vue.prototype.$cache = cache;
Vue.prototype.$aes = AES;

//* 移动端调试支持
import vconsole from '@/utils/vconsole.min';
Vue.prototype.$vconsole = new vconsole(); //* 挂载 vconsole 注: app 端不支持这玩意

App.mpType = 'app';

const app = new Vue({
    ...App,
    store
})

//* http 拦截器
import httpInterceptor from '@/common/http/http.interceptor.js';
Vue.use(httpInterceptor, app);

//* http 接口 `API` 集中管理
import httpApi from '@/common/http/http.api.js';
Vue.use(httpApi, app);

app.$mount()
