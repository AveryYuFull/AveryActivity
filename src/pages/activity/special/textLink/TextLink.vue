<template>
<div class="acs_textlink" :class="{'ac_textlink-dark': isDark}">
    <ac-text-scroll :list="list"
    :isDark="isDark"
    :dataFilter="dataFilter"
    @click="click"></ac-text-scroll>
</div>
</template>
<script>
import AcSpecialExtend from '../common/specialExtend/SpecialExtend';

export default {
    extends: AcSpecialExtend,
    name: 'ac-text-link',
    data() {
        return {
            list: null
        };
    },
    computed: {
        /**
         * 0浅色背景, 1深色背景
         * @return {res} class
         */
        isDark() {
            let res = false;
            // switch (this.$$getBackgroundColor() + '') {
            //     case '0':
            //         res = false;
            //         break;
            //     case '1':
            //         res = true;
            //         break;
            //     default:
            //         break;
            // }
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
            // if (!moduleData) {
            //     console.error('moduleData');
            //     return;
            // }
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
            // console.log(data);
            const _data = data && data.Data[0];
            const InfoList = _data && _data.Module && _data.Module.InfoList;
            this.list = InfoList;
        },
        /**
         * 过滤数据
         * @param {Object} item tab项数据
         * @returns {Object}
         */
        dataFilter(item) {
            item = item || {};
            return Object.assign({}, item, {
                imgUrl: item.Image || null,
                nameText: item.CarouselText
            });
        },
        /**
         * 点击跳转
         * @param {Object} itemData 跳转链接
         */
        click(itemData) {
            this.$emit('click', {
                itemType: 'textLink',
                Event: itemData,
                itemData: itemData
            });
            if (itemData) {
                this.$tuhu.toUrl({
                    appLink: itemData.AppLink,
                    h5Link: itemData.MobileLink
                });
            }
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_textlink {
    width: 7.35rem;
    height: 1.75rem;
    margin-left: 15px;
    line-height: 1.75rem;
    background: $bgf_5;
    border-radius: 1rem;
    position: absolute;
    top: 2rem;
    z-index: 5;
    overflow: hidden;
    .acs_text-link-scroll{
        .ac_scroll-item{
            .acs_textScrollItem-item{
                // &::after{
                //     content: '\e601';
                //     @extend %ac_icon;
                //     font-size: .4rem;
                //     position: absolute;
                //     top: .58rem;
                //     right: .5rem;
                //     color: $color9;
                // }
            }

        }
    }
    &.ac_textlink-dark {
        background: $bg0_5;
        .acs_text-link-scroll{
            .ac_scroll-item{
                color: $colorf;
                &::after{
                    color: $colorf;
                }
            }
        }
    }
}
</style>
