<template>
    <div class="acs_popUp"
        :class="myPopData.popClassNames">
        <div class="ac_popUp-box">
            <div class="ac_tipClose" @click="handleClose"></div>
            <div class="ac_popDetail">
                <slot name="hook_popTop">
                    <ac-pop-top
                        class="ac_popUp-popTop"
                        :data="myPopData">
                    </ac-pop-top>
                </slot>
                <slot></slot>
                <slot name="hook_popBottom">
                    <ac-pop-bottom
                        class="ac_popUp-popBottom"
                        :data="myPopData"
                        @shareBtnClick="onShareBtnClick"
                        @washBtnClick="onWashBtnClick">
                    </ac-pop-bottom>
                </slot>
                <ac-close-img
                    class="ac_pop-close-img"
                    @handleClose="handleClose"></ac-close-img>
            </div>
        </div>
    </div>
</template>
<script>
import PopExtend from '../common/popExtend/PopExtend';

export default {
    extends: PopExtend
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_popUp {
    &.ac_popUp-newYearStyle {
        .ac_tipClose {
            display: none;
        }

        .ac_popUp-popTop {}
        .ac_pop_top-theme {
            width: 100%;
        }
        .ac_pop_text, .ac_pop_sub_text {
            color: $colorDF3;
        }
        .acs_square-pic {
            padding-top: 57%;
        }

        .ac_popUp-popBottom {}
        .ac_pop_blue {
            background: $colorDF3;
            box-shadow: 0px 2px 0px $colorDF3;
        }
        .ac_pop_yellow {
            background-color: $colorF57;
            box-shadow: 0px 2px 0px $colorF57;
        }

        .ac_pop-close-img {
            display: block;
        }
    }


    .ac_popUp-box{
        position: relative;
        width: 13rem;
        background-color: $colorf;
        border-radius: 2.5px;
    }
    .ac_tipClose{
        position: absolute;
        right: -5%;
        top: -3rem;
        width: 1.25rem;
        background: url(../imgs/guanbi.png) no-repeat center 0;
        background-size: contain;
        height: 3.5rem;
        z-index: 9;
        padding: 0 1.5rem;
    }

    .ac_popDetail {}
    .ac_pop-close-img {
        position: absolute;
        bottom: -65px;
        left: 50%;
        margin-left: -12px;
        display: none;
    }
}
</style>
