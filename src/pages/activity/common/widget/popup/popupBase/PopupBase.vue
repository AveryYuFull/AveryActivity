<template>
    <div class="acs-popup-base">
        <ac-popup-box @closePopup="$emit('closePopup')">
            这里是自定义的弹框内容
        </ac-popup-box>
    </div>
</template>
<script>
import AcPopupBox from '../popupBox/PopupBox';
export default {
    name: 'ac-popup-base',
    components: {
        AcPopupBox
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
</style>
