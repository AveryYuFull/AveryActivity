<template>
    <div :is="itemName">
        <!-- <ac-picture-item :item="item" v-if="item" v-for="(item, index) in list" :key="index"></ac-picture-item> -->
        <div class="ac_module-item" @click="click($event, item)" v-if="item" v-for="(item, index) in list" :key="index">
            <ac-img-box :imgUrl="item.Image"></ac-img-box>
        </div>
    </div>
</template>
<script>
// import AcPictureItem from '../../common/pictureItem/PictureItem';

export default {
    name: 'ac-picture-cont',
    props: {
        /**
         * 模块数据
         */
        list: {
            type: Array
        }
    },
    // components: {
    //     AcPictureItem
    // },
    computed: {
        itemName() {
            let _that = this;
            let res = '';
            let itemData = _that.list;
            switch (itemData.length) {
                case 1: // 一行1列
                    res='ac-module-col1';
                    break;
                case 2: // 一行2列
                    res='ac-module-col2';
                    break;
                case 3: // 一行3列
                    res='ac-module-col3';
                    break;
                case 4: // 一行4列
                    res='ac-module-col4';
                    break;
                default:
                    break;
            }
            return res;
        }
    },
    methods: {
        /**
         * click事件
         * @param {Event} evt 事件对象
         * @param {Object} item 当前项数据
         */
        click(evt, item) {
            if (evt) {
                evt._contentType = 'PictureCont';
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
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_pictureList{
    width: 100%;
    // padding: $ptb $plr;
}
</style>
