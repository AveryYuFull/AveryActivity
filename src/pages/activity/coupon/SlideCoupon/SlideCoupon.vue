<template>
    <div class="acs_slidecoupon_content" v-if="slideCouponData && slideCouponData.length">
        <div class='ac_swiper-wrapper'>
            <template  v-for="(item,index) in slideCouponData">
                <ac-slide-box @click="drawCoupon($event, item)" :style="{width:couponWidth}" :slideCoupons="item" :key="index"></ac-slide-box>
            </template>
        </div>
    </div>
</template>
<script>
import AcSlideBox from '../slideBox/SlideBox';
import AcModuleExtend from '../../activityModule/common/moduleExtend/ModuleExtend';
import { moduleType } from '../../common/constants';
import CouponUtil from '../../common/util/couponUtil';

export default {
    extends: AcModuleExtend,
    name: 'ac-slide-coupon',
    components: {
        AcSlideBox
    },
    data() {
        return {
            slideCouponData: null,
            moduleType: null
        };
    },
    computed: {
        /**
         * 优惠券宽度
         * @return {res} 宽度
         */
        couponWidth() {
            let res = '';
            switch (this.slideCouponData.length+'') {
                case '1':
                    res = '96vw';
                    break;
                case '2':
                    res = '90vw';
                    break;
                case '3':
                    res = '44.3vw';
                    break;
                case '4':
                    res = '29.1vw';
                    break;
                default:
                    res = '21.5vw';
                    break;
            }
            return res;
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
            const slideCouponData = _module && _module.InfoList;
            this.slideCouponData = slideCouponData.filter((item, index) => {
                return item.Image;
            });
            this.moduleType = _data.ModuleType;
        },
        /**
         * 抽取优惠券
         * @param {Event} evt 事件对象
         * @param {Object} coupon 优惠券id信息
         */
        drawCoupon (evt, coupon) {
            const item = {
                Type: moduleType.SLIDING_COUPON,
                CID: coupon.CouponId
            };

            // 组装派发click事件数据
            evt._contentType = 'SlideCoupon';
            let moduleData = _that.moduleData;
            let typeCode = moduleData && moduleData.ModuleType;
            this.$emit('click', {
                ModuleType: typeCode,
                moduleData: moduleData,
                itemData: item,
                Event: evt
            });

            CouponUtil.doCoupon(item, this.$tuhu, this.$http);
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_slidecoupon_content {
    background-color: rgba(255,255,255,0);
    .ac_swiper-wrapper {
        padding-left: 15px;
        width: auto;
        background-color: rgba(255,255,255,0);
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }
}
</style>
