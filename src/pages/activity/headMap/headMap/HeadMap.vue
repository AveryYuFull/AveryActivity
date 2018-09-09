<template>
    <div
        :is="moduleName"
        :moduleData="moduleData"
        :picData="picData"
        v-if="picData"
        @click="click">
    </div>
</template>

<script>
import AcHeadMapExtend from '../common/headMapExtend/HeadMapExtend';
import CouponUtil from '../../common/util/couponUtil';
import voucherPackageUtil from '../../common/util/voucherPackageUtil';
import { moduleType } from '../../common/constants';
import AcSusTip from '../../common/widget/susTip/SusTip';

export default {
    inject: ['$$Popup'],
    extends: AcHeadMapExtend,
    name: 'ac-head-map',
    data() {
        return {
            picData: null
        };
    },
    computed: {
        moduleName() {
            let _that = this;
            let res = '';
            let itemData = _that.moduleData;
            let typeCode = itemData && itemData.ModuleType;
            switch (typeCode) {
                case moduleType.GENERAL_HEAD: // 通用活动页
                    res='ac-general-page';
                    break;
                case moduleType.SECTIONAL_HEADER: // 分车型活动页
                    res='ac-seperate-car-page';
                    break;
                default:
                    break;
            }
            return res;
        }
    },
    watch: {
        carInfo (nowVal) {
            this.initFunc();
        }
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
        click(evt) {
            evt = evt || {};
            let _that = this;
            let res = '';
            let itemData = _that.moduleData;
            let typeCode = itemData && itemData.ModuleType;
            evt.ModuleType = typeCode;
            evt.moduleData = itemData;
            this.$emit('click', evt);
            let val = evt.itemData || {};
            this.handleClick(val);
        },
        /**
         * 处理click事件
         * @param {Object} val 当前点击项数据
         */
        handleClick(val) {
            if (val && (val.Title || val.Copywriting)) {
                this.$$Popup.open(AcSusTip, {
                    props: {
                        title: val.Title || '',
                        des: val.Copywriting || ''
                    },
                    wrapCla: 'acs_popup-box-wrap',
                    alignCla: 'centerMiddle',
                    transitionCls: 't_scale',
                    isClickBgClose: true
                });
            }
        },
        /**
         * 获取头图相关信息
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
            const _Data = data && data.Data[0];
            const moduleInfo = (_Data && _Data.Module);
            this.picData = moduleInfo;
            // this.imgUrl = moduleInfo.Image;
            // this.imageDynamic = moduleInfo.ImageDynamic;
            // this.title = moduleInfo.Title;
            // this.des = moduleInfo.Copywriting;
        }
        // /**
        //  * 获取头图相关信息
        //  */
        // getData () {
        //     let moduleData = this.moduleData;
        //     if (!moduleData) {
        //         console.error('moduleData');
        //         return;
        //     }
        //     const params = {
        //         hashKey: this.getHashKey(),
        //         vehicleId: this.getVehicleId(),
        //         modules: [
        //             moduleData
        //         ]
        //     };
        //     getModuleDetail(this.$http, params)
        //         .subscribe(data => {
        //             const _Data = data && data.Data[0];
        //             const moduleInfo = (_Data && _Data.Module);
        //             this.picData = moduleInfo;
        //             // this.imgUrl = moduleInfo.Image;
        //             // this.imageDynamic = moduleInfo.ImageDynamic;
        //             // this.title = moduleInfo.Title;
        //             // this.des = moduleInfo.Copywriting;
        //         });
        // }
    }
};
</script>

<style scoped>

</style>
