<template>
    <div class="acs_race-lamp">
        <template v-if="marqueeLampIsOn && raceLamps">
            <div :class="key"
                :key="index"
                v-for="(key, index) in Object.keys(raceLamps)">
                <span :class="classNames[activeIndex++]"
                    :key="index"
                    v-for="(item, index) in raceLamps[key]">
                </span>
            </div>
        </template>
        <slot></slot>
    </div>
</template>

<script>

// 跑马灯动画效果的classname
const SHINE_CLASS_NAME = 'shine';
// 空字符串
const STRING_EMPTY = '';
// 每个跑马灯动画时间
const ANIMATION_TIME = 100;
// 闪动动画效果结束事件名
const SHINE_OVER_EVENT = 'shine_over_event';

const COMPONENT_NAME = 'ac-race-lamp';

export default {
    name: COMPONENT_NAME,
    props: {
        // 跑马灯的布局情况
        raceLamps: {
            type: Object,
            default: function () {
                return {
                    top: 12,
                    right: 4,
                    bottom: 12,
                    left: 4
                };
            }
        },
        // 跑马灯数量
        raceLampNum: {
            type: Number,
            default: 32
        },
        status: { // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
            type: Number,
            default: 0
        },
        marqueeLampIsOn: {
            type: Number,
            default: 0
        }
    },
    created () {
        this.activeIndex = 0;
    },
    data () {
        return {
            classNames: new Array(this.raceLampNum).fill(STRING_EMPTY), // 每个跑马灯的样式名
            myStatus: this.status
        };
    },
    methods: {
        /**
         *设置跑马灯的样式
         *@param {Number} index 下标
         */
        setClassName (index) {
            const _that = this;
            this.activeIndex = 0;
            _that.$set(_that.classNames, index, SHINE_CLASS_NAME);
            _that.$set(_that.classNames, index - 1, STRING_EMPTY);
            setTimeout(() => {
                if (index < _that.classNames.length - 1) {
                    _that.setClassName(++index);
                } else {
                    _that.$set(_that.classNames, index, STRING_EMPTY);
                    this.myStatus = 3;
                }
            }, ANIMATION_TIME);
        }
    },
    watch: {
        myStatus (newVal) {
            this.$emit('update:status', newVal);
            if (newVal === 1) {
                this.setClassName(0);
            }
        },
        status (newVal) {
            this.myStatus = newVal;
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

@keyframes shining {
    0% {
        box-shadow: 0 0 0 0 $colorf;
    }
    100% {
        box-shadow: 0 0 10px 56px $colorf;
    }
}

@mixin raceLampStyle ($width, $height, $top, $bottom, $left, $right, $direction: row) {
    width: $width;
    height: $height;
    position: absolute;
    top: $top;
    bottom: $bottom;
    left: $left;
    right: $right;
    display: flex;
    flex-direction: $direction;
    justify-content: space-between;
    align-items: center;
    span {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $colorf;
        box-shadow: 0 0 0 0 $colorf;

        &.shine {
            animation: shining 0.8s ease infinite;
        }
    }
}

.acs_race-lamp {
    width: 234px;
    height: 116px;
    position: relative;
    // position: absolute;
    // top: 84px;
    // left: 9px;

    .top {
        @include raceLampStyle(100%, 16px, 0, auto, 0, auto);
    }
    .bottom {
        @include raceLampStyle(100%, 16px, auto, 0, 0, auto, row-reverse);
    }
    .left {
        @include raceLampStyle(16px, auto, 20px, 20px, 0, auto, column-reverse);
    }
    .right {
        @include raceLampStyle(16px, auto, 20px, 20px, auto, 0, column);
    }
}
</style>
