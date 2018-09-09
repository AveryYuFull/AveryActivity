<template>
    <div class="acs_flopPop_content">
        <div class="ac_flopPop_box">
            <div class="ac_tipClose"></div>
            <div class="ac_flopPop_detail">
                <ac-flop-pop-top></ac-flop-pop-top>
                <ac-flop-pop-body :showFlag='showFlag'></ac-flop-pop-body>
                <ac-flop-pop-bottom></ac-flop-pop-bottom>
            </div>
        </div>
    </div>
</template>
<script>
import AcFlopPopTop from '../flopPopTop/flopPopTop';
import AcFlopPopBody from '../flopPopBody/flopPopBody';
import AcFlopPopBottom from '../flopPopBottom/flopPopBottom';
import AcFlopPopExtent from '../flopPopExtent/flopPopExtent';
export default {
    extends: AcFlopPopExtent,
    name: 'ac-flop-pop',
    components: {
        AcFlopPopTop,
        AcFlopPopBody,
        AcFlopPopBottom
    },
    computed: {
        ...Vuex.mapState({
            location: '_locationInfo'
        })
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_flopPop_content {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.8);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    -webkit-transition: all .1s ease-in;
    transition: all .1s ease-in;
    z-index: 10000;
    .ac_flopPop_box{
        position: relative;
        width: 13rem;
        background-color: #fff;
        border-radius: 2.5px;
        .ac_tipClose{
            position: absolute;
            right: -5%;
            top: -3rem;
            width: 1.25rem;
            background: url(https://res.tuhu.org/vue/wx/static/img/guanbi.ca84664.png) no-repeat center 0;
            background-size: contain;
            height: 3.5rem;
            z-index: 9;
            padding: 0 1.5rem;
        }
        .ac_flopPop_detail{
            width: 100%;
            height: auto;
            .ac_flopPop_top{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width: 8rem;
                    height: 6.1rem;
                    margin-top:-23%;
                }
                .ac_flopPop_text{
                    padding: 0.8rem 0.5rem 0.5rem;
                    color: #e99d26;
                    font-size: 0.8rem;
                    text-align: center;
                }
            }
            .ac_flopPop_bottom{
                background: #fff;
                padding: 0 10px 20px;
                .ac_flopPop_blue,.ac_flopPop_yellow{
                    background-color: #79aeea;
                    height: 2.15rem;
                    line-height: 2.15rem;
                    font-size: 0.9rem;
                    text-align: center;
                    color: #fff;
                    box-shadow: 0 2px 0 #557bc0;
                    border-radius: 3px;
                    margin-top:0.5rem;
                    &.ac_flopPop_yellow{
                        background-color: #ffc46c;
                        box-shadow: 0 2px 0 #f6a857;
                    }
                }
            }
        }
    }
}
</style>
