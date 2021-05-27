<template>
	<view class="main">
		<u-navbar title="订单新增" v-if="!isInDingD" :is-back="true" :custom-back="goIndex"
			:background="{backgroundColor: '#007aff'}" title-color="#fff" back-icon-color="#fff"></u-navbar>
		<!-- <u-sticky offset-top="-90"> -->
		<u-sticky>
			<view class="view-tabs">
				<u-tabs :list="tabsList" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			</view>
		</u-sticky>
		<view class="content">
			<view class="view-content" v-if="current === 0">
				<u-form :model="orderForm" ref="uForm" :label-style="labelStyle" class="main-form card-shadow">
					<u-form-item prop="orderType" label="订单类型" label-width="150">
						<text class="required">*</text>
						<u-radio-group v-model="orderForm.orderType" class="radio-group">
							<u-radio v-for="(item, index) in orderTypeList" :key="index" :name="item.id"
								:disabled="item.disabled">
								{{ item.text }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<!-- E 订单类型 -->
					<u-form-item prop="customerName" label="客户" label-width="150">
						<text class="required">*</text>
						<u-input v-model="orderForm.customerName" placeholder="单击选择" input-align="right"
							:disabled="true" />
					</u-form-item>
					<!-- E 客户 -->
					<u-form-item prop="salesmanName" label="业务员" label-width="150">
						<text class="required">*</text>
						<u-input v-model="orderForm.salesmanName" placeholder="选择客户后自动带出" input-align="right"
							:disabled="true" />
					</u-form-item>
					<!-- E 业务员 -->
					<u-form-item prop="departmentName" label="部门" label-width="150">
						<text class="required">*</text>
						<u-input v-model="orderForm.departmentName" placeholder="选择客户后自动带出" input-align="right"
							:disabled="true" />
					</u-form-item>
					<!-- E 部门 -->
					<u-form-item prop="remark" label="备注" label-width="150">
						<u-input v-model="orderForm.remark" placeholder="备注自行选择输入,非必填" input-align="right" />
					</u-form-item>
					<!-- E 备注 -->
				</u-form>
				<!-- E 表单部分 -->

				<view class="card-shadow add-detail">
					<view class="detail-title">
						<u-button type="primary" size="mini" :ripple="true" throttle-time="800" @click="openAddDetail">
							<u-icon size="40" name="plus-circle-fill"></u-icon>
							<text>新增明细行</text>
						</u-button>
					</view>
					<view class="detail-content">
						<u-swipe-action :index="index" :show="item.show" v-for="(item, index) in addDetailList"
							:key="item.index" @click="swipeActionClick" @open="swipeActionOpen" :options="options">
							<view class="u-border-bottom">
								<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
								<view class="title-wrap add-detail-item">
									<view class="item-single">型号: {{ item.model }}</view>
									<view class="item-single">单位: {{ item.unit }}</view>
									<view class="item-single">单价: {{ item.price }}</view>
									<view class="item-single">数量: {{ item.number }}</view>
								</view>
							</view>
						</u-swipe-action>
					</view>

					<u-empty v-if="!addDetailList.length" text="新增明细行为空" mode="list"></u-empty>
					<!-- 新增明细行列表为空时提示 -->
				</view>
				<!-- E 新增明细行 -->
			</view>
			<!-- E 订单详情 -->
			<view class="view-content" v-if="current === 1">
				采购情况
			</view>
			<!-- E 采购情况 -->

			<view class="view-content" v-if="current === 2">
				未执行订单
			</view>
			<!-- E 未执行订单 -->
		</view>
		<view class="submit-btn u-flex">
			<u-button type="primary" :ripple="true" @click="submit(0)">暂存</u-button>
			<u-button type="warning" :ripple="true" @click="submit(1)">提交</u-button>
		</view>

		<u-popup v-model="addShow" mode="center" width="100%" height="100%" z-index="19989999">
			<view class="main">
				<u-navbar title="新增明细行" :is-back="true" :custom-back="closeDetailPop"
					:background="{backgroundColor: '#007aff'}" title-color="#fff" back-icon-color="#fff"></u-navbar>
				<view class="card-shadow add-detail">
					<u-form :model="detailForm" ref="addDetailRef" :label-style="labelStyle" class="main-form">
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
							<!-- <u-number-box v-model="detailForm.number" :min="1" @change="numberChange"></u-number-box> -->
						</u-form-item>
						<!-- E 数量 -->
					</u-form>
					<!-- E 表单部分 -->
				</view>
				<view class="submit-btn u-flex">
					<u-button type="primary" :ripple="true" @click="addDetailPush">确认</u-button>
				</view>
				<!-- E 按钮组 -->
			</view>
		</u-popup>
		<!-- E 新增明细行 -->
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				addShow: false,
				isInDingD: false,
				//* S *************************** tabs 相关
				tabsList: [{
					name: '订单详情'
				}, {
					name: '采购情况'
				}, {
					name: '未执行订单'
				}],
				current: 0,
				//* E *************************** tabs 相关
				//* S *************************** 表单样式、数据 相关
				labelStyle: { //* 表单样式
					fontSize: '26rpx',
					paddingLeft: '16rpx',
					color: '#5b5858'
				},
				orderForm: {
					orderType: 0, //* 订单类型, 后续跟随后台字段
					customerId: null, //* 客户 id
					customerName: '', //* 客户姓名
					salesmanId: null, //* 业务员 id
					salesmanName: '', //* 业务员姓名
					departmentId: null, //* 部门 id
					departmentName: '', //* 部门姓名
					remark: '' //* 备注
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
					customerId: [{
						required: true,
						message: '请选择客户',
						trigger: ['change', 'blur'],
					}],
					salesmanId: [{
						min: 5,
						message: '业务员不能为空，请选择客户',
						trigger: 'change'
					}],
					departmentId: [{
						min: 5,
						message: '业务员不能为空，请选择客户',
						trigger: 'change'
					}]
				},
				//* E *************************** 表单样式、数据 相关
				//* S *************************** 新增明细行 相关
				addDetailList: [], //* 已添加明细
				disabled: false,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],

				//* E *************************** 新增明细行 相关
				//* S *************************** 表单样式、数据 相关
				detailForm: {
					model: '', //* 型号
					unit: '', //* 单位
					price: '', //* 单价
					number: 0 //* 数量
				},
				addDetailFormRules: {
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
			//* 新增页面表单规则
			this.$refs.uForm.setRules(this.formRules);
		},
		mounted() {
			that = this;
		},
		methods: {
			//* S *********************** 公共
			//* 返回首页
			goIndex() {
				uni.showModal({
					title: '注意！',
					content: '确定返回？请注意数据保存。',
					success(res) {
						if (res.confirm) {
							that.$util.navTo('/pages/index/index');
						}
					}
				});
			},
			//* 弹出层中按钮关闭弹出层
			closeDetailPop() {
				this.addShow = !this.addShow;
			},
			//* tabs 切换事件
			tabsChange(index) {
				this.current = index;
			},
			//* 新增明细行
			openAddDetail() {
				console.info('新增明细行');
				// this.$util.navTo('/pages/order/other/detailLine');
				this.addShow = !this.addShow;
				if (this.addShow) {
					//* 新增明细行表单规则
					setTimeout(() => {
						this.$refs.addDetailRef.setRules(this.addDetailFormRules);
					}, 200);
				}
			},
			//* E *********************** 公共
			//* S *********************** 新增明细行子项相关
			//* 新增明细行子项滑动删除
			swipeActionClick(index, index1) {
				this.addDetailList[index].show = false;
				this.addDetailList.splice(index, 1);
				// this.$u.toast(`删除了第${index}个cell`);
			},
			// 滑动如果打开一个的时候，不需要关闭其他，则无需实现本方法
			swipeActionOpen(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.addDetailList[index].show = true;
				this.addDetailList.map((val, idx) => {
					if (index != idx) this.addDetailList[idx].show = false;
				})
			},
			//* 新增明细行数量改变
			numberChange(e) {
				this.detailForm.number = e.value;
			},
			//* E *********************** 新增明细行子项相关
			//* 新增明细行确认
			addDetailPush() {
				this.$refs.addDetailRef.validate(valid => {
					let model = this.detailForm.model,
						unit = this.detailForm.unit,
						price = this.detailForm.price,
						number = +(this.detailForm.number);
					if (+(number) <= 0) {
						this.$util.msg('请输入正确的数量');
						return;
					}
					let insert = {
						model,
						unit,
						price,
						number,
						show: false //* 滑动
					}
					// console.info('🐱‍🏍 ~ 输入的数据： ', insert);
					this.addDetailList.push(insert);
					this.addShow = !this.addShow;
					//* 清空
					for(let i in this.detailForm) {
						this.detailForm[i] = '';
					}
				});
			},
			//* 提交事件
			submit(val) { //* 0: 暂存; 1: 提交
				switch (+(val)) {
					case 0:
						console.info('🐱‍👓 ~ 提交操作是: 暂存！');
						break;
					case 1:
						console.info('🐱‍👓 ~ 提交操作是: 提交！');
						break;
					default:
						console.info('😒 未知的提交操作！');
						break;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		min-height: 100vh;
		height: auto;
		background-color: #f1eded;
		padding-bottom: 94rpx;
	}

	//* 根盒子

	.radio-group {
		margin-left: auto;
	}

	//* 单选样式

	//* 
	.add-detail {
		margin-bottom: 20rpx;
		min-height: 400rpx;
		height: auto;

		.detail-title {
			font-size: 36rpx;
			padding: 8rpx 20rpx;
			border-bottom: 2rpx solid #e6e6e6;

			button {
				padding: 0 20rpx;

				text {
					font-size: 26rpx;
					font-weight: 700;
					display: inline-block;
					padding: 0 10rpx;
				}
			}
		}

	}

	//* 表单、新增明细行样式

	.detail-content {
		padding: 20rpx;

		.u-border-bottom {
			border-bottom: 2rpx solid #e6e6e6;
		}
	}

	//* 明细单项盒子

	.add-detail-item {
		display: flex;
		flex-wrap: wrap;

		.item-single {
			padding: 16rpx;
			width: 50%;
			flex: auto;
			word-break: break-all;
		}

	}

	//* 新增明细行单项样式


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
