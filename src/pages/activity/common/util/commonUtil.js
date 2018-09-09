/**
 * 过滤空数据成空字符
 * @param {String | undefined | null} data 需要过滤的数据
 * @returns {String} 过滤后的数据
 */
export function filterData (data) {
    return data || '';
}

/**
 * 过滤空数据成空字符
 * @param {Object} data 需要过滤的数据
 * @returns {Object} 过滤后的数据
 */
export function filterObject (data) {
    if (data) {
        for (let key in data) {
            data[key] = filterData(data[key]);
        }
    }
    return data;
}

/**
 * 判断是否为微信或app环境
 * @param {Object} $tuhu tuhu对象
 * @returns {Boolean} 判断设备环境
 */
export function isWxOrApp ($tuhu) {
    return $tuhu.device().isApp || $tuhu.device().isWeixin;
}

/**
 * 判断是否为app环境
 * @param {Object} $tuhu tuhu对象
 * @returns {Boolean} 判断设备环境
 */
export function isApp ($tuhu) {
    return $tuhu.device().isApp;
}

/**
 * 判断是否为微信环境
 * @param {Object} $tuhu tuhu对象
 * @returns {Boolean} 判断设备环境
 */
export function isWx ($tuhu) {
    return $tuhu.device().isWeixin;
}

/**
 * 判断是否为tuhu app环境
 * @param {Object} $tuhu tuhu对象
 * @returns {Boolean} 判断设备环境
 */
export function isTuhuApp ($tuhu) {
    return $tuhu.device().tuhuAndroid || $tuhu.device().tuhuIos;
}

/**
 * 跳转到优惠券列表页面
 * @param {Object} $tuhu tuhu对象
 */
export function goToCouponPage ($tuhu) {
    if (isApp($tuhu)) {
        location.href = 'tuhu:/coupons';
    } else {
        location.href = 'https://wx.tuhu.cn/User/PromotionCodeList';
    }
}

/**
 * 大翻盘图片过滤
 * @param {Object} item 参数对象
 * @returns {Object} 包含图片信息的对象
 */
export function dataFilter(item) {
    if (item.ImageUri) {
        item.imgUrl = item.ImageUri;
        item.bImgUrl = item.BImageUri;
    }
    return item;
}

/**
 * 显示loading框
 * @param {Object} $tuhu tuhu对象
 */
export function showIndicator ($tuhu) {
    if ($tuhu.showIndicator instanceof Function) {
        $tuhu.showIndicator();
    }
}

/**
 * 关闭loading
 * @param {Object} $tuhu tuhu对象
 */
export function hideIndicator ($tuhu) {
    if ($tuhu.hideIndicator instanceof Function) {
        $tuhu.hideIndicator();
    }
}
