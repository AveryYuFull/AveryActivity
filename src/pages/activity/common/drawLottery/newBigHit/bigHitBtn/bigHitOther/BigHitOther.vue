<template>
    <ac-square-pic
        class="acs_bigHitOther"
        v-if="btnItem"
        @click="click"
        :isLazy="false"
        :imgUrl="btnItem.imgUrl">
        <div class="ac_remark" v-if="btnItem.nameText" v-html="btnItem.nameText">
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
.acs_bigHitOther {
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
    }
}
</style>
