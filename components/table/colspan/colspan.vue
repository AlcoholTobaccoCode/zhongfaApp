<template>
	<view class="container">
		<view class="d-table">
			<view class="d-tr">
				<view class="d-td">
					<view class="d-table">
						<view class="d-tr">
							<view class="d-th">张三</view>
							<view class="d-th border-left">李四</view>
							<view class="d-th border-left">王五</view>
						</view>
					</view>
				</view>
			</view>
			<view class="d-tr">
				<view class="d-td">
					<view class="d-table">
						<view class="d-tr">
							<view class="d-td" style="width:66.6%">
								张三
							</view>
							<view class="d-td border-left">
								王五
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="d-tr">
				<view class="d-td">
					<view class="d-table">
						<view class="d-tr">
							<view class="d-td">张三</view>
							<view class="d-td border-left">李四</view>
							<view class="d-td border-left">王五</view>
						</view>
					</view>
				</view>
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
