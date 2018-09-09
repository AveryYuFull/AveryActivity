<template v-if="moduleData">
    <div
        class="acs_moduleItem"
        ref="hookModule">
        <div v-if="navigationList && navigationList[0] && navigationList[0].ModuleId === moduleData.ModuleId">
            <ac-nav-bar-list
                :list="navigationList"
                v-model="myNavIndex"
                :scrollTop="scrollTop">
            </ac-nav-bar-list>
        </div>
        <ac-module-factory
            :moduleData="moduleData"
            :activityInfo="activityInfo"
            :serverTime="serverTime"
            :scrollTop="scrollTop"
            @click="$emit('click', $event)">
        </ac-module-factory>
    </div>
</template>

<script>
import AcModuleExtend from '../common/moduleExtend/ModuleExtend';
import { getElementTop } from '../../../../commons/utils/getElementTop';

export default {
    extends: AcModuleExtend,
    name: 'ac-module-item',
    props: {
        navigationList: {
            type: Array
        }
    },
    data() {
        return {
            tempScrollTop: 0,
            tempId: null
        };
    },
    watch: {
        scrollTop(nowVal) { // 滚动条位置
            let moduleData = this.moduleData;
            if (!moduleData || !moduleData.NavigationName) {
                return;
            }
            this.calcModuleId();
            this.tempScrollTop = nowVal;
        },

        navIndex(nowVal) { // 导航选中的ID
            let moduleData = this.moduleData;
            if (!moduleData || !moduleData.NavigationName) {
                return;
            }
            this.calcPosition();
        }
    },
    methods: {
        /**
         * 计算当前位置是否在显示区域
         * @returns {Number}
         */
        calcPosition() {
            let res = 0;
            let moduleData = this.moduleData;
            if (!moduleData || !moduleData.NavigationName) {
                return res;
            }
            let offset = this.getPosition();
            if (offset && this.tempId !== this.navIndex && this.navIndex === moduleData.ModuleId) {
                res = this.myScrollTop = offset && offset.top;
            }

            // let parentHeight = this.$parent.$el.offsetHeight;
            // if (offset && this.tempId !== this.navIndex && this.navIndex === moduleData.ModuleId) {
            //     let offsetTop = offset && offset.top;
            //     if (parentHeight - offsetTop > this.$root.$el.offsetHeight) {
            //         res = this.myScrollTop = offsetTop;
            //     }
            // }
            this.tempId = this.navIndex;
            return res;
        },
        /**
         * 计算当前模块ID是否在显示区域
         * @returns {any}
         */
        calcModuleId() {
            let res = null;
            let moduleData = this.moduleData;
            if (!moduleData || !moduleData.NavigationName) {
                return res;
            }
            if (this.isRegion() && this.myNavIndex !== moduleData.ModuleId) {
                res = this.myNavIndex = moduleData.ModuleId;
                this.tempId = res;
            }
            return res;
        },
        /**
         * 判断是否在区域内
         * @returns {Boolean}
         */
        isRegion () {
            let res = false;
            let offset = this.getPosition();
            let scrollTop = this.scrollTop;
            if (offset) {
                let direction = this.tempScrollTop - scrollTop; // 大于0是下，小于0是上
                let _top = offset.top;
                let _bottom = offset.bottom;
                scrollTop = scrollTop + 44; // 顶部保留位置
                if (((direction < 0 && _top <= scrollTop && _bottom >= scrollTop) || // 向上
                        (direction > 0 && _top <= scrollTop && _bottom >= scrollTop) // 向下
                    )) {
                    res = true;
                }
            }
            return res;
        },
        /**
         * 获取当前元素在页面的位置信息
         * @returns {Object}
         */
        getPosition() {
            let moduleData = this.moduleData;
            if (!moduleData || !moduleData.NavigationName) {
                return;
            }
            let res = {
                top: 0,
                bottom: 0
            };
            let _that = this;
            let hookModule = this.$refs.hookModule;
            if (hookModule) {
                let top = getElementTop(hookModule);
                let height = hookModule.offsetHeight;
                res = {
                    top: top,
                    height: height,
                    bottom: top + height
                };
            }
            return res;
        }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_moduleItem {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
}
</style>
