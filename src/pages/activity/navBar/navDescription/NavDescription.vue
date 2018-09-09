<template>
    <div class="acs_navDescription ac_pingFang"
        v-text="nameText"
        v-if="nameText"></div>
</template>

<script>
export default {
    props: {
        nameText: {
            type: String
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_navDescription {
    width: 100%;
    height: 25px;
    background: $bg0_5;
    text-align: center;
    line-height: 25px;
    color: $colorf;
    font-size: 12px;
}
</style>
