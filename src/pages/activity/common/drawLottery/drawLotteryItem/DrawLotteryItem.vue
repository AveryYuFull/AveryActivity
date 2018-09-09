<template>
    <draw-lottery-factory
        :item-type="itemType"
        :item-data="myItemData"
        :start-cb="startCb"
        :status.sync="myStatus"
        :share-cb="shareCb"
        :data-filter="dataFilter">
    </draw-lottery-factory>
</template>

<script>
import DrawLotteryFactory from '../common/drawLotteryFactory/DrawLotteryFactory';
import DrawLotteryExtend from '../common/drawLotteryExtend/DrawLotteryExtend';

const COMPONENT_NAME = 'ac-draw-lottery-item';

export default {
    name: COMPONENT_NAME,
    extends: DrawLotteryExtend,
    components: {
        DrawLotteryFactory
    },
    props: {
        /**
         * 活动模块类型（大翻盘，摇奖机，问答抽奖）
         */
        itemType: {
            type: String
        }
    }
};
</script>
