<template>
    <div class="acs-seckill-top-item"
        :class="{active: propsValue.active}"
        @click="$emit('clickItem', propsValue.index)">
        <p class="seckill-time">{{seckillData.time}}</p>
        <p class="seckill-text">{{seckillData.text}}</p>
    </div>
</template>
<script>
export default {
    // name: 'ac-seckill-top-item'
    props: {
        propsValue: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            seckillData: []
        };
    },
    created() {
        let text;
        switch (this.propsValue.status + '') {
            case '-1':
                text = '已结束';
                break;
            case '0':
                text = '开抢中';
                break;
            case '1':
                text = '即将开始';
                break;
        }
        this.seckillData = {
            time: this.propsValue.time,
            text: text
        };
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";
    .acs-seckill-top-item {
        background: $color3;
        color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 2.5rem;
        &.active {
            background: linear-gradient(-45deg, $colorDF3, $colorFB4);
            position: relative;
            &::after{
                content: '';
                height: 0;
                width: 0;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -15px;
                border-top: 8px solid $colorDF3;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid transparent;
                z-index: 5;
            }
        }
        p {
            font-size: 0.6rem;
            &:first-child{
                font-size: 0.65rem;
            }
        }
    }
</style>
