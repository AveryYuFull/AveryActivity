<template>
<div class="acs_moduleCol2G5">
    <ul class="ac_moduleCol2G5-list">
        <slot></slot>
        <!-- <div class="ac_module-item"></div> -->
    </ul>
</div>
</template>

<script>
export default {
    name: 'ac-module-col2-g5'

};
</script>


<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_moduleCol2G5 {
    overflow: hidden;
    .ac_moduleCol2G5-list {
        margin-top: -$space5;
        margin-left: -$space5;
        display: flex;
        flex-wrap: wrap;
    }
    .ac_module-item{
        padding: $space5 0 0 $space5;
        width: 50%;
        display: inline-block;
    }
}
</style>
