<template>
	<view class="main">
		<u-navbar title="新增明细行" v-if="!isInDingD" :is-back="true" :custom-back="goBack" :background="{backgroundColor: '#007aff'}"
			title-color="#fff" back-icon-color="#fff"></u-navbar>
			<view class="card-shadow add-detail">
				<u-form :model="detailForm" ref="uForm" :label-style="labelStyle" class="main-form">
					<u-form-item prop="model" label="型号" label-width="150">
						<text class="required">*</text>
						<u-input v-model="detailForm.model" placeholder="存货名称" input-align="right" />
					</u-form-item>
					<!-- E 型号 -->
					<u-form-item prop="unit" label="单位" label-width="150">
						<text class="required">*</text>
						<u-input v-model="detailForm.unit" placeholder="规格、型号" input-align="right" />
					</u-form-item>
					<!-- E 单位 -->
					<u-form-item prop="price" label="单价" label-width="150">
						<text class="required">*</text>
						<u-input v-model="detailForm.price" placeholder="输入单价" input-align="right" />
					</u-form-item>
					<!-- E 单价 -->
					<u-form-item prop="number" label="数量" label-width="150">
						<text class="required">*</text>
						<u-input v-model="detailForm.number" placeholder="数量" input-align="center" />
						<u-number-box v-model="detailForm.number" :min="1" @change="numberChange"></u-number-box>
					</u-form-item>
					<!-- E 数量 -->
				</u-form>
				<!-- E 表单部分 -->
			</view>
			<view class="submit-btn u-flex">
				<u-button type="primary" :ripple="true" @click="addDetail">确认</u-button>
			</view>
			<!-- E 按钮组 -->
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				isInDingD: false,
				//* S *************************** 表单样式、数据 相关
				labelStyle: { //* 表单样式
					fontSize: '26rpx',
					paddingLeft: '16rpx',
					color: '#5b5858'
				},
				detailForm: {
					model: '', //* 型号
					unit: '', //* 单位
					price: '', //* 单价
					number: 0 //* 数量
				},
				orderTypeList: [{
						id: 0,
						text: '新增订单'
					},
					{
						id: 1,
						text: '变更订单'
					}
				],
				formRules: {
					model: [{
						required: true,
						message: '请输入型号',
						trigger: ['change', 'blur'],
					}],
					unit: [{
						required: true,
						message: '请输入单位',
						trigger: ['change', 'blur']
					}],
					price: [{
						required: true,
						message: '请输入单价',
						trigger: ['change', 'blur']
					}]
				},
				//* E *************************** 表单样式、数据 相关
			};
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.formRules);
		},
		mounted() {
			that = this;
		},
		methods: {
			//* 返回
			goBack() {
				this.$util.navTo('/pages/order/add/index');
			},
			//* 数量改变
			numberChange(e) {
				this.detailForm.number = e.value;
			},
			//* 新增确认
			addDetail() {
				this.$refs.uForm.validate(valid => {
					let model = this.detailForm.model,
						unit = this.detailForm.unit,
						price = this.detailForm.price,
						number = this.detailForm.number;
					if (+(number) <= 0) {
						this.$util.msg('请输入正确的数量');
						return; 
					}
					// console.info('🐱‍🏍 ~ 符合提交条件！');
					let insert = {
						model,
						unit,
						price,
						number
					}
					// console.info('🐱 ~ 输入的数据： ', insert);
					this.$cache.put('addDetail', insert);
					this.$util.navTo('/pages/order/add/index');
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100vh;
	}
	//* E 根盒子
	
	.submit-btn {
		padding: 6rpx 52rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 19981125;
		background-color: #fff;
		box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, .16);
	
		.u-btn {
			width: 100%;
			margin: 0 20rpx;
		}
	}
	
	//* E 按钮组
	
</style>
