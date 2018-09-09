<template>
    <div class="acs_tri-tag"></div>
</template>
<script>

export default {
    name: 'ac-tri-tag'
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_tri-tag {
    position: absolute;
    top: 0;
    right: 0;
    border-top: 33px solid #62CAB5;
    border-left: 33px solid transparent;
    border-bottom: 33px solid transparent;
    &::before {
        content: '适配';
        position: absolute;
        top: -32px;
        right: 1px;
        font-size: $FontSize9;
        text-align: center;
        letter-spacing: 1px;
        width: 33px;
        height: 33px;
        z-index: 9;
        color: #fff;
        transform: rotate(45deg);
    }
}
</style>
