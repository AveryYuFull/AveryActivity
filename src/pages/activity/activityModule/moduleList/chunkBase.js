
import { moduleType } from '../../common/constants';
/**
 * 映射请求完的数据
 * @param {Array} backList 请求返回的数据列表
 * @return {Object}
 */
export function mapData(backList) {
    let res = {};
    if (backList && backList.length > 0) {
        backList.forEach(item => {
            let _isDataItem = false;
            if (!item) {
                return;
            }
            let moduleId = '';
            let _data = item.Data;
            if (_data instanceof Array) {
                _data.forEach(dataItem => {
                    let _moduleId = '';
                    if (dataItem && dataItem.ModuleId) {
                        _moduleId = dataItem.ModuleId;
                    }
                    if (_moduleId) {
                        res[_moduleId] = Object.assign({}, item, {
                            Data: [dataItem]
                        });
                        _isDataItem = true;
                    }
                });
            } else if (_data && _data.ModuleId) {
                moduleId = _data.ModuleId;
            }
            if (!_isDataItem && !moduleId && item._itemData && item._itemData.ModuleId) {
                moduleId = item._itemData.ModuleId;
                delete item._itemData;
            }
            if (!_isDataItem) {
                if (moduleId) {
                    res[moduleId] = item;
                } else {
                    console.error('返回的moduleId为空');
                }
            }
        });
    }
    return res;
}
/**
 * 参数分组
 * @param {Array} list 分组模块的列表
 * @returns {Object}
 */
export function paramsGrouping(list) {
    // let list = this.list;
    // let _myList = list.slice(0, len);
    let _myList = list;
    let apiMap = {};
    _myList.forEach(itemData => {
        let _type = getApiType(itemData);
        if (_type) {
            apiMap[_type] = apiMap[_type] || [];
            apiMap[_type].push(itemData);
        }
    });
    return apiMap;
}
/**
 * 获取api类型
 * @param {Object} itemData 模块数据
 * @return {String} api类型
 */
export function getApiType(itemData) {
    let res = '';
    if (!itemData) {
        return res;
    }
    let typeCode = itemData && itemData.ModuleType;
    switch (typeCode) {
        case moduleType.GENERAL_HEAD: // 通用活动页
        case moduleType.SECTIONAL_HEADER: // 分车型活动页
        case moduleType.IMAGE_LINK_COLUMNS: // 一行1~4列
        case moduleType.SLIDING_COUPON: // 滑动优惠券
        case moduleType.WRITING: // 轮播文字链
        case moduleType.BOTTOM_TAB: // 底部tab
        case moduleType.VIDEO:// 视频
            res = 'getModuleDetail';
            break;

        // 同一个组件模块
        case moduleType.XIN_DA_TURN: // 新大翻盘
        case moduleType.ERNIE: // 摇奖机
        case moduleType.ANSWER_LUCKY_DRAW: // 答题抽奖
            res='getMdBrandConfig';
            break;
        case moduleType.IMAGE_LINK_PRODUCT: // 一图3产品
        case moduleType.SPELL_GROUP: // 拼团
        case moduleType.SYS_RECOMMENDED: // 系统推荐
            res='getProductModule';
            break;
        case moduleType.ORDINARY_PRODUCT: // 普通商品
            res='getProductPool';
            break;
        case moduleType.SECOND_SKILL: // 秒杀商品模块
            res='getActivitySecondskill';
            break;
        case moduleType.MAINTENANCE_PRICING:// 保养定价
            res='getMaintainPricing';
            break;
        // case moduleType.COUNTDOWN: // 倒计时不需要请求
        //     res='ac-special';
        //     break;
        default:
            break;
    }
    return res;
}
