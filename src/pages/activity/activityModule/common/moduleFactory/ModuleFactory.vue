<template>
<!-- <div class="acs_moduleFactory" v-if="moduleName"> -->
    <div
        v-if="moduleName"
        :is="moduleName"
        :moduleData="moduleData"
        :activityInfo="activityInfo"
        :serverTime="serverTime"
        :scrollTop="scrollTop"
        @click="$emit('click', $event)">
    </div>
<!-- </div> -->
</template>

<script>
import AcModuleExtend from '../moduleExtend/ModuleExtend';
import { moduleType } from '../../../common/constants';

export default {
    extends: AcModuleExtend,
    name: 'ac-module-factory',
    computed: {
        moduleName() {
            let _that = this;
            let res = '';
            // let itemData = _that.itemData;
            let itemData = _that.moduleData;
            let typeCode = itemData && itemData.ModuleType;
            switch (typeCode) {
                // case moduleType.GENERAL_HEAD: // 通用活动页
                    // res='ac-general-page';
                    // break;
                case moduleType.GENERAL_HEAD: // 通用活动页
                case moduleType.SECTIONAL_HEADER: // 分车型活动页
                    // res='ac-seperate-car-page';
                    res = 'ac-head-map';
                    break;
                case moduleType.IMAGE_LINK_COLUMNS: // 一行1~4列
                case moduleType.IMAGE_LINK_PRODUCT: // 一图3产品
                    res='ac-picture-map';
                    break;
                case moduleType.ORDINARY_PRODUCT: // 普通商品
                case moduleType.SECOND_SKILL: // 秒杀商品模块
                case moduleType.SPELL_GROUP: // 拼团
                case moduleType.SYS_RECOMMENDED: // 系统推荐
                    res='ac-goods';
                    break;
                case moduleType.SLIDING_COUPON: // 滑动优惠券
                    res='ac-slide-coupon';
                    break;

                // 同一个组件模块
                case moduleType.XIN_DA_TURN: // 新大翻盘
                case moduleType.ERNIE: // 摇奖机
                // case moduleType.ANSWER_LUCKY_DRAW: // 答题抽奖
                    res='ac-draw-lottery';
                    break;
                case moduleType.ANSWER_LUCKY_DRAW: // 答题抽奖
                // case 'ENVELOPEDRAW': // 红包抽奖
                    res='ac-answer-base';
                    break;
                case moduleType.MAINTENANCE_PRICING:// 保养定价
                case moduleType.COUNTDOWN: // 倒计时
                case moduleType.WRITING: // 轮播文字链
                case moduleType.BOTTOM_TAB: // 底部tab
                case moduleType.VIDEO:// 视频
                    res='ac-special';
                    break;
                default:
                    break;
            }
            return res;
        }
    },
    mounted() {
        // console.log(this.moduleData);
    }
};
</script>

<style scoped>

</style>
