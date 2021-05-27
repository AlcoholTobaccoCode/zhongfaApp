/*
 * @description: http 拦截器
 * @Maintainer: duqings@foxmail.com
 * @Date: 2021年3月30日
 * @use: import httpInterceptor from '@/common/http/http.interceptor.js'
 */

const install = (Vue, vm) => {
	// 此为自定义配置参数
	Vue.prototype.$u.http.setConfig({
		baseUrl: '/', // 请求的本域名(本地)
		// baseUrl: 'http://localhost:51907', // 请求的本域名(本地)
		method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {},
	});

	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {
		
		return false;
		uni.hideLoading();
		// return false;
		// 如果return一个false值，则会取消本次请求
		if (config.url == "Login.ashx") { //* 登录接口不附带token
			config.header['token'] = '';
		}

		// let token = localStorage.getItem('WorkReport_token');
		let token = '';
		/* uni.getStorage({
			key: 'WorkReport_token',
			success: function (res) {
				token = res.data;
			}
		}); */
		token = uni.getStorageSync('WorkReport_token');  
		// console.info('🚀 token ~ file: interceptor, line: 44: ', token);	
		
		if (token && config.url !== "Controller/Login.ashx") {
			config.header['token'] = token;
		}
		return config;
	}

	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {

		uni.hideLoading();

		return res;
		//TODO 请完善拦截器
		if (res == null) {
			// msg('接口调用异常, 请联系管理员处理');
			setTimeout(() => {
				uni.showToast({
					title: res.message,
					duration: 1600,
					mask: false,
					icon: 'none'
				});
			}, 100);
			return;
		}
		if (+(res.code) === 0) { //* 通过
			return res;
		} else if (+(res.code) === 111) { //* 登录失效
			setTimeout(() => {
				uni.showToast({
					title: res.message + ', 返回登录页',
					duration:1600,
					mask: true,
					icon: 'none'
				});
			}, 100);
			setTimeout(() => {
				uni.reLaunch({ //* 跳转并销毁当前页面
					url: '/pages/login/index',
					animationType: 'fade-in',
					animationDuration: 300
				});
			},1500);
			return;
		} else {
			setTimeout(() => {
				uni.showToast({
					title: res.message,
					duration:1600,
					mask: true,
					icon: 'none'
				});
			}, 100);
			return;
		}
	}
}

export default {
	install
}
