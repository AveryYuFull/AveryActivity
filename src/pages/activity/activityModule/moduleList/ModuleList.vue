<template>
    <div class="acs_ModuleList" v-if="myList && myList.length">
        <ac-module-item
            v-for="(item, index) in myList" :key="index"
            v-if="item"
            :moduleData="item"
            :activityInfo="activityInfo"
            :serverTime="serverTime"
            v-model="myNavIndex"
            :scrollTop.sync="myScrollTop"
            :navigationList="navigationList"
            @click="$emit('click', $event)">
        </ac-module-item>
    </div>
</template>

<script>
import AcListChunk from './ListChunk';

export default {
    extends: AcListChunk,
    name: 'ac-module-list',
    props: {
        /**
         * 导航列表
         */
        navigationList: {
            type: Array
        }
    },
    created() {
        this.initData();
        // console.log(this.myList);
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_ModuleList {
    font-size: 0;
    .ac_contain{
        font-size: $defaultFontSize;
    }
}
</style>
