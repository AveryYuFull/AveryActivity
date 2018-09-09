<template>
<div class="acs_flopPop_body">
    <div class="ac_flopPop_inform">
        <div class="ac_flopPop_user">
            <div class="ac_flopPop_name">
              <input type="text" placeholder="姓名"/>
            </div>
            <div class="ac_flopPop_phone">
              <input type="text" placeholder="手机号" maxLength="11"/>
            </div>
        </div>
        <div class="ac_flopPop_area">
            <input placeholder='请选择地区' readonly type="text"/>
            <tuhu-citypicker :show='true' :formatvalue='formatvalue'></tuhu-citypicker>
          </div>
          <div class="ac_flopPop_address">
            <input type="text" placeholder="请输入收货地址"/>
          </div>
    </div>
</div>
</template>
<script>
import AcFlopPopExtent from '../flopPopExtent/flopPopExtent';
export default {
    extends: AcFlopPopExtent,
    name: 'ac-flop-pop-body',
    methods: {
        formatvalue (picker, value, displayName) {

        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

input::-moz-placeholder{
    color: #999999;
}
input::-webkit-input-placeholder{
    color: #999999;
}
.acs_flopPop_body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.75rem;
    font-size: $defaultFontSize;
    .ac_flopPop_inform{
        width: 100%;
        color:#333;
        .ac_flopPop_user{
            display: flex;
            height: 2rem;
            .ac_flopPop_name,.ac_flopPop_phone{
                padding-left: 1.5rem;
                height: 2rem;
                position: relative;
                input{
                    width: 3.5rem;
                    height: 1.9rem;
                }
                &:before{
                    position: absolute;
                    content: '';
                    background: url(../images/mingzi.png) no-repeat;
                    background-size: contain;
                    width: 0.9rem;
                    height: 0.9rem;
                    top:0.5rem;
                    left: 0;
                }
                &.ac_flopPop_phone{
                    flex: 1;
                    input{
                        width: 5rem;
                    }
                    &:before{
                        background: url(../images/shouji.png) no-repeat;
                        background-size: contain;
                    }
                }
            }

        }
        .ac_flopPop_area, .ac_flopPop_address{
            padding-left: 1.5rem;
            height: 2rem;
            position: relative;
            input{
                width: 100%;
                height: 1.9rem;
            }
            &:before{
                position: absolute;
                content: '';
                background: url(../images/location.png) no-repeat;
                background-size: contain;
                width: 0.9rem;
                height: 0.9rem;
                top:0.5rem;
                left: 0;
            }
            &.ac_flopPop_address{
                &::before{
                    display: none;
                }
            }
            &.ac_flopPop_area{
                &::after{
                    position: absolute;
                    content: '';
                    background: url(../images/arrow.png) no-repeat;
                    background-size: contain;
                    width: 0.4rem;
                    height: 0.9rem;
                    top:0.6rem;
                    right: 0;
                }
            }

        }
    }
}
</style>
