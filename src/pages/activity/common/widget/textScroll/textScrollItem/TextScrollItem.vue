<template>
    <div class="acs_textScrollItem-item" :style="styleItem">
        <!-- <img class="ac_item-icon" v-if="scrollItem.imgUrl" :src="scrollItem.imgUrl"> -->
        <ac-img-box class="ac_item-icon"
            v-if="scrollItem.imgUrl"
            :imgUrl="scrollItem.imgUrl">
        </ac-img-box>
        <!-- <span v-else class="ac_item-prefix"></span> -->
        <span class="ac_item-text" :style="styleText">{{scrollItem.nameText}}</span>
        <i class="ac_item-arrow"></i>
    </div>
</template>

<script>
    export default {
        props: {
            scrollItem: {
                type: Object
            }
        },
        computed: {
            styleItem() {
                if (this.scrollItem && !this.scrollItem.imgUrl) {
                    // return 'text-align:center;justify-content:center';
                    return 'text-indent:.5em';
                }
            },
            styleText() {
                if (this.scrollItem && this.scrollItem.imgUrl) {
                    // return 'flex:1';
                }
            }
        }
    };
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_textScrollItem-item{
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // display: inline-block;
    // vertical-align: middle;
    display: flex;
    justify-content: space-between;
    width: 100%;
    line-height: 1.65rem;
    .ac_item-icon {
        display: inline-block;
        // height: .8rem;
        width: .8rem;
        vertical-align: middle;
    }
    .ac_item-prefix{
        display: inline-block;
        // height: .8rem;
        width: 0;
        vertical-align: middle;
    }
    .ac_item-text{
        font-size: $smallFontSize;
        max-width:4.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
    }
    .ac_item-arrow{
        width:0.3rem;
        height: 0.5rem;
        // display: inline-block;
        position: relative;
        &::after{
            content: '\e601';
            @extend %ac_icon;
            font-size: .5rem;
            position: absolute;
            top: 0.6rem;
            right: -0.1rem;
            color: $color9;
        }
    }
}
</style>
