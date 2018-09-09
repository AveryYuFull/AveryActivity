<template>
    <div class="acs_broadcast-img-box">
        <div class="ac_broadcast-img-container">
            <BroadcastImg
                :key="index"
                :imgs="item"
                :status="statusArr[index]"
                v-for="(item, index) in imgs">
            </BroadcastImg>
            <div class="ac_broadcast-img-box-resultImg" :style="{background: `url(${myResultImg})`, width: resultImgWidth}"></div>
        </div>
    </div>
</template>

<script>
import BroadcastImg from './BroadcastImg';
import resultImg from './imgs/result.png';
import firstImg from './imgs/1.png';
import secImg from './imgs/2.png';
import thirdImg from './imgs/3.png';
import fourthImg from './imgs/4.png';

const imgsArr = [{
    ImageUri: firstImg
}, {
    ImageUri: secImg
}, {
    ImageUri: thirdImg
}, {
    ImageUri: fourthImg
}];

const COMPONENT_NAME = 'ac-broadcast-img-box';

export default {
    name: COMPONENT_NAME,
    components: {
        BroadcastImg
    },
    props: {
        imgs: {
            type: Array,
            default: function () {
                return [imgsArr, imgsArr, imgsArr];
            }
        },
        resultImg: {
            type: String,
            default: resultImg
        },
        status: { // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
            type: Number,
            default: 0
        }
    },
    data () {
        const imgList = this.imgs || [];
        return {
            statusArr: new Array(imgList.length).fill(0),
            myStatus: this.status,
            brandcastImgNum: imgList.length,
            resultImgWidth: 0,
            myResultImg: this.resultImg || resultImg
        };
    },
    methods: {
        startScrollAnimate (minIndex = 1, interval = 400) {
            this.myStatus = 1;
            const _that = this;

            this.$set(_that.statusArr, 0, 1);
            this.resultImgWidth = 0;

            let index = minIndex;
            let interValObj = setInterval(() => {
                if (index <= _that.brandcastImgNum) {
                    _that.$set(_that.statusArr, index, 1);
                } else {
                    clearInterval(interValObj);
                }
                index++;
            }, interval);
        },
        stopScrollAnimate (minIndex = 1, interval = 1000) {
            const _that = this;
            let index = minIndex;
            const widthArray = ['65px', '130px', '174px'];
            _that.$set(_that.statusArr, 0, 3);
            this.resultImgWidth = widthArray[0];
            let interValObj = setInterval(() => {
                if (index < _that.brandcastImgNum) {
                    _that.$set(_that.statusArr, index, 3);
                    this.resultImgWidth = widthArray[index];
                } else {
                    clearInterval(interValObj);
                    this.myStatus = 3;
                }
                index++;
            }, interval);
        }
    },
    watch: {
        myStatus (newVal) {
            this.$emit('update:status', newVal);
        },
        status (newVal) {
            if (newVal === 1) {
                this.startScrollAnimate(1, 400);
            } else if (newVal === 3) {
                this.stopScrollAnimate(1, 800);
            }
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_broadcast-img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .ac_broadcast-img-container {
        position: relative;
        display: flex;
    }
    .ac_broadcast-img-box-resultImg {
        position: absolute;
        width: 0;
        height: 58px;
        background-color: pink;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-position: top left;
        background-size: cover;
    }
}
</style>
