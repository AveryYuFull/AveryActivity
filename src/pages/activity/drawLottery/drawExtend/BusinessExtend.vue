<script>
/* eslint-disable max-lines */
import PopUpExtend from './PopUpExtend';
import { toastMessage } from '../../common/constants';
import { isWxOrApp, goToCouponPage, isWx, showIndicator, hideIndicator } from '../../common/util/commonUtil';
import codePopBG from './imgs/codePopBG.png';
import WxAuthUtil from '../../common/util/wxAuthUtil';
import { DISPLAY_STATUS } from '../../common/drawLottery/common/constant.js';
import { POP_TYPE } from '../constants';

export default {
    extends: PopUpExtend,
    data () {
        return {
            loadingOver: true
        };
    },
    methods: {
        /**
         * 打开弹窗
         * @param {String} type 弹窗类型
         * @param {Object} data 弹窗需要的数据
         */
        handleOpenPop (type, data) {
            this.openPop(type, data)
                .then(dataItem => {
                    if (!dataItem) {
                        return;
                    }
                    if (dataItem.type === 'cancel') {
                        showIndicator(this.$tuhu);
                        // 取消的回调
                        this.checkTimes(() => {
                            hideIndicator(this.$tuhu);
                            // 当弹窗关闭后置status为0，代表未开始
                            this.myStatus = 0;
                        });
                    } else {
                        if (type === POP_TYPE.REAL_PRIZE) {
                            this.handleOpenPop(POP_TYPE.REAL_PRIZE_TIP_POPOVER, data);
                        }
                    }
                });
        },
        /**
         * 获取用户关注的公众号
         * @param {Object} data 公众号相关信息
         * @param {Function} cb 调用弹窗的回调方法
         */
        checkOfficialAccounts (data, cb) {
            let popData = {
                codeImg: data.Msg,
                codePopBG
            };
            if (cb instanceof Function && popData) {
                cb(POP_TYPE.CODE_POP, popData);
            }
        },
        distributeLottery (cb) {
            // 奖励类型 1：优惠券 2：积分 3：无奖励,4:实物奖励，5.微信红包
            const packetData = this.myItemData.packetData;
            if (packetData.RewardType === 4) {
                // 抽中实物奖励
                if (cb instanceof Function) {
                    cb(POP_TYPE.REAL_PRIZE, packetData);
                }
            } else if (packetData.RewardType === 1 || packetData.RewardType === 2 || packetData.RewardType === 5) {
                // 抽中虚拟奖品
                if (cb instanceof Function) {
                    cb(POP_TYPE.VIRTUAL_PRIZE, packetData);
                }
            } else if (packetData.RewardType === 3) {
                this.$tuhu.toast(toastMessage.NO_LOTTERY);
            } else if (packetData.Code <= 0) {
                // 出错， 也许是奖品已经领取了
                this.$tuhu.toast(packetData.Msg);
            } else {
                this.$tuhu.toast(toastMessage.NETWORK_ERROR);
            }
        },
        startDrawLottery (cb) {
            // if (this.myItemData.hasDrawedLottery) {
            //     this.checkTimes(cb);
            // } else {
            // }
            this.getResult(cb, (type, data) => {
                this.handleOpenPop(type, data);
            });
        },
        start () {
            return this.startFunc((type) => {
                this.openPop(type, {}, 'ac_drawLottery-alertPop');
            });
        },
        startFunc (cb) {
            let isError = true;
            const _that = this;
            let startResolve = null;
            return new Promise((resolve, reject) => {
                startResolve = resolve;
                if (!this.loadingOver) {
                    this.$tuhu.toast(toastMessage.PAGE_IS_LOADING);
                    resolve(true);
                    return;
                }
                if (this.myItemData.display === DISPLAY_STATUS.NO_TIMES) {
                    resolve(true);
                    goToCouponPage(this.$tuhu);
                    return;
                }
                // 如果是微信登录且用户不在微信环境下时弹出提示框
                if (this.myItemData.loginType === 1 && !isWx(this.$tuhu)) {
                    resolve(true);
                    if (cb instanceof Function) {
                        cb(POP_TYPE.ALERT_POP);
                    }
                    return;
                }

                if (this.myItemData.isLogin) {
                    if (this.myItemData.loginType === 1) {
                        // 通过微信登录方式
                        if (this.myItemData.lotteryRecord + '' === '-100') {
                            this.checkOfficialAccounts(this.myItemData.lotteryRecord, (type, data) => {
                                this.openPop(type, data, 'ac_drawLottery-codePop');
                            });
                        } else {
                            this.startDrawLottery(startDrawLotteryCb);
                        }
                    } else {
                        // 通过普通登录方式
                        this.startDrawLottery(startDrawLotteryCb);
                    }
                } else {
                    resolve(true);
                    WxAuthUtil.getUserInfo({
                        $tuhu: this.$tuhu,
                        $http: this.$http,
                        forceLogin: true
                    });
                }
            });

            /**
             * 抽奖回调
             * @param {Object} errInfo 错误信息
             */
            function startDrawLotteryCb (errInfo) {
                if (!errInfo) {
                    showIndicator(_that.$tuhu);
                    _that.getPacketData()
                        .subscribe(res => {
                            hideIndicator(_that.$tuhu);
                            _that.myItemData = Object.assign({}, _that.myItemData, {
                                packetData: res
                            });
                            _that.myItemData.packetData.Times = _that.myItemData.packetData.TimeCount;
                            _that.myItemData.packetData.Tip = _that.myItemData.packetData.RealTip;
                            _that.$set(_that.myItemData, 'resultImgUri', res.PromptImg);
                            startResolve && startResolve(false);
                        });
                } else {
                    startResolve && startResolve(errInfo);
                }
            }
        },
        checkTimes (cb) {
            this.loadingOver = false;
            this.getLotteryRecord((res) => {
                this.loadingOver = true;
                this.myItemData.lotteryRecord = res;
                const record = res;

                const display = filterCode(record && record.Code, record, isWxOrApp(this.$tuhu),
                    this.myItemData.loginType, isWx(this.$tuhu));

                if ((record && record.Code) + '' === '-100') {
                    this.checkOfficialAccounts(record, (type, data) => {
                        this.openPop(type, data, 'ac_drawLottery-codePop');
                    });
                }
                if (display === DISPLAY_STATUS.SHARE_NO_APP) {
                    this.$tuhu.toast(toastMessage.CAN_NOT_SHARE_TIP_MESSAGE);
                } else if (display === DISPLAY_STATUS.NO_ADDRESS) {
                    // 周期内有抽中实物奖励但未提交地址
                    try {
                        this.myItemData.lotteryRecord =
                            Object.assign({}, this.myItemData.lotteryRecord, JSON.parse(this.myItemData.lotteryRecord.Item));
                    } catch (err) {};
                } else if (display === DISPLAY_STATUS.NO_AUTH) {
                    this.$tuhu.toast(toastMessage.ONLY_DESIGNATED_USERS_CAN_PARTICIPATE);
                } else if (display === DISPLAY_STATUS.NO_LOGIN) {
                    // 如果用户没有登陆，点击跳转到登陆页面
                    this.myItemData.isLogin = false;
                } else if (display === DISPLAY_STATUS.NO_LOTTERY_INFO) {
                    this.$tuhu.toast(toastMessage.NO_LOTTERY_INFO);
                }

                this.myItemData = Object.assign({}, this.myItemData, {
                    display: display,
                    times: record.Times,
                    shareTimes: record.ShareTimes,
                    draw: (record.Code === 0 && isWxOrApp(this.$tuhu) && !record.IsShare && record.ShareTimes > 0) ? 1 : 0
                });

                // 抽奖并弹出PopUp
                // this.myItemData.hasDrawedLottery && this.getResult(cb);
                if (cb instanceof Function) {
                    cb();
                }
            }, () => {
                this.loadingOver = true;
            });
        },
        getResult (cb, popCb) {
            let isError = true;

            const display = this.myItemData.display;
            if (display === DISPLAY_STATUS.NO_ADDRESS) {
                // 已经有中过实物奖励
                if (popCb instanceof Function) {
                    popCb(POP_TYPE.REAL_PRIZE, this.myItemData.lotteryRecord);
                }
            } else if (display === 0) {
                // 开始抽奖
                isError = false;
            } else if (display === DISPLAY_STATUS.SHARE) {
                if (popCb instanceof Function) {
                    popCb(POP_TYPE.SHARE_POP, this.myItemData.lotteryRecord);
                }
            } else if (display === DISPLAY_STATUS.SHARE_NO_APP || display === DISPLAY_STATUS.NO_TIMES) {
                goToCouponPage(this.$tuhu);
            } else if (display === DISPLAY_STATUS.NO_LOTTERY_INFO) {
                this.$tuhu.toast(toastMessage.NO_LOTTERY_INFO);
            } else if (display === DISPLAY_STATUS.NO_AUTH) {
                // 没有权限抽奖
                this.$tuhu.toast(toastMessage.ONLY_DESIGNATED_USERS_CAN_PARTICIPATE);
            }

            if (cb instanceof Function) {
                cb(isError);
            }
        },
        /**
         * 分享回调定义
         */
        handleShare() {
            this.handleShareFunc((type, data) => {
                this.handleOpenPop(type, data);
            });
        },
        /**
         * 分享回调定义
         * @param {Function} cb 展示弹窗的回调
         */
        handleShareFunc (cb) {
            if (cb instanceof Function) {
                cb(POP_TYPE.SHARE_POP, this.myItemData.lotteryRecord);
            }
        },
        /**
         * 设置用户信息
         */
        setUserInfo () {
            if (this.userInfo && this.userInfo.userid) {
                this.myItemData.userInfo = this.userInfo;
            }
            this.checkTimes();
        },
        initFun (cb) {
            if (this.myItemData.loginType === 1) {
                if (!isWx(this.$tuhu)) {
                    // 如果是微信登录且用户不在微信环境下时弹出提示框
                    if (cb instanceof Function) {
                        cb(POP_TYPE.ALERT_POP);
                    }
                    this.myItemData = Object.assign({}, this.myItemData, {
                        display: 9
                    });
                    return;
                }
            }
            this.setUserInfo();
            // else {
                // WxAuthUtil.getUserInfo({
                //     $tuhu: this.$tuhu,
                //     $http: this.$http
                // }).then(userInfo => {
                //     (userInfo && userInfo.userid) && (this.myItemData.userInfo = userInfo);
                //     this.checkTimes();
                // });
                // this.$tuhu.getUserInfo().then(userInfo => {
                //     (userInfo && userInfo.userid) && (this.myItemData.userInfo = userInfo);
                //     this.checkTimes();
                // });
            // }
        },
        /**
         * 初始化数据
         */
        initData() {
            let moduleData = this.moduleData;
            if (moduleData) {
                if (moduleData._isGet) {
                    this.setData(moduleData._getData);
                    delete moduleData._getData;
                    delete moduleData._isGet;
                } else {
                    this.getData();
                }
            }
        },
        /**
         * 获取数据
         */
        getData() {
            let moduleData = this.moduleData;
            if (!moduleData) {
                console.error('moduleData');
                return;
            }
            this.getBrandConfig(moduleData)
                .subscribe(data => {
                    this.setData(data);
                });
        },
        /**
         * 设置当前模块数据
         * @param {Object} data 数据
         */
        setData(data) {
            this.myItemData = Object.assign({}, this.myItemData, data.BigBrandConfig);
        }
    },
    created () {
        // this.getBrandConfig()
        //     .subscribe(res => {
        //     });
        this.initData();
        // 获取用户是否是wap登录还是微信登录
        this.getPakcerBeforeIsMustLogin()
            .subscribe(res => {
                this.myItemData.loginType = res.Code;
                this.initFun((type) => {
                    this.openPop(type, {}, 'ac_drawLottery-alertPop');
                });
            }, () => {
                this.setUserInfo();
            });
    },
    watch: {
        myStatus (nowVal) {
            if (nowVal === 3) {
                this.distributeLottery((type, data) => {
                    this.handleOpenPop(type, data);
                });
            }
        },
        userInfo (nowVal) {
            this.myItemData.isLogin = nowVal && nowVal.islogin;
            this.initFun((type) => {
                this.openPop(type, {}, 'ac_drawLottery-alertPop');
            });
        }
    }
};

