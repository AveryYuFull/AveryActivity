<template>
    <div v-show="isShowBtns" class="acs_answerBtn">
        <div v-show="showBtnNum === 1" class="acs_answerBtn-unfinish">
            <div @click="shareClick" class="acs_answerBtn-share">分享</div>
            <div @click="nextBtnClick" class="acs_answerBtn-next">下一题</div>
        </div>
        <div v-show="showBtnNum === 2" class="acs_answerBtn-finish">
            <div @click="shareClick" class="acs_answerBtn-share">分享</div>
            <div @click="goDraw" class="acs_answerBtn-draw">去抽奖</div>
        </div>
    </div>
</template>

<script>
import AnswerExtent from '../common/answerExtent/AnswerExtent';
import AcDrawPopUp from '../drawPopUp';
import { getAnswerPacket } from '../../common/api/httpClient';
import { mapGetters } from 'vuex';

export default {
    inject: ['$$Popup'],
    extends: AnswerExtent,
    name: 'ac-answer-btn',
    computed: {
        ...Vuex.mapState({
        }),
        ...mapGetters([
            'questionCount',
            'virification',
            'continueQ',
            'hashKey'
        ])
    },
    data() {
        return {
            isShowBtns: false,
            showBtnNum: 1,
            curpage: this.currentPage,
            isDraw: false
        };
    },
    mounted() {

    },
    methods: {
        shareClick() {
            this.shareUtils(2);
        },
        changeBtn() {
            // debugger;
            let virify = this.virification;
            let isFinish = (this.questionCount-1 === this.curpage);
            if (!virify.Code) {
                return;
            }
            if (!virify.IsReal && !virify.IsShareQuestion) {
                this.isShowBtns = true;
                this.showBtnNum = 1;
            } else if (!virify.IsReal && virify.IsShareQuestion) {
                if (!isFinish) {
                    this.$emit('nextQuestion');
                    this.isShowBtns = false;
                } else {
                    this.isShowBtns = true;
                    this.showBtnNum = 2;
                    this.goDraw();
                }
            } else if (virify.IsReal) {
                this.$emit('nextQuestion');
                this.isShowBtns = false;
            }
            if (isFinish && !virify.IsReal) {
                this.isShowBtns = true;
                this.showBtnNum = 2;
            } else if (isFinish && virify.IsReal) {
                this.isShowBtns = false;
                this.goDraw();
            }
        },
        nextBtnClick() {
            this.$emit('nextQuestion');
        },
        goDraw() {
            if (this.isDraw) { // 已经点过一次抽奖
                return;
            }
            this.drawLottery();
        },
        drawPopDirect(url, type) {
            switch (type) {
                case '继续答题':
                    this.$store.commit('COUNTINUEQ', this.continueQ+1);
                    break;
                case '立即分享':
                    this.shareUtils(1, () => {
                        this.$emit('resetData');
                    });
                    break;
                case '查看积分':
                    location.href = url;
                    break;
                case '戳我用券':
                    location.href = url;
                    break;
            }
        },
        /**
        * 根据答对数量在对应奖池中抽奖
        */
        drawLottery() {
            if (this.isDraw) { // 已经点过一次抽奖
                return;
            }
            let params = {
                channel: this.$tuhu.device().isApp? 'H5' : 'Wechat',
                hashKey: this.hashKey
            };
            this.isDraw = true;
            getAnswerPacket(this.$http, params).subscribe(res => {
                if (res.Code + '' === '1') {
                    // console.log(11223311223, res);
                    this.$store.commit('SETREWARDINFO', res || []);
                    this.$$Popup.open(AcDrawPopUp, {
                        props: {
                            drawPopInfo: res || [],
                            drawPopDirect: this.drawPopDirect
                        },
                        alignCla: 'centerMiddle',
                        wrapCla: 'log_popup',
                        isClickBgClose: false
                    });
                } else {
                    this.$tuhu.toast(res.Message || '抽奖失败');
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

.acs_answerBtn{
    .acs_answerBtn-unfinish,.acs_answerBtn-finish{
        position: absolute;
        top: 92%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
    }
    .acs_answerBtn-share,.acs_answerBtn-next,.acs_answerBtn-draw{
        width: 6rem;
        line-height: 55px;
        text-align: center;
        background: url(./img/btn.png) no-repeat;
        background-size: 100%;
        color: #fff;
        font-size: $FontSize15;
        font-weight: 600;
    }
    .acs_answerBtn-share{
        margin-right: .25rem;
    }
}
</style>
