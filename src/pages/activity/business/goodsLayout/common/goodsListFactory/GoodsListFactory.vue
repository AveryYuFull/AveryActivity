<template>
<div class="acs_goodsListFactory">
    <div
        :is="itemName"
        :list="list"
        :goodsData="goodsData"
        :col="col"
        :templateType="templateType"
        :dataFilter="dataFilter"
        :tagFilter="tagFilter"
        :activityInfo="activityInfo"
        @click="click">
    </div>
</div>
</template>

<script>
import AcGoodsListExtend from '../goodsListExtend/GoodsListExtend';

export default {
    extends: AcGoodsListExtend,
    computed: {
        itemName() {
            let _that = this;
            let col = _that.col;
            let res = '';
            switch (col + '') {
                case '1':
                    res = 'ac-goods-list-col1';
                    break;
                case '2':
                    res = 'ac-goods-list-col2';
                    break;
                case '3':
                    res = 'ac-goods-list-col3';
                    break;
                default:
                    res = 'ac-goods-list-col2';
                    break;
            }

            return res;
        }
    }
};
</script>

<style>

</style>
