<template>
    <div class='acs_ernie'
        :style="{ background: `url(${imgConfig.homeBgImgUri}) no-repeat center / 100% 100%` }">
        <div class='ac_ernie-shareBtn'
            :style="{ visibility: isShowShareBtn ? 'visible' : 'hidden' }"
            @click="share">
            <ac-img-box
                class="ac_shareBtn-img"
                :imgUrl="imgConfig.shareBtnImg"></ac-img-box>
        </div>
        <div class='ac_ernie-slotImgBg'
            :style="{ background: `url(${imgConfig.slotMachineBgUri}) no-repeat center / 100% 100%` }">
            <ac-ernie-machine class="ac_ernie-machine"
                :imgs="lotteryMachine.DrawMachineImgUri">
                <ac-race-lamp class="ac_race-lamp"
                    :status="myStatus"
                    :marquee-lamp-is-on="lotteryMachine.MarqueeLampIsOn"
                    @update:status="raceLampStatusUpdate">
                    <ac-broadcast-img-box
                        :status="broadcastStatus"
                        :imgs="broadcastImgBox"
                        :resultImg="lotteryMachine.ResultImgUri"
                        @update:status="broadcastStatusUpdate"></ac-broadcast-img-box>
                </ac-race-lamp>
                <ac-shake-ball class="ac_shake-ball"
                    :status.sync="myStatus"
                    :start-cb="startCb"></ac-shake-ball>
            </ac-ernie-machine>
            <ac-ernie-tip-msg-container class="ac_ernie-tip-msg"
                :data="tipMsg"></ac-ernie-tip-msg-container>
        </div>
    </div>
</template>

<script>
import AcErnieTipMsgContainer from './ernieTipMessage/ErnieTipMsgContainer';
import bgImg from './imgs/bg.png';
import slotMachineImg from './imgs/slotMachineBg.png';
import shareBtnImg from './imgs/shareBtn.png';

import DrawLotteryExtend from '../common/drawLotteryExtend/DrawLotteryExtend';

const COMPONENT_NAME = 'ac-ernie';

export default {
    extends: DrawLotteryExtend,
    name: COMPONENT_NAME,
    components: {
        AcErnieTipMsgContainer
    },
    props: {
        // data: {
        //     type: Object,
        //     default: function () {
        //         return {
        //             homeBgImgUri: bgImg,
        //             slotMachineBgUri: slotMachineImg,
        //             shareBtnImg: shareBtnImg
        //         };
        //     }
        // },
        // status: { // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
        //     type: Number,
        //     default: 0
        // }
    },
    data () {
        return {
            // myStatus: this.status,
            broadcastStatus: this.status
        };
    },
    computed: {
        tipMsg () {
            return {
                draw: this.myItemData.draw,
                display: this.myItemData.display,
                times: this.myItemData.times,
                shareTimes: this.myItemData.shareTimes
            };
        },
        /**
         * 摇奖机配置信息
         * @returns {Object} 摇奖机的配置信息
         */
        lotteryMachine () {
            return this.myItemData && (this.myItemData.LotteryMachine || {});
        },
        /**
         * 摇奖机的图片配置信息
         * @returns {Object} 返回图片配置信息
         */
        imgConfig () {
            const lotteryMachine = this.lotteryMachine || {};
            return {
                homeBgImgUri: lotteryMachine.HomeBgImgUri || bgImg,
                slotMachineBgUri: lotteryMachine.HomeBgImgUri2 || slotMachineImg,
                shareBtnImg: shareBtnImg
            };
        },
        /**
         * 是否显示分享按钮
         * @returns {Boolean} 返回是否显示分享按钮
         */
        isShowShareBtn () {
            return this.myItemData.draw - 0 === 1 && this.myItemData.display === 8;
        },
        /**
         * 轮播图片
         * @returns {Array} 返回轮播图片
         */
        broadcastImgBox () {
            return new Array(3).fill(this.lotteryMachine.Image);
        }
    },
    methods: {
        broadcastStatusUpdate (status) {
            this.broadcastStatus = status;
            if (status === 3) {
                this.myStatus = 3;
            }
        },
        raceLampStatusUpdate (status) {
            this.raceLampStatus = status;
            if (status === 3) {
                this.broadcastStatus = 3;
            }
        },
        share () {
            if (this.shareCb instanceof Function) {
                this.shareCb();
            }
        }
    },
    watch: {
        myStatus (newVal) {
            this.$emit('update:status', newVal);
            this.broadcastStatus = newVal;
        }
        // status (newVal) {
        //     this.myStatus = newVal;
        // },
        // itemData (nowVal) {
        //     console.log('ernie item111---->', nowVal);
        // }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_ernie {
    height: 400px;
    padding: 10px;
    .ac_ernie-shareBtn {
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
        // img {
        //     width: 25px;
        //     height: 25px;
        // }
    }
    .ac_shareBtn-img {
        width: 25px;
        height: 25px;
        text-align: right;
    }


    .ac_ernie-slotImgBg {
        height: 87%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .ac_ernie-machine {
        height: 75%;
        width: 250px;
        right: 20px;
        position: relative;
    }
    .ac_race-lamp {
        position: absolute;
        top: 84px;
        left: 9px;
        width: 234px;
        height: 116px;
    }
    .ac_shake-ball {
        position: absolute;
        right: -32px;
        top: 50%;
        transform: translateY(-20%);
    }
    .ac_ernie-tip-msg {
        position: absolute;
        bottom: 0;
        right: 0;
    }

}
</style>
