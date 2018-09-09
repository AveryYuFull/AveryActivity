<template>
    <div class="acs_goodsList" v-if="list && list.length">
        <ac-goods-list-factory
            class="ac_goodsList-item"
            :col="col"
            :list="list"
            :templateType="templateType"
            :goodsData="goodsData"
            :dataFilter="dataFilter"
            :tagFilter="tagFilter"
            :activityInfo="activityInfo"
            @click="click">
        </ac-goods-list-factory>
    </div>
</template>

<script>
import AcGoodsListFactory from '../common/goodsListFactory/GoodsListFactory';
// import AcGoodsItemBase from '../../../common/goods/goodsItemBase/GoodsItemBase';
// import AcGoodsItemFull from '../../../common/goods/goodsItemFull/GoodsItemFull';
import AcGoodsListExtend from '../common/goodsListExtend/GoodsListExtend';
import filterGoodsName from '../common/filters/goodsName.filter.js';
import filterTagList from '../common/filters/filterTagList.filter.js';
import filterAdapter from '../common/filters/filterAdapter.filter.js';
import filterShowProgress from '../common/filters/filterShowProgress.filter.js';
import filterStatus from '../common/filters/filterStatus.filter.js';

export default {
    name: 'ac-goods-list',
    extends: AcGoodsListExtend,
    components: {
        AcGoodsListFactory
    },
    props: {
        dataFilter: {
            type: Function,
            default: (item, col, templateType, activityInfo) => {
                // :itemType="goodsItem.itemType"
                let _that = this;
                return Object.assign({}, item, {
                    imgUrl: item.Image,
                    nameText: filterGoodsName(item),
                    extraNameText: item.TireSize || '',
                    price: item.Price,
                    oldPrice: item.MarketingPrice,
                    status: filterStatus(item),
                    rate: parseInt(item.Percent) || 0,
                    tags: filterTagList(item, col, templateType),
                    showAdapter: filterAdapter(item, activityInfo),
                    showProgress: filterShowProgress(item, col),
                    brand: (item.IsBrandName && item.Brand && item.Brand.split('/')[0]) || ''
                });
            }
        },
        /**
         * 过滤标签tags
         */
        tagFilter: {
            type: Function,
            default: (tagItem) => {
                // console.log('tagItem', tagItem);
                if (tagItem instanceof Object) {
                    !tagItem.nameText && (tagItem.Tab !== '适配') && (tagItem.nameText = tagItem.Tab);
                    (typeof tagItem.styleType === 'undefined') && (tagItem.styleType = 2);
                }
                return tagItem;
            }
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_goodsList{
    padding-top: $ptb;
    .ac_goodsList-item {
        padding: 0 $plr 0 $plr;
    }
    // display: flex;
    // flex-wrap: wrap;
    // .as_goodsList-item {
    //     flex: 0 0  50%;
    //     padding: 10px 5px;
    // }
}
</style>
