<template>
    <ac-goods-item-base-level
        class='acs_GoodsItemTagLevel'
        :showAdapter="showAdapter"
        :imgUrl="imgUrl"
        :nameText="nameText"
        :extraNameText="extraNameText"
        :row="row"
        :price="price"
        :oldPrice="oldPrice"
        :status="status"
        :btnItem="btnItem"
        :brand="brand"
        @click="click">
        <div class="ac_tag-promotion">
            <div class="ac_goods-tag">
                <!-- <div class="ac_goods-price" v-if="filterMoney > 0">直降{{filterMoney}}</div> -->
                <ac-tag-list
                    :tags="tags"
                    :tagFilter="tagFilter">
                </ac-tag-list>
                <!-- <t-tag :text="'直降200'" class="acs_bg-red"></t-tag>
                <t-tag :text="'包安装'" class="acs_outline-red"></t-tag> -->
            </div>
            <slot name="promotion"></slot>
        </div>
        <slot name="progress"></slot>
        <slot></slot>
        <template slot="hookRightFt">
            <slot name="hookRightFt">
                <ac-box-button v-if="btnItem" :nameText="btnItem.nameText" :status="btnItem.status" :className="btnItem.className"></ac-box-button>
            </slot>
        </template>
    </ac-goods-item-base-level>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-tag-level',
    computed: {
        filterMoney() {
            let filter = Vue.filter('filter_money');
            let _price = filter(this.oldPrice - this.price, '1.0-2');
            let res = ((_price||'0')+'').slice(1);
            return res;
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_GoodsItemTagLevel {

    // .ac_hGoodsItemWithSuit-con {
    //     display: block;
    // }
    .ac_goods-price{
        display: inline-block;
        letter-spacing: 1px;
        font-size: .5rem;
        padding: 2px 4px;
        margin-right: 5px;
        background-color: $bgRed;
        color: $colorf;
        border-radius: 4px;
    }
    .ac_tag-promotion {
        font-size: 0;
        margin: 4px 0;
        position: relative;
        min-height: 15px;
    }
    .ac_goods-tag {
        display: inline-block;
        font-size: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}
</style>
