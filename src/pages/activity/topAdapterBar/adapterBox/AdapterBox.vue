<template>
    <div class="acs_caradapter_box" :style='carInfoShowStyle'>
        <ac-car-info></ac-car-info>
        <div class="ac_suitLine" :style='suitLine'></div>
        <div class="ac_tireSize" @click='changeTireSize(config.IsChangeTireSize)'>
            <div class="ac_tireSize-text">{{NoSpecificationTone}}</div>
        </div>
    </div>
</template>
<script>
import AcCarInfo from '../carInfo/CarInfo';
import AcTopAdapterBarExtent from '../topAdapterBarExtent/TopAdapterBarExtent';

export default {
    extends: AcTopAdapterBarExtent,
    name: 'ac-adapter-box',
    components: {
        AcCarInfo
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_caradapter_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ac_suitLine {
        height: 20px;
        width: 1px;
        border-left: 1px solid #fff;
        margin-top: 2px;
        transform: scaleX(0.5);
    }
    .ac_tireSize {
        .ac_tireSize-text{
            font-size: $smallFontSize;
            @include lineClamp(1);
        }
        padding: 0 16px;
        text-align: center;
        height: 32px;
        line-height: 32px;
        overflow: hidden;
    }
}
</style>
