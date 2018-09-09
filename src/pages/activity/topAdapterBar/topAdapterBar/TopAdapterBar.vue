<template>
    <div class="acs_topadapterbar_content" :style="AdapterBackColor">
        <ac-no-adapter :config="config"></ac-no-adapter>
        <ac-adapter-box :config="config"></ac-adapter-box>
    </div>
</template>
<script>
import AcNoAdapter from '../noAdapter/NoAdapter';
import AcAdapterBox from '../adapterBox/AdapterBox';
import AcTopAdapterBarExtent from '../topAdapterBarExtent/TopAdapterBarExtent';
export default {
    extends: AcTopAdapterBarExtent,
    name: 'ac-top-adapter-bar',
    components: {
        AcNoAdapter,
        AcAdapterBox
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_topadapterbar_content{
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $smallFontSize;

}
</style>
