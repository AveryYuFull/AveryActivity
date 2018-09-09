<template>
    <t-button class="acs_boxButton" :nameText="myNameText || nameText" :class="[btnClass, className]" @click="click($event)"></t-button>
</template>

<script>
export default {
    name: 'ac-box-button',
    props: {
        className: {
            type: String,
            default: ''
        },
        nameText: {
            type: String,
            default: ''
        },
        /**
         * 按钮状态
         */
        status: { // 0为未开始;1为开始;2为结束;3购物车
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            myNameText: ''
        };
    },
    computed: {
        /**
         * 按钮的className
         * @returns {string}
         */
        btnClass() {
            let _that = this;
            let res;
            let status = _that.status;
            switch (status + '') {
                case '0': // 绿色（未开始）
                    res = 'acs_boxButton-green';
                    break;
                case '1': // 红色（已开始）
                    res = 'acs_boxButton-red';
                    break;
                case '2': // 灰色（已结束）
                    res = 'acs_boxButton-gray';
                    break;
                case '3': // 购物车
                    this.myNameText = '\ue604';
                    res = 'acs_boxButton-cart';
                    break;
                default:
                    res = 'acs_boxButton-red';
                    break;
            }
            return res;
        }
    },
    methods: {
        /**
         * 按钮点击
         * @param {Event} evt 事件对象
         */
        click(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>

<style lang='scss'>
@import 'style/_public/_var.scss';
@import 'style/_public/_mixin.scss';
@import 'style/_public/_iconFont.scss';

@mixin entity($bgRed, $color, $radius) { // 实体
    position: relative;
    background: $bgRed;
    border-radius: $radius;
    color:$color;
    // border:solid 1px $bgRed;
}

.acs_boxButton{
    margin-bottom: 3px;
    .ths_btn{
        .th_btn{
            min-width: 59px;
            letter-spacing: 1px;
            // padding: 0 12px;
            text-align: center;
            line-height: 22px;
            height: 22px;
            font-size: 11px;
        }
    }
    @at-root #{&}-{
        &green{ // 绿色
            .ths_btn{
                .th_btn{
                    @include entity($bg39, $colorf, 11px);
                    box-shadow: 0 1px 5px 0 rgba(57, 181, 156,.5);
                }
            }
        }
        &red{ // 红色
            .ths_btn{
                .th_btn{
                    @include entity($bgRed, $colorf, 11px);
                    box-shadow: 0 1px 5px rgba(223,51,72,.5);
                }
            }
        }
        &gray{ // 灰色
            .ths_btn{
                .th_btn{
                    @include entity($bgDF, $colorf, 11px);
                    // box-shadow: 0 2px 5px 0 $colorDF;
                }
            }
        }
        &cart{
            .ths_btn{
                .th_btn{
                    @include entity($bgRed, $colorf, 50%);
                    @extend %ac_icon;
                    padding: 3px;
                    height: 25px;
                    width: 25px;
                    min-width: 0;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
