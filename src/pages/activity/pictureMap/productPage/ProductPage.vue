<template>
    <div class="acs_productList">
        <ac-module-col4-g5>
            <div class="ac_module-item" @click="click($event, item)" v-if="item" v-for="(item, index) in list" :key="index">
                <ac-img-box :imgUrl="item.Image"></ac-img-box>
            </div>
        </ac-module-col4-g5>
    </div>
</template>
<script>
import AcPictureMapExtend from '../common/pictureMapExtend/PictureMapExtend';

export default {
    extends: AcPictureMapExtend,
    name: 'ac-product-page',
    data() {
        return {
            list: null
        };
    },
    computed: {
        ...Vuex.mapState({
            locationInfo: '_locationInfo'
        })
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
            let _Module = _data&& _data.Module;
            if (_Module) {
                this.list = [{LinkType: 'NoLink', Image: _Module.Image}];
                _Module.Product && _Module.Product.forEach(item => {
                    this.list.push(Object.assign(item, {
                        LinkType: 'Product'
                    }));
                });
            }
        },
        /**
         * click事件
         * @param {Event} evt 事件对象
         * @param {Object} item 当前项数据
         */
        click(evt, item) {
            if (evt) {
                evt._contentType = 'ProductPage';
            }

            this.$emit('click', {
                Event: evt,
                itemData: item
            });
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_productList{
    width: 100%;
    padding:$ptb $plr;
}
</style>
