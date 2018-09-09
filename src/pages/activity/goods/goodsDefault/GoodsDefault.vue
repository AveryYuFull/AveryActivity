<template>
    <ac-goods-list
        v-if="goodsData"
        :col="goodsData.ColumNumber"
        :list="goodsData.Product"
        :goodsData="goodsData"
        :templateType="goodsData.TemplateType"
        :activityInfo="activityInfo"
        @click="click">
        <!-- :dataFilter="dataFilter"> -->
    </ac-goods-list>
</template>
<script>
// import { GOODS_TYPE } from '../../business/goodsLayout/common/goods/constant.js';

import AcGoodsExtend from '../common/goodsExtend/GoodsExtend';
// import { GET_PRODUCT_POOL } from '../../common/api/api.js';
export default {
    name: 'ac-goods-default',
    extends: AcGoodsExtend,
    // components: {
    //     AcGoodsItemBase,
    //     AcGoodsItemFull
    // }
    props: {
        /**
         * 模块数据
         */
        moduleData: {
            type: Object
        },
        /**
         * 活动信息
         */
        activityInfo: {
            type: Object
        }
    },
    data() {
        return {
            // GOODS_TYPE: GOODS_TYPE,
            goodsData: null
            // columNumber: null // 列数
        };
    },
    created() {
        // this.getGoodsList(this.moduleData);
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
            this.getProductPool(moduleData)
                .subscribe(data => {
                    this.setData(data);
                });
        },
        /**
         * 设置当前模块数据
         * @param {Object} data 数据
         */
        setData(data) {
            let _data = data && data.Data[0];
            let _module = _data && _data.Module;
            this.columNumber = _module && _module.ColumNumber;
            this.goodsData = _module;
        }
        // getGoodsList(moduleData) {
        //     let _that = this;
        //     if (!moduleData) {
        //         return;
        //     }
        //     let carInfo = this.carInfo || {};
        //     let locationInfo = this.locationInfo || {};
        //     this.xxx && this.xxx.unsubscribe();
        //     this.xxx = this.$http.post(GET_PRODUCT_POOL, {
        //         apiServer: 'apiServer',
        //         isLoading: true,
        //         isErrorData: true,
        //         // cacheData: {
        //         //     cacheType: 'l',
        //         //     timeout: 10 * 60 * 1000,
        //         //     cacheKey: GET_PRODUCT_POOL + this.getHttpCacheKey()
        //         // },
        //         data: {
        //             hashKey: _that.getHashKey(),
        //             city: locationInfo.city || '',
        //             province: locationInfo.province || '',
        //             cityId: locationInfo.cityId || '',
        //             vehicle: {
        //                 VehicleId: _that.getVehicleId(),
        //                 Tid: carInfo.TID || '',
        //                 TireSize: carInfo.TireSize || ''
        //             },
        //             modules: {
        //                 'ModuleId': moduleData.ModuleId,
        //                 'ModuleType': moduleData.ModuleType
        //             }
        //         }
        //     }).subscribe(data => {
        //         let _data = data && data.Data;
        //         let _module = _data && _data.Module;
        //         this.columNumber = _module && _module.ColumNumber;
        //         this.goodsData = _module;
        //         // console.lsog('goodsData--->', this.goodsData);

        //         // console.log(data.Activity.ActivePageGroupContents);
        //     });
        // }
    }

};
</script>
<style lang="scss">

</style>
