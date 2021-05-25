"use strict";
exports.__esModule = true;
/**枚举EPlatform*/
var EPlatform;
(function (EPlatform) {
    /**App*/
    EPlatform["AppPlus"] = "APP-PLUS";
    /**App nvue*/
    EPlatform["AppPlusNvue"] = "APP-PLUS-NVUE";
    /**H5*/
    EPlatform["H5"] = "H5";
    /**微信小程序*/
    EPlatform["MpWeixin"] = "MP-WEIXIN";
    /**支付宝小程序*/
    EPlatform["MpAlipay"] = "MP-ALIPAY";
    /**百度小程序*/
    EPlatform["MpBaidu"] = "MP-BAIDU";
    /**字节跳动小程序*/
    EPlatform["MpToutiao"] = "MP-TOUTIAO";
    /**QQ小程序*/
    EPlatform["MpQq"] = "MP-QQ";
    /**360小程序*/
    EPlatform["Mp360"] = "MP-360";
    /**微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序*/
    EPlatform["Mp"] = "MP";
    /**快应用通用(包含联盟、华为)*/
    EPlatform["QuickappWebview"] = "quickapp-webview";
    /**快应用联盟*/
    EPlatform["QuickappWebviewUnion"] = "quickapp-webview-union";
    /**快应用华为*/
    EPlatform["QuickappWebviewHuawei"] = "quickapp-webview-huawei";
})(EPlatform = exports.EPlatform || (exports.EPlatform = {}));
/**使用条件编译获取平台信息*/
function ifDefPlatform() {
    var platform;
    //#ifdef APP-PLUS
    platform = EPlatform.AppPlus;
    //#endif
    //#ifdef APP-PLUS-NVUE
    platform = EPlatform.AppPlusNvue;
    //#endif
    //#ifdef H5
    platform = EPlatform.H5;
    //#endif
    //#ifdef MP-WEIXIN
    platform = EPlatform.MpWeixin;
    //#endif
    //#ifdef MP-ALIPAY
    platform = EPlatform.MpAlipay;
    //#endif
    //#ifdef MP-BAIDU
    platform = EPlatform.MpBaidu;
    //#endif
    //#ifdef MP-TOUTIAO
    platform = EPlatform.MpToutiao;
    //#endif
    //#ifdef MP-QQ
    platform = EPlatform.MpQq;
    //#endif
    //#ifdef MP-360
    platform = EPlatform.Mp360;
    //#endif
    //#ifdef MP
    platform = EPlatform.Mp;
    //#endif
    //#ifdef quickapp-webview
    platform = EPlatform.QuickappWebview;
    //#endif
    //#ifdef quickapp-webview-union
    platform = EPlatform.QuickappWebviewUnion;
    //#endif
    //#ifdef quickapp-webview-huawei
    platform = EPlatform.QuickappWebviewHuawei;
    //#endif
    return platform;
}
exports.ifDefPlatform = ifDefPlatform;
/**平台类型*/
exports.Platform = ifDefPlatform();
/**默认导出平台类型*/
exports["default"] = exports.Platform;
/**App*/
exports.isAppPlus = exports.Platform == EPlatform.AppPlus;
/**App nvue*/
exports.isAppPlusNvue = exports.Platform == EPlatform.AppPlusNvue;
/**H5*/
exports.isH5 = exports.Platform == EPlatform.H5;
/**微信小程序*/
exports.isMpWeixin = exports.Platform == EPlatform.MpWeixin;
/**支付宝小程序*/
exports.isMpAlipay = exports.Platform == EPlatform.MpAlipay;
/**百度小程序*/
exports.isMpBaidu = exports.Platform == EPlatform.MpBaidu;
/**字节跳动小程序*/
exports.isMpToutiao = exports.Platform == EPlatform.MpToutiao;
/**QQ小程序*/
exports.isMpQq = exports.Platform == EPlatform.MpQq;
/**360小程序*/
exports.isMp360 = exports.Platform == EPlatform.Mp360;
/**微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序*/
exports.isMp = exports.Platform == EPlatform.Mp;
/**快应用通用(包含联盟、华为)*/
exports.isQuickappWebview = exports.Platform == EPlatform.QuickappWebview;
/**快应用联盟*/
exports.isQuickappWebviewUnion = exports.Platform == EPlatform.QuickappWebviewUnion;
/**快应用华为*/
exports.isQuickappWebviewHuawei = exports.Platform == EPlatform.QuickappWebviewHuawei;
/**是否开发环境*/
exports.isDevelopment = process.env.NODE_ENV == 'development';
/**是否线上环境*/
exports.isProduction = process.env.NODE_ENV == 'production';
/**抖音小程序*/
exports.isMpDouyinApp = uni.getSystemInfoSync().appName == 'Douyin';
/**头条小程序*/
exports.isMpToutiaoApp = uni.getSystemInfoSync().appName == 'Toutiao';
