<template>
    <div class="acs_countdown-content" v-if="endTime && serverTime" :class="[className]">
        <div class="ac_line"></div>
        <div class="ac_countdown-text">
            <span class="ac_text">距离活动结束</span>
            <ac-count-time
                class="ac_time"
                :styleType="countdownStyle !== 'Deep' ? 1 : 0"
                :endTime="endTime"
                :currentTime="serverTime">
            </ac-count-time>
        </div>
        <div class="ac_line"></div>
    </div>
</template>
<script>
import AcSpecialExtend from '../common/specialExtend/SpecialExtend';
export default {
    extends: AcSpecialExtend,
    name: 'ac-count-down',
    data() {
        return {
            /**
             * 开始时间
             */
            startTime: {
                type: String,
                default: ''
            },
            /**
             * 结束时间
             */
            endTime: {
                type: String,
                default: ''
            }
        };
    },
    computed: {
        /**
         * 0深色背景，1浅色背景
         * @return {String} class名称
         */
        className() {
            let res = '';
            switch (this.countdownStyle) {
                case 'Deep': // 深色
                    res = 'ac_countdown-deep';
                    break;
            }
            return res;
        }
    },
    created() {
        let moduleData = this.moduleData;
        if (!moduleData) {
            console.error('moduleData');
            return;
        }
        if (!this.serverTime) {
            console.log('serverTime error');
            return;
        }
        this.countdownStyle = moduleData.CountdownStyle;
        this.startTime = moduleData.StartTime;
        this.endTime = moduleData.EndTime;
    },
    methods: {

    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_countdown-content{
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $bgf_5;
    color:$color0;
    &.ac_countdown-deep{
        background-color: $bg0_5;
        color:$colorf;
        .ac_line {
            &::before {
                border-top-color: $bre;
            }
        }
    }
    .ac_line {
        flex: 1;
        height: 1px;
        position: relative;
        &::before {
            content: " ";
            position: absolute;
            top: 0;
            height: 1px;
            background-color: $bref;
            left: 1.65rem;
            right: 0.9rem;
            transform: scaleY(0.5);
        }
        &:last-child{
            &::before{
                left: 0.9rem;
                right: 1.65rem;
            }
        }
    }
    .ac_countdown-text{
        vertical-align: middle;
        display: inline-block;
        font-size: 0;
    }
    .ac_text {
        display: inline-block;
        vertical-align: middle;
        font-size: $smallFontSize;
    }
    .ac_time{
        padding-left: 10px;
        vertical-align: middle;
    }
}
</style>
