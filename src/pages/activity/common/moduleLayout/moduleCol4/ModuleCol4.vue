<template>
<div class="acs_modulecol4">
    <ul class="ac_modulecol4-list">
        <slot></slot>
        <!-- <div class="ac_module-item"></div> -->
    </ul>
</div>
</template>

<script>
export default {
    name: 'ac-module-col4'

};
</script>


<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_modulecol4 {
    overflow: hidden;
    // .ac_modulecol4-list {
    //     display: flex;
    //     flex-wrap: wrap;
    // }
    .ac_module-item{
        padding: 0;
        width: 25%;
        display: inline-block;
    }
}
</style>
