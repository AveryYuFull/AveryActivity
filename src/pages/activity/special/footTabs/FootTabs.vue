<template>
    <div class="acs_footTabs-content" v-if="footTabData">
        <template v-for="(item, index) in footTabData">
            <div class="ac_footTabs-item-wrap" :key="index" @click="goDetailLink($event, item)">
                <div class="ac_footTabs-item">
                    <ac-square-pic
                    :isLazy="false"
                    :imgUrl='item.Image'></ac-square-pic>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import AcSpecialExtend from '../common/specialExtend/SpecialExtend';
export default {
    extends: AcSpecialExtend,
    name: 'ac-foot-tabs',
    data() {
        return {
            footTabData: null
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
            const _data = data && data.Data[0];
            const _module = _data && _data.Module;
            this.footTabData = _module && _module.InfoList;
        },
        /**
         * 跳转链接
         * @param {Event} evt 事件对象
         * @param {Object} itemData 链接
         */
        goDetailLink(evt, itemData) {
            this.$emit('click', {
                itemType: 'footTabs',
                Event: evt,
                itemData: itemData
            });
            if (itemData) {
                this.$tuhu.toUrl({
                    appLink: itemData.AppLink,
                    h5Link: itemData.MobileLink
                });
            }
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_footTabs-content{
    $height: $footerHeight;
    height: $height;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .ac_footTabs-item-wrap{
        padding: 0 5px;
        height: 100%;
    }
    .ac_footTabs-item{
        display: block;
        text-align: center;
        line-height: $height;
        height: 100%;
        width: $height;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
</style>
