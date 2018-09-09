<template>
<div class="acs_goodsFactory">
    <div :is="goodItem"
        :showAdapter="showAdapter"
        @click="click"
        :imgUrl="imgUrl"
        :nameText="nameText"
        :extraNameText="extraNameText"
        :rate="rate"
        :price="price"
        :status="status"
        :btnItem="btnItem"
        :tags="tags"
        :showProgress="showProgress"
        :tagFilter="tagFilter"
        :oldPrice="oldPrice"
        :promotionalAd="promotionalAd"
        :brand="brand">
    </div>
</div>
</template>
<script>
import { GOODS_TYPE } from '../../constant.js';
import GoodsExtent from '../goodsExtent/GoodsExtent';
// import GoodsItemWithSuit from '../../goodsItemBase/GoodsItemWithSuit';
// import GoodsItemNoBtn from '../../goodsItemBase/GoodsItemNoBtn';
// import GoodsItemFull from '../../goodsItemBase/GoodsItemFull';

export default {
    extends: GoodsExtent,
    // components: {
    //     GoodsItemWithSuit,
    //     GoodsItemNoBtn,
    //     GoodsItemFull
    // },
    props: {
        /**
         * 商品展示类型
         */
        itemType: {
            type: String
        }
    },
    data() {
        return {
            GOODS_TYPE: GOODS_TYPE,
            components: {
                key1: 'ac-goods-item-base',
                key2: 'ac-goods-item-base'
            }
        };
    },
    computed: {
        goodItem() {
            let GOODS_TYPE = this.GOODS_TYPE;
            let res = '';
            switch (this.itemType) {
                case GOODS_TYPE.ITEM_BASE:
                    res = 'ac-goods-item-base';
                    break;
                case GOODS_TYPE.ITEM_BASE_LEVEL:
                    res = 'ac-goods-item-base-level';
                    break;
                case GOODS_TYPE.ITEM_BTN:
                    res = 'ac-goods-item-btn';
                    break;
                case GOODS_TYPE.ITEM_BTN_LEVEL:
                    res = 'ac-goods-item-btn-level';
                    break;
                case GOODS_TYPE.ITEM_FULL:
                    res = 'ac-goods-item-full';
                    break;
                case GOODS_TYPE.ITEM_FULL_LEVEL:
                    res = 'ac-goods-item-full-level';
                    break;
                case GOODS_TYPE.ITEM_TAG:
                    res = 'ac-goods-item-tag';
                    break;
                case GOODS_TYPE.ITEM_TAG_LEVEL:
                    res = 'ac-goods-item-tag-level';
                    break;
                default:
                    break;
            }
            return res;
        }
    },
    mounted() {
        // console.log('itemType--->', this.itemType);
    },
    methods: {

        // /**
        //  * 组件类型过滤
        //  * @param {string} typeName 类型名称
        //  * @return {Boolean}
        //  */
        // typeFilter(typeName) {
        //     let res = false;
        //     if (this.itemType === typeName) {
        //         res = true;
        //     }
        //     return res;
        // }
    }
};
</script>

<style scoped>
.acs_goodsFactory{
    background-color: #fff
}
</style>
