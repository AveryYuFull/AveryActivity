<template>
    <div class="acs_imgBox" ref="hookEl" @click="click">
        <div class="ac_pic">
            <template v-if="isLazy">
                <template v-if="width">
                    <img v-lazy="{src: imgUrl, width: width}" alt="" v-if="imgUrl" />
                </template>
            </template>
            <template v-else>
                <img :src="imgUrl" v-if="imgUrl" alt="" />
            </template>
        </div>
    </div>
</template>

<script>
/**
 * 图片组件
 */
export default {
    name: 'ac-img-box',
    props: {
        /**
         * 图片地址
         */
        imgUrl: {
            type: String
        },
        /**
         * 是否需要lazy
         */
        isLazy: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            width: null
        };
    },
    methods: {
        click(evt) {
            evt._contentType = 'acImgBox';
            this.$emit('click', evt);
        }
    },
    mounted() {
        this.$nextTick(() => {
            let hookEl = this.$refs.hookEl;
            if (hookEl) {
                this.width = (Math.ceil((this.$refs.hookEl.offsetWidth / window.innerWidth) * 100) * 2) + '%';
            }
        });
    }
};
</script>

<style lang="scss">
.acs_imgBox {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    .ac_pic{
        display: inline-block;
        width: 100%;
        line-height: 1;
        vertical-align: middle;
    }
    img{
        width: auto !important;
        height: auto !important;
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
