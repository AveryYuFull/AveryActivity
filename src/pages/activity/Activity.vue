<template>
    <div style="height: 100%;">
        <template v-if="isLoading || hasError || noActivity">
            <ac-loading-container
                :isLoading="isLoading"
                :noActivity="noActivity"></ac-loading-container>
        </template>
        <template v-else>
            <ac-new-layout
                class="acs_activity-page"
                v-if="moduleList && moduleList.length"
                :scrollTop.sync="scrollTop"
                :style="{backgroundColor:activityInfo.BackColor}"
                :id="scrollId">
                <ac-top-adapter-bar v-if='isShowTire' :carInfo='carInfo'></ac-top-adapter-bar>
                <ac-module-list
                    :list="moduleList"
                    :serverTime="serverTime"
                    :activityInfo="activityInfo"
                    v-model="navIndex"
                    :scrollTop.sync="scrollTop"
                    :navigationList="navigationList">
                </ac-module-list>
                <ac-foot-tabs
                    slot="hookFt"
                    style="background: #fff;"
                    v-if="footTabs"
                    :moduleData="footTabs"
                    :serverTime="serverTime"
                    :activityInfo="activityInfo">
                </ac-foot-tabs>
                <ac-img-link v-if="activityInfo&&activityInfo.FloatingUpsType!=='NoFloating'&&activityInfo.FloatingInfo" :moduleData="activityInfo.FloatingInfo"></ac-img-link>
                <ac-go-top :scrollid='scrollId'
                    @scrollEnd="() => scrollTop = 0"></ac-go-top>
            </ac-new-layout>
        </template>
    </div>
</template>

<script>
/* eslint-disable max-lines */
import { Popup, TButton, TButton100 } from 'tiger-ui';
import filters from '../../commons/filter';
import { getActivityModuleInfo } from './common/api/httpClient';

// 组件
import AcNewLayout from '../common/newLayout/NewLayout';
import Widget from './common/widget';
import ModuleLayout from './common/moduleLayout';
import GoodsItem from './common/goodsItem';
import GoodsLayout from './business/goodsLayout';
import HeadMap from './headMap';
import PictureMapBase from './pictureMap';
import Goods from './goods';
import SlideCoupon from './coupon';
import TopAdapterBar from './topAdapterBar';

import AcAnswerBase from './answer/answerBase';
import Special from './special';
import AcPopupBase from './common/widget/popup/popupBase/PopupBase';

import FlopPop from './flopPop';
import ActivityModule from './activityModule';
import AcDrawLottery from './drawLottery';
import AcDrawLotteryItem from './common/drawLottery';
import AcPopItem from './common/popUp';
import AcNavBarList from './navBar';
import ShareUtils from '../../commons/utils/shareUtils.js';
import {Wechat} from 'tiger-lib';
import AcCodePop from './common/popUp/codePop/CodePop';
import AcCommonPop from './common/popUp/commonPop/CommonPop';
import codeImg from './imgs/tuhuCode.png';
import codePopBG from './imgs/tuhuCodePopBG.png';
import wxshareImg from './imgs/wxshareImg.png';
import AcActivityExtend from './common/activity/ActivityExtend';
import AcLoadingContainer from './common/loadingContainer';
import AcWxShareImg from './common/widget/wxShareImg';
[
    Popup,
    TButton,
    TButton100,
    filters,
    Widget,
    ModuleLayout,
    GoodsItem,
    GoodsLayout,
    HeadMap,
    PictureMapBase,
    Goods,
    SlideCoupon,
    TopAdapterBar,

    AcAnswerBase,
    Special,
    ActivityModule,
    AcDrawLotteryItem,
    AcDrawLottery,
    FlopPop,
    AcPopItem,
    AcNavBarList,
    AcLoadingContainer
].forEach(item => {
    Vue.use(item);
});

const WX_URL = 'https://res.tuhu.org/react/lib/jweixin.1.2.0.min.js';

const wechat = Wechat({
    debug: false,
    signData: () => { // 设置签名
        return new Promise((resolve, reject) => {
            tuhu.script(WX_URL).then(() => {
                tuhu.fetch(fetchConfig.CALL_URL + '?url=' + encodeURIComponent(location.href.split('#')[0]), {}, {
                    status: false
                }).then(sign => {
                    resolve(JSON.parse(sign));
                });
            });
        });
    }
});

