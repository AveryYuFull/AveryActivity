<template>
    <div class="acs_count-time" :class="[className]" >
        <span class="ac_time-item">{{h}}</span>
        <span class="ac_split">:</span>
        <span  class="ac_time-item">{{m}}</span>
        <span class="ac_split">:</span>
        <span  class="ac_time-item">{{s}}</span>
    </div>
</template>
<script>
import { CountDown } from 'tiger-lib';
export default {
    name: 'ac-count-time',
    props: {
        /**
         * 结束时间
         */
        endTime: {
            type: String,
            default: ''
        },
        /**
         * 当前时间
         */
        currentTime: {
            type: String,
            default: ''
        },
        // /**
        //  * 样式名称
        //  */
        // className: {
        //     type: String,
        //     default: ''
        // },
        /**
         * 样式类型
         */
        styleType: { // 0为浅色
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            h: '00',
            m: '00',
            s: '00'
        };
    },
    watch: {
        currentTime() {
            this.initTimer();
        },
        endTime() {
            this.initTimer();
        }
    },
    computed: {
        className() {
            let res = '';
            switch (this.styleType + '') {
                case '1':
                    res = 'ac_dark';
                    break;
                default:
                    break;
            }
            return res;
        }
    },
    mounted() {
        this.initTimer();
    },
    methods: {
        /**
         * 初始化时间
         */
        initTimer() {
            let _that = this;
            if (!this.currentTime || !this.endTime) {
                return;
            }
            this.countDown && this.countDown.stop();
            this.countDown = CountDown({
                startTime: this.currentTime.replace(/-/g, '/'),
                endTime: this.endTime.replace(/-/g, '/'),
                formatType: 'h',
                callback(data) {
                    if (typeof data === 'string') {
                        [_that.h, _that.m, _that.s] = data.split(':');
                    } else {
                        _that.h = '00';
                        _that.m = '00';
                        _that.s = '00';
                    }
                }
            });
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_count-time{
    display: inline-block;
    font-size: 0;
    // position: relative;
    // margin-left:10px;
    .ac_split{
        color:$colorf;
        font-size: $smallFontSize;
        display: inline-block;
        vertical-align: middle;
    }
    .ac_time-item {
        font-size: $smallFontSize;
        height: .9rem;
        line-height: .95rem;
        padding: 0 .2rem;
        border-radius: 3px;
        margin: 0 .2rem;
        display: inline-block;
        vertical-align: middle;
        color:$color2f;
        background: $bgf;
        &:first-child{
            margin-left:0;
        }
        &:last-child{
            margin-right:0;
        }
    }
    // &.Shallow{
    //     color:$color0;
    //     span{
    //         color:$colorf;
    //         background: #2F2F2F;
    //     }
    // }

    &.ac_dark{
        .ac_split{
            color:$color2f;
        }
        .ac_time-item{
            color:$colorf;
            background: $bg2f;
        }
    }

}
</style>
