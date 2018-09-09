<template>
    <div class="acs_square-pic" ref="hookEl" @click="click">
        <div class="ac_square-pic-box" v-if="imgUrl">
            <div class="ac_square-pic-cont">
                <template v-if="isLazy">
                    <template v-if="width">
                        <img
                            class="ac_square-pic-img"
                            v-lazy="{src: imgUrl,width: width}"
                            alt="" />
                    </template>
                </template>
                <template v-else>
                    <img
                        class="ac_square-pic-img"
                        :src="imgUrl"
                        alt="" />
                </template>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ac-square-pic',
    props: {
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
            evt._contentType = 'acSquarePic';
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
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_square-pic {
    display: inline-block;
    width: 100%;
    height: 0;
    padding: 100% 0 0 0;
    position: relative;
    vertical-align: middle;
    .ac_square-pic-box{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .ac_square-pic-cont {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .ac_square-pic-img {
        display: inline-block;
        margin: 0 auto;
        line-height: 0;
        max-width: 100%;
        max-height: 100%;
        width: auto !important;
        height: auto !important;
    }
}

</style>
