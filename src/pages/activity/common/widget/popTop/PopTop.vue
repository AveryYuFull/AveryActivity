<template>
<div class="acs_pop_top" v-if="myData">
    <!-- <img class="ac_pop_top-theme" :src="myData.popHeaderTheme" alt="" /> -->
    <ac-square-pic
        class="ac_pop_top-theme"
        :imgUrl="myData.popHeaderTheme"></ac-square-pic>
    <div class="ac_pop_text"
        v-text="myData.description"
        v-if="myData.description">
    </div>
    <div class="ac_pop_sub_text"
        v-text="myData.subDescription"
        v-if="myData.subDescription">
    </div>
</div>
</template>
<script>
// import AcFlopPopExtent from '../flopPopExtent/flopPopExtent';
export default {
    // extends: AcFlopPopExtent,
    name: 'ac-pop-top',
    props: {
        data: {
            type: Object || String
        }
    },
    data () {
        return {
            myData: this.data
        };
    },
    watch: {
        data (nowVal) {
            this.myData = nowVal;
            // console.log('poptop watch--->', nowVal);
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_pop_top{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 0.5rem;
    .ac_pop_top-theme {
        // width: 8rem;
        // height: 6.1rem;
        // margin-top:-23%;
    }
    .acs_square-pic {
        padding-top: 45%;
        margin-top: -23%;
    }

    .ac_pop_text{
        padding: 0.8rem 0.5rem 0;
        color: $colorE99;
        font-size: 0.8rem;
        text-align: center;
    }
    .ac_pop_sub_text {
        color: $color9;
        font-size: 0.7rem;
        text-align: center;
    }
}
</style>
