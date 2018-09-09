<template>
    <div class="acs_popItem">
        <ac-pop-factory
            :pop-data="myPopData"
            @shareBtnClick="handleShare"
            @washBtnClick="washBtnClick"
            @handleClose="handleClosePop">
        </ac-pop-factory>
    </div>
</template>

<script>
import AcPopFactory from '../common/popFactory/PopFactory';
import PopExtend from '../common/popExtend/PopExtend';
import { USER_ADDRESS_POP, COMMON_POP } from '../common/constants';
import { updateRealAddress, shareAddOne } from '../../api/httpClient';
import { isWx } from '../../util/commonUtil';

export default {
    name: 'ac-pop-item',
    extends: PopExtend,
    components: {
        AcPopFactory
    },
    methods: {
        /**
         * 关闭弹窗回调
         */
        handleClosePop () {
            this.$emit('cancelChange');
        },
        /**
         * 分享回调方法
         */
        shareCallback () {
            const params = {
                deviceId: this.myPopData.userInfo.uuid || '',
                Channal: this.myPopData.channel,
                hashKey: this.myPopData.hashKey || ''
            };

            shareAddOne(this.$http, params)
                .subscribe(res => {
                    // 关闭微信分享提示弹窗
                    if (isWx(this.$tuhu) && this.wxShareTipPop instanceof Function) {
                        this.wxShareTipPop(false);
                    }
                    this.handleClosePop();
                });
        },
        /**
         * 处理分享
         */
        handleShare() {
            const isShare = this.myPopData.moreOne || !this.myPopData.times;
            if (isShare) {
                // 打开微信分享提示弹窗
                if (isWx(this.$tuhu) && this.wxShareTipPop instanceof Function) {
                    this.wxShareTipPop(true);
                }
                (this.shareUtils instanceof Function) && this.shareUtils(this.shareCallback);
            } else {
                this.handleClosePop();
            }
        },
        /**
         * wash button的点击，如果type 为commonpop时， 就是跳转到第三方网址
         * 如果type为userAddressPop，就是提交用户地址信息
         * @param {Object} $evt 信息
         */
        washBtnClick ($evt) {
            const { type, data } = $evt;
            if (type === COMMON_POP) {
                const redirectLink = this.myPopData.washBtnLink;
                if (redirectLink) {
                    location.href = redirectLink;
                }
            } else if (type === USER_ADDRESS_POP) {
                this.submitUserAddress(data);
            }
        },
        /**
         * 提交用户地址信息
         * @param {Object} data 用户信息对象
         */
        submitUserAddress (data) {
            const { name, phone, area, address, tip, channel, userInfo, hashKey } = data || {};
            if (name && phone && area && address) {
                if (/^1[34578]\d{9}$/.test(phone)) {
                    const params = {
                        deviceId: userInfo.uuid || '',
                        Channal: channel,
                        hashKey: hashKey,
                        address: area + address,
                        phone: phone,
                        tip: tip,
                        name: name
                    };

                    updateRealAddress(this.$http, params)
                        .subscribe(res => {
                            if (res && res.Code - 0 === 1) {
                                // 更新成功
                                this.$emit('confirmChange', res);
                            } else {
                                this.$tuhu.alert('', '提交地址信息失败');
                            }
                            this.handleClosePop();
                        });
                } else {
                    this.$tuhu.alert('', '手机号码有误，请重填');
                }
            } else {
                this.$tuhu.alert('', '请填写相关信息');
            }
        }
    }
};
</script>
