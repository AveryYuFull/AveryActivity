<template>
    <div class="acs-mt-pricing-box" @click="click">
        <div class="ac-mt-pricing-text" :style='tipStyle' v-text="label || ''"></div>
        <div class="ac-mt-pricing-btn" :style='btnStyle' v-text='btnText'></div>
    </div>
</template>
<script>
export default {
    name: 'ac-maintain-pricing-box',
    props: {
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
            evt._contentType = 'MaintainPricingBox';
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
    .acs-mt-pricing-box {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 25px;
        text-align: center;
        .ac-mt-pricing-text {
            margin-bottom: 6px;
        }
        .ac-mt-pricing-btn {
            width: 80%;
            padding: 15px 0;
            border-radius: 5px;
            margin: auto;
        }
  }
</style>
