<template>
    <div class='acs_carInfo' @click='changeCar(config.IsChangeTire)'>
        <div class="ac_carImg"><img :src='suitTireInfo.carImg' /></div>
        <div class="ac_carName" v-text='suitTireInfo.carName' ></div>
    </div>
</template>
<script>
import AcTopAdapterBarExtent from '../topAdapterBarExtent/TopAdapterBarExtent';
export default {
    extends: AcTopAdapterBarExtent,
    name: 'ac-car-info',
    components: {
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";


    .acs_carInfo {
      width: 70%;
      height: 100%;
      display: flex;
      padding-right: 16px;
      .ac_carImg {
        height: 32px;
        line-height: 32px;
        padding-left: 16px;
        img {
          width: 20px;
          height: 20px;
          margin-top: 6px;
          border-radius: 10px;
          background-color: #fff;
        }
      }
      .ac_carName {
        font-size: $smallFontSize;
        height: 32px;
        line-height: 32px;
        margin-left: 8px;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

</style>
