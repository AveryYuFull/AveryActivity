<template>
    <div class="acs_wxShareImg"
        @click="handleClose">
        <ac-img-box
            class="ac_wxShareImg-box"
            :img-url="imgUrl"
            :is-lazy='false'></ac-img-box>
    </div>
</template>

<script>
import wxShareImg from './imgs/wxshareImg.png';

export default {
    name: 'ac-wx-share-img',
    props: {
        imgUrl: {
            type: String,
            default: wxShareImg
        }
    },
    data () {
        return {
            myImgUrl: this.imgUrl
        };
    },
    methods: {
        handleClose () {
            /**
             * close 没有动画
             * closePopup 带有动画
             */
            this.$emit('closePopup');
        }
    },
    watch: {
        imgUrl (nowVal) {
            this.myImgUrl = nowVal;
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.ac_wxShareTipPop {
    &.ths_popup {
        .th_content-wrap {}
        .th_content {
            background: none;
        }
    }
}
.acs_wxShareImg {
    width: 100%;
    height: 100%;
    // position: fixed;
    // left: 0;
    // right: 0;
    // top: 0;
    // z-index: 9999999;
    // text-align: center;
    .ac_wxShareImg-box {
        width: 70%;
        height: auto;
        margin-top: 30px;
        margin-left: 20%;
    }
}
</style>
