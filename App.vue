<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch');
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss"; //* uView 样式支持
	@import "@/common/css/yaicon/iconfont.css"; //* 扩展 icon 字体图标
	@import '@/common/css/table.scss'; //* 表格样式
	/*每个页面公共css */
	
	.card-shadow {
		box-sizing: border-box;
		width: 96%;
		margin: 0 auto;
		padding-right: 20rpx;
		margin-top: 18rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, .1);
		border-radius: 12rpx;
		background-color: #fff;
	}
	//* E 卡片样式
	
	.required {
		color: $u-type-error;
	}
	//* E 必填样式
	
	.card-title {
		font-size: 36rpx;
		padding: 8rpx 20rpx;
		border-bottom: 2rpx solid #e6e6e6;
	}
	
</style>
