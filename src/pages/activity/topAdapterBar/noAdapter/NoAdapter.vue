<template>
    <div class='acs_nosuit' :style='nosuit' @click='changeCar'>
        <div class="ac_nosuit-text">{{NoVehiclePrompt}}</div>
    </div>
</template>
<script>
import AcTopAdapterBarExtent from '../topAdapterBarExtent/TopAdapterBarExtent';
export default {
    extends: AcTopAdapterBarExtent,
    name: 'ac-no-adapter',
    components: {
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_nosuit {
    .ac_nosuit-text{
       @include lineClamp(1); 
    }
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}

</style>
