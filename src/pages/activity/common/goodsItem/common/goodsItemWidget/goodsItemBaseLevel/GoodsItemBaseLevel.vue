<template>
    <div class="acs_goodsItemBaseLevel"
        @click="click">
        <div class="ac_goodsItemBaseLevel-left">
            <ac-square-pic
                :imgUrl="imgUrl">
                <ac-corner-mark
                    v-if="brand"
                    :nameText="brand">
                </ac-corner-mark>
            </ac-square-pic>
            <!-- <div class="ac_goods-brand" v-if="brand" :data-brand="brand">{{brand}}</div> -->
        </div>
        <div class="ac_goodsItemBaseLevel-right">
            <ac-goods-content
                nameClass="ac_pingFangM"
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
            <ac-tri-tag v-if="showAdapter"></ac-tri-tag>
        </div>
        <ac-mask-bg v-if="status + '' === '2'"></ac-mask-bg>
    </div>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';
import AcGoodsContent from '../../goodsContent/GoodsContent';
// import GoodsCommonContent from '../common/goodsCommonContent/GoodsCommonContent';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-base-level',
    components: {
        AcGoodsContent
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_goodsItemBaseLevel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .ac_goodsItemBaseLevel-left {
        flex: 0 0 110px;
        margin-right: 10px;
        position: relative;
        height: 110px;
        // .ac_goods-brand {
        //     position: absolute;
        //     bottom: 0;
        //     left: 0;
        //     letter-spacing: 1px;
        //     padding: 4px 10px 4px 11px;
        //     height: 18px;
        //     line-height: 18px;
        //     overflow: hidden;
        //     font-size: $FontSize10;
        //     &::before {
        //         content: '';
        //         background: $color748;
        //         position: absolute;
        //         width: 100%;
        //         height: 18px;
        //         left: -3px;
        //         top: 0;
        //         border-top-right-radius: 5px;
        //         transform: skew(20deg);
        //     }
        //     &::after {
        //         content: attr(data-brand);
        //         color: #fff;
        //         text-align: center;
        //         letter-spacing: 1px;
        //         position: absolute;
        //         width: 100%;
        //         height: 18px;
        //         left: -3px;
        //         top: 0;
        //     }
        // }
    }


    .ac_goodsItemBaseLevel-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 12px 10px 0;
    }
    .ac_right-ft {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .acs_mask-bg{
        .ac_mask-bg-tip-container {
            left: 15%;
            top: 50%;
        }
    }
}
</style>
