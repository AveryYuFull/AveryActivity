<template>
    <div class="acs_errorPopUp-content">
        <div class="acs_errorPopUp-wrap">
            <p class="acs_errorPopUp-txt-big">啊哦~本题答错了！</p>
            <p class="acs_errorPopUp-txt-small">分享好友求助力，扭错为对！</p>
            <div @click="shareClick" class="acs_errorPopUp-btn">立即分享</div>
        </div>
        <div @click="cancel" class="acs_errorPopUp-close"></div>
    </div>
</template>

<script>
// import AnswerExtent from '../common/answerExtent/AnswerExtent';

export default {
    // extends: AnswerExtent,
    name: 'ac-error-popup',
    props: {
        shareHandler: {
            type: Function
        }
    },
    data() {
        return {};
    },
    methods: {
        cancel(evt) {
            this.$emit('cancelChange', evt);
        },
        shareClick() {
            this.shareHandler();
            this.$emit('confirmChange');
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.log_popup.th_align-centerMiddle .th_content-wrap{
    left: 59% !important;
}
.log_popup .th_content-wrap .th_content {
    width: 80%;
}
.log_popup .th_content-wrap .th_content {
    background: transparent;
}
.acs_errorPopUp-content{
    height: auto;
    color: $colorf;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .acs_errorPopUp-wrap{
        background:url('./img/answerWrongBg.png') no-repeat;
        background-size: 100%;
        text-align: center;
        position: relative;
        padding-bottom: 10px;
        width: 100%;
    }
    /*后代*/
    .acs_errorPopUp-txt-big{
        font-size: $largeFontSize;
        padding: 35% 20px 0;
    }
    /*后代*/
    .acs_errorPopUp-txt-small{
        font-size: $smallFontSize;
        margin-top: .5rem;
    }
    /*后代*/
    .acs_errorPopUp-btn{
        margin: 1.8rem auto 1rem;
        background:url('./img/close_copy.png');
        height: 2.5rem;
        line-height: 2rem;
        font-size: $largeFontSize;
        text-align: center;
        color: #df3348;
        background: url(./img/wrongShareBtn.png) no-repeat 50%;
        background-size: contain;
    }
    .acs_errorPopUp-close{
        width: 1.25rem;
        height: 1.25rem;
        background:url('./img/close_copy.png');
        background-size: 100%;
    }
}


</style>
