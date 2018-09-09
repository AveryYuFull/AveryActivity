<template>
<div class="acs_bigHitLayout">
    <ul class="ac_bigHitLayout-list">
        <slot></slot>
        <!-- <div class="ac_module-item"></div> -->
    </ul>
</div>
</template>

<script>
export default {
    name: 'ac-module-col4-g5'

};
</script>


<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_bigHitLayout {
    overflow: hidden;
    .ac_bigHitLayout-list {
        margin-top: -6px;
        margin-left: -4px;
        line-height: 0;
        font-size: 0;
    }
    .ac_bigHit-item{
        padding: 6px 0 0 4px;
        width: 25%;
        display: inline-block;
        line-height: 0;
        vertical-align: middle;
        &:nth-child(6) {
            width: 50%;
            // visibility: hidden;
            .acs_square-pic{
                padding-top: 49%;
                .ac_square-pic-img{
                    width: 99%;
                    height: 99%;
                }
            }
        }
    }
}
</style>
