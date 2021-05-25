/*
 * @description: http api 全局管理
 * @Maintainer: duqings@foxmail.com
 * @Date: 2021年3月30日
 * @use: import httpApi from '@/common/http/http.api';
 */
//* 登录
import Login from "@/common/http/http.api.module/login/index";

const install = (Vue, vm) => {
	vm.$u.api = {
		Login: Login(vm)
	}
}

export default {
	install
}
