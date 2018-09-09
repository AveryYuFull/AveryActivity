<template>
    <div
        :is="moduleName"
        :moduleData="moduleData"
        :activityInfo="activityInfo"
        :serverTime="serverTime"
        @click="click">
    </div>
</template>

<script>
import AcGoodsExtend from '../common/goodsExtend/GoodsExtend';
import { moduleType } from '../../common/constants';

export default {
    extends: AcGoodsExtend,
    name: 'ac-goods',
    computed: {
        moduleName() {
            let _that = this;
            let res = '';
            let itemData = _that.moduleData;
            let typeCode = itemData && itemData.ModuleType;
            switch (typeCode) {
                case 'ORDINARYPRODUCT': // 普通商品
                    res='ac-goods-default';
                    break;
                case 'SECONDSKILL': // 秒杀商品模块
                    res='ac-seckill-base';
                    break;
                case 'SPELLGROUP': // 拼团
                    res='ac-group-booking';
                    break;
                case 'SYSRECOMMENDED': // 系统推荐
                    res='ac-sys-rec';
                    break;
                default:
                    break;
            }
            return res;
        }
    },
    methods: {
        click(evt) {
            // console.log(evt);
            let itemData = evt && evt.itemData;

            this.$emit('click', evt);
            const type = evt && evt.ModuleType;

            itemData = handleUrl(type, itemData);

            if (itemData) {
                this.$tuhu.toUrl({
                    appLink: itemData.AppLink,
                    h5Link: itemData.MobileLink
                });
            }

            /**
             * 处理链接
             * @param {String} type 模块类型
             * @param {Object} itemData 模块数据
             * @returns {Object} 模块数据
             */
            function handleUrl (type, itemData) {
                const BASE_URL = 'https://wx.tuhu.cn/vue/GroupBuy';
                // const BASE_URL = 'https://wxdev.tuhu.work/vue/vueTest/GroupBuy';
                if (type === moduleType.SPELL_GROUP) {
                    const [productId, variantId] = itemData.Pid.split('|');
                    itemData.AppLink = itemData.MobileLink = BASE_URL + '/pages/teamBuy/productDetail?' +
                        'productId=' + productId + '&variantId=' + variantId + '&activityId=' + (itemData.ActivityId || '') +
                        '&ProductGroupId=' + itemData.ProductGroupId + '&_tab=0';
                }
                return itemData;
            }
        }
    }
};
</script>

<style scoped>

</style>
