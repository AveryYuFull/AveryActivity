<template>
    <div class="acs_img-link" @click="click">
        <ac-square-pic
            :isLazy="false"
            :imgUrl="moduleData.FloatingUpsImgUrl">
        </ac-square-pic>
    </div>
</template>

<script>
import AcSusTip from '../../common/widget/susTip/SusTip';
import AcSpecialExtend from '../common/specialExtend/SpecialExtend';
const COMPONENT_NAME = 'ac-img-link';

export default {
    extends: AcSpecialExtend,
    inject: ['$$Popup'],
    name: COMPONENT_NAME,
    methods: {
        click() {
            let moduleData = this.moduleData || {};
            if (moduleData.FloatingUpsJump === 'PopupWin') {
                moduleData.PopUpsImgUrl && this.$$Popup.open(AcSusTip, {
                    props: {
                        imgUrl: moduleData.PopUpsImgUrl || ''
                    },
                    wrapCla: 'acs_popup-box-wrap',
                    alignCla: 'centerMiddle',
                    transitionCls: 't_scale',
                    isClickBgClose: true
                });
            } else if (moduleData.FloatingUpsJump === 'Link') {
                this.$tuhu.toUrl({
                    appLink: moduleData.AppLink,
                    h5Link: moduleData.MobileLink
                });
            }
        }
    }
};
</script>
<style lang="scss">
.acs_img-link{
    position: fixed;
    width: 3.5rem;
    height: 3.5rem;
    bottom: 7.45rem;
    right: 0.75rem;
    z-index: 9;
}
</style>

