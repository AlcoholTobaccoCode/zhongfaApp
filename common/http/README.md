# 文件夹说明

## 创建信息

```txt
  Version: @1.0
  CreateTime: 2021年3月30日20:08:52
  Editor: duqings@foxmail.com
```

## 结构分布

``` txt
http
 ├── http.api.module —— 详细 api 文件夹
 │   └── login —— 登录模块文件夹
 │       └── http.login.js —— 登录接口
 ├── http.api.js —— 全局 api 管理根文件
 ├── http.interceptor.js —— 拦截器
 └── README.md —— 指导文档
```

## 使用说明

 0️⃣在 `http.api.module` 中根据模块新建对应文件夹,
 1️⃣如: `/http.api.module/login`,
 2️⃣在其中创建对应 api js 文件: `/http.api.module/login/index.js`
 3️⃣在 `/http/http.api.js` 中导入, 并使用

``` js
//* 4️⃣http.api.js
import Login from '@/common/http/http.api.module/login/http.login.js'; //* 登录页面接口

const install = (Vue, vm) => {
  vm.$u.api = {
    Login: Login(vm),
    //* and so on..
  }
}

//* 5️⃣在页面中使用
// 调用 login 接口
this.$u.api.Login.login({
    token:'🌰'
}).then(res => {
    console.log(res);
});
```

 完整流程:

``` js
// S Step_0️⃣ ------------------------------------------------
//* @/common/http/http.api.module/example/http.example.js
/*
 * @description: api 说明
 * @Maintainer: 维护人
 * @Date: 时间
 * @use: import login from '@/common/http/http.api.module/example/http.example.js';
*/
let Example = (vm) => {
  return {
    example0: (params = {}) => {
      return vm.$u.get('url', params);
    },
    example1: (params = {}) => {
      return vm.$u.post('url', params);
    }
  }
}

export default Example;
// E Step_0️⃣ ------------------------------------------------
//* @/common/http/http.api.js

// S Step_1️⃣ ------------------------------------------------
import Example from '@/common/http/http.api.module/example/index'

const install = (Vue, vm) => {
  vm.$u.api = {
    Example0: Example(vm)
    //* and so on ..
  }
}

export default {
  install
}
// E Step_1️⃣ ------------------------------------------------

// S Step_2️⃣ ------------------------------------------------
//* 5️⃣在页面中使用
  // 调用getSearch接口
  this.$u.api.Example.example0({
      token:'🌰'
  }).then(res => {
      console.log(res);
  });

  this.$u.api.Example.example1({
      token:'🌰'
  }).then(res => {
      console.log(res);
  });
// E Step_2️⃣ ------------------------------------------------
```

## 额外

 如果不使用全局管理, 也可以使用下面的方法

``` js
  //* 在页面中使用
  this.$u.post('url').then(res => {
    console.info(res);
  }).catch(rss => {
    console.info(res);
  });
```
