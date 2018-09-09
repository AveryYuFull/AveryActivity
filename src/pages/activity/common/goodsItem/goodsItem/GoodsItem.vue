<template>
    <goods-factory
        @click="click($event,itemType)"
        :showAdapter="goodsItem.showAdapter"
        :itemType="itemType"
        :imgUrl="goodsItem.imgUrl"
        :nameText="goodsItem.nameText"
        :extraNameText="goodsItem.extraNameText"
        :rate="goodsItem.rate"
        :showProgress="goodsItem.showProgress"
        :price="goodsItem.price"
        :status="goodsItem.status"
        :btnItem="btnItem"
        :tags="goodsItem.tags"
        :tagFilter="tagFilter"
        :oldPrice="goodsItem.oldPrice"
        :promotionalAd="goodsItem.PromotionalAd"
        :brand="goodsItem.brand">
    </goods-factory>
</template>

<script>
import AcGoodsItemWidget from '../common/goodsItemWidget';
// import GoodsExtent from '../common/goodsExtent/GoodsExtent';
import GoodsFactory from '../common/goodsFactory/GoodsFactory';
import { GOODS_TYPE } from '../constant.js';

Vue.use(AcGoodsItemWidget);

export default {
    name: 'ac-goods-item',
    // extends: GoodsExtent,
    props: {
        /**
         * 活动信息
         */
        activityInfo: {
            type: Object
        },
        /**
         * 商品项数据
         */
        goodsItem: {
            type: Object
        },
        /**
         * 模板类型
         */
        templateType: {
            type: String
        },
        /**
         * 是否横向展示
         */
        level: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示进度条
         */
        showProgress: {
            type: Boolean,
            default: true
        },
        /**
         * 促销语
         */
        promotionalAd: {
            type: String
        },
        /**
         * 过滤标签tags
         */
        tagFilter: {
            type: Function
            // default: (tagItem) => {
            //     // console.log('tagItem', tagItem);
            //     if (tagItem instanceof Object) {
            //         !tagItem.nameText && (tagItem.Tab !== '适配') && (tagItem.nameText = tagItem.Tab);
            //         (typeof tagItem.styleType === 'undefined') && (tagItem.styleType = 2);
            //     }
            //     return tagItem;
            // }
        }
    },
    components: {
        GoodsFactory
    },
    computed: {
        itemType() {
            let _that = this;
            let res = '';
            // //Minimalist:极简版; NoButtons:无按钮版;NoPromotional:无促销语版;Complete:完整版
            switch (_that.templateType) {
                case 'Minimalist':
                    res = this.level ? GOODS_TYPE.ITEM_BASE_LEVEL : GOODS_TYPE.ITEM_BASE;
                    break;
                case 'NoButtons':
                    res = this.level ? GOODS_TYPE.ITEM_BTN_LEVEL : GOODS_TYPE.ITEM_BTN;
                    break;
                case 'NoPromotion':
                    // res = this.level ? GOODS_TYPE.ITEM_TAG_LEVEL : GOODS_TYPE.ITEM_TAG;
                    res = GOODS_TYPE.ITEM_FULL_LEVEL;
                    break;
                case 'Complete':
                    res = this.level ? GOODS_TYPE.ITEM_FULL_LEVEL : GOODS_TYPE.ITEM_FULL;
                    break;

                default:
                    break;
            }
            return res;
        },
        btnItem() {
            let _that = this;
            let goodsItem = _that.goodsItem;
            let status;
            switch (goodsItem.LabelClass) {
                case 'begin':
                    status = 0;
                    break;
                case 'over':
                    status = 2;
                    break;
                default:
                    status = 1;
            }
            return {
                nameText: goodsItem.Label,
                className: goodsItem.LabelClass,
                status: status
            };
        }
    },
    methods: {
        /**
         * 点击商品
         * @param {Event} evt 事件对象
         * @param {String} itemType 点击内容的类型
         */
        click(evt, itemType) {
            this.$emit('click', {
                itemType: itemType,
                Event: evt,
                itemData: this.goodsItem
            });
        }
    }
};
</script>

<style scoped>

</style>
