<template>
    <div class="acs_popup-box">
        <div class="ac_popup-content">
            <slot></slot>
        </div>
        <div class="ac_popup-btn ac_icon" @click="$emit('closePopup')">&#xe603;</div>
    </div>
</template>
<script>
export default {
    name: 'ac-popup-box'
    // components: {
    //     this.contentComponent
    // },
    // props: {
    //     contentComponent: {}
    // },
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
    .acs_popup-box {
        width: 100%;
        height: 21.55rem;
        position: relative;
        .ac_popup-content {
            height: 17.55rem;
            border-radius: 5px;
            background: #fff;
            padding: .5rem;
            overflow-y: auto;
        }
        .ac_popup-btn {
            font-size: 1.25rem;
            color: $colorf;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .ths_popup {
        &.acs_popup-box-wrap{
            .th_content-wrap{
                // max-width: 90%;
                // max-height: 90%;
                width: 13.5rem;
                transform: translate(-50%,-50%);
                // overflow: auto;
            }
            .th_content{
                background: none;
            }
        }
    }
</style>
