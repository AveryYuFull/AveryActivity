<template>
    <div class="acs_cornerMark"
        v-if="nameText"
        :data-text="nameText">
    </div>
</template>

<script>
export default {
    name: 'ac-corner-mark',
    props: {
        /**
         * 内容文本
         */
        nameText: {
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_cornerMark {
    position: absolute;
    bottom: 0;
    left: 0;
    letter-spacing: 1px;
    // height: 18px;
    // line-height: 1;
    overflow: hidden;
    font-size: $FontSize10;
    color: #fff;
    padding: 2px 10px 2px 8px;
    &::before {
        content: '';
        background: $color748;
        position: absolute;
        width: 100%;
        // height: 18px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-top-right-radius: 3px;
        transform: skew(15deg);
        transform-origin: 0 100%;
    }
    &::after {
        content: attr(data-text);
        letter-spacing: 1px;
        position: relative;
        width: 100%;
        line-height: 1;
        z-index: 1;
        // height: 18px;
        // left: -3px;
        // top: 0;
    }
}
</style>
