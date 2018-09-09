<template>
<div class="acs_moduleCol1G5">
    <ul class="ac_moduleCol1G5-list">
        <slot></slot>
        <!-- <div class="ac_module-item"></div> -->
    </ul>
</div>
</template>

<script>
export default {
    name: 'ac-module-col1-g5'

};
</script>


<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_moduleCol1G5 {
    overflow: hidden;
    .ac_moduleCol1G5-list {
        margin-top: -$space5;
        display: flex;
        flex-wrap: wrap;
    }
    .ac_module-item{
        padding-top: $space5;
        width: 100%;
        display: inline-block;
    }
}
</style>
