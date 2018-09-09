<template>
   <ac-goods-item-base
    class="acs_goodsItemTag"
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
        <div class="ac_goodsItemTag-tag">
            <div class="ac_tag-left">
                <!-- <div class="ac_goods-price" v-if="filterMoney > 0">直降{{filterMoney}}</div> -->
                <ac-tag-list
                :tags="tags"
                :tagFilter="tagFilter"></ac-tag-list>
                <!-- <t-tag :text="'直降200'" class="acs_bg-red"></t-tag>
                <t-tag :text="'包安装'" class="acs_outline-red"></t-tag> -->
            </div>
            <div class="ac_tag-right">
                <slot name="hookRightCe">
                    <!-- <template slot="hookRightCe">
                    </template> -->
                </slot>
                <!-- <ac-progress :rate="rate"></ac-progress> -->
            </div>
        </div>
        <slot></slot>

        <template slot="hookRightFt">
            <slot name="hookRightFt"></slot>
        </template>
   </ac-goods-item-base>
</template>

<script>
import AcGoodsExtent from '../../goodsExtent/GoodsExtent';
// import AcGoodsItemBase from '../goodsItemBase/GoodsItemBase';
// import AcProgress from '../../widget/progress/Progress';

export default {
    extends: AcGoodsExtent,
    name: 'ac-goods-item-tag',
    computed: {
        filterMoney() {
            let filter = Vue.filter('filter_money');
            let _price = filter(this.oldPrice - this.price, '1.0-2');
            let res = ((_price||'0')+'').slice(1);
            return res;
        }
    },
    methods: {

    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_goodsItemTag {
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
    .ac_goodsItemTag-tag{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 4px;
        // overflow: hidden;
        .ac_tag-left{
            padding-left: 1px;
            min-height: 15px;
            font-size: 0;
            display: inline-block;
        }
    }
    .ac_tag-right{
        flex: 0 0 59px;
    }
}
</style>
