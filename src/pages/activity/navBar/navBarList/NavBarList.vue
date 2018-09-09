<template>
    <div class="acs_nav-bar" ref="hookNav">
        <ac-nav-bar-list-cont
            :list="list"
            v-model="myNavIndex">
        </ac-nav-bar-list-cont>
        <div class="ac_fixed-nav" v-if="isShowFloat">
            <div class="ac_fixed-nav-wrap">
                <ac-nav-bar-list-cont
                    :list="list"
                    v-model="myNavIndex">
                </ac-nav-bar-list-cont>
            </div>
        </div>
    </div>
</template>

<script>
import AcNavBarExtend from '../navBarExtend/NavBarExtend';
import AcNavBarItem from '../navBarItem/NavBarItem';
import AcNavBarListCont from '../navBarListCont/NavBarListCont';
import { getElementTop } from '../../../../commons/utils/getElementTop';

const COMPONENT_NAME = 'ac-nav-bar-list';

export default {
    extends: AcNavBarExtend,
    name: COMPONENT_NAME,
    components: {
        AcNavBarListCont
    },
    props: {
        list: {
            type: Array,
            required: true
        },
        scrollTop: {
            type: Number
        }
    },
    watch: {
        scrollTop() {
            this.showFloat();
        }
    },
    data() {
        return {
            isShowFloat: false
        };
    },
    methods: {
        showFloat() {
            let hookNav = this.$refs.hookNav;
            let scrollTop = this.scrollTop;
            if (hookNav) {
                let top = getElementTop(hookNav);
                if (scrollTop > top) {
                    if (this.$parent.$parent.$el.offsetHeight - scrollTop > this.$root.$el.offsetHeight) {
                        this.isShowFloat = true;
                    }
                } else {
                    this.isShowFloat = false;
                }
            }
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_nav-bar{
    .ac_fixed-nav{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        z-index: 99;
    }
    .ac_fixed-nav-wrap{
        width: 100%;
        margin: 0 auto;
        max-width: $maxWidth;
    }
}
</style>

