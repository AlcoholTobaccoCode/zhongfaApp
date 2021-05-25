/*
 * @description: 工具类
 * @Maintainer: duqings@foxmail.com
 * @Date: 2021年3月29日
 * @use: import { moduleName } '@/common/js/cache'
 */

let _debounceTimeout = null, //* 防抖定时器对象
	_throttleRunning = false //* 节流

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const debounce = (fn, delay = 500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}

/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn, delay = 500) => {
	if (_throttleRunning) {
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
		_throttleRunning = false;
	}, delay);
}

/**
 * 消息提示
 * @param {string} 提示文本
 * @param {param} 配置参数 {
 * 	duration: 延迟时间(ms), 默认 1500ms
 * 	mask: 是否显示透明蒙层, 默认关闭
 *  icon: 是否显示图标 (详细说明: {
 * 		success: 显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值,
 * 		loading: 显示加载图标，此时 title 文本最多显示 7 个汉字长度。,
 * 		none: 不显示图标，此时 title 文本在小程序最多可显示两行，App仅支持单行显示。
 * 	})
 * }
 */
export const msg = (title = '', param = {}) => {
	if (!title) return;
	//TODO 判断数字 0
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}

/**
 * @param {string} [title=''] 提示文字
 * @param {object} [param={}] 配置: 失败、成功、完成回调, 暂时没配置
 * 
 * 使用:
 * 	开启: this.$util.loading.show();
 * 	关闭: this.$util.loading.hide();
 * @returns
 */
export const loading = {
		show(title = '', param = {}) {
			uni.showLoading({
				title: title || '加载中...',
				mask: true
				/* ,
				success(info) {
        	console.log('✨ ~ file: util.js ~ line 75 ~ success ~ info', info);
				},
				fail(info) {
        	console.log('✨ ~ file: util.js ~ line 75 ~ fail ~ info', info);
				} */
			});
		},
		hide() {
			uni.hideLoading();
		}
}

/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options = {}) => {
	console.info('%c为后续迭代备用, 暂时只考虑集成钉钉', 'color: orange; font-size: 16px');
	return;
	const token = uni.getStorageSync('uniIdToken');
	if (token) {
		return true;
	}
	if (options.nav !== false) {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	return false;
}

/**
 * 获取页面栈
 * @param {Number} preIndex为1时获取上一页
 * @return {Object} 
 */
export const prePage = (preIndex = 1) => {
	const pages = getCurrentPages();
	const prePage = pages[pages.length - (preIndex + 1)];

	return prePage.$vm;
}

/**
 * 页面跳转
 * @param {string} url 目标页面地址
 * @param {object} [params={}] 携带参数
 * @param {object} [options={}] 页面跳转时配置:
 * 	{
 * 		animationType: 'pop-in' //* 默认, 窗口显示的动画效果 https://uniapp.dcloud.io/api/router?id=animation
 * 		animationDuration: 300 //* 窗口动画持续时间，单位为 ms
 * 		events:  Object//* 页面间通信接口，用于监听被打开页面发送到当前页面的数据
 * 		success:  Function//* 接口调用成功的回调函数	
 * 		fail:  Function//* 接口调用失败的回调函数	
 * 		complete:  Function//* 接口调用结束的回调函数（调用成功、失败都会执行）
 * 	}
 */
export const navTo = (url, params, options = {}) => {
	// TODO 登录校验
	//* 跳转路径校验
	if(!url || url.length < 0) {
		console.error('url 为空或错误');
		return;
	}
	
	// params['showmenu'] = false;
	//* 参数拼接处理
	let param = (data) => {
		let url = ''
		for (var k in data) {
			let value = data[k] !== undefined ? data[k] : ''
			url += '&' + k + '=' + encodeURIComponent(value)
		}
		return url ? url.substring(1) : ''
	}
	//* 连续拼接
	url += (url.indexOf('?') < 0 ? '?' : '') + param(params);
	// url += '?' + param(params);
	// url += '&showmenu=false';

	console.log('✨navTo ~ url', url);

	uni.navigateTo({
		url,
		animationType: options.animationType || 'fade-in',
		animationDuration: options.animationDuration || 300,
		events() {

		},
		success: (res) => {
			if (options['success']) {
				options.success(res);
			}
		},
		fail: (err) => {
			if (options['error']) {
				options.error(res);
			}
		}
	});


}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
export const date = (format, timeStamp) => {
	if ('' + timeStamp.length <= 10) {
		timeStamp = +timeStamp * 1000;
	} else {
		timeStamp = +timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();

	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key => {
		return {
			Y,
			m,
			d,
			H,
			i,
			s
		} [key];
	});
}

//二维数组去重
export const getUnique = array => {
	let obj = {}
	return array.filter((item, index) => {
		let newItem = item + JSON.stringify(item)
		return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
	})
}

//* 参数非空校验
export const assert = (obj, info) =>{
	if (!obj) { //* 如果传入对象为空
		if (info) { //* 如果有自定义提示信息
			throw(info);
		} else {
			throw('参数异常');
		}
	}
}

//* 判断是不是钉钉
export const isdingding =  () => {
	let ua = navigator.userAgent.toLowerCase();
	return ua.indexOf("dingtalk") >= 0;
};

//* 设置钉钉 title
export const ddTitle = (title = '', vm, callback = {}) => {
	let ua = navigator.userAgent.toLowerCase(),
			isDD = ua.indexOf("dingtalk") >= 0;
		uni.showToast({
			title: isDD,
		});
	//* 先校验是否是钉钉运行环境
	if (isDD) {
		uni.showToast({
			title: 'is in dd title set',
		});
		//* 设置钉钉顶部 title
		this.$dd.biz.navigation.setTitle({
			title,// 控制标题文本，空字符串表示显示默认文本
			onSuccess : function(result) {},
			onFail : function(err) {}
		});

		//* 设置右侧 icon
		this.$dd.biz.navigation.setIcon({
			showIcon : false,//是否显示icon
			onSuccess : function(result) {},
			onFail : function(err) {}
		});

		//* 控制钉钉顶部右侧功能按钮
		this.$dd.biz.navigation.setRight({
			show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
			control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
			text: ' .',//控制显示文本，空字符串表示显示默认文本
			onSuccess : function(result) {},
			onFail : function(err) {}
		});
	}
}

//* 获取当前应用操作系统信息
export const sysInfo = uni.getSystemInfoSync();

// 判断类型集合
export const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^([a-zA-Z0-9_]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}
