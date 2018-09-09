<template>
    <div ref="aeContainer"
        class="acs_aeAnimation"
        v-if="myImgUrl"
        @click="click">
    </div>
</template>

<script>
import AeAnimationUtil from '../../../util/aeAnimationUtil';

// const COMPONENT_NAME = 'ac-ae-animation';

export default {
    // name: COMPONENT_NAME,
    props: {
        imgUrl: {
            type: String
        }
    },
    data () {
        return {
            myImgUrl: this.imgUrl
        };
    },
    methods: {
        click () {
            this.$emit('click');
        },
        init (imgUrl) {
            if (imgUrl && (imgUrl.endsWith('.zip') || imgUrl.endsWith('.json'))) {
                AeAnimationUtil.handleAEAnimation(imgUrl, this.$refs.aeContainer, this.$tuhu);
            }
        }
    },
    mounted () {
        this.init(this.myImgUrl);
    },
    watch: {
        imgUrl (nowVal) {
            this.myImgUrl = nowVal;
        },
        myImgUrl (nowVal) {
            this.init(nowVal);
        }
    }
};
</script>
<style lang="scss">
// 去多余的边距
.acs_aeAnimation{
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    svg{
        display: inline-block;
        vertical-align: middle;
    }
}
</style>