export default {
    extends: AcActivityExtend,
    provide() {
        let _that = this;
        let _popup = null;
        return {
            // 默认车型
            $$getDefaultCarInfo (...args) {
                _that.$tuhu.getDefaultCar(...args);
            },
            // 选车
            $$selectCarInfo(...args) {
                _that.$tuhu.selectCar(...args);
            },
            $$getHashKey() {
                return _that.hashKey;
            },
            $$getActivityInfo() {
                return _that.activityInfo;
            },
            $$Popup: {
                open(_com, options) {
                    _popup && _popup.close();
                    return new Promise((resolve, reject) => {
                        let popup = _that.$tPopup.openPopup(_com, Object.assign({
                            // wrapCla: 'alignCla', // 最外层追加的Class名
                            // isShowCloseBtn: true,
                            isClickBgClose: true,
                            alignCla: 'centerMiddle', // ''|'bottom'|'top'|'fullScreen'|'centerMiddle',
                            transitionCls: 't_scale' // , // ''|'t_toUp'|'t_scale'|'t_toBottom'|'t_toLeft';
                            // showFlag: showFlag
                        }, options, () => {
                        }));
                        _popup = popup;
                        let com = popup && popup.component;
                        if (com) {
                            com.$on('confirmChange', (dataItem) => {
                                resolve(dataItem);
                                popup.closePopup();
                            });
                            com.$on('cancelChange', (dataItem) => {
                                resolve({
                                    type: 'cancel'
                                });
                                popup.closePopup();
                            });
                        }
                    });
                },
                close () {
                    _popup && _popup.close();
                }
            },
            $$shareUtils(callback) {
                let activityInfo = _that.activityInfo;
                if (activityInfo.IsShare) {
                    const {
                        ShareLink,
                        ShareImgUrl,
                        ShareDescribe,
                        ShareTitle
                    } = filterShareParams(activityInfo && activityInfo.ShareInfo);
                    let params = {
                        shareUrl: ShareLink,
                        shareImage: ShareImgUrl,
                        shareDescrip: ShareDescribe,
                        shareTitle: ShareTitle
                    };
                    if (_that.$tuhu.device().isApp) {
                        _that.$tuhu.sharePanel(params, [1, 2, 32]).then((data) => {
                            if (data.success) {
                                callback();
                            } else {
                                _that.$tuhu.toast('分享失败');
                            }
                        });
                    } else {
                        wechat.share({
                            title: params.shareTitle, // 分享显示的标题
                            imgUrl: params.shareImage, // 分享显示的图标
                            desc: params.shareDescrip, // 分享显示的描述
                            link: params.shareUrl // 分享地址
                        }, (result) => {
                            if (result.type !== 'cancel' || result.type !== 'fail') {
                                callback();
                            } else if (result.type === 'cancel' || result.type === 'fail') {
                                _that.$tuhu.toast('分享失败');
                            }
                        });
                    }
                } else {
                    _that.$tuhu.toast('不能分享！');
                }
            },
            /**
             * 打开微信分享提示弹窗
             * @param {Boolean} flag 打开或关闭弹窗
             */
            $$wxShareTipPop (flag) {
                if (flag) {
                    _that.$tPopup.popupData(AcWxShareImg, {
                        wrapCla: 'ac_wxShareTipPop', // 最外层追加的Class名
                        // isShowCloseBtn: true,
                        isClickBgClose: true,
                        alignCla: 'top', // ''|'bottom'|'top'|'fullScreen'|'centerMiddle',
                        transitionCls: 't_scale' // , // ''|'t_toUp'|'t_scale'|'t_toBottom'|'t_toLeft';
                        // showFlag: showFlag
                    });
                } else {
                    _that.$tPopup && _that.$tPopup.close();
                }
            }
        };
    },
    components: {
        AcNewLayout
    },
    data() {
        return {
            activityInfo: null,
            moduleList: null,
            serverTime: null,
            navigationList: null,
            scrollTop: 0,
            navIndex: null, // 当前导航的模块索引
            hashKey: this.$tuhu.getParam('id'),
            footTabs: null,
            isLoading: true,
            noActivity: false,
            hasError: false,
            scrollId: this.$tuhu.getScrollId(),
            lock: false // 初始化锁定
        };
    },
    computed: {
        ...Vuex.mapState('tireInfo', [
            'isShowTire'
        ]),
        ...Vuex.mapState({
            carInfo: '_carInfo',
            userInfo: '_userInfo'
        })
    },
    watch: {
        carInfo() {
            this.initModuleData();
        }
    },
    created() {
        this.initModuleData();
    },
    methods: {
        /**
         * 初始化模块数据
         */
        initModuleData() {
            let _that = this;
            _that.activityInfo = null;
            _that.moduleList = null;
            _that.serverTime = null;
            _that.navigationList = null;
            _that.scrollTop = 0;
            _that.navIndex = null; // 当前导航的模块索引
            _that.footTabs = null;
            _that.isLoading = true;
            _that.noActivity = false;
            _that.hasError = false;
            _that.updateLoadingFlag(true, false, false);
            _that.getActivityModuleInfo();
        },
        /**
         * 更新loading组件的flag标志
         * @param {Boolean} isLoading loading标志
         * @param {Boolean} hasError 是否页面错误标志
         * @param {Boolean} noActivity 是否活动过期或活动有没有
         */
        updateLoadingFlag(
            isLoading,
            hasError,
            noActivity
        ) {
            this.isLoading = isLoading;
            this.hasError = hasError;
            this.noActivity = noActivity;
        },
        /**
         * 初始化分享配置
         * @param {Object} shareParams 分享参数
         * @param {Boolean} isShare 是否分享
         */
        initShareConfig (shareParams, isShare) {
            const _that = this;
            if (isShare) {
                const {
                    ShareLink,
                    ShareImgUrl,
                    ShareDescribe,
                    ShareTitle
                } = filterShareParams(shareParams);

                if (_that.$tuhu.device().isApp) {
                    _that.$tuhu.appShare({
                        shareUrl: ShareLink,
                        shareImage: ShareImgUrl,
                        shareDescrip: ShareDescribe,
                        shareTitle: ShareTitle
                    }, [1, 2, 32]);
                } else if (_that.$tuhu.device().isWeixin) {
                    wechat.share({
                        title: ShareTitle, // 分享显示的标题
                        imgUrl: ShareImgUrl, // 分享显示的图标
                        desc: ShareDescribe, // 分享显示的描述
                        link: ShareLink // 分享地址
                    });
                }
            } else {
                _that.$tuhu.actionWithNative('share', {}); // 关闭app上的分享
                wechat.handlerWxApi('hideOptionMenu'); // 关闭微信分享菜单
            }
        },
        /**
         * 获取活动数据
         * @param {Number} carLevel 车型级别
         * @param {Boolean} isForceCar 是否强制选择车型
         */
        getActivityModuleInfo(carLevel = 5, isForceCar = false) {
            let _that = this;
            if (_that.lock) {
                return;
            }
            _that.lock = true;
            this.$tuhu.getDefaultCar(carLevel, isForceCar).then(carInfo => {
                carInfo = carInfo || {};
                getActivityModuleInfo(this.$http, {
                    hashKey: _that.hashKey,
                    vehicleId: carInfo.ProductID || carInfo.VehicleId || '',
                    tid: carInfo.TID
                }).subscribe(data => {
                    let _data = data && data.Data;
                    _that.lock = false;
                    if (data && data.RequiredVehicleLevel) { // 需要车型
                        this.getActivityModuleInfo(data.RequiredVehicleLevel, true);
                        return;
                    }
                    if (_data) {
                        _that.updateLoadingFlag(false, false, false);

                        let _activityInfo = _data.ActivityInfo;
                        let _moduleList = _data.ModuleList;
                        let _navigationList = _data.NavigationList;
                        _that.$title.setTitle(_activityInfo && _activityInfo.ActivityTitle);
                        if (_activityInfo.IsGeographical) { // 需要地址
                            this.getLocate().then(locationInfo => {
                                setInitData(_data, _activityInfo, _moduleList, _navigationList);
                            });
                        } else {
                            setInitData(_data, _activityInfo, _moduleList, _navigationList);
                        }
                    } else {
                        _that.updateLoadingFlag(false, false, true);
                    }
                }, () => {
                    _that.lock = false;
                    _that.updateLoadingFlag(false, true, false);
                });
            }, () => {
                _that.lock = false;
                _that.updateLoadingFlag(false, true, false);
            });

            /**
             * 设置初始化数据
             * @param {Object} _data 活动数据
             * @param {Object} _activityInfo 活动信息
             * @param {Array} _moduleList 模块列表
             * @param {Array} _navigationList 导航数据
             */
            function setInitData(_data, _activityInfo, _moduleList, _navigationList) {
                _that.activityInfo = _activityInfo;
                _that.navigationList = _navigationList;
                _that.navIndex = _navigationList[0] && _navigationList[0].ModuleId;
                if (_data.BottomTabIndex >= 0 && _moduleList.length >= (_data.BottomTabIndex + 1)) {
                    let footTabs = _moduleList.splice(_data.BottomTabIndex, 1);
                    if (footTabs && footTabs[0]) {
                        _that.footTabs = footTabs[0];
                    }
                }
                _that.moduleList = _moduleList;
                _that.serverTime = _data.ServerTime;
                // 顶部适配栏
                let isShowTire = _activityInfo && (_activityInfo.IsShowVehicleBar - 0 === 1);
                tuhu.store.commit('tireInfo/setShowTire', isShowTire);

                // 倒计时
                // 配置分享
                const shareInfo = _that.activityInfo && _that.activityInfo.ShareInfo;
                const isShare = _that.activityInfo && _that.activityInfo.IsShare;
                _that.initShareConfig(shareInfo, isShare);
            }
        },
        /**
         * 获取地理位置
         * @return {Promise}
         */
        getLocate() {
            return tuhu.locate.getCurLocate()
                .then(locationInfo => {
                    this.$store.commit('setLocationInfo', {
                        locationInfo: locationInfo
                    });
                });
        }
    }
};

/**
 * 过滤分享参数
 * @param {Object} shareParams 分享参数对象
 * @returns {Object} 分享参数对象
 */
function filterShareParams (shareParams) {
    const {
        ShareLink,
        ShareImgUrl,
        ShareDescribe,
        ShareTitle
    } = shareParams || {};
    return {
        ShareLink: ShareLink || location.href,
        ShareImgUrl: ShareImgUrl || 'https://res.tuhu.org/vue/wx/static/img/redhu.a1d89d7.png',
        ShareDescribe: ShareDescribe || '活动页分享',
        ShareTitle: ShareTitle || '活动页分享'
    };
}
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_activity-page {
    position: relative;
}
</style>
