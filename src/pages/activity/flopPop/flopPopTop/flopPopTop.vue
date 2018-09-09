<template>
<div class="acs_flopPop_top">
    <img src="../images/closeShare.png"/>
    <div class="ac_flopPop_text">壳牌4L装机油30减30神券，爱车保养就用它！</div>
</div>
</template>
<script>
import AcFlopPopExtent from '../flopPopExtent/flopPopExtent';
export default {
    extends: AcFlopPopExtent,
    name: 'ac-flop-pop-top',
    components: {
        // AcFlopPop
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_flopPop_top{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 8rem;
        height: 6.1rem;
        margin-top:-23%;
    }
    .ac_flopPop_text{
        padding: 0.8rem 0.5rem 0.5rem;
        color: #e99d26;
        font-size: 0.8rem;
        text-align: center;
    }
}
</style>
