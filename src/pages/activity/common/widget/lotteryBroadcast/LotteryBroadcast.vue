<template>
    <div class="acs_lotteryBroadcast">
        <div class="ac_lotteryBroadcast-outImg">
            <ac-img-box
                class="ac_outImg"
                :img-url="outImg"
                :is-lazy="false"></ac-img-box>
            <div class="ac_outImg-innerImg">
                <ac-img-box
                    class="ac_innerImg"
                    :img-url="innerImg"
                    :is-lazy="false"></ac-img-box>
                <div class="ac_innerImg-list"
                    v-if="myItemData && myItemData.length">
                    <ul class="ac_list"
                        :style="style">
                        <li class="ac_list-item"
                            v-for="(item, index) in myItemData" :key="index"
                            v-html="item">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const COMPONENT_NAME = 'ac-lottery-broadcast';

// 动画的初始状态
const initStyle = {
    transform: 'translateY(0)',
    transition: 'initial'
};
// 动画样式
const changedStyle = {
    transform: 'translateY(-28px)',
    transition: 'transform .5s'
};

export default {
    name: COMPONENT_NAME,
    props: {
        /**
         * 需要轮播的数据列表
         */
        itemData: {
            type: Array
        },
        /**
         * 轮播的盒子图片列表
         */
        imgUrls: {
            type: Array
        }
    },
    data () {
        return {
            myItemData: this.itemData,
            myImgUrls: this.imgUrls,
            style: initStyle
        };
    },
    computed: {
        outImg () {
            const myImgUrls = this.myImgUrls || [];
            return myImgUrls[0] || '';
        },
        innerImg () {
            const myImgUrls = this.myImgUrls || [];
            return myImgUrls[1] || '';
        }
    },
    created () {
        // 加动画的定时器
        this.timerAdd = null;
        // 去除动画的定时器
        this.timerRem = null;
    },
    watch: {
        itemData (nowVal) {
            this.myItemData = nowVal;
        },
        myItemData (nowVal) {
            this.timerAdd && clearTimeout(this.timerAdd);
            this.timerAdd = setTimeout(() => {
                this.style = changedStyle;
                this.timerRem && clearTimeout(this.timerRem);
                this.timerRem = setTimeout(() => {
                    this.style = initStyle;
                    this.myItemData.push(this.myItemData.shift());
                }, 500);
            }, 3000);
        },
        imgUrls (nowVal) {
            this.myImgUrls = nowVal;
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_lotteryBroadcast {
    margin: 12px 0 0 0;
    .ac_lotteryBroadcast-outImg {
        position: relative;
        width: 100%;
    }
    .ac_outImg-innerImg {
        position: absolute;
        width: 78%;
        left: 19%;
        top: 48%;
        transform: translate3d(0, -50%, 0);
    }
    .ac_innerImg-list {
        position: absolute;
        height: 28px;
        top: 50%;
        left: 15%;
        color: $colorf;
        overflow: hidden;
        transform: translateY(-50%);
    }
    .ac_list {
        line-height: 28px;
        margin: 0;
        padding: 0;
    }
    .ac_list-item {
        width: 100%;
        font-size: $smallFontSize;
        height: 28px;
    }
    .ac_item-bonusPrice {
        color: $colorFFE;
    }
}
</style>
