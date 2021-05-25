<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="loginCode" :bColor="accountBColor" @focus="restore('account')" type="text" maxlength="13" placeholder="请输入登录账号" :focus="isFocus"></wInput>
				<wInput v-model="password" :bColor="pswBColor" @focus="restore('psw')" type="password" maxlength="16" placeholder="请输入登录密码" isShowPass></wInput>
			</view>
			<!-- <u-button @click="clearCache">清空缓存</u-button> -->
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin" bgColor="#3291f8" fontColor="#FFFFFF"></wButton>
			<text class="clearCache" @click="clearCache">清除缓存</text>
			<!-- 底部信息 -->
			<!-- <view class="footer"> ssss
				<navigator url="forget" open-type="navigate">忘记密码</navigator>
			</view> -->
		</view>
	</view>
</template>

<script>
	let that;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button

	export default {
		components: {
			wInput,
			wButton,
		},
		data() {
			return {
				//logo图片 base64
				logoImage: 'https://bugorme.icu/imgs/ya-logo.jpg',
				loginCode: '', // 登录账号
				password: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: true ,// 是否聚焦
				accountBColor: null ,//* 账号边框颜色
				pswBColor: null //* 密码边框颜色
			};
		},
		mounted() {
			that = this;
			that.isLogin();
		},
		methods: {
			//* 清空缓存
			clearCache() {
				that.$cache.clear();
				uni.showLoading({
					title: '请等待'
				});
				setTimeout(() => {
					uni.hideLoading();
					that.$util.msg('清除缓存成功');
				}, 500);
			},
			//* 页面进入时 
			isLogin() {
				/**
				 * 407 
				 * 
				 * */
				//* 判断缓存中是否登录过，且没有过期，直接登录
				//* 获取缓存时间信息
				
				/* let cacheTime = that.$cache.get('cacheTime');
				if (cacheTime) {
					if (parseInt(cacheTime) < Date.parse(new Date())) {
						that.clearCache()
						return;
					}  
				} */ 
				let value = uni.getStorageSync('WorkReport_loginUser');
				console.info(value);
				//* 有登录信息时
				if (value) {
					console.info(value.loginCode);
					console.info(that.$aes.decrypt(value.loginCode));
					that.loginCode = that.$aes.decrypt(value.loginCode);
					that.password = that.$aes.decrypt(value.password);
					/* uni.reLaunch({
						url: '/pages/index/index',
					}); */
				}
			},
			//* 登录
			startLogin(e) {
				// console.log(e)
				//登录
				if (that.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (that.loginCode.length == "") {
					that.$util.msg('用户不能为空');
					that.accountBColor = '#c20a0a';
					return;
				} else {
					that.accountBColor = 'transparent';
				}
				if (that.password.length == "") {
					that.$util.msg('请输入密码');
					that.pswBColor = '#c20a0a';
					return;
				} else {
					that.pswBColor = 'transparent';
				}
				// debugger
				//* 开启按钮 loading
				that.isRotate = true;
				uni.showLoading({
					title: '登录中'
				});
				
				//* 请求数据
				let loginRequestData = {
					loginCode: that.loginCode,
					password: that.password
				}
				that.$u.post('/Login/TryLogin', loginRequestData).then(res => {
					console.info(res);
				}).catch(err => {
					console.info(err);
				});
				/* that.$u.api.Login.login(
					loginRequestData
				).then(res => {
					uni.hideLoading();
					//* 关闭按钮 loading
					that.isRotate = false;
					if (res) {
						//* 存储登录状态
						that.$store.state.login.state = true;
						that.$store.state.login.params = {
							token: res.data.token,
							user_id: res.data.user_id,
							user_name: res.data.user_name
						};
						//* 缓存中存储 token
						that.$cache.put('token', res.data.token);
						//* 缓存中存储全部信息
						that.$cache.put('loginInfo', res.data);
						that.$cache.put('loginUser', {
							loginCode: that.$aes.encrypt(that.loginCode),
							password: that.$aes.encrypt(that.password)
							// loginCode: that.loginCode,
							// password: that.password
						});
						
						// that.$cache.put('cacheTime', {
						// 	timetemp: Date.parse(new Date()),
						// });
						
						setTimeout(() => {
							uni.reLaunch({ //* 跳转并销毁登录页面
								url: '/pages/index/index'
							});
						}, 500);
					} else {
						that.$util.msg(res.message);
					}

				}).catch(err => {
					that.$util.msg(err.message);
					uni.hideLoading();
				}); */
				
				setTimeout(() => {
					that.$util.msg('23333')
					//* 关闭按钮 loading
					that.isRotate = false;
				}, 5000);
			},
			//* 输入框获得焦点时警告样式取消
			restore(target) {
				switch (target) {
					case 'account':
						this.accountBColor = 'transparent';
					break;
					case 'psw':
						this.pswBColor = 'transparent';
					break;
					default:
						this.accountBColor = 'transparent';
						this.pswBColor = 'transparent';
					break;
				}
			}
				
		}
	}
</script>

<style scoped lang="scss">
	@import url("@/components/watch-login/css/icon.css");

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 128rpx;
		box-sizing: border-box;
	}
	
	.clearCache {
		width: 100%;
		text-align: center;
		text-decoration: underline;
		color: #ccc;
		margin-top: 18rpx;
	}
	
	/* 头部 logo */
	.header {
		width: 161rpx;
		height: 161rpx;
		box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		background-color: #000000;
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
		
		image {
			width: 161rpx;
			height: 161rpx;
			border-radius: 50%;
		}
	}

	

	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}
	//* 主体

	.wbutton {
		margin-top: 96rpx;
	}
	//* 登录按钮
	
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
		
		text {
			font-size: 24rpx;
			margin-left: 15rpx;
			margin-right: 15rpx;
		}
	}
	//* 底部
</style>
