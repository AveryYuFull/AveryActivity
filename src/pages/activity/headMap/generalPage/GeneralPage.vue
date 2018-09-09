<template>
    <ac-head-map-cont
        v-if="picData"
        :img-url="picData.Image"
        :image-dynamic="picData.ImageDynamic"
        @click="click($event, picData)">
    </ac-head-map-cont>
</template>

<script>
import AcHeadMapCont from '../common/headMapCont/HeadMapCont';
import AcHeadMapExtend from '../common/headMapExtend/HeadMapExtend';

export default {
    extends: AcHeadMapExtend,
    name: 'ac-general-page',
    props: {
        picData: { // 头图数据
            // type: object
        }
    },
    components: {
        AcHeadMapCont
    },
    methods: {
        /**
         * click事件
         * @param {Event} evt 事件对象
         * @param {Object} item 当前项数据
         */
        click(evt, item) {
            if (evt) {
                evt._contentType = 'GeneralPage';
            }

            this.$emit('click', {
                Event: evt,
                itemData: item
            });
        }
    }
};
</script>

<style lang="scss">

</style>
