<template>
    <div class="acs_answerBase"
        v-if="moduleData">
        <ac-entry-set ref="entrySet" @setQlist="setQuestionList" @clickEntry="enterHandle" v-show="showStartBtn"></ac-entry-set>
        <ac-answer-item @resetData="resetDataBase" :questionList="questionData" v-if="!showStartBtn"></ac-answer-item>
    </div>
</template>

<script>
import AnswerExtent from '../common/answerExtent/AnswerExtent';
import entryindex from '../index.js';
import * as apiConfig from '../../common/api/api.js';
import { mapGetters } from 'vuex';

Vue.use(entryindex);

export default {
    extends: AnswerExtent,
    name: 'ac-answer-base',
    components: {
    },
    props: {
        moduleData: {
            type: Object
        }
    },
    computed: {
        ...Vuex.mapState({
            userInfo: '_userInfo'
        }),
        ...mapGetters([
            'answerInfo',
            'questionCount'
        ])
    },
    created() {
        this.initData();
    },
    data() {
        return {
            /**
             * 显示“开始答题按钮”
             */
            showStartBtn: true,
            /**
             * 抽奖题目和选项
             */
            questionData: [],
            isReset: false
        };
    },
    methods: {
        initData() {
            let moduleData = this.moduleData;
            let activityId = moduleData && moduleData.ActivityId;
            this.$store.commit('SETHASHKEY', activityId);
            if (moduleData) {
                if (moduleData._isGet) {
                    this.setData(moduleData._getData);
                    delete moduleData._getData;
                    delete moduleData._isGet;
                } else {
                    this.getBigBrand();
                }
            }
        },
        resetDataBase() {
            if (!this.isReset) {
                this.isReset = true;
                this.$refs.entrySet.selectCanPacker(false);
                this.showStartBtn = true;
            }
        },
        /*
        * 点击进入我要答题
        */
        enterHandle(boolset) {
            this.showStartBtn = boolset;
        },
        /*
        * 设置题目和选项
        */
        setQuestionList(res) {
            this.questionData = res.QuestionList || [];
            this.$store.commit('SETQUESTIONCOUNT', res.QuestionList?res.QuestionList.length : 0);
        },
        setData(data) {
            this.$store.commit('SETANSWERINFO', data.BigBrandConfig);
        },
        getBigBrand() {
            this.getMdBrandConfig(this.moduleData)
                .subscribe(res => {
                    this.setData(res);
                });
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

</style>

