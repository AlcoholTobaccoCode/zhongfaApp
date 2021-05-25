"use strict";
exports.__esModule = true;
/*
 * @description:
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021-04-20 22:49:23
 * @LastEditors: duQings duqings@foxmail.com
 * @LastEditTime: 2021-04-20 22:50:20
 * @FilePath: \workreport-app\util\platform\Platform.ts
 */
/**类型Platform*/
var EPlatform_ts_1 = require("./EPlatform.js");
/**使用条件编译获取平台信息*/
function ifDefPlatform() {
    var platform;
    //#ifdef APP-PLUS
    platform = EPlatform_ts_1.EPlatform.AppPlus;
    //#endif
    //#ifdef APP-PLUS-NVUE
    platform = EPlatform_ts_1.EPlatform.AppPlusNvue; 
    //#endif
    //#ifdef H5
    platform = EPlatform_ts_1.EPlatform.H5;
    //#endif
    //#ifdef MP-WEIXIN
    platform = EPlatform_ts_1.EPlatform.MpWeixin;
    //#endif
    //#ifdef MP-ALIPAY
    platform = EPlatform_ts_1.EPlatform.MpAlipay;
    //#endif
    //#ifdef MP-BAIDU
    platform = EPlatform_ts_1.EPlatform.MpBaidu;
    //#endif
    //#ifdef MP-TOUTIAO
    platform = EPlatform_ts_1.EPlatform.MpToutiao;
    //#endif
    //#ifdef MP-QQ
    platform = EPlatform_ts_1.EPlatform.MpQq;
    //#endif
    //#ifdef MP-360
    platform = EPlatform_ts_1.EPlatform.Mp360;
    //#endif
    //#ifdef MP
    platform = EPlatform_ts_1.EPlatform.Mp;
    //#endif
    //#ifdef quickapp-webview
    platform = EPlatform_ts_1.EPlatform.QuickappWebview;
    //#endif
    //#ifdef quickapp-webview-union
    platform = EPlatform_ts_1.EPlatform.QuickappWebviewUnion;
    //#endif
    //#ifdef quickapp-webview-huawei
    platform = EPlatform_ts_1.EPlatform.QuickappWebviewHuawei;
    //#endif
    return platform;
}
/**平台类型*/
exports.Platform = ifDefPlatform();
/**默认导出平台类型*/
exports["default"] = exports.Platform;
/**App*/
exports.isAppPlus = exports.Platform == EPlatform_ts_1.EPlatform.AppPlus;
/**App nvue*/
exports.isAppPlusNvue = exports.Platform == EPlatform_ts_1.EPlatform.AppPlusNvue;
/**H5*/
exports.isH5 = exports.Platform == EPlatform_ts_1.EPlatform.H5;
/**微信小程序*/
exports.isMpWeixin = exports.Platform == EPlatform_ts_1.EPlatform.MpWeixin;
/**支付宝小程序*/
exports.isMpAlipay = exports.Platform == EPlatform_ts_1.EPlatform.MpAlipay;
/**百度小程序*/
exports.isMpBaidu = exports.Platform == EPlatform_ts_1.EPlatform.MpBaidu;
/**字节跳动小程序*/
exports.isMpToutiao = exports.Platform == EPlatform_ts_1.EPlatform.MpToutiao;
/**QQ小程序*/
exports.isMpQq = exports.Platform == EPlatform_ts_1.EPlatform.MpQq;
/**360小程序*/
exports.isMp360 = exports.Platform == EPlatform_ts_1.EPlatform.Mp360;
/**微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序*/
exports.isMp = exports.Platform == EPlatform_ts_1.EPlatform.Mp;
/**快应用通用(包含联盟、华为)*/
exports.isQuickappWebview = exports.Platform == EPlatform_ts_1.EPlatform.QuickappWebview;
/**快应用联盟*/
exports.isQuickappWebviewUnion = exports.Platform == EPlatform_ts_1.EPlatform.QuickappWebviewUnion;
/**快应用华为*/
exports.isQuickappWebviewHuawei = exports.Platform == EPlatform_ts_1.EPlatform.QuickappWebviewHuawei;
