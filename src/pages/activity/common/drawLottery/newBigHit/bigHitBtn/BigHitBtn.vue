<template>
    <ac-big-hit-factory
        @click="click"
        :btnItem="myBtnItem">
    </ac-big-hit-factory>
</template>

<script>
import AcBigHitFactory from './common/bigHitFactory/BigHitFactory';
import AcBigHitExtend from './common/bigHitExtend/BigHitExtend';
import GETCLICK from './img/getclick.png';
import START from './img/startBtn.png';
import NO_LOGIN from './img/startBtn3.png';
import NO_ADDRESS from './img/realPrizeBtn.png';
import NO_TIMES from './img/noTimesWithWxLogin.png';
import TOMORROW from './img/tomorrow.png';
import SHARE from './img/shareDraw.png';
import NO_AUTH from './img/unGroup.png';

export default {
    extends: AcBigHitExtend,
    components: {
        AcBigHitFactory
    },
    props: {
        status: {
            type: Number
        }
    },
    computed: {
        myBtnItem() {
            return this.setItemType(this.btnItem, this.status);
        }
    },

    methods: {
        setItemType(btnItem, status) {
            let res = {};
            let _that = this;
            let statusData = _that.BIG_HIT_STATUS;
            if (status === 2 || status === 3) {
                res = {
                    type: 'getClick',
                    imgUrl: GETCLICK,
                    styleType: 'other'
                };
            } else {
                switch (btnItem && btnItem.type) {
                    case statusData.START: // 开始
                        res = {
                            imgUrl: START,
                            styleType: 'start'
                        };
                        break;
                    case statusData.NO_LOTTERY_INFO: // 接口没有返回抽奖信息
                    case statusData.NO_LOGIN: // 用户没有登陆，点击跳转到登陆页面,
                        res = {
                            imgUrl: NO_LOGIN,
                            styleType: 'other'
                        };
                        break;
                    // case statusData.NO_TIMES: // 次数用光
                    //     res = {
                    //         imgUrl: NO_TIMES,
                    //         styleType: 'other'
                    //     };
                    //     break;
                    case statusData.NO_ADDRESS: // 周期内有中实物奖励但未提交地址
                        res = {
                            imgUrl: NO_ADDRESS,
                            styleType: 'other'
                        };
                        break;
                    case statusData.NO_AUTH: // 周期内有中实物奖励但未提交地址
                        res = {
                            imgUrl: NO_AUTH,
                            styleType: 'other'
                        };
                        break;
                    case statusData.SHARE: // 分享后
                        res = {
                            imgUrl: SHARE,
                            styleType: 'other',
                            nameText: '分享后还可再抽' + (btnItem.shareTimes || 0) + '次'
                        };
                        break;
                    case statusData.NO_TIMES: // 没有抽奖机会
                    case statusData.SHARE_NO_APP: // 有分享机会但不在微信或app内
                        res = {
                            imgUrl: TOMORROW,
                            styleType: 'other',
                            nameText: '今日抽奖次数已用完'
                        };
                        break;
                    case statusData.GETCLICK: // 抽取
                        res = {
                            imgUrl: GETCLICK,
                            styleType: 'other'
                        };
                        break;
                    // case statusData.INTEGRAL: // 积分
                    //     res = {
                    //         imgUrl: START,
                    //         styleType: 'other',
                    //         nameText: btnItem.times + '积分1次'
                    //     };
                    //     break;

                    default:
                        break;
                }
            }

            return Object.assign({}, btnItem, res);
        }

    }
};
</script>

<style scoped>

</style>