/**
 * display 值定义
 * -1: 接口没有返回抽奖信息
 * 0: 有免费抽奖机会, 2:没有抽奖机会, 8:有分享机会
 * 22: 有分享机会但不在微信或app内
 * 12: 如果用户是微信登录且没有抽奖机会也不能分享显示没有抽奖次数
 * 9: 如果用户没有登陆，点击跳转到登陆页面, 10: 周期内有中实物奖励但未提交地址
 * 11: 没有权限抽奖
 * @param {Number} code code
 * @param {Object} record 抽奖信息
 * @param {Boolean} isWxOrApp 设备环境
 * @param {Number} loginType 登录方式
 * @param {Boolean} isWx 是否是微信环境
 * @returns {Number} 状态
 */
function filterCode(code, record, isWxOrApp, loginType, isWx) {
    let display = record ? DISPLAY_STATUS.START : DISPLAY_STATUS.NO_LOTTERY_INFO;
    record = record || {};
    switch (code + '') {
        case '-1': // 周期内有中实物奖励但未提交地址
            display = DISPLAY_STATUS.NO_ADDRESS;
            break;
        case '1': // 有抽奖次数
            display = DISPLAY_STATUS.START;
            break;
        case '-6': // 没有权限抽奖
            display = DISPLAY_STATUS.NO_AUTH;
            break;
        case '0': // 先分享后抽奖
            if (record.Msg === '用户未登录' || record.Msg === '没有通过微信授权') {
                // 如果用户没有登陆，点击跳转到登陆页面
                display = DISPLAY_STATUS.NO_LOGIN;
            } else if (!record.IsShare && record.ShareTimes > 0) {
                if (isWxOrApp) {
                    display = DISPLAY_STATUS.SHARE;
                } else {
                    display = DISPLAY_STATUS.SHARE_NO_APP;
                }
            } else {
                display = DISPLAY_STATUS.NO_TIMES;
            }
            break;
        case '-100':
            display = DISPLAY_STATUS.NO_LOGIN;
            break;
    }
    return display;
}
</script>
