<template>
    <ac-goods-list
        v-if="goodsData"
        :col="goodsData.ColumNumber"
        :list="goodsData.Product"
        templateType="Complete"
        :activityInfo="activityInfo"
        @click="click">
    </ac-goods-list>
</template>
<script>
import AcGoodsExtend from '../common/goodsExtend/GoodsExtend';

export default {
    name: 'ac-sys-rec',
    extends: AcGoodsExtend,
    props: {
        /**
         * 活动信息
         */
        activityInfo: {
            type: Object
        }
    },
    data() {
        return {
            goodsData: null
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
            this.getProductModule(moduleData)
                .subscribe(data => {
                    this.setData(data);
                });
        },
        /**
         * 设置当前模块数据
         * @param {Object} data 数据
         */
        setData(data) {
            let _data = data && data.Data;
            let _module = _data && _data.Module;
            this.goodsData = _module;
        }
    }
};
</script>
<style lang="scss">

</style>
