<script>
import { getUserAddress, selectCanPacker, getBigBrandConfig, getPacket, pakcerBeforeIsMustLogin } from '../../common/api/httpClient';
// import UtilExtend from './UtilExtend';
// import DrawLotteryExtend from '../../common/drawLottery/common/drawLotteryExtend/DrawLotteryExtend';
import AcModuleExtend from '../../activityModule/common/moduleExtend/ModuleExtend';

export default {
    extends: AcModuleExtend,
    data() {
        return {
            myStatus: 0, // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
            /**
             * display 值定义
             * 0: 有免费抽奖机会, 2:没有抽奖机会, 8:有分享机会
             * 22: 有分享机会但不在微信或app内
             * 9: 如果用户没有登陆，点击跳转到登陆页面, 10: 周期内有中实物奖励但未提交地址
             * 11: 没有权限抽奖
             */
            myItemData: Object.assign({}, this.itemData, this.moduleData, {
                display: 0,
                times: null,
                shareTimes: null,
                draw: null,
                lotteryRecord: null, // 抽奖记录
                packetData: null, // 奖品记录
                huaweiChannel: '',
                userInfo: {},
                isLogin: true, // 代表用户是否登录（包括WAP登录和微信登录）
                hasDrawedLottery: false,
                resultImgUri: '',
                defaultUserAddress: '',
                // popData: null,
                shareParams: {},
                loginType: 0
            })
        };
    },
    computed: {
        /**
         * 模块的hashKey
         * @returns {String} hashKey值
         */
        hashKey() {
            return this.getHashKey();
            // return this.myItemData && this.myItemData.ActivityId ? this.myItemData.ActivityId : '';
        }
    },
    methods: {
        /**
         * 获取用户的默认地址信息
         * @param {Function} cb 获取完用户信息后的回调方法
         */
        getUserDefaultAddress (cb) {
            getUserAddress(this.$http, {
                userId: this.myItemData.userInfo.userid
            }).subscribe(data => {
                let defaultUserAddress = null;
                if (data && data.Code - 0 === 1) {
                    data.Addresses.forEach((item) => {
                        if (item.IsDefaultAddress) {
                            defaultUserAddress = item;
                        }
                    });
                }
                this.myItemData.defaultUserAddress = defaultUserAddress;

                if (cb instanceof Function) {
                    cb();
                }
            });
        },
        /**
         * 获取设备渠道
         * @returns {Promise} 取完用户渠道的promise对象
         */
        getDeviceChannel () {
            return new Promise(resolve => {
                if (!this.myItemData.huaweiChannel) {
                    this.$tuhu.getDeviceDetail().then(info => {
                        info && (this.myItemData.huaweiChannel = info.deviceModel || '');
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        },
        /**
         * 获取抽奖记录
         * @param {Function} cb 获取完抽奖记录后的回调
         */
        getLotteryRecord (cb) {
            let userInfo = (this.myItemData && this.myItemData.userInfo) || {};
            this.getDeviceChannel().then(() => {
                const params = {
                    deviceId: userInfo.uuid || '',
                    Channal: this.myItemData.huaweiChannel,
                    hashKey: this.hashKey,
                    phone: userInfo.phone || ''
                };

                selectCanPacker(this.$http, params)
                    .subscribe(res => {
                        if (cb instanceof Function) {
                            cb(res);
                        }
                    });
            });
        },
        /**
         * 获取配置信息
         * @param {Object} moduleData 模块信息
         * @returns {Promise} 返回获取到的配置信息
         */
        getBrandConfig (moduleData) {
            // const params = {
            //     hashKey: this.hashKey
            // };
            return this.getMdBrandConfig(moduleData);
        },
        /**
         * 获取抽奖结果
         * @returns {Promise} 获取抽奖结果Promise
         */
        getPacketData () {
            const params = {
                deviceId: this.myItemData.userInfo.uuid || '',
                Channal: this.myItemData.huaweiChannel,
                hashKey: this.hashKey
            };
            return getPacket(this.$http, params);
        },

        /**
         * 获取用户是否是wap登录还是微信登录
         * @returns {Promise} 返回是wap登录还是微信登录
         */
        getPakcerBeforeIsMustLogin () {
            const params = {
                hashKey: this.hashKey
            };
            return pakcerBeforeIsMustLogin(this.$http, params);
        }
    }
};
</script>
