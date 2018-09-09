<template>
    <div class="acs_mask-bg">
        <div class="ac_mask-bg-tip-container" v-if='myTipMessage && myTipMessage.length'>
            <template v-for="(message, index) in myTipMessage">
                <template v-if="message === 'line'">
                    <div class="line" :key='index'></div>
                </template>
                <template v-else>
                    <div class="ac_tip-message" v-text="message" :key='index'></div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ac-mask-bg',
    props: {
        tipMessage: {
            type: Array,
            default: function () {
                return ['无货', '已售完'];
            }
        }
    },
    computed: {
        myTipMessage () {
            let message = [];
            if (this.tipMessage && this.tipMessage.length > 0) {
                message = this.tipMessage.join('_line_');
                message = message.split('_');
            }
            return message;
        }
    }
};
</script>

<style lang='scss'>
@import 'style/_public/_var.scss';
@import 'style/_public/_mixin.scss';
@import 'style/_public/_iconFont.scss';

.acs_mask-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: RGBA(255, 255, 255, 0.5);
    }
    .ac_mask-bg-tip-container {
        background: rgba(51, 51, 51, 0.7);
        border-radius: 50%;
        // font-family:'PingFangSC-Regular', 'SourceHanSansCN-Regular';
        color: $colorf;
        font-size: 11px;
        min-width: 70px;
        min-height: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 35%;
        transform: translate3d(-50%, -50%, 0);
        // padding: 19px 0;
        line-height: 1;
        .line {
            height: 1px;
            background: $colorf;
            width: 56%;
            margin: 2px 0;
        }
    }
}
</style>
