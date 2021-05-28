<template>
	<view class="container">
		<view class="d-table">
			<view class="d-tr" v-for="i in 5" :key="i">
				<view class="d-td" style="width: 100rpx;">
					<checkbox-group name="">
						<label>
							<checkbox value="1" /><text></text>
						</label>
					</checkbox-group>
				</view>
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
		checkbox{
			transform: scale(0.8);
		}
	}
</style>
