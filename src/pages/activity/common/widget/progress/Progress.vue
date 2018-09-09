<template>
    <div class="ths_progress" v-if="showProgress">
        <div class="th_progress-bg-default">
            <div :style="{ width: rateData + '%' }" class="th_bg-current"></div>
            <span class="th_rate">{{rate}}%</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ac-progress',
    props: {
        rate: {
            type: Number,
            default: 0
        },
        showProgress: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            rateData: this.rate
        };
    },
    mounted() {
        this.rateData = this.rate <= 0 ? 0 : this.rate < 5 ? 5 : this.rate;
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.ths_progress{
    width: 100%;
    display: inline-block;
    // 子元素
    .th_progress-bg-default{
        background:$bgOrangeFC;
        border-radius: 4.8rem;
        height:0.5rem;
        position: relative;
    }
    // 后代元素
    .th_bg-current{
        height:0.5rem;
        background:$bgOrangeFE;
        border-radius: 7.7rem;
    }
    // 后代元素
    .th_rate{
        color:$colorAC;
        font-size:$FontSize9;
        @include centerAll;
        line-height: .45rem;
    }
}
//针对安卓的样式
.tiger-android{
    .ths_progress{
        .th_rate{
            top:65%;
        }
    }
}
</style>
