<template>
<div class="acs_pop_bottom" v-if="myData">
    <div class="ac_pop_blue"
        v-text="myData.shareBtnTxt"
        v-if="myData.shareBtnTxt"
        @click="onShareBtnClick">
    </div>
    <div class="ac_pop_yellow"
        v-text="myData.washBtnTxt"
        v-if="myData.washBtnTxt"
        @click="onWashBtnClick">
    </div>
</div>
</template>
<script>
export default {
    name: 'ac-pop-bottom',
    props: {
        data: {
            type: Object
        }
    },
    data () {
        return {
            myData: this.data
        };
    },
    methods: {
        onShareBtnClick () {
            this.$emit('shareBtnClick');
        },
        onWashBtnClick () {
            this.$emit('washBtnClick');
        }
    },
    watch: {
        data (nowVal) {
            this.myData = nowVal;
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_pop_bottom{
    background: $colorf;
    padding: 0 10px 20px;
    .ac_pop_blue,.ac_pop_yellow{
        background-color: $color79A;
        height: 2.15rem;
        line-height: 2.15rem;
        font-size: 0.9rem;
        text-align: center;
        color: $colorf;
        box-shadow: 0 2px 0 $color557;
        border-radius: 3px;
        margin-top:0.5rem;
        &.ac_pop_yellow{
            background-color: $colorFFC;
            box-shadow: 0 2px 0 $colorF6A;
        }
    }
}
</style>
