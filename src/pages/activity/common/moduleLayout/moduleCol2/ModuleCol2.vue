<template>
<div class="acs_moduleCol2">
    <ul class="ac_moduleCol2-list">
        <slot></slot>
        <!-- <div class="ac_module-item"></div> -->
    </ul>
</div>
</template>

<script>
export default {
    name: 'ac-module-col2'

};
</script>


<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_moduleCol2 {
    overflow: hidden;
    .ac_moduleCol2-list {
        display: flex;
        flex-wrap: wrap;
    }
    .ac_module-item{
        padding: 0;
        width: 50%;
        display: inline-block;
    }
}
</style>
