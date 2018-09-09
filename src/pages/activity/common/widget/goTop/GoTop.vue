<!-- 调用方式<tuhu-gotop></tuhu-gotop> 并在滚动区域父级包裹元素上添加id="goTop"-->
<template>
    <div class="gotop" @click="handleClick" :style="{display:this.display}">
        <!-- <img alt="" :src="gotopIcon" /> -->
        &#xe605;
    </div>
</template>

<script>
import src from './imgs/cptop.png';
const COMPONENT_NAME = 'ac-go-top';

export default {
    name: COMPONENT_NAME,
    data () {
        return {
            display: 'none'
        };
    },
    props: {
        // gotopIcon: {
        //     type: String,
        //     default: ''
        // },
        scrollid: {
            type: String,
            require: true
        }
    },
    mounted() {
        this.scrollNode = document.getElementById(this.scrollid);

        this.scrollNode.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        this.scrollNode.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll: function() {
            const listNode = this.scrollNode;
            const listScrollTop = listNode.scrollTop;
            const listOffsetHeight = listNode.offsetHeight;

            if (listScrollTop > listOffsetHeight) {
                this.display = 'flex';
            } else {
                this.display = 'none';
            }
        },
        handleClick: function() {
            const dis = parseInt(this.scrollNode.scrollTop / 10, 10);
            this.setScrollTop(dis);
        },
        setScrollTop(dis) {
            requestAnimationFrame(() => {
                if (dis < 1) {
                    this.$emit('scrollEnd');
                    return;
                }
                let listNode = this.scrollNode;
                const top = listNode.scrollTop - dis;
                if (top < 0) {
                    listNode.scrollTop = 0;
                } else {
                    listNode.scrollTop = top;

                    this.setScrollTop(dis);
                }
            });
        }
    }
};
</script>

<style lang='scss'>
@import 'style/_public/_var.scss';
@import 'style/_public/_mixin.scss';
@import 'style/_public/_iconFont.scss';
  .gotop {
    @extend %ac_icon;
    display: none;
    -webkit-transform:translateZ(0px);
    background: rgba(255, 255, 255, .9);
    position: fixed;
    bottom: 60px;
    right: 20px;
    z-index: 10;
    width: 45px;
    height: 45px;
    font-size: $FontSize20;
    color: $color9;
    border: 1px solid $color9;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }

  .gotop img {
    width: 45px;
  }
</style>
