<template>
    <div class="acs_broadcast-img">
        <div class="ac_broadcast-img-box">
            <div class="ac_img-list" ref="imgList">
                <template v-for="(item, index) in imgs">
                    <img :src="item.ImageUri" alt="" :key="index" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import firstImg from './imgs/1.png';
import secImg from './imgs/2.png';
import thirdImg from './imgs/3.png';
import fourthImg from './imgs/4.png';

const COMPONENT_NAME = 'ac_broadcast_img';

export default {
    name: COMPONENT_NAME,
    props: {
        imgs: {
            type: Array,
            default: function () {
                return [{
                    ImageUri: firstImg
                }, {
                    ImageUri: secImg
                }, {
                    ImageUri: thirdImg
                }, {
                    ImageUri: fourthImg
                }];
            }
        },
        status: { // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            animation: null,
            myStatus: this.status
        };
    },
    methods: {
        // TODO requestAnimationFrame 做不同浏览器兼容
        animate (top, newTop, eachDis, elem) {
            if (Math.abs(top - newTop) > Math.abs(eachDis)) {
                elem.style.top = newTop + 'px';
                this.animation = window.requestAnimationFrame(this.animate.bind(this, top, newTop + eachDis, eachDis, elem));
            } else {
                elem.style.top = 0 + 'px';
                this.animate(top, eachDis, eachDis, elem);
            }
        },

        requestAnimationFrame (elem) {
            const totalDis = -(this.imgs.length - 1) * 58;
            const initDis = parseInt(totalDis / 30, 10);
            this.animate(totalDis, initDis, initDis, elem);
        },

        cancelAnimationFrame (elem) {
            elem.style.top = '0px';
            cancelAnimationFrame(this.animation);
        },

        startScrollAnimate () {
            this.requestAnimationFrame(this.$refs.imgList);
        },

        stopScrollAnimate () {
            this.cancelAnimationFrame(this.$refs.imgList);
        }
    },
    watch: {
        myStatus (newVal) {
            this.$emit('update:status', newVal);
            if (newVal === 1) {
                this.startScrollAnimate();
            } else if (newVal === 3) {
                this.stopScrollAnimate();
            }
        },
        status (newVal) {
            this.myStatus = newVal;
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_broadcast-img {

    .ac_broadcast-img-box {
        width: 58px;
        height: 58px;
        border: 1px solid #d9d9d9;
        overflow: hidden;
        position: relative;
    }
    .ac_img-list {
        width: 58px;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
    }
    img {
        width: 58px;
        height: 58px;
    }

}
</style>
