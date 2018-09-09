<template>
    <div class="acs_answerItem">
        <div v-if="pageIndex === index" v-for="(ques, index) in questionList" :key="ques.PKID">
            <ac-img-box class="ac_answerItem-bg"
                :imgUrl="answerInfo && answerInfo.BigBrandAnsQues && answerInfo.BigBrandAnsQues.BgImgUri"
                :is-lazy="false">
            </ac-img-box>
            <!-- <img class="ac_answerItem-bg" :src="answerInfo && answerInfo.BigBrandAnsQues && answerInfo.BigBrandAnsQues.BgImgUri" /> -->
            <div class="ac_answerItem-wrap">
                <div class="acs_answerItem-title">
                    <span class="acs_answerItem-icon">Q:</span>
                    <div class="acs_answerItem-txt">{{ques.Answer}}</div>
                </div>
                <ac-choose-item @showBtnControl="showBtnHandler" @nextQuestion="nextQuestionHandler" :question="ques"></ac-choose-item>
                <ac-answer-btn @resetData="resetDataHandler" ref="answerBtn" @nextQuestion="nextQuestionHandler" :question="ques" :currentPage = "pageIndex"></ac-answer-btn>
            </div>
        </div>
    </div>
</template>
<script>
import AnswerExtent from '../common/answerExtent/AnswerExtent';
import AcChooseItem from '../chooseItem/ChooseItem';
import AcAnswerBtn from '../answerBtn/AnswerBtn';
import { mapGetters } from 'vuex';

export default {
    extends: AnswerExtent,
    name: 'ac-answer-item',
    components: {
        AcChooseItem,
        AcAnswerBtn
    },
    computed: {
        ...Vuex.mapState({
        }),
        ...mapGetters([
            '_userInfo',
            'answerInfo'
        ])
    },
    data() {
        return {
            pageIndex: 0,
            pageCount: 1
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        /**
        * 初始数据
        */
        initData() {
            this.pageCount = this.questionList.length;
            let isLogin = this.$tuhu.getUserInfo({}).then(res => {
                if (res.isLogin) {
                    this.selectCanPacker(false);
                }
            });
        },
        resetDataHandler() {
            this.$emit('resetData');
        },
        showBtnHandler() {
            this.$refs.answerBtn[0].changeBtn();
        },
        /*
        * 答题分页
        * params isFinish是否是最后一页并且跳转抽奖
        */
        nextQuestionHandler(isFinish = false) {
            if (this.pageCount-1 > this.pageIndex) {
                this.pageIndex = this.pageIndex + 1;
            }
            if (isFinish && (this.pageCount-1 === this.pageIndex)) {
                this.$refs.answerBtn[0].goDraw();
            }
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_answerItem{
    width: 100%;
    height: auto;
    position: relative;
    .ac_answerItem-bg{
        width: 100%;
        min-height: 16rem;
    }
    .ac_answerItem-wrap{
        position: absolute;
        top: 0;
        left: 0;
        padding: 1.5rem;
        width: 100%;
    }
    /*后代元素*/
    .acs_answerItem-title{
        line-height: 1.1rem;
        font-style: normal;
        font-size: 13px;
        color: #464646;
        font-weight: 600;
        display: flex;
    }
    /*后代元素*/
    .acs_answerItem-icon{
        width: 2rem;
        height: 2rem;
        line-height: 1rem;
        color:$colorFF;
        font-size: $FontSize20;
    }
    .acs_answerItem-txt{
        line-height: 1.1rem;
        font-style: normal;
        font-size: 13px;
        color: #464646;
        font-weight: 600;
    }
}
</style>
