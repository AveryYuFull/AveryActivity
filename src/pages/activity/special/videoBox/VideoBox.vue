<template>
    <ac-video-play
        v-if="imgUrl || videoUrl"
        :imgUrl="imgUrl"
        :videoUrl="videoUrl"
        :scrollTop="scrollTop">
    </ac-video-play>
</template>
<script>
import AcSpecialExtend from '../common/specialExtend/SpecialExtend';

export default {
    extends: AcSpecialExtend,
    name: 'ac-video-box',
    data() {
        return {
            imgUrl: null,
            videoUrl: null
        };
    },
    created() {
        this.initData();
    },
    methods: {
        /**
         * 初始化数据
         */
        initData() {
            let moduleData = this.moduleData;
            if (moduleData) {
                if (moduleData._isGet) {
                    this.setData(moduleData._getData);
                    delete moduleData._getData;
                    delete moduleData._isGet;
                } else {
                    this.getData();
                }
            }
        },
        /**
         * 获取数据
         */
        getData() {
            let moduleData = this.moduleData;
            if (!moduleData) {
                console.error('moduleData');
                return;
            }
            this.getModuleDetail(moduleData)
                .subscribe(data => {
                    this.setData(data);
                });
        },
        /**
         * 设置当前模块数据
         * @param {Object} data 数据
         */
        setData(data) {
            // console.log(data);
            const _Data = data && data.Data[0];
            const videoData = _Data && _Data.Module;
            this.imgUrl = videoData.Image;
            this.videoUrl = videoData.MobileVideoLinkUrl;
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";


</style>
