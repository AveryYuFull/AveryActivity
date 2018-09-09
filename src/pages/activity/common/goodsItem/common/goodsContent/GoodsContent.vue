<template>
    <div class="acs_goodsContent">
        <!-- <div class="ac_goods-brand" :data-brand="brand">{{brand}}</div> -->
        <ac-box-title
            :nameText="nameText"
            :extraNameText="extraNameText"
            :nameClass="nameClass"
            :row="row">
        </ac-box-title>
        <slot></slot>
        <div class="ac_goods-cont-ft">
            <div class="ac_cont-ft-left">
                <ac-price
                    :price="price"
                    :oldPrice="oldPrice">
                </ac-price>
            </div>
            <div class="ac_cont-ft-right">
                <slot name="hookRightFt"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import GoodsExtent from '../goodsExtent/GoodsExtent';

export default {
    extends: GoodsExtent,
    name: 'ac-goods-common-content',
    watch: {
        row(nowVal) {
            // console.log(nowVal);
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_goodsContent {
    // margin-top:10px;
    // padding: 0 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .ac_goods-cont-ft{
        display: flex;
        justify-content: space-between;
        align-items:flex-end;
        flex-grow: 1;
        // line-height: 2em;
    }
    .acs_box-title {
        font-size: $FontSize13;
        &.ac_row2{
            // height: 37px;
            min-height: 37px;
            line-height: 18px;
        }
    }
}
</style>


