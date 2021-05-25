/*
 * @description: 扫描页面接口, 包含动作: 查询、新增、编辑
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021-04-17 21:17:03
 * @LastEditors: duQings duqings@foxmail.com
 * @LastEditTime: 2021-04-19 00:40:07
 * @FilePath: \workreport-app\common\http\http.api.module\index\index.js
 * 
 * 详细: 
 *  - 查询: 查询当前选中表单信息
 *  - 新增: {
 * 		查询: 根据员工工号查询员工信息、根据工序编号查询产品信息
 * 		保存: 保存表单内容
 *  }
 *  - 修改: 涉及步骤与新增类似
 */
let Index = (vm) => {
	return {
		//* 获取员工信息
		getUserInfo: (params = {}) => {
			return vm.$u.post('Controller/WorkNote.ashx?action=GetUserNameById', params);
		},
		//* 获取产品信息
		getProductInfo: (params = {}) => {
			return vm.$u.post('Controller/WorkNote.ashx?action=GetProcessInfo', params);
		},
		//* 保存表单
		saveForm: (params = {}) => {
			return vm.$u.post('Controller/WorkNote.ashx?action=Insert', params);
		},
		//* 修改表单
		updateForm: (params = {}) => {
			return vm.$u.post('Controller/WorkNote.ashx?action=Update', params);
		},
		//* 查询计件报工记录
		getRecordList: (params = {}) => {
			return vm.$u.post('Controller/WorkNote.ashx?action=List', params);
		},
		//* 查询一行报工记录
		getFormInfo: (params = {}) => {
			return vm.$u.post('Controller/WorkNote.ashx?action=GetById', params);
		}
	}
}

export default Index;
