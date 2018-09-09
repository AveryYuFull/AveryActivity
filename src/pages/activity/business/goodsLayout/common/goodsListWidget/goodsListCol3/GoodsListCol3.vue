<template>
<div class="acs_goods-list-col3">
    <ac-module-col3-g5>
        <li class="ac_module-item" v-for="(item, index) in list" :key="index">
                <!-- :itemType="GOODS_TYPE.ITEM_BTN" -->
            <ac-goods-item
                :templateType="filterTemplateType(templateType)"
                :goodsItem="filterGoods(item)"
                :tagFilter="tagFilter"
                :activityInfo="activityInfo"
                @click="click">
            </ac-goods-item>
        </li>
    </ac-module-col3-g5>
</div>
</template>

<script>
import AcGoodsListExtend from '../../goodsListExtend/GoodsListExtend';
export default {
    name: 'ac-goods-list-col3',
    extends: AcGoodsListExtend,
    methods: {
        /**
         * 过滤数据
         * @param {Object} item 数据
         * @return {Object}
         */
        filterGoods(item) {
            let _item = item;
            if (this.dataFilter instanceof Function) {
                _item = this.dataFilter(item, this.col, this.templateType, this.activityInfo);
            }
            return _item;
        },
        filterTemplateType(templateType) {
            let _item = templateType;
            if (templateType === 'Complete') {
                _item = 'NoButtons';
            }
            return _item;
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_goods-list-col3 {
    // .acs_goodsItemBase {
    //     .ac_pic-brand{
    //         height: 115px;
    //     }
    // }
    .acs_goodsContent{
        margin-top: 4px;
        .acs_box-title,
        .acs_box-extra-title {
            line-height: 16px;
            font-size: $smallFontSize;
            &.ac_row2{
                min-height: 33px;
                line-height: 16px;
            }
        }
    }
    .ths_price{
        .th_price-new{
            font-size: $FontSize10;
            .th_price-num{
                font-size: $defaultFontSize;
            }
        }
    }
}
</style>
