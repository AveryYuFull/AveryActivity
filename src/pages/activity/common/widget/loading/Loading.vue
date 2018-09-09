<template>
    <div class="acs_loading">
        <div class="ac_loading-box">
            <div class="ac_loading-loader"
                v-if="isLoading">
                <img
                    class="ac_loader-img"
                    :src="loadingImg" />
            </div>
            <div class="ac_loading-noActivity"
                v-else-if="noActivity">
                <img
                    class="ac_noActivity-img"
                    :src="endImg" />
                <span class="ac_noActivity-desc">敬请期待后续活动......</span>
            </div>
            <div class="ac_loading-error"
                v-else>
                <img
                    class="ac_error-img"
                    :src="errImg" />
                <span class="ac_error-btn" @click="click">刷新...</span>
            </div>
        </div>
    </div>
</template>

<script>
const COMPONENT_NAME = 'ac-loading';

export default {
    name: COMPONENT_NAME,
    props: {
        loadingImg: {
            type: String
        },
        errImg: {
            type: String
        },
        endImg: {
            type: String
        },
        isLoading: {
            type: Boolean,
            default: true
        },
        noActivity: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        click () {
            this.$emit('click');
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
.acs_loading {
    background: $colorf;
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .ac_loading-box {
        max-width: $maxWidth - 200;
        position: relative;
        height: 100%;
        margin: 0 auto;
    }
    .ac_loading-loader {
        position: absolute;
        width: 40%;
        height: 40%;
        top: 50%;
        left: 50%;
        z-index: 9999;
        transform: translate3d(-50%, -50%, 0);
    }
    .ac_loading-noActivity, .ac_loading-error {
        font-size: $FontSize48;
        color: $colorF55;
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }
    .ac_loader-img,.ac_noActivity-img, .ac_error-img {
        width: 100%;
    }
    .ac_noActivity-desc, .ac_error-btn {
        margin-top: 10%;
    }
    .ac_error-btn {
        font-size: 12px;
        border: 1px solid $color9;
        border-radius: 3px;
        padding: 5px 15px;
        color: $color2;
        cursor: pointer;
    }
}
</style>
