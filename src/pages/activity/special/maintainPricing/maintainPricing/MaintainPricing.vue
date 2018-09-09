<template>
    <maintain-pricing-content
        @click="click($event,priceConfig)"
        v-if="priceConfig"
        :bgImg="bgImg"
        :label="label"
        :tipStyle="tipStyle"
        :btnStyle="btnStyle"
        :btnText="btnText"
    ></maintain-pricing-content>
</template>
<script>
import MaintainPricingContent from '../maintainPricingContent';
import AcSpecialExtend from '../../common/specialExtend/SpecialExtend';
export default {
    name: 'ac-maintain-pricing',
    extends: AcSpecialExtend,
    components: {
        MaintainPricingContent
    },
    data() {
        return {
            type: '',
            label: '',
            initBtnText: '',
            priceConfig: null
        };
    },
    computed: {
        /**
         * 背景图片
         * @return {String} 背景图片
         */
        bgImg () {
            return (this.priceConfig && this.priceConfig.BackgroundImg) || '';
        },
        /**
         * 背景颜色
         * @return {String} 背景颜色
         */
        tipStyle () {
            return {
                color: (this.priceConfig && this.priceConfig.TipTextColor) || ''
            };
        },
        /**
         * 按钮样式
         * @return {Object} 按钮样式
         */
        btnStyle () {
            return {
                background: (this.priceConfig && this.priceConfig.ButtonBackgroundColor) || '',
                color: (this.priceConfig && this.priceConfig.ButtonTextColor) || ''
            };
        },
        /**
         * 按钮文案
         * @return {String} 按钮文案
         */
        btnText () {
            switch (this.type) {
                case 'NotStart':
                    return '先去逛逛';
                case 'WaitNext':
                    return '先去逛逛';
                case 'OutOfStock':
                    return '土豪任性，去买其他的';
                case 'UserEnd':
                    return '去看看其他还有啥好买的';
                case 'End':
                    return '活动已结束';
                case 'Ing':
                    return this.initBtnText;
                case 'DataError':
                    return '重新刷新';
                default:
                    return '';
            }
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
            this.getMaintainPricing(moduleData)
                .subscribe(data => {
                    this.setData(data);
                });
        },
        /**
         * 设置当前模块数据
         * @param {Object} data 数据
         */
        setData(data) {
            const priceConfig = data && data.FixedPriceActivityConfig;
            this.priceConfig = priceConfig;
            this.type = data.Type;
            this.label = data.Label;
            this.initBtnText = (priceConfig && priceConfig.OngoingButtonText) || '立享一元保养';
        },
        click(evt, itemData) {
            let _that = this;
            evt = {
                event: evt,
                itemData: itemData
            };

            let moduleData = _that.moduleData;
            let typeCode = moduleData && moduleData.ModuleType;

            evt.ModuleType = typeCode;
            evt.moduleData = moduleData;
            this.$emit('click', evt);

            if (itemData) {
                this.$tuhu.toUrl({
                    appLink: '/maintenance?type=' + this.type + '&aid=' + this.getHashKey() + '&isPricingActivity=1',
                    h5Link: 'https://wx.tuhu.cn/vue/wx/pages/maintenance/index?baoyangtypes=' + this.type + '&actid='+ this.getHashKey()
                });
            }
        }
    }

};
</script>
<style lang="scss">

</style>
