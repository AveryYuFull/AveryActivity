<template>
<div class="acs_flopPop_bottom">
    <div class="ac_flopPop_blue">分享还能再抽1次</div>
    <div class="ac_flopPop_yellow">戳我用券</div>
</div>
</template>
<script>
import AcFlopPopExtent from '../flopPopExtent/flopPopExtent';
export default {
    extends: AcFlopPopExtent,
    name: 'ac-flop-pop-bottom',
    components: {
        // AcFlopPop
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_flopPop_bottom{
    background: #fff;
    padding: 0 10px 20px;
    .ac_flopPop_blue,.ac_flopPop_yellow{
        background-color: #79aeea;
        height: 2.15rem;
        line-height: 2.15rem;
        font-size: 0.9rem;
        text-align: center;
        color: #fff;
        box-shadow: 0 2px 0 #557bc0;
        border-radius: 3px;
        margin-top:0.5rem;
        &.ac_flopPop_yellow{
            background-color: #ffc46c;
            box-shadow: 0 2px 0 #f6a857;
        }
    }
}
</style>
