<template>
    <div class="acs_goodsItemBase" @click="click">
        <div class="ac_pic-brand">
            <ac-square-pic
                :imgUrl="imgUrl">
                <ac-corner-mark
                    v-if="brand"
                    :nameText="brand">
                </ac-corner-mark>
                <ac-tri-tag v-if="showAdapter"></ac-tri-tag>
            </ac-square-pic>
            <!-- <div class="ac_goods-brand" :data-brand="brand">{{brand}}</div> -->
        </div>
        <ac-goods-content
            :nameText="nameText"
            :extraNameText="extraNameText"
            :row="row"
            :price="price"
            :oldPrice="oldPrice">
            <slot></slot>
            <template slot="hookRightFt">
                <slot name='hookRightFt'></slot>
            </template>
        </ac-goods-content>
        <ac-mask-bg v-if="status + '' === '2'"></ac-mask-bg>
    </div>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';
import AcGoodsContent from '../../goodsContent/GoodsContent';
// import AcSquarePic from '../../widget/squarePic/SquarePic';
// import AcBoxTitle from '../../widget/BoxTitle/BoxTitle';
// import AcPrice from '../../widget/price/Price';
// import GoodsCommonContent from '../common/goodsCommonContent/GoodsCommonContent';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-base',
    components: {
        AcGoodsContent
        // AcSquarePic,
        // AcBoxTitle,
        // AcPrice
        // GoodsCommonContent
    }
};
</script>


<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_goodsItemBase {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-bottom: 5px;
    // .ac_pic-brand{
    //     position: relative;
    //     // height: 175px;
    //     .ac_goods-brand {
    //         position: absolute;
    //         bottom: 0;
    //         left: 0;
    //         letter-spacing: 1px;
    //         padding: 4px 10px 4px 11px;
    //         height: 18px;
    //         line-height: 18px;
    //         overflow: hidden;
    //         font-size: $FontSize10;
    //         &::before {
    //             content: '';
    //             background: $color748;
    //             position: absolute;
    //             width: 100%;
    //             height: 18px;
    //             left: -3px;
    //             top: 0;
    //             border-top-right-radius: 5px;
    //             transform: skew(20deg);
    //         }
    //         &::after {
    //             content: attr(data-brand);
    //             color: #fff;
    //             letter-spacing: 1px;
    //             position: absolute;
    //             padding-left: 11px;
    //             width: 100%;
    //             height: 18px;
    //             left: -3px;
    //             top: 0;
    //         }
    //     }
    // }
    .acs_goodsContent {
        margin-top: 10px;
        padding: 0 8px;
        position: relative;
    }
}
</style>
