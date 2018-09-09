<template>
    <ac-goods-item-tag-level
        class="acs_goodsItemBtnLevel"
        :showAdapter="showAdapter"
        :imgUrl="imgUrl"
        :nameText="nameText"
        :extraNameText="extraNameText"
        :row="row"
        :price="price"
        :oldPrice="oldPrice"
        :status="status"
        :btnItem="btnItem"
        :tags="tags"
        :tagFilter="tagFilter"
        :brand="brand"
        @click="click">
        <div class="ac_goods-remark" v-if="promotionalAd">{{promotionalAd}}</div>
        <template slot="hookRightFt">
            <ac-progress
                class="ac_goods-progress"
                :rate="rate"
                :showProgress="showProgress"></ac-progress>
        </template>
    </ac-goods-item-tag-level>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-btn-level'
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_goodsItemBtnLevel {
    .ac_goods-remark{
        @include lineClamp(1);
        color: #999;
        font-size: $FontSize10;
        line-height: 14px;
    }
    .ac_goods-progress {
        width: 67px;
    }
}
</style>
