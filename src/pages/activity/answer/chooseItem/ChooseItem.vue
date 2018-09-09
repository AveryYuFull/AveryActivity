<template>
    <div>
        <div v-for="(item, index) in options" @click="optionClick(item, index)" :key="index" class="acs_chooseItem">
            <!-- <ac-img-box class="ac_chooseItem-unchoose" :imgUrl="choseoff" :is-lazy="false"></ac-img-box>
            <ac-img-box class="ac_chooseItem-choosed" v-show="item.selected" :imgUrl="choseon"></ac-img-box> -->
            <div class="ac_chooseItem-project">
                <label class="ac_label" :class="{'selected':item.selected,'error': item.correct === 2, 'correct': item.showCorrect || (item.correct === 1)}">
                    <input name="chooseItem" v-model="item.OptionsValue" :value=item.OptionsValue type="radio" />{{item.OptionsValue}}
                </label>
                <!-- <div :class="{'ac_chooseItem-txt-default':true, 'error': item.correct === 2, 'correct': item.showCorrect}">{{item.OptionsValue}}</div> -->
                <!-- <ac-img-box class="ac_chooseItem-error" v-show="item.correct === 2" :imgUrl="wrong"></ac-img-box>
                <ac-img-box class="ac_chooseItem-correct" v-show="item.showCorrect || (item.correct === 1)" :imgUrl="right"></ac-img-box> -->
            </div>
        </div>
    </div>
</template>

<script>
import { answerVerification } from '../../common/api/httpClient';
import AnswerExtent from '../common/answerExtent/AnswerExtent';
import AcErrorPopUp from '../errorPopUp';
import choseoff from './img/choseoff.png';
import choseon from './img/choseon.png';
import right from './img/right.png';
import wrong from './img/wrong.png';
import { mapGetters } from 'vuex';

export default {
    inject: ['$$Popup'],
    extends: AnswerExtent,
    name: 'ac-choose-item',
    data() {
        return {
            options: this.question.Options,
            allowChoose: true,
            choseoff: choseoff,
            choseon: choseon,
            right: right,
            wrong: wrong
        };
    },
    computed: {
        ...Vuex.mapState({
        }),
        ...mapGetters([
            'virification',
            'hashKey'
        ])
    },
    created() {
        this.options = this.options.map(item => {
            item.selected = false;
            item.correct = 0; // 0未选择时，1显示正确，2显示错误
            item.showCorrect = false;
            return item;
        });
        // console.log(2222211111, this.options);
    },
    methods: {
        optionClick(item) {
            if (this.allowChoose) {
                item.selected = true;
                this.$set(item, item.selected, true);
                this.allowChoose = false;
                this.checkoutError(item);
            }
        },
        // shareHandler() {
        //     this.shareCallback(this.hashKey);
        //     let params = {
        //         quesId: this.question.PKID,
        //         options: this.virification.OptionsReal,
        //         hashKey: this.hashKey
        //     };
        //     this.updateQusAnswer(params);
        // },
        checkoutError(item) {
            let params = {
                quesId: this.question.PKID,
                options: item.OptionsKey,
                hashKey: this.hashKey
            };
            answerVerification(this.$http, params).subscribe(res => {
                // console.log(666533, res);
                let _that = this;
                if (res.Code + '' === '1') {
                    console.log(res);
                    this.$store.commit('SETVERIFICATION', res);
                    this.$emit('showBtnControl');
                    if (!res.IsReal && res.IsShareQuestion) {
                        item.correct = 2;
                        this.$set(item, item.correct, 2);
                        this.$emit('showBtnControl');
                    } else if (res.IsReal || res.IsShareQuestion) {
                        item.correct = 1;
                        this.$set(item, item.correct, 1);
                    } else if (!res.IsReal && !res.IsShareQuestion) {
                        // console.log(this.virification);
                        item.correct = 2;

                        // console.log(item.OptionsKey, this.virification.OptionsReal);
                        this.$set(item, item.correct, 2);
                        this.options.map(child => {
                            let bools = child.OptionsKey === this.virification.OptionsReal;
                            child.showCorrect = bools;
                            // this.$set(child, child.showCorrect, bools);
                            return child;
                        });
                        // this.options = this.options.splice(0, this.options.length);
                        this.$$Popup.open(AcErrorPopUp, {
                            props: {
                                shareHandler: () => {
                                    this.shareUtils(2, () => {
                                        _that.$emit('nextQuestion', true);
                                    });
                                }
                            },

                            alignCla: 'centerMiddle',
                            wrapCla: 'log_popup'
                        });
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

.acs_chooseItem{
    position: relative;
    margin: .75rem .5rem .75rem .5rem;
    // .ac_chooseItem-unchoose,.ac_chooseItem-choosed{
    //     width: .75rem;
    //     height: .75rem;
    //     position: absolute;
    //     top: .15rem;
    //     left: 0;
    //     line-height: 0;
    // }
    .ac_chooseItem-project{
        display: flex;
        input[type='radio'] {
          display: none;
          -webkit-appearance: none;
        }
        .ac_label {
          background-color: #fff;
          height: 1rem;
            line-height: 1rem;
            padding-left: 1.8rem;
          font-size: $FontSize13;
            margin-bottom: 0.25rem;
            color:$color5b;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 0.5rem;
            top: 0.1rem;
            width: 0.8rem;
            height: 0.8rem;
            background: url(./img/choseoff.png) no-repeat;
            background-size: contain;
          }
          &.selected {
            &::before {
              content: '';
              position: absolute;
              left: 0.5rem;
            top: 0.1rem;
            width: 0.8rem;
            height: 0.8rem;
              background: url(./img/choseon.png) no-repeat;
              background-size: contain;
            }
          }
          &.error,&.correct{
              &::after {
                content: '';
                position: absolute;
                right: -1.5rem;
              top: 0.15rem;
              width: 0.8rem;
              height: 0.8rem;
            }
                &.error{
            color:$colorRed;
            &::after {
              background: url(./img/wrong.png) no-repeat;
              background-size: contain;
            }
            }
            &.correct{
                color:$color2f;
                &::after {
                background: url(./img/right.png) no-repeat;
                background-size: contain;
                }
            }
          }

        }

    }
    /*后代*/
    // .ac_chooseItem-txt-default{
    //     height: 1rem;
    //     line-height: 1rem;
    //     padding-left: 1.8rem;
    //     font-size: $FontSize13;
    //     margin-bottom: 0.25rem;
    //     color:$color5b;
    //     &.error{
    //         color:$colorRed;
    //     }
    //     &.correct{
    //         color:$color2f;
    //     }
    // }
    // .ac_chooseItem-error,.ac_chooseItem-correct{
    //     display: inline-block;
    //     width: .8rem;
    //     height: .8rem;
    //     margin-left: .5rem;
    //     margin-top: .1rem;
    // }
}
</style>
