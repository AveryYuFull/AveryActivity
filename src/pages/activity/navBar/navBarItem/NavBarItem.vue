<template>
    <div class="navigationItem" @click="setNavIndex(itemData.ModuleId)" v-if="itemData" :class="{ac_active: myNavIndex === itemData.ModuleId}">
        {{itemData.NavigationName}}
    </div>
</template>

<script>
import AcNavBarExtend from '../navBarExtend/NavBarExtend';
const COMPONENT_NAME = 'ac-nav-bar-item';

export default {
    extends: AcNavBarExtend,
    name: COMPONENT_NAME,
    props: {
        itemData: {
            type: Object
        },
        activeIndex: {

        }
    },
    data () {
        return {
            // myNavIndex: this.navIndex
        };
    },
    watch: {
        myNavIndex(nowVale) {
            let _that = this;
            let itemData = _that.itemData;
            if (nowVale === (itemData && itemData.ModuleId)) {
                _that.$emit('active', itemData);
            }
        }
    }
};
</script>
<style lang="scss">
.navigationItem{
    // min-width: 4.5rem;
    height: 2rem;
    color: #555;
    line-height: 2rem;
    text-align: center;
    padding: 0 0.65rem;
    &.ac_active {
        background:linear-gradient(131.1deg,rgba(222,51,51,1),rgba(243,56,27,0.56));
        color: #fff !important
    }
}
</style>

