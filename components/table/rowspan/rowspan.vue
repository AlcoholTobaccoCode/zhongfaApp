<template>
	<view class="container">
		<view class="d-table">
			<view class="d-tr">
				<view class="d-th">张三</view>
				<view class="d-th">李四</view>
				<view class="d-th">王五</view>
			</view>
			<view class="d-tr">
				<view class="d-td">
					<view class="d-table">
						<view class="d-tr">
							<view class="d-td">张三</view>
						</view>
					</view>
				</view>
				<view class="d-td">
					<view class="d-table">
						<view class="d-tr">
							<view class="d-td border-bottom">李四</view>
						</view>
						<view class="d-tr">
							<view class="d-td border-bottom">李四</view>
						</view>
						<view class="d-tr">
							<view class="d-td border-bottom">李四</view>
						</view>
					</view>
				</view>
				<view class="d-td">
					<view class="d-table">
						<view class="d-tr">
							<view class="d-td border-bottom">王五</view>
						</view>
						<view class="d-tr">
							<view class="d-td border-bottom">王五</view>
						</view>
						<view class="d-tr">
							<view class="d-td border-bottom">王五</view>
						</view>
					</view>
				</view>
			</view>
			<view class="d-tr">
				<view class="d-td">张三</view>
				<view class="d-td">李四</view>
				<view class="d-td">王五</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 10rpx;
	}
</style>
