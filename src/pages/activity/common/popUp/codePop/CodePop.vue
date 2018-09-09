<template>
    <div class="acs_codePop"
        :style="themeBg">
        <div class='ac_codePop-pic'>
            <ac-img-box class="ac_img" :imgUrl="myPopData.codeImg" alt='' width="100%" ></ac-img-box>
        </div>
        <ac-close-img
            class="ac_codePop-close-img"
            @handleClose="handleClose"></ac-close-img>
    </div>
</template>

<script>
import PopExtend from '../common/popExtend/PopExtend';

export default {
    name: 'ac-code-pop',
    extends: PopExtend,
    computed: {
        themeBg () {
            return {
                background: `url(${this.myPopData.codePopBG}) no-repeat center / contain`
            };
        }
    }
};
</script>

<style lang="scss">
.acs_codePop {
    position: relative;
    height: 363px;
    .ac_codePop-pic {
        position: absolute;
        margin-top: -90px;
        left: 50%;
        top: 85%;
        padding: 0;
        width: 65%;
        transform: translate3d(-50%, -50%, 0);
    }
    .ac_codePop-close-img {
        position: absolute;
        bottom: -65px;
        left: 50%;
        margin-left: -12px;
    }
}
</style>
