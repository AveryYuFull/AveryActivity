<template>
    <ac-draw-lottery-item
        class="acs_drawLottery"
        :item-type="itemType"
        :item-data="myItemData"
        :start-cb="start"
        :status.sync="myStatus"
        :share-cb="handleShare"
        :data-filter="_dataFilter">
    </ac-draw-lottery-item>
</template>

<script>
import BusinessExtend from './drawExtend/BusinessExtend';
import { DRAW_LOTTERY_TYPE } from '../common/drawLottery/common/constant';
import { dataFilter } from '../common/util/commonUtil';

const COMPONENT_NAME = 'ac-draw-lottery';

export default {
    name: COMPONENT_NAME,
    extends: BusinessExtend,
    // props: {
    //     moduleData: {
    //         type: Object
    //     }
    // },
    computed: {
        itemType () {
            const _that = this;
            let itemType = '';
            const myItemData = _that.myItemData;
            const typeCode = myItemData && myItemData.ModuleType;
            switch (typeCode) {
                case 'XINDATURN':
                    itemType = DRAW_LOTTERY_TYPE.DRAW_LOTTERY_NEW_BIG_HIT;
                    break;
                case 'ERNIE':
                    itemType = DRAW_LOTTERY_TYPE.DRAW_LOTTERY_ERNIE;
                    break;
                case 'ANSWERLUCKYDRAW':
                    itemType = DRAW_LOTTERY_TYPE.DRAW_LOTTERY_ANSWER_LUCKY_DRAW;
                    break;
                default:
                    break;
            }
            return itemType;
        }
    },
    watch: {
        /**
         * 模块数据
         * @param {Object} nowVal 模块数据当前值
         */
        moduleData (nowVal) {
            this.myItemData = Object.assign({}, this.myItemData, nowVal);
        }
    },
    methods: {
        _dataFilter (item) {
            return dataFilter(item);
        }
    }
};
</script>

