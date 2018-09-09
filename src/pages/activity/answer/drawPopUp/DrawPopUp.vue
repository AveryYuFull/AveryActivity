<template>
    <div class="acs_drawPopUp-content">
        <p class="acs_drawPopUp-info">{{rewardInfo&&rewardInfo.Result&&rewardInfo.Result.PromptMsg}}</p>
        <p class="acs_drawPopUp-desc"></p>
        <!-- <ac-img-box class="acs_drawPopUp-img" :imgUrl="rewardInfo&&rewardInfo.Result&&rewardInfo.Result.PromptImg"></ac-img-box> -->
        <img class="acs_drawPopUp-img" :src="rewardInfo&&rewardInfo.Result&&rewardInfo.Result.PromptImg" />
        <div class="acs_drawPopUp-btns">
            <div v-show="showContinueBtn" @click="goUrl('',btnTxt)" class="acs_drawPopUp-btnItem">{{btnTxt}}</div>
            <div @click="goUrl(rewardInfo.rewardCheckUrl, rewardInfo&&rewardInfo.Result&&rewardInfo.Result.RedirectBtnText)" class="acs_drawPopUp-btnItem">{{rewardInfo&&rewardInfo.Result&&rewardInfo.Result.RedirectBtnText}}</div>
        </div>
    </div>
</template>

<script>
import AnswerExtent from '../common/answerExtent/AnswerExtent';

export default {
    name: 'ac-draw-popup',
    props: {
        drawPopInfo: {
            type: Object
        },
        drawPopDirect: {
            type: Function
        }
    },
    data() {
        return {
            rewardInfo: null,
            showContinueBtn: false,
            btnTxt: ''
        };
    },
    mounted() {
        this.rewardInfo = this.drawPopInfo;
        let reward = this.rewardInfo;
        reward.rewardCheckUrl = this.$tuhu.device().isApp?`tuhu:${reward.Result.RedirectAPP}` : reward.Result.RedirectH5;
        if (reward.Status === 'StartAnswer') {
            this.showContinueBtn = true;
            this.btnTxt = '继续答题';
        } else if (reward.Status === 'ShareIt') {
            if (!reward.Result.IsShare && reward.Result.ShareTimes) {
                this.showContinueBtn = true;
                this.btnTxt = '立即分享';
                reward.Result.PromptMsg = reward.Result.PromptMsg + '，赶快分享，再答题赢更多奖励';
            }
        } else {
            this.showContinueBtn = false;
        }
        // console.log(998877665443, this.rewardInfo);
    },
    methods: {
        goUrl(url, type) {
            this.$emit('confirmChange');
            this.drawPopDirect(url, type);
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
.acs_drawPopUp-content{
    height: 21.25rem;
    background:url("./img/drawPopUp.png") center center / contain no-repeat;
    background-size:100%;
    z-index: 10000;
    padding: 0 10%;
    position: relative;
    .acs_drawPopUp-info{
        padding: 3.6rem 2rem 0;
        text-align: center;
        color: $colorRed;
        font-size: $largeFontSize;
    }
    .acs_drawPopUp-desc{
        font-size: $smallFontSize;
        margin-top: 0;
        color: $color0;
        text-align: center;
    }
    .acs_drawPopUp-img{
        height: 3.5rem;
        margin: .5rem auto;
        display: block;
    }
    .acs_drawPopUp-btns{
        height: 9.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        left: 10%;
        right: 10%;
        bottom: 0.6rem;
    }
    .acs_drawPopUp-btnItem{
        width: 90%;
        margin: 0 auto;
        height: 2.5rem;
        line-height: 2.2rem;
        font-size: $largeFontSize;
        text-align: center;
        color: #df3348;
        background: url(./img/wrongShareBtn.png) no-repeat 50%;
        background-size: contain;
    }
}
</style>

