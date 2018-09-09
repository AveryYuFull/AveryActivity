<template>
    <div>
        <div class="acs_box-title ac_pingFang"
            :style="lineClamp"
            :class="[row + '' === '2' && !extraNameText && 'ac_row2', extraNameText && 'bold ac_pingFangM', nameClass]"
            v-text='nameText'></div>
            <div v-if="extraNameText"
                class="acs_box-extra-title ac_pingFang"
                v-text="extraNameText"></div>
    </div>
</template>

<script>
export default {
    name: 'ac-box-title',
    props: {
        nameText: {
            type: String
        },
        nameClass: {
            type: String,
            default: ''
        },
        extraNameText: {
            type: String
        },
        row: {
            type: Number,
            default: 2
        }
    },
    computed: {
        lineClamp () {
            return {
                '-webkit-line-clamp': this.row
            };
        }
    }
};
</script>

<style lang="scss">
@import 'style/_public/_var.scss';
@import 'style/_public/_mixin.scss';
@import 'style/_public/_iconFont.scss';

.acs_box-title {
    @include lineClamp;
    &.bold {
        height:18.5px;
        line-height: 18.5px;
    }
}
.acs_box-extra-title{
    font-size: $FontSize13;
    height: 18.5px;
}
</style>

