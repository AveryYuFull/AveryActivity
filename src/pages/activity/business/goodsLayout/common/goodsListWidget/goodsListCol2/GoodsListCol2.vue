<template>
<div class="acs_goods-list-col2">
    <ac-module-col2-g5>
        <li class="ac_module-item" v-for="(item, index) in list" :key="index">
            <ac-goods-item
                :templateType="templateType"
                :goodsItem="filterGoods(item)"
                :tagFilter="tagFilter"
                :activityInfo="activityInfo"
                @click="click">
            </ac-goods-item>
            <!-- <ac-goods-item
                :itemType="GOODS_TYPE.ITEM_BTN"
                :imgUrl="'https://img1.tuhu.org/Images/Products/0798/c10b/c45a60ff8511b5770d22dbd5_w800_h800.jpg@420h_99q.jpg'"
                :nameText="'360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300'"
                :rate="50"
                :price="80"
                :status="index"
                :btnItem="{status:index,nameText: '团购'}"
                :tags="[{type:1,nameText:'直降200'},{type:2,nameText:'包安装'}]"
                :oldPrice="180">
            </ac-goods-item> -->
        </li>
    </ac-module-col2-g5>
</div>
</template>

<script>
import AcGoodsListExtend from '../../goodsListExtend/GoodsListExtend';
export default {
    name: 'ac-goods-list-col2',
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
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_goods-list-col2 {
    .acs_box-title,
    .acs_box-extra-title {
        // font-size: $smallFontSize;
        // &.ac_row2{
        //     min-height: 30px;
        //     line-height: 15px;
        // }
    }
}
</style>
