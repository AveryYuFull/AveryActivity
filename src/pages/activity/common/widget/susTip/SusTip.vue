<template>
    <ac-popup-box  @closePopup="$emit('closePopup')">
        <div class="acs_sus-cont">
            <div class="acs_sus-cont-title" v-if="title">{{title}}</div>
            <ac-img-box :imgUrl="imgUrl" v-if="imgUrl"></ac-img-box>
            <div class="acs_sus-cont-des" v-if="des" :style="title?'':'height:100%'" v-html="des"></div>
        </div>
    </ac-popup-box>
</template>

<script>
// import AcNavBarExtend from '../navBarExtend/NavBarExtend';
import AcPopupBox from '../popup/popupBox';
const COMPONENT_NAME = 'ac-sus-tip';

export default {
    // extends: AcNavBarExtend,
    name: COMPONENT_NAME,
    props: {
        title: {
            type: String,
            default: ''
        },
        imgUrl: {
            type: String,
            default: ''
        },
        des: {
            type: String,
            default: ''
        }
    },
    components: {
        AcPopupBox
    },
    data () {
        return {
            // navSwiper: null,
        };
    },
    watch: {
        // activeIndex(nowVal) {
        //     this.goNavCenter(); // 导航居中
        // }
    },
    mounted () {
    },
    methods: {
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_sus-cont{
    height: 100%;
    box-sizing: border-box ;
    .acs_sus-cont-title {
        height: 2rem;
        line-height: 2rem;
        font-size: $defaultFontSize;
        color: $color3;
        text-align: center;
    }
    .acs_sus-cont-des{
        width:calc(100% + 8px) ;
        height:calc(100% - 3rem);
        padding-right: 8px;
        text-align: justify;
        font-size: 12px;
        color: $color9;
        line-height: 18px;
        overflow: auto;
    }
}
</style>

