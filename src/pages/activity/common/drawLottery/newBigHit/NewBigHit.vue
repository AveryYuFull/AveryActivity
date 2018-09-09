<template>
<div class="acs_NewBigHit" v-if="bigBrandStyle && bigBrandStyle.length">
    <ac-big-hit-wheel
        :status.sync="myStatus"
        :dataFilter="dataFilter"
        :list="bigBrandStyle"
        @click="getclick">
        <ac-big-hit-btn
            :status="myStatus"
            @click="click(btnItem)"
            :btnItem="btnItem">
        </ac-big-hit-btn>
        <!-- <ac-square-pic
            @click="click(btnItem)"
            :imgUrl="btnItem && (status === 3 ? btnItem.bImgUrl : btnItem.imgUrl)">
        </ac-square-pic> -->
    </ac-big-hit-wheel>
    <ac-broadcast
        :hash-key="hashKey">
    </ac-broadcast>
</div>
</template>

<script>
import AcDrawLotteryExtend from '../common/drawLotteryExtend/DrawLotteryExtend';
import AcBigHitBtn from './bigHitBtn/BigHitBtn';
import AcBroadcast from './broadcast/Broadcast';
import { DISPLAY_STATUS } from '../common/constant.js';

export default {
    extends: AcDrawLotteryExtend,
    name: 'ac-new-big-hit',
    data() {
        let myItemData = this.myItemData;
        return {
            lock: false,
            btnItem: {
                type: (myItemData && myItemData.display) || 0,
                times: (myItemData && myItemData.times) || 0,
                shareTimes: (myItemData && myItemData.shareTimes) || 0
            }
        };
    },
    components: {
        AcBigHitBtn,
        AcBroadcast
    },
    computed: {
        /**
         * 大翻盘配置信息
         * @returns {Object} 大翻盘的配置信息
         */
        bigBrandStyle () {
            return this.myItemData && (this.myItemData.BigBrandStyle || []);
        }
    },
    watch: {
        /**
         * 状态
         * @param {number} nowVal 状态当前值
         */
        myStatus(nowVal) {
            if (nowVal === 0) {
                this.setBtnItem();
            }
        },
        /**
         * 当前状态活动数据
         * @param {Object} nowVal 当前状态活动数据
         */
        myItemData(nowVal) {
            this.setBtnItem();
        }
    },
    methods: {
        /**
         * 设置按钮状态
         */
        setBtnItem() {
            let myItemData = this.myItemData;
            this.btnItem = {
                type: myItemData.display,
                times: (myItemData && myItemData.times) || 0,
                shareTimes: (myItemData && myItemData.shareTimes) || 0
            };
        },
        /**
         * 点击图标按钮
         * @param {Event} evt 事件对象
         */
        getclick(evt) {
            if (evt && evt.type === 'wheelItem' && this.myStatus === 3) {
                let myItemData = this.myItemData;
                let promptImg = (myItemData && myItemData.PromptImg) || '';
                this.$set(evt.itemData, '_promptImg', promptImg);
            }
        },
        click(btnItem) {
            let _that = this;
            if (_that.lock) {
                return;
            }
            // if ((btnItem.type !== DISPLAY_STATUS.GETCLICK && btnItem.type !== DISPLAY_STATUS.NO_TIMES) && this.myStatus === 0) {
            if (this.myStatus === 0) {
                startAnimation();
            }

            /**
             * 开启动画
             */
            function startAnimation () {
                let res = null;
                _that.lock = true;
                if (_that.startCb instanceof Function) {
                    res = _that.startCb();
                }
                if (res instanceof Promise) {
                    res.then((err) => {
                        if (!err) {
                            startShakeBall();
                        } else {
                            _that.lock = false;
                        }
                    });
                } else {
                    if (!res) {
                        startShakeBall();
                    } else {
                        _that.lock = false;
                    }
                }

                /**
                 * 开始启动摇杆
                 */
                function startShakeBall () {
                    _that.myStatus = 1;
                    _that.lock = false;
                }
            }
        }

    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_NewBigHit{
    padding: 20px 15px;
}
</style>
