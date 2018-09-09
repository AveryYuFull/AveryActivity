<template>
<div class="acs_goods-list-col1">
    <ac-module-col1-g5>
        <li class="ac_module-item" v-for="(item, index) in list" :key="index">
            <ac-goods-item
                :templateType="templateType"
                :level='true'
                :goodsItem="filterGoods(item)"
                :tagFilter="tagFilter"
                :activityInfo="activityInfo"
                @click="click">
            </ac-goods-item>
        </li>
    </ac-module-col1-g5>
</div>
</template>

<script>
import AcGoodsListExtend from '../../goodsListExtend/GoodsListExtend';
export default {
    name: 'ac-goods-list-col1',
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
.acs_goods-list-col1{
    .ac_goodsItemBaseLevel-right{
        height: 110px;
        .acs_goodsContent{
            .acs_box-title {
                height: 18.5px;
                line-height: 18.5px;
                &.ac_row2{
                    min-height: 37px;
                    line-height: 18px;
                }
            }
            .acs_box-extra-title {
                height: 18.5px;
                line-height: 18.5px;
            }

            .ac_GoodsItemFullLevel-progress {
                margin-top: 3px;
            }
            .ths_price {
                .th_price-new {
                    .th_price-num{
                        height: 16px;
                        line-height: 16px;
                        display: inline-block;
                    }
                }
            }
            .acs_boxButton{
                margin-bottom: 0;
                .ths_btn{
                    .th_btn{
                        min-width: 67px;
                        line-height: 28px;
                        height: 28px;
                        font-size: $FontSize13;
                        border-radius: 15px;
                    }
                }
            }
        }
    }

}
</style>
