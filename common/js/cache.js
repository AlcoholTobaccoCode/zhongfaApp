/*
 * @description: 缓存数据优化
 * @Maintainer: duqings@foxmail.com
 * @Date: 2021年3月29日
 * @use: import cache from '@/common/js/cache'  
 * 
 * 使用方法 【  
 *     一、设置缓存  
 *         string    cache.put('k', 'string你好啊');  
 *         json      cache.put('k', { "b": "3" }, 2);  
 *         array     cache.put('k', [1, 2, 3]);  
 *         boolean   cache.put('k', true);  
 *     二、读取缓存  
 *         默认值    cache.get('k')  
 *         string    cache.get('k', '你好')  
 *         json      cache.get('k', { "a": "1" })  
 *     三、移除/清理    
 *         移除: cache.remove('k');
 *         清理：cache.clear();   
 * 】  
 * @type {String}
 */
const postfix = '_zhongFaTimeCache'; // 时间缓存前缀
const sysName = 'ZhongFa_'; //* 缓存名前缀
/**  
 * 设置缓存   
 * @param  {[type]} k [键名]  
 * @param  {[type]} v [键值]  
 * @param  {[type]} t [过期时间、单位秒] 不设置则永不超时
 */  
function put(k, v, t) {
    uni.setStorageSync(sysName + k, v)   
    let seconds = parseInt(t);  
    if (seconds > 0) {  
        let timestamp = Date.parse(new Date());  
        timestamp = timestamp / 1000 + seconds;  
        uni.setStorageSync(k + postfix, timestamp + "")  
    } else {  
        uni.removeStorageSync(k + postfix)  
    }  
}  

/**  
 * 获取缓存   
 * @param  {[type]} k   [键名]  
 * @param  {[type]} def [获取为空时默认]  
 */  
function get(k, def) {
    /**
     * TODO
     * 超时是否删除
    */
    let deadtime = parseInt(uni.getStorageSync(k + postfix)); //* 校验是否超时
    if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
            if (def) {
                return def;  
            } else {  
                return false;  
            }  
        }  
    }  
    let res = uni.getStorageSync(sysName + k);  
    if (res) {  
        return res;  
    } else {  
        if (def == undefined  || def == "") {  
            def = false;   
        }  
        return def;  
    }  
}  
/**
 * 删除缓存
 * @param {string} k [键名]
 * */
function remove(k) {  
    uni.removeStorageSync(sysName + k); //* 移除
    uni.removeStorageSync(k + postfix); //* 移除失效时间
}

//* 清空所有缓存
function clear() {
	uni.clearStorage();
}

//* 获取当前用户信息
function getUserInfo() {
    return uni.getStorageSync(sysName + 'userInfo');
}

export default {
	put,
    get,
	remove,
    getUserInfo,
	clear
}
