<template>
    <div
        :is="moduleName"
        :moduleData="moduleData"
        :activityInfo="activityInfo"
        :serverTime="serverTime"
        :scrollTop="scrollTop">
    </div>
</template>

<script>
import AcSpecialExtend from '../common/specialExtend/SpecialExtend';
export default {
    extends: AcSpecialExtend,
    name: 'ac-special',
    computed: {
        moduleName() {
            let _that = this;
            let res = '';
            let itemData = _that.moduleData;
            let typeCode = itemData && itemData.ModuleType;
            switch (typeCode) {
                case 'MAINTENANCEPRICING':// 保养定价
                    res='ac-maintain-pricing';
                    break;
                case 'COUNTDOWN': // 倒计时
                    res='ac-count-down';
                    break;
                case 'WRITING': // 轮播文字链
                    res='ac-text-link';
                    break;
                case 'BOTTOMTAB': // 底部tab
                    res='ac-foot-tabs';
                    break;
                case 'VIDEO':// 视频
                    res='ac-video-box';
                    break;
                default:
                    break;
            }
            return res;
        }
    }
};
</script>

<style scoped>

</style>
