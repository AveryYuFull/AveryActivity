<script>
/* eslint-disable max-lines */
import HttpExtend from './HttpExtend';
import newYearTheme from '../imgs/newYearTheme.png';
import commonTheme from '../imgs/commonTheme.png';

import { filterData, isApp, isWxOrApp, showIndicator, hideIndicator } from '../../common/util/commonUtil';
import AcPopItem from '../../common/popUp/popItem/PopItem';
import { DRAW_LOTTERY_TYPE } from '../../common/drawLottery/common/constant';
import { POP_TYPE } from '../constants';

export default {
    inject: ['$$Popup', '$$getActivityInfo', '$$shareUtils', '$$wxShareTipPop'],
    extends: HttpExtend,
    components: {
        AcPopItem
    },
    computed: {
        promptStyle () {
            const bigBrandStyle = (this.myItemData && this.myItemData.BigBrandStyle && this.myItemData.BigBrandStyle.PromptStyle) || '';
            return this.itemType === DRAW_LOTTERY_TYPE.DRAW_LOTTERY_NEW_BIG_HIT
                ? bigBrandStyle : '';
        }
    },
    created () {
        /**
         * 组装分享参数
         */
        const activityInfo = this.$$getActivityInfo();
        if (activityInfo) {
            this.myItemData.shareParams = activityInfo.ShareInfo || {};
        }
    },
    methods: {
        /**
         * 打开弹窗
         * @param {String} type 弹窗类型
         * @param {Object} data 弹窗需要的数据
         * @param {String} wrapCla 弹窗的class名
         * @returns {Promise<Object>} 弹窗的回调数据Promise对象
         */
        openPop (type, data, wrapCla) {
            return new Promise((resolve, reject) => {
                this.getPopData(type, data).then(popData => {
                    this.$$Popup.open(AcPopItem, {
                        alignCla: 'centerMiddle',
                        wrapCla: wrapCla + ' acs_drawLotteryPop',
                        transitionCls: 't_scale',
                        isClickBgClose: false,
                        props: {
                            popData,
                            shareUtils: this.$$shareUtils,
                            wxShareTipPop: this.$$wxShareTipPop
                        }
                    }).then((res) => {
                        resolve(res);
                    });
                });
            });
        },
        /**
         * 获取弹窗信息
         * @param {String} type 弹窗类型
         * @param {Object} data 弹窗数据
         * @returns {Promise<Object>} 组装好的弹窗数据Promise对象
         */
        getPopData(type, data) {
            let res;
            switch (type) {
                case POP_TYPE.REAL_PRIZE:
                    res = this.handleRealPrize(data);
                    break;
                case POP_TYPE.VIRTUAL_PRIZE:
                    res = this.handleVirtualPrize(data);
                    break;
                case POP_TYPE.REAL_PRIZE_TIP_POPOVER:
                    res = this.openRealPrizeTipPopover(data);
                    break;
                case POP_TYPE.SHARE_POP:
                    res = this.handleSharePop(data);
                    break;
                case POP_TYPE.ALERT_POP:
                    res = this.openWxAlertPop();
                    break;
                case POP_TYPE.CODE_POP:
                    res = this.openCodePop(data);
                    break;
                default:
                    break;
            }
            return res;
        },
        /**
         * 获取弹窗主题
         * @returns {Object} 弹窗主题对象
         */
        getPopThemeImg () {
            return {
                popHeaderTheme: this.promptStyle === 1 ? newYearTheme : commonTheme,
                popClassNames: this.promptStyle === 1 ? 'ac_popUp-newYearStyle' : ''
            };
        },
        /**
         * 组装弹窗需要的信息
         * @param {Object} data 弹窗信息
         * @returns {Object} 弹窗信息
         */
        composePopData (data) {
            const _that = this;
            const popData = Object.assign({}, {
                channel: _that.myItemData.huaweiChannel,
                userInfo: _that.myItemData.userInfo,
                hashKey: _that.hashKey,
                shareParams: _that.myItemData.shareParams
            }, (_that.getPopThemeImg instanceof Function) && _that.getPopThemeImg(), data);
            // _that.$set(_that.myItemData, 'popData', popData);
            return popData;
        },
        /**
         * 组装commonPop 弹窗的数据对象
         * @param {Object} data 相关数据
         * @param {String} description 描述信息
         * @returns {Object}
         */
        generateCommonPoData ({
            data,
            description
        }) {
            const _that = this;
            const times = data.Times <= 0 ? 0 : data.Times;
            const moreOne = data.Times <= 0
                    ? ((!data.IsShare && data.ShareTimes > 0) ? `分享还能再抽${data.ShareTimes}次` : '分享')
                    : '';
            return new Promise((resolve, reject) => {
                const popData = _that.composePopData({
                    type: 'commonPop',
                    description: description,
                    subDescription: times > 0 ? `还有${times}次抽奖机会` : '',
                    times,
                    isShare: data.IsShare,
                    shareTimes: data.ShareTimes,
                    moreOne,
                    washBtnTxt: data.RedirectBtnText,
                    washBtnLink: filterWashBtnLink(data, isApp(this.$tuhu)),
                    shareBtnTxt: (moreOne && isWxOrApp(this.$tuhu)) ? moreOne || '分享' : times > 0 ? '继续抽奖' : ''
                });
                resolve(popData);
            });
        },
        /**
         * 实物奖品抽奖流程
         * @param {Object} data 对象信息
         * @returns {Promise<Object>} 返回实物弹窗信息的Promise对象
         */
        handleRealPrize (data) {
            const _that = this;
            // 记录用户中奖
            if (!_that.myItemData.defaultUserAddress) {
                return new Promise((resolve, reject) => {
                    _that.getUserDefaultAddress(() => {
                        resolve(generatePopData());
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    resolve(generatePopData());
                });
            }

            /**
             * 组装弹窗需要的数据信息
             * @returns {Object}
             */
            function generatePopData () {
                _that.myItemData.hasDrawedLottery = true;
                return _that.composePopData(Object.assign({}, {
                    type: 'userAddressPop',
                    description: data.PromptMsg,
                    subDescription: '确认一下收货地址吧',
                    times: data.Times,
                    shareTimes: data.ShareTimes,
                    washBtnTxt: '确认',
                    tip: data.Tip
                }, filterUserAddress(_that.myItemData.defaultUserAddress)));
            }
            /**
             * 过滤用户地址信息
             * @param {Object} addr 用户地址信息
             * @returns {Object} 返回用户地址信息
             */
            function filterUserAddress (addr) {
                let addressInfo = {};
                if (addr) {
                    addressInfo = {
                        name: filterData(addr.Consignees), // 获取用户姓名
                        address: filterData(addr.AddressDetail),
                        area: (filterData(addr.Province) + ' ' + filterData(addr.City) + ' ' + filterData(addr.District)).trim(),
                        phone: filterData(addr.Cellphone)
                    };
                }
                return addressInfo;
            }
        },
        /**
         * 处理虚拟奖品抽奖流程
         * @param {Object} data 奖品相关信息
         * @returns {Promise<Object>} 返回弹窗信息的Promise对象
         */
        handleVirtualPrize (data) {
            const _that = this;
            return new Promise((resolve, reject) => {
                const popData = _that.generateCommonPoData({
                    data,
                    description: data.PromptMsg || '券已放入账户中'
                });
                resolve(popData);
            });
        },
        /**
         * 打开实物中奖提示信息弹窗
         * @param {Object} data 中奖信息
         * @returns {Promise<Object>} 弹窗信息Promise
         */
        openRealPrizeTipPopover (data) {
            const _that = this;
            showIndicator(this.$tuhu);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.getLotteryRecord((res) => {
                        hideIndicator(this.$tuhu);
                        resolve(generatePopData(Object.assign({}, data, res)));
                    });

                    /**
                     * 组装弹窗数据
                     * @param {Object} data 信息对象
                     * @returns {Object}
                     */
                    function generatePopData (data) {
                        return _that.generateCommonPoData({
                            data: data,
                            description: '中奖信息提交成功'
                        });
                    }
                }, 2000);
            });
        },
        /**
         * 打开分享弹窗
         * @param {Object} data 分享弹出需要的参数
         * @returns {Promise<Object>} 弹窗信息Promise
         */
        handleSharePop (data) {
            const _that = this;
            const moreOne = `分享后还能再抽${data.ShareTimes}次哦`;
            return new Promise((resolve, reject) => {
                const popData = _that.composePopData({
                    type: 'commonPop',
                    description: moreOne,
                    times: data.Times <= 0 ? 0 : data.Times,
                    isShare: data.IsShare,
                    shareTimes: data.ShareTimes,
                    moreOne,
                    shareBtnTxt: '分享'
                });
                resolve(popData);
            });
        },
        /**
         * 打开微信提示弹窗
         * @returns {Promise<Object>} 弹窗信息Promise
         */
        openWxAlertPop () {
            const _that = this;
            return new Promise((resolve, reject) => {
                const popData = _that.composePopData({
                    type: 'commonPop',
                    description: '仅限在微信环境下打开'
                });
                resolve(popData);
            });
        },
        /**
         * 打开二维码弹窗
         * @returns {Promise<Object>} 弹窗信息Promise
         */
        openCodePop ({
            codeImg,
            codePopBG
        }) {
            const _that = this;
            return new Promise((resolve, reject) => {
                const popData = _that.composePopData({
                    type: 'codePop',
                    codeImg,
                    codePopBG
                });
                resolve(popData);
            });
        }
    }
};

/**
 * 过滤按钮的跳转链接
 * @param {Object} data 信息对象
 * @param {Boolean} isApp 是否为app环境
 * @returns {String} 返回按钮的跳转链接
 */
function filterWashBtnLink (data, isApp) {
    let btnLink = data.RedirectH5 || '';
    if (isApp) {
        btnLink = data.RedirectAPP;
        if (data.RedirectAPP.indexOf('tuhu:') < 0) {
            btnLink = `tuhu:${data.RedirectAPP}`;
        }
    }
    return btnLink;
}
</script>

<style lang="scss">
.acs_drawLotteryPop {
    &.ths_popup {
        .th_content-wrap {
            width: 13rem;
        }
    }
}
// .acs_drawLottery {
    .ac_drawLottery-codePop {
        .th_content {
            background: none;
        }
    }
    .ac_drawLottery-alertPop {
        .ac_pop_text {
            margin-bottom: 100px;
        }
    }
// }
</style>
