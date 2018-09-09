<template>
    <div class="acs-mt-pricing" @click="click">
        <ac-img-box v-if="bgImg" :imgUrl='bgImg'></ac-img-box>
        <maintain-pricing-box
            :label="label"
            :tipStyle="tipStyle"
            :btnStyle="btnStyle"
            :btnText="btnText"></maintain-pricing-box>
        <!-- <div class="ac_button-wrap">
            <t-button100>
                <t-button :styleName="'red'"></t-button>
            </t-button100>
        </div> -->
    </div>
</template>
<script>
import MaintainPricingBox from '../maintainPricingBox';
export default {
    name: 'ac-maintain-pricing-content',
    components: {
        MaintainPricingBox
    },
    props: {
        bgImg: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        tipStyle: {
            type: Object,
            default: {}
        },
        btnStyle: {
            type: Object,
            default: {}
        },
        btnText: {
            type: String,
            default: ''
        }
    },
    methods: {
        click(evt) {
            evt._contentType = evt._contentType || 'MaintainPricingContent';
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
    .acs-mt-pricing{
        position: relative;
        min-height: 80px;
        img {
            width: 100%;
            height: 100%;
            display: inline-block;
            vertical-align: middle;
        }
        .ac_button-wrap {
            position: absolute;
            width: 100%;
            bottom: 25px;
            padding: 0 15px;
            .ths_btn{
                &.th_style-red{
                    .th_btn {
                        border-radius: 5px;
                    }
                }
            }
        }
    }
</style>
