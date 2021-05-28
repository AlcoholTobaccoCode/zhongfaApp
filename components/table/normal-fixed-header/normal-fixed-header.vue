<template>
	<view class="container">
		<view class="d-table">
			<view class="d-tr">
				<view class="d-th">张三</view>
				<view class="d-th">李四</view>
				<view class="d-th">王五</view>
			</view>
		</view>
		<scroll-view style="height: 200rpx;" class="border-bottom" scroll-y>
			<view class="d-table">
				<view class="d-tr" v-for="i in 10" :key="i">
					<view class="d-td">张三</view>
					<view class="d-td">李四</view>
					<view class="d-td">王五</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.container {
	padding: 10rpx;
	.d-tr{
		&:first-child{
			.d-td{
				border-top: 0;
			}
		}
		&:last-child{
			.d-td{
				border-bottom: 0;
			}
		}
	}
}
</style>
