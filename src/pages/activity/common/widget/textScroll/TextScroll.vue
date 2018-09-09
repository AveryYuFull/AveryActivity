<template>
<div class="acs_text-link-scroll" v-if="myList && myList.length">
    <ul class="ac_scroll-ul" :style='style'>
        <li
            class="ac_scroll-item"
            v-for="(item, index) in myList"
            :key="index"
            @click="$emit('click', item)">
                <text-scroll-item
                    :scrollItem="filterItem(item)">
                </text-scroll-item>
                <!-- <div class="ac_item-wrap">
                    <img class="ac_item-icon" v-if="item.Image" :src="item.Image">
                    <span class="ac_item-text">{{item.nameText}}</span>
                </div> -->
        </li>
    </ul>
</div>
</template>
<script>
import { prefixStyle } from '../../../../../commons/utils/prefixStyle';
import TextScrollItem from './textScrollItem/TextScrollItem';

export default {
    name: 'ac-text-scroll',
    components: {
        TextScrollItem
    },
    props: {
        /**
         * 轮播文字列表
         */
        list: {
            type: Array,
            requird: true
        },
        /**
         * 过滤数据项
         */
        dataFilter: {
            type: Function
        }
    },
    data() {
        return {
            myList: null,
            // initStyle,
            // changedStyle,
            style: null,
            timer: null
            // timerInterval: null,
            // myPropsValue: this.myPropsValue || {}
        };
    },
    watch: {
        // propsValue (nowVal) {
        //     this.myPropsValue = nowVal || {};
        //     if (this.myPropsValue && this.myPropsValue.scrollText) {
        //         this.myList = JSON.parse(JSON.stringify(this.myPropsValue.scrollText));
        //         this.textScroll();
        //     }
        // },
        list(nowVal) {
            this.textScroll();
        }
    },
    mounted() {
        this.textScroll();
    },
    methods: {
        /**
         * 过滤数据
         * @param {Object} item 数据
         * @return {Object}
         */
        filterItem(item) {
            let _item = item;
            if (this.dataFilter instanceof Function) {
                _item = this.dataFilter(item);
                // console.log(item, _item);
            }
            return _item;
        },
        /**
         * 滚动文字
         */
        textScroll() {
            if (!this.list || this.list.length <= 0) {
                this.myList = null;
                return;
            }
            const scrollText = JSON.parse(JSON.stringify(this.list));
            const initStyle = {
                [prefixStyle('transform')]: 'translateY(0)',
                [prefixStyle('transition')]: 'initial'
            };

            const changedStyle = {
                [prefixStyle('transform')]: 'translateY(-1.58rem)',
                [prefixStyle('transition')]: 'transform .5s'
            };
            if (typeof this.timerInterval !== 'undefined') {
                clearInterval(this.timerInterval);
            }
            if (this.timer !== null) {
                clearTimeout(this.timer);
            }
            this.myList = scrollText;
            this.timerInterval = setInterval(() => {
                this.style = changedStyle;
                this.timer = setTimeout(() => {
                    this.timer = null;
                    const first = scrollText && scrollText.shift();
                    scrollText && scrollText.push(first);
                    this.myList = scrollText;
                    this.style = initStyle;
                }, 600);
            }, 2500);
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_text-link-scroll{
    // height: 1.75rem;
    overflow: hidden;
    .ac_scroll-ul{
        // line-height: 1.65rem;
    }
    .ac_scroll-item {
        padding: 0 .5rem 0 .5rem;
        position: relative;
        line-height: 0;
    }
}
</style>
