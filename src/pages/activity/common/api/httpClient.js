/* eslint-disable max-lines */
import { GET_BIG_BRAND_CONFIG, SELECT_CAN_PACKER, GET_PACKET, SELECT_USER_ADDRESS,
    UPDATE_REAL_ADDRESS, SHARE_ADD_ONE, PAKCER_BEFORE_IS_MUST_LOGIN, IS_LOGIN_URL,
    SELECT_PACK, GET_MODULE_DETAIL, GET_COUPON_URL, GET_PACKET_URL, GET_ACTIVITY_MODULE_INFO,
    GET_FIXED_PRICE_ACTIVITY_STATUS, GET_PRODUCT_MODULE,
    GET_SELECT_CAN_PACKER, GET_ANSWER_PACKET, ANSWER_VERIFICATION, UPDATE_RESULT,
    GET_PRODUCT_POOL, GET_ACTIVITY_SECONDSKILL} from './api';

/**
 * 组装请求参数
 * @param {String} options.apiServer 请求站点
 * @param {Object} options.params 请求参数
 * @param {String} type 请求类型
 * @returns {Object} 封装好的请求参数
 */
function generateParams ({
    apiServer,
    params,
    isLoading = false,
    isErrorData = false
}, type) {
    let res = {
        apiServer: apiServer,
        isLoading: isLoading,
        isErrorData: isErrorData
        // data: filterObject(params)
    };
    if (params) {
        if (type === 'get' || type === 'jsonp') {
            res.params = params;
        } else {
            res.data = params;
        }
    }
    return res;
}
/**
 * 获取大翻盘，答题抽奖，摇奖机配置数据
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getBigBrandConfig ($http, params) {
    return $http.post(GET_BIG_BRAND_CONFIG, generateParams({
        apiServer: 'apiServer',
        params
    }));
}

/**
 * 获取用户是否可以免费抽奖
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function selectCanPacker ($http, params) {
    return $http.formData(SELECT_CAN_PACKER, generateParams({
        apiServer: 'wxServer',
        params
    }));
}

/**
 * 获取用户奖品
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getPacket ($http, params) {
    return $http.formData(GET_PACKET, generateParams({
        apiServer: 'wxServer',
        params
    }));
}

/**
 * 获取用户地址库信息
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getUserAddress ($http, params) {
    return $http.get(SELECT_USER_ADDRESS, generateParams({
        apiServer: 'apiServer',
        params
    }, 'get'));
}

/**
 * 更新用户地址
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function updateRealAddress ($http, params) {
    return $http.formData(UPDATE_REAL_ADDRESS, generateParams({
        apiServer: 'wxServer',
        params
    }));
}

/**
 * 分享加次数
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function shareAddOne ($http, params) {
    return $http.formData(SHARE_ADD_ONE, generateParams({
        apiServer: 'wxServer',
        params
    }));
}

/**
 * 判断大翻盘模块是否需要登录
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function pakcerBeforeIsMustLogin ($http, params) {
    return $http.get(PAKCER_BEFORE_IS_MUST_LOGIN, generateParams({
        apiServer: 'wxServer',
        params
    }, 'get'));
}

/**
 * 判断是否登录
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function isLogin ($http, params) {
    return $http.get(IS_LOGIN_URL, generateParams({
        apiServer: 'wxServer',
        params
    }, 'get'));
}

/**
 * 获取抽奖列表
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function selectPack ($http, params) {
    return $http.formData(SELECT_PACK, generateParams({
        apiServer: 'wxServer',
        params
    }));
}

/**
 * （通用活动页，分车型活动页，一行1~4列，滑动优惠券，轮播文字链，底部tab，视频） 的数据
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getModuleDetail ($http, params) {
    return $http.post(GET_MODULE_DETAIL, generateParams({
        apiServer: 'apiServer',
        params
    }));
}

/**
 * 领券
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getCoupon ($http, params) {
    return $http.jsonp(GET_COUPON_URL, generateParams({
        apiServer: 'rootServer',
        params
    }, 'jsonp'));
}

/**
 * 领券包
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getVoucherPackage ($http, params) {
    return $http.formData(GET_PACKET_URL, generateParams({
        apiServer: 'wxServer',
        params
    }));
}

/**
 * 获取模块基本信息
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getActivityModuleInfo ($http, params) {
    return $http.post(GET_ACTIVITY_MODULE_INFO, generateParams({
        apiServer: 'apiServer',
        params
    }));
}
/**
 * （保养定价） 的数据
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getMaintainPricing ($http, params) {
    return $http.post(GET_FIXED_PRICE_ACTIVITY_STATUS, generateParams({
        apiServer: 'apiServer',
        params
    }));
}
/**
 * （系统推荐，一图三产品，拼团） 的数据
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getProductModule ($http, params) {
    return $http.post(GET_PRODUCT_MODULE, generateParams({
        apiServer: 'apiServer',
        params
    }));
}
/**
 * 秒杀模块的数据
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getActivitySecondskill ($http, params) {
    return $http.post(GET_ACTIVITY_SECONDSKILL, generateParams({
        apiServer: 'apiServer',
        params
    }));
}
/**
 * 查询普通商品（商品池）
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getProductPool ($http, params) {
    return $http.post(GET_PRODUCT_POOL, generateParams({
        apiServer: 'apiServer',
        params
    }));
}

/**
 * 问答抽奖 获取用户是否可以抽奖
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getSelectCanPacker ($http, params) {
    return $http.formData(GET_SELECT_CAN_PACKER, generateParams({
        apiServer: 'apiServer',
        params
    }));
}

/**
 * 问答抽奖 获取用户抽中的奖品
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getAnswerPacket ($http, params) {
    return $http.post(GET_ANSWER_PACKET, generateParams({
        apiServer: 'apiServer',
        params
    }));
}

/**
 * 问答抽奖 判断用户是否答对题目
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function answerVerification ($http, params) {
    return $http.post(ANSWER_VERIFICATION, generateParams({
        apiServer: 'apiServer',
        params
    }));
}

/**
 * 问答抽奖 将用户答案更新为正确
 * @param {Object} $http http对象
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function updateResult ($http, params) {
    return $http.formData(UPDATE_RESULT, generateParams({
        apiServer: 'apiServer',
        params
    }));
}
