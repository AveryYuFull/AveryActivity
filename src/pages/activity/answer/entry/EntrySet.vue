<template>
    <div class="acs_entry">
        <ac-img-box 
            class="ac_entry-img" 
            :isLazy="false"
            :imgUrl="answerInfo&&answerInfo.BigBrandAnsQues&&answerInfo.BigBrandAnsQues.HomeBgImgUri" 
        ></ac-img-box>
        <div @click="myAnswer" class="ac_entry-click">{{extryText}}</div>
    </div>
</template>

<script>
import AnswerExtent from '../common/answerExtent/AnswerExtent';
import { mapGetters } from 'vuex';
import { getSelectCanPacker } from '../../common/api/httpClient';

export default {
    extends: AnswerExtent,
    name: 'ac-entry-set',
    computed: {
        ...Vuex.mapState({
            userInfo: '_userInfo'
        }),
        ...mapGetters([
            '_userInfo',
            'answerInfo',
            'continueQ',
            'hashKey',
            'rewardInfo'
        ])
    },
    data() {
        return {
            extryText: ''
        };
    },
    watch: {
        continueQ(newVal, oldVal) {
            this.selectCanPacker(false);
        }
    },
    mounted() {
        // console.log(777, this.rewardInfo);
        this.selectCanPacker(false);
    },
    methods: {
        myAnswer() {
            if (this.extryText === '分享答题') {
                this.shareUtils(1);
                this.$store.commit('COUNTINUEQ', this.continueQ+1);
                return;
            } else if (this.extryText === '戳我用券') {
                this.$tuhu.toUrl({
                    appLink: 'tuhu:/coupons',
                    h5Link: 'https://wx.tuhu.cn/vue/couponlist/pages/home/index'
                });
            }
            if (this.userInfo && this.userInfo.userid) {
                // this.getBigBrand();
                this.selectCanPacker(true);
            } else {
                this.$tuhu.getUserInfo({
                    force: true
                }).then((res) => {
                    // console.log(2233, res);
                    if (res.islogin) {
                        this.selectCanPacker(true);
                    }
                });
            }
        },
        selectCanPacker(isClick) {
            // console.log(4445555, this.hashKey);
            let params = {
                channel: this.$tuhu.device().isApp? 'H5' : 'Wechat',
                hashKey: this.hashKey
            };
            getSelectCanPacker(this.$http, params).subscribe(res => {
                // console.log(444, res);
                if (res.Code + '' === '1') {
                    this.$emit('setQlist', res);
                    if (res.Status === 'ShareIt' && !res.IsShare) {
                        this.extryText = '分享答题';
                        if (isClick) {
                            this.shareUtils(1);
                        }
                        this.$emit('clickEntry', true);
                    } else if (res.Status === 'StartAnswer') {
                        this.extryText = '我要答题';
                        if (isClick) {
                            this.$emit('clickEntry', false);
                        } else {
                            this.$emit('clickEntry', true);
                        }
                    } else if (res.Status === 'Unauthorized') {
                        this.extryText = '我要答题';
                    } else {
                        this.extryText = '戳我用券';
                        this.$emit('clickEntry', true);
                    }
                } else if (res.Code === 0) {
                    this.$tuhu.toast(res.Message);
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

.acs_entry{
    position: relative;
    .ac_entry-img{
        width: 100%;
        min-height: 10rem;
        display:block;
    }
    .ac_entry-click{
        text-align: center;
        @include centerAll;
        left: 49.2%;
        top: 49.5%;
        font-size: 31px;
        width: 3.4rem;
        color:$colorRed;
        line-height: 1.85rem;
    }
}
</style>
