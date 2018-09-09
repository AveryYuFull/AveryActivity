<template>
   <ac-goods-item-tag
        class="acs_goodsItemFull"
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
        :brand="brand"
        :tagFilter="tagFilter"
        @click="click">
        <!-- <div class="ac_goods-brand" :data-brand="brand">{{brand}}</div> -->
        <ac-progress :rate="rate" :showProgress="showProgress" slot="hookRightCe"></ac-progress>
        <slot></slot>
        <slot name="hookRightFt">
            <template slot="hookRightFt">
                <ac-box-button v-if="btnItem" :nameText="btnItem.nameText" :status="btnItem.status" :className="btnItem.className"></ac-box-button>
            </template>
        </slot>
   </ac-goods-item-tag>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';
// import AcProgress from '../../widget/progress/Progress';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-full',
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

.acs_goodsItemFull {
    // .ac_goodsItemFull-tag{
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     padding: 2px 0;
    // }
    // .ac_tag-right{
    //     flex: 0 0 56px;
    // }
}
</style>
