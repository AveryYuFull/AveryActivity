<template>
   <ac-goods-item-tag
        class="acs_goodsItemBtn"
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
        <slot></slot>
        <ac-progress :rate="rate" :showProgress="showProgress" slot="hookRightFt"></ac-progress>
        <!-- <slot name="hookBtn">
            <template slot="hookBtn">
                <ac-box-button v-if="btnItem" :nameText="btnItem.nameText" :status="btnItem.status" :className="btnItem.className"></ac-box-button>
            </template>
        </slot> -->
   </ac-goods-item-tag>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';
// import AcGoodsItemBase from '../goodsItemBase/GoodsItemBase';
// import AcProgress from '../../widget/progress/Progress';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-btn',
    computed: {

    },
    methods: {

    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_goodsItemBtn {
    .ac_cont-ft-right{
        flex: 0 0 2.7rem;
        display: flex;
        align-self: center;
    }
}
</style>
