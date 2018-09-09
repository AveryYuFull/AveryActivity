<template>
<div class="acs_moduleCol3">
    <ul class="ac_moduleCol3-list">
        <slot></slot>
        <!-- <div class="ac_module-item"></div> -->
    </ul>
</div>
</template>

<script>
export default {
    name: 'ac-module-col3'

};
</script>


<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_moduleCol3 {
    overflow: hidden;
    .ac_moduleCol3-list {
        display: flex;
        flex-wrap: wrap;
    }
    .ac_module-item{
        padding: 0;
        width: 33.33%;
        display: inline-block;
    }
}
</style>
