<template>
    <div
        :is="moduleName"
        :moduleData="moduleData"
        @click="click">
    </div>
</template>

<script>
import AcPictureMapExtend from '../common/pictureMapExtend/PictureMapExtend';
import CouponUtil from '../../common/util/couponUtil';
import voucherPackageUtil from '../../common/util/voucherPackageUtil';
import AcSusTip from '../../common/widget/susTip/SusTip';

export default {
    extends: AcPictureMapExtend,
    name: 'ac-picture-map',
    computed: {
        moduleName() {
            let _that = this;
            let res = '';
            let itemData = _that.moduleData;
            let typeCode = itemData && itemData.ModuleType;
            switch (typeCode) {
                case 'IMAGELINKCOLUMNS': // 一行1~4列
                    res='ac-picture-page';
                    break;
                case 'IMAGELINKPRODUCT': // 一图3产品
                    res='ac-product-page';
                    break;
                default:
                    break;
            }
            return res;
        }
    },
    methods: {
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
            if (!val) {
                return;
            }
            switch (val.LinkType) {
                case 'NoLink': // 无连接
                    if (val.Title || val.Copywriting) {
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
                    break;

                case 'Coupon': // 优惠券
                    CouponUtil.doCoupon({CID: val.CouponId}, this.$tuhu, this.$http);
                    break;
                case 'VoucherPackage': // 优惠券礼包
                    voucherPackageUtil.doVoucherPackage({voucherPackageId: val.VoucherPackageId}, this.$tuhu, this.$http);
                    break;
                default:
                    if (val.AppLink || val.MobileLink) {
                        this.$tuhu.toUrl({
                            appLink: val.LinkIsTitle ? val.AppLink + '?navHidden=1' : val.AppLink,
                            h5Link: val.MobileLink
                        });
                    }
                    break;
            }
        }
    }
};
</script>

<style scoped>

</style>
