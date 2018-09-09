<template>
    <div class="acs_drawLotteryFactory">
        <div v-if="drawLotteryItem"
            :is="drawLotteryItem"
            :item-data="myItemData"
            :start-cb="startCb"
            :status.sync="myStatus"
            :share-cb="shareCb"
            :data-filter="dataFilter">
        </div>
    </div>
</template>

<script>
import { DRAW_LOTTERY_TYPE } from '../constant';
import DrawLotteryExtend from '../drawLotteryExtend/DrawLotteryExtend';

export default {
    extends: DrawLotteryExtend,
    props: {
        /**
         * 活动类型
         */
        itemType: {
            type: String
        }
    },
    // created() {
    //     console.log(this.myItemData);
    // },
    computed: {
        drawLotteryItem () {
            let res = '';
            switch (this.itemType) {
                case DRAW_LOTTERY_TYPE.DRAW_LOTTERY_NEW_BIG_HIT:
                    res = 'ac-new-big-hit';
                    break;
                case DRAW_LOTTERY_TYPE.DRAW_LOTTERY_ERNIE:
                    res = 'ac-ernie';
                    break;
                case DRAW_LOTTERY_TYPE.DRAW_LOTTERY_ANSWER_LUCKY_DRAW:
                    res = 'ac-answer';
                    break;
                default:
                    break;
            }
            return res;
        }
    }
};
</script>
