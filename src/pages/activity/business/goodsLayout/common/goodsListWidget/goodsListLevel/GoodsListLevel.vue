<template>
    <div class="acs_goodsList-level">
        <li class="ac_module-item" v-for="(item, index) in list" :key="index">
            <ac-goods-item
                :templateType="templateType"
                :goodsItem="filterGoods(item)"
                :tagFilter="tagFilter"
                @click="click">
            </ac-goods-item>
        </li>
        <!-- <div class="as_goodsList-item" v-for="(item, index) in 3" :key="index">
            <ac-goods-item
                :itemType="GOODS_TYPE.ITEM_BASE_LEVEL"
                :imgUrl="'https://img1.tuhu.org/Images/Products/0798/c10b/c45a60ff8511b5770d22dbd5_w800_h800.jpg@420h_99q.jpg'"
                :nameText="'360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300'"
                :rate="50"
                :price="80"
                :status="index"
                :btnItem="{status:index,nameText: '团购'}"
                :tags="[{type:1,nameText:'直降200'},{type:2,nameText:'包安装'}]"
                :oldPrice="180">
            </ac-goods-item>
        </div>
        <div class="as_goodsList-item" v-for="(item, index) in 3" :key="index">
            <ac-goods-item
                :itemType="GOODS_TYPE.ITEM_BTN_LEVEL"
                :imgUrl="'https://img1.tuhu.org/Images/Products/0798/c10b/c45a60ff8511b5770d22dbd5_w800_h800.jpg@420h_99q.jpg'"
                :nameText="'360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300'"
                :rate="50"
                :price="80"
                :status="index"
                :btnItem="{status:index,nameText: '团购'}"
                :tags="[{type:1,nameText:'直降200'},{type:2,nameText:'包安装'}]"
                :oldPrice="180">
            </ac-goods-item>
        </div>
        <div class="as_goodsList-item" v-for="(item, index) in 3" :key="index">
            <ac-goods-item
                :itemType="GOODS_TYPE.ITEM_FULL_LEVEL"
                :imgUrl="'https://img1.tuhu.org/Images/Products/0798/c10b/c45a60ff8511b5770d22dbd5_w800_h800.jpg@420h_99q.jpg'"
                :nameText="'360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300360 行车记录仪 G300 360 行车记录仪 G300'"
                :rate="50"
                :price="80"
                :status="index"
                :btnItem="{status:index,nameText: '团购'}"
                :tags="[{type:1,nameText:'直降200'},{type:2,nameText:'包安装'},{type:0,nameText:'第二件半价'}]"
                :oldPrice="180">
            </ac-goods-item>
        </div> -->
    </div>
</template>

<script>

import AcGoodsListExtend from '../../goodsListExtend/GoodsListExtend';
// import { GOODS_TYPE } from '../../../common/goods/constant.js';
// import AcGoodsItemBase from '../../../common/goods/goodsItemBase/GoodsItemBase';
// import AcGoodsItemFull from '../../../common/goods/goodsItemFull/GoodsItemFull';

export default {
    extends: AcGoodsListExtend,
    name: 'ac-goods-list-level',
    data() {
        return {
            GOODS_TYPE: GOODS_TYPE
        };
    },
    methods: {
        /**
         * 过滤数据
         * @param {Object} item 数据
         * @return {Object}
         */
        filterGoods(item) {
            let _item = item;
            if (this.dataFilter instanceof Function) {
                _item = this.dataFilter(item);
            }
            return _item;
        }
    }
    // components: {
    //     AcGoodsItemBase,
    //     AcGoodsItemFull
    // }
};
</script>

<style lang="scss">
.acs_goodsList-level{
    display: flex;
    flex-wrap: wrap;
    // .as_goodsList-item {
    //     flex: 0 0  50%;
    //     padding: 10px 5px;
    // }
}
</style>
