<template>
<div class="seckill-base">
    <seckill-page v-if="seckillItems.length " :seckillItems="seckillItems">
        <div
            v-if="item.Product && item.Product.length"
            v-for="(item, index) in seckillList"
            :key="item.index"
            :slot="'slide' + index">
            <div class="count-down">
                <span class="count-text" v-if="item.Status+'' === '0'">距离活动结束</span>
                <span class="count-text" v-else>距离活动开始</span>
                <ac-count-time
                :endTime="item.Status === 0 ? item.EndDateTime : item.StartDateTime"
                :currentTime="currentServerTime"
                :styleType="1"></ac-count-time>
            </div>
            <ac-goods-list
                :col="columNumber"
                :list="item.Product"
                templateType="Complete"
                :activityInfo="activityInfo"
                @click="click">
            </ac-goods-list>
        </div>
    </seckill-page>
</div>
</template>
<script>
import AcGoodsExtend from '../../common/goodsExtend/GoodsExtend';
import AcCountTime from '../../../common/widget/countTime/countTime';
import { GET_ACTIVITY_SECONDSKILL } from '../../../common/api/api';
import SeckillPage from '../seckillPage';
export default {
    name: 'ac-seckill-base',
    extends: AcGoodsExtend,
    components: {
        SeckillPage,
        AcCountTime
    },
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
            seckillItems: [], // 秒杀信息列表
            seckillList: [], // 秒杀商品列表
            columNumber: 1,
            currentServerTime: null
        };
    },
    created() {
        // let moduleData = this.moduleData;
        // let _that = this;
        // if (!moduleData) {
        //     console.error('moduleData');
        //     return;
        // }
        // let carInfo = this.carInfo || {};
        // let locationInfo = this.locationInfo || {};
        // this.$http.post(GET_ACTIVITY_SECONDSKILL, {
        //     apiServer: 'apiServer',
        //     isLoading: true,
        //     isErrorData: true,
        //     // cacheData: {
        //     //     cacheType: 'ml',
        //     //     needSend: true
        //     // },
        //     data: {
        //         hashKey: this.getHashKey(),
        //         city: locationInfo.city || '',
        //         province: locationInfo.province || '',
        //         cityId: locationInfo.cityId || '',
        //         vehicle: {
        //             VehicleId: this.getVehicleId(),
        //             Tid: carInfo.TID || '',
        //             TireSize: carInfo.TireSize || '',
        //             SpecialTireSize: carInfo.SpecialTireSize || ''
        //         },
        //         modules: {
        //             ModuleId: moduleData.ModuleId,
        //             ModuleType: moduleData.ModuleType
        //         }
        //     }
        // }).subscribe(res => {
        //     let _res = res && res.Data;
        //     this.currentServerTime = (res && res.ServerTime);
        //     if (!_res) {
        //         return;
        //     }
        //     let _seckillList = (_res.Module && _res.Module.FlashSaleList) || [];
        //     if (_seckillList.length === 0) {
        //         return false;
        //     }
        //     this.seckillList = _seckillList;
        //     _seckillList.forEach((item, index) => {
        //         this.seckillItems.push({
        //             time: item.HourTime,
        //             status: item.Status,
        //             index: index,
        //             productLength: (item.Product && item.Product.length) || 0
        //         });
        //     });
        //     this.columNumber = _res.Module && _res.Module.ColumNumber;
        // });
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
            // if (!moduleData) {
            //     console.error('moduleData');
            //     return;
            // }
            this.getActivitySecondskill(moduleData)
                .subscribe(data => {
                    this.setData(data);
                });
        },
        /**
         * 设置当前模块数据
         * @param {Object} data 数据
         */
        setData(data) {
            let _res = data && data.Data;
            this.currentServerTime = (data && data.ServerTime);
            if (!_res) {
                return;
            }
            let _seckillList = (_res.Module && _res.Module.FlashSaleList) || [];
            if (_seckillList.length === 0) {
                return;
            }
            this.seckillList = _seckillList;
            _seckillList.forEach((item, index) => {
                this.seckillItems.push({
                    time: item.HourTime,
                    status: item.Status,
                    index: index,
                    productLength: (item.Product && item.Product.length) || 0
                });
            });
            this.columNumber = _res.Module && _res.Module.ColumNumber;
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.seckill-base {
    .count-down {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgba(255,255,255,.5);
        .count-text{
            font-size: $smallFontSize;
            margin-right: 10px;
        }
        .acs_count-time {
            vertical-align: middle;
        }
    }
}

</style>
