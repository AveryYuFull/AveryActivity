<template>
    <ac-goods-item-tag-level
        class="acs_GoodsItemFullLevel"
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
        :promotionalAd="promotionalAd"
        :brand="brand"
        @click="click">
        <template>
            <!-- <div slot="promotion" class="ac_GoodsItemFullLevel-promotion" v-if="promotionalAd">{{promotionalAd}}</div> -->
            <ac-progress
                slot="progress"
                class="ac_GoodsItemFullLevel-progress"
                :showProgress="showProgress"
                :rate="rate">
            </ac-progress>
        </template>
    </ac-goods-item-tag-level>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-full-level'
};
</script>

<style lang='scss'>
.acs_GoodsItemFullLevel {
    .ac_GoodsItemFullLevel-promotion {
        display: inline-block;
        color: RGBA(223, 51, 72, 1);
        font-size: 10px;
        margin-left: 5px;
    }
    .ac_GoodsItemFullLevel-progress {
        width: 119px;
        margin-top: 7px;
    }
}
</style>
