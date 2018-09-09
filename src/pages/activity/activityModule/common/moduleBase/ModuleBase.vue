<script>
import AcNavBarExtend from '../../../navBar/navBarExtend/NavBarExtend';
import {
    getBigBrandConfig,
    getModuleDetail,
    getProductModule,
    getMaintainPricing,
    getProductPool,
    getActivitySecondskill
} from '../../../common/api/httpClient';

export default {
    extends: AcNavBarExtend,
    inject: ['$$getHashKey'],
    props: {
        /**
         * 服务器时间
         */
        serverTime: {
            // type: string
        },
        /**
         * 活动信息
         */
        activityInfo: {

        }
    },
    computed: {
        ...Vuex.mapState({
            carInfo: '_carInfo',
            locationInfo: '_locationInfo'
        })
    },
    methods: {
        /**
         * 获取当前模块的hashKey
         * @param {Object} moduleData 模块项数据
         * @returns {String}
         */
        getMdHashKey(moduleData) {
            let _that = this;
            let activityId = moduleData && moduleData.ActivityId;
            return activityId || _that.$$getHashKey() || '';
        },
        /**
         * 获取车型ID
         * @returns {String}
         */
        getVehicleId() {
            let res = '';
            let carInfo = this.carInfo;
            if (carInfo) {
                res = carInfo.ProductID || carInfo.VehicleId || '';
            }
            return res;
        },
        /**
         * 过滤模块数据
         * @param {Object} moduleData 模块项数据
         * @returns {Array}
         */
        filterModuleData (moduleData) {
            let res;
            if (!moduleData) {
                console.error('moduleData');
                return res;
            }
            if (!(moduleData instanceof Array)) {
                res = [moduleData];
            } else if (moduleData instanceof Array && moduleData.length > 0) {
                res = moduleData;
            }
            return res;
        },
        /**
         * 获取（大翻盘，摇杆机, 答题抽奖）配置信息
         * @param {Object|Array} moduleData 模块项数据
         * @returns {Observable<any>} 返回获取到的配置信息
         */
        getMdBrandConfig (moduleData) {
            let _that = this;
            let _moduleData = _that.filterModuleData(moduleData);
            if (!_moduleData) {
                return;
            }
            const params = {
                hashKey: _that.getMdHashKey(moduleData)
            };
            return getBigBrandConfig(this.$http, params);
        },
        /**
         * （通用活动页，分车型活动页，一行1~4列，滑动优惠券，轮播文字链，底部tab，视频） 的数据
         * @param {Object|Array} moduleData 模块项数据
         * @returns {Observable<any>}
         */
        getModuleDetail(moduleData) {
            let _that = this;
            let _moduleData = _that.filterModuleData(moduleData);
            if (!_moduleData) {
                return;
            }
            const params = {
                hashKey: _that.getMdHashKey(moduleData),
                vehicleId: _that.getVehicleId(),
                modules: _moduleData
            };
            return getModuleDetail(this.$http, params);
        },
        /**
         * （系统推荐，一图三产品，拼团） 的数据
         * @param {Object|Array} moduleData 模块项数据
         * @returns {Observable<any>}
         */
        getProductModule(moduleData) {
            let _that = this;
            let _moduleData = _that.filterModuleData(moduleData);
            if (!_moduleData) {
                return;
            }
            let carInfo = _that.carInfo || {};
            let locationInfo = _that.locationInfo || {};
            // _that.xxx && _that.xxx.unsubscribe();
            const params = {
                hashKey: _that.getMdHashKey(moduleData),
                city: locationInfo.city || '',
                province: locationInfo.province || '',
                cityId: locationInfo.cityId || '',
                vehicle: {
                    VehicleId: _that.getVehicleId(),
                    Tid: carInfo.TID || '',
                    TireSize: carInfo.TireSize || '',
                    SpecialTireSize: carInfo.SpecialTireSize || ''
                },
                modules: _moduleData[0]
            };
            return getProductModule(_that.$http, params);
        },
        /**
         * 查询普通商品（商品池）
         * @param {Object|Array} moduleData 模块项数据
         * @returns {Observable<any>}
         */
        getProductPool(moduleData) {
            let _that = this;
            let _moduleData = _that.filterModuleData(moduleData);
            if (!_moduleData) {
                return;
            }
            let carInfo = _that.carInfo || {};
            let locationInfo = _that.locationInfo || {};
            // _that.xxx && _that.xxx.unsubscribe();
            const params = {
                hashKey: _that.getMdHashKey(moduleData),
                city: locationInfo.city || '',
                province: locationInfo.province || '',
                cityId: locationInfo.cityId || '',
                vehicle: {
                    VehicleId: _that.getVehicleId(),
                    Tid: carInfo.TID || '',
                    TireSize: carInfo.TireSize || '',
                    SpecialTireSize: carInfo.SpecialTireSize || ''
                },
                modules: _moduleData
            };
            return getProductPool(_that.$http, params);
        },
        /**
         * 获取秒杀模块数据
         * @param {Object|Array} moduleData 模块项数据
         * @returns {Observable<any>}
         */
        getActivitySecondskill(moduleData) {
            let _that = this;
            let _moduleData = _that.filterModuleData(moduleData);
            if (!_moduleData) {
                return;
            }
            let carInfo = _that.carInfo || {};
            let locationInfo = _that.locationInfo || {};
            // _that.xxx && _that.xxx.unsubscribe();
            const params = {
                hashKey: _that.getMdHashKey(moduleData),
                city: locationInfo.city || '',
                province: locationInfo.province || '',
                cityId: locationInfo.cityId || '',
                vehicle: {
                    VehicleId: _that.getVehicleId(),
                    Tid: carInfo.TID || '',
                    TireSize: carInfo.TireSize || '',
                    SpecialTireSize: carInfo.SpecialTireSize || ''
                },
                modules: _moduleData[0]
            };
            return getActivitySecondskill(_that.$http, params);
        },
        /**
         *（保养定价） 的数据
         * @param {Object|Array} moduleData 模块项数据
         * @returns {Observable<any>}
         */
        getMaintainPricing(moduleData) {
            let _that = this;
            let _moduleData = _that.filterModuleData(moduleData);
            if (!_moduleData) {
                return;
            }
            const params = {
                acticityId: _that.getMdHashKey(moduleData)
            };
            return getMaintainPricing(this.$http, params);
        }
    }
};
</script>
