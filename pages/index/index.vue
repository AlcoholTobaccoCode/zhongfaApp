<template>
	<view class="main">
		<u-navbar title="首页" v-if="!isInDingD" :is-back="false" :background="{backgroundColor: '#007aff'}"
			title-color="#fff" back-icon-color="#fff"></u-navbar>

		<view class="index-quick-tabBar-main">
			<view class="index-quick-tabBar-title">操作管理</view>

			<u-grid :col="2" :border="false">

				<!-- S 部长、沈总 按钮 -->
				<u-grid-item :custom-style="quickTabbarCustomStyle" v-if="isAdmin">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(315deg, #e65c00 , #f9d423)'}"
						:full="true" 
						@click="jumpPage('url')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-daishenhe"></text>
								</view>
								<view class="task-name">
									<text>待审列表</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 待审列表 -->

				<u-grid-item :custom-style="quickTabbarCustomStyle" v-if="isAdmin">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(315deg, #005bea 0%, #00c6fb 100%)'}"
						:full="true" 
						@click="jumpPage('url')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-alreadyaudit"></text>
								</view>
								<view class="task-name">
									<text>已审核列表</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 已审核列表 -->
				<!-- E 部长、沈总 按钮 -->

				<!-- S 业务员 按钮 -->
				<u-grid-item :custom-style="quickTabbarCustomStyle" v-if="!isAdmin">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(315deg, #e65c00 , #f9d423)'}"
						:full="true" 
						@click="jumpPage('/pages/order/add/index')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-xinjiandingdan1"></text>
								</view>
								<view class="task-name">
									<text>新建订单</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 新建订单 -->

				<u-grid-item :custom-style="quickTabbarCustomStyle" v-if="!isAdmin">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(315deg, #005bea 0%, #00c6fb 100%)'}"
						:full="true" 
						@click="jumpPage('url')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-lishidingdan1"></text>
								</view>
								<view class="task-name">
									<text>历史订单</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 历史订单 -->
				<!-- E 业务员 按钮 -->

				<!-- S 通用 按钮 -->
				<u-grid-item :custom-style="quickTabbarCustomStyle">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(315deg, #ff9569 0%, #e92758 100%)'}"
						:full="true" 
						@click="jumpPage('url')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-piliangguanbidingdan"></text>
								</view>
								<view class="task-name">
									<text>关闭订单</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 关闭订单 -->

				<u-grid-item :custom-style="quickTabbarCustomStyle">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(315deg, #00d2ff , #928dab)'}"
						:full="true" 
						@click="jumpPage('url')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-yingshouzhangkuan1"></text>
								</view>
								<view class="task-name">
									<text>应收账款</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 应收账款 -->

				<u-grid-item :custom-style="quickTabbarCustomStyle">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(to right, #00c9ff , #92fe9d )'}"
						:full="true" 
						@click="jumpPage('url')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-huowudanwei"></text>
								</view>
								<view class="task-name">
									<text>暂发单</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 暂发单 -->

				<u-grid-item :custom-style="quickTabbarCustomStyle">
					<u-card margin="20rpx" :head-style="componentHide" :foot-style="componentHide"
						:body-style="{padding: '20rpx',backgroundImage: 'linear-gradient(to right, #00c9ff , #92fe9d )'}"
						:full="true" 
						@click="jumpPage('url')">
						<view class="" slot="body">
							<view class="u-body-item u-flex u-flex-wrap u-border-bottom u-col-between u-p-t-0">
								<view class="task-icon">
									<text class="yaicon icon-yingshouzhangkuan"></text>
								</view>
								<view class="task-name">
									<text>销售收款</text>
								</view>
							</view>
						</view>
					</u-card>
				</u-grid-item>
				<!-- E 销售收款 -->
				<!-- E 通用 按钮 -->
			</u-grid>
		</view>
		<!-- E 快捷导航 -->
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				//* 钉钉环境监测
				isInDingD: false,
				//* 业务员、审批员监测
				isAdmin: false,
				//* S 快捷导航
				componentHide: {
					display: 'none'
				},
				quickTabbarCustomStyle: { //* 快捷导航 - 方块子项自定义样式
					padding: '0 20rpx'
				}
				//* E 快捷导航
			};
		},
		mounted() {
			that = this;

		},
		methods: {
			//* S 公共方法
			jumpPage(url, setting) { //* 页面跳转
				this.$util.assert(url, '目标跳转的 url 不能为空');
				console.info('url', url);
				console.info('setting', setting);
				this.$util.navTo(url);
			},
			//* E 公共方法
		},
	}
</script>

<style scoped lang="scss">
	//* S 快捷导航
	.index-quick-tabBar-main {
		background-color: #fff;

		.index-quick-tabBar-title {
			font-size: 36rpx;
			padding: 8rpx 20rpx;
			padding-top: 26rpx;
			border-bottom: 2rpx solid #e6e6e6;
		}

		//* 标题

		.u-grid-item {
			min-height: 193.6rpx;

			u-card {
				width: 100%;
			}

			//* E 兼容微信小程序
		}

		.u-body-item {
			position: relative;
			border-radius: 10rpx;
			display: flex;
			color: #fff;

			&::after {
				border: none;
			}

			//* E 去底部边框线

			.task-icon {
				padding: 20rpx;

				.yaicon {
					font-size: 68rpx;
				}

			}

			//* 字体


			.task-name {
				display: flex;
				// flex-direction: column;
				align-items: flex-end;
				font-size: 36rpx;
			}

			//* E 任务类型名

			.u-image,
			u-image {
				position: absolute;
				bottom: -15px;
				right: 0;
			}

			//* E 说明图片
		}

		//* E 快捷导航个体
	}

	//* E 快捷导航
</style>
