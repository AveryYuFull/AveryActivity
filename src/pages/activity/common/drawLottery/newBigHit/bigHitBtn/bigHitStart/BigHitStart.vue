<template>
    <ac-square-pic
        class="acs_bigHitStart"
        v-if="btnItem"
        :isLazy="false"
        @click="click"
        :imgUrl="btnItem.imgUrl">
        <div class="ac_remark">
            还剩<span class="ac_times">{{btnItem.times}}</span>次抽奖机会
        </div>
    </ac-square-pic>
</template>

<script>
import AcBigHitExtend from '../common/bigHitExtend/BigHitExtend';
export default {
    extends: AcBigHitExtend
};
</script>

<style lang="scss">
.acs_bigHitStart {
    .ac_remark {
        display: inline-block;
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 65%;
        font-size: .6rem;
        line-height: 1.4;
    }
    .ac_times {
        background-color: rgba(20, 59, 131, 1);
        border-radius: 2px;
        margin: 0 5px 0 5px;
        padding: 0 4px;
        font-size: .6rem;
        color: rgba(255, 236, 0, 1);
    }
}
</style>
