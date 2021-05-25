/*
 * @description: 
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021-04-20 22:43:13
 * @LastEditors: duQings duqings@foxmail.com
 * @LastEditTime: 2021-04-20 22:53:11
 * @FilePath: \workreport-app\utils\Config.ts
 */
import {EPlatform} from '@/utils/platform/EPlatform';
import {isH5, Platform} from '@/utils/platform/Platform';
 
/**配置信息*/
export default class Config {
  /**http请求根目录*/
  static get httpBaseUrl(): string {
    if (isH5) {
      return '/'
    } else {
      return 'http://demo.cn/'
    }
  }
}