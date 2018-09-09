<template>
<div class="acs_bigHitFactory">
    <template v-if="filterType(BIG_HIT_STATUS.START)">
        <ac-big-hit-start
            @click="click"
            :btnItem="btnItem">
        </ac-big-hit-start>
    </template>
    <template v-else>
        <ac-big-hit-other
            @click="click"
            :btnItem="btnItem">
        </ac-big-hit-other>
    </template>
</div>
</template>

<script>
import AcBigHitExtend from '../bigHitExtend/BigHitExtend';
import AcBigHitStart from '../../bigHitStart/BigHitStart';
import AcBigHitOther from '../../bigHitOther/BigHitOther';
export default {
    extends: AcBigHitExtend,
    components: {
        AcBigHitStart,
        AcBigHitOther
    }
};
</script>

<style>

</style>
