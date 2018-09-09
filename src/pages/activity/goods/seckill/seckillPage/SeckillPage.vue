<template>
    <div class="acs-seckill-page" v-if="seckillItems.length">
        <!-- <div id="nav" ref="nav">
            <div class="hook-wrapper">
                <div class="hook-slide" v-for="(item,index) in seckillItems" :key="item.time">
                    <seckill-top-item :propsValue="item" @clickItem="clickItem" :class="{active: index === activeIndex}"></seckill-top-item></div>
            </div>
        </div> -->
        <div class="nav">
            <div class="nav-item" v-for="(item,index) in seckillItems" :key="item.time" v-if="item.productLength > 0">
                <seckill-top-item
                    :propsValue="item"
                    :class="{active: index === activeIndex}"
                    @clickItem="clickItem"></seckill-top-item>
            </div>
        </div>
        <div ref="page">
            <div class="hook-wrapper slide-page">
                <div class="hook-slide slide-item" v-for="(item,index) in seckillItems" :key="item.time" v-if="item.productLength > 0">
                    <slot :name="'slide'+index"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Swiper from 'swiper';
import Swiper from '../../../../../../static/js/swiper.min';
import SeckillTopItem from '../seckillTopItem/SeckillTopItem';
export default {
    name: 'ac-seckill-page',
    components: {
        SeckillTopItem
    },
    props: {
        seckillItems: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            activeIndex: 0,
            navSwiper: null,
            pageSwiper: null
        };
    },
    mounted() {
        const _that = this;
        // this.navSwiper = new Swiper('#nav', {
        //     wrapperClass: 'hook-wrapper',
        //     slideClass: 'hook-slide',
        //     slidesPerView: this.seckillItems.length
        // });

        this.pageSwiper = new Swiper(this.$refs.page, {
            wrapperClass: 'hook-wrapper',
            slideClass: 'hook-slide',
            slideActiveClass: 'hook-slide-active',
            slidePrevClass: 'hook-slide-prev',
            slideNextClass: 'hook-slide-next',
            // autoHeight: true, // 高度随内容变化
            on: {
                transitionStart: function() {
                    _that.activeIndex = this.activeIndex;
                }
            }
        });
        // this.navSwiper.controller.control = this.pageSwiper;
    },
    methods: {
        clickItem(index) {
            this.activeIndex = index;
            this.pageSwiper.slideTo(index);
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs-seckill-page {
    .nav {
        background: $color3;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        .nav-item {
            flex: 1;
        }
    }
    .slide-page{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        box-sizing: content-box;
        .slide-item {
            flex-shrink: 0;
            position: relative;
            height:16px;
            &.hook-slide-active {
                height: auto;
            }
        }

    }
}
.swiper-container{
    padding-bottom: 0;
    overflow: inherit;
}
</style>
