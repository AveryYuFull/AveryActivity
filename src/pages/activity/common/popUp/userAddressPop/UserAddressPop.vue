<template>
    <ac-pop-up
        class="acs_userAddressPop"
        :pop-data="myPopData"
        @washBtnClick="onWashBtnClick({
            type: USER_ADDRESS_POP,
            data: myPopData
        })"
        @handleClose="handleClose">
        <div class="ac_userAddressPop-body">
            <div class="ac_inform">
                <div class="ac_user">
                    <div class="ac_name">
                        <input type="text" placeholder="姓名" v-model="myPopData.name" />
                    </div>
                    <div class="ac_phone">
                        <input type="text" placeholder="手机号" maxLength="11" v-model="myPopData.phone" />
                    </div>
                </div>
                <div class="ac_area" @click="toggleCityPicker" :class="{'areaColor': !hasNoDefaultAddress}">
                    <input :placeholder="placeholderTxt" readonly type="text">
                    <tuhu-citypicker :show='isShowCityPicker' :formatvalue='formatvalue'></tuhu-citypicker>
                </div>
                <div class="ac_address">
                    <input type="text" placeholder="请输入收货地址" v-model="myPopData.address" />
                </div>
            </div>
        </div>
    </ac-pop-up>
</template>

<script>
import AcPopUp from '../popUp/PopUp';
import PopExtend from '../common/popExtend/PopExtend';
import { USER_ADDRESS_POP } from '../common/constants';

export default {
    name: 'ac-user-address-pop',
    extends: PopExtend,
    components: {
        AcPopUp
    },
    data () {
        return {
            isShowCityPicker: false,
            USER_ADDRESS_POP
        };
    },
    computed: {
        hasNoDefaultAddress () {
            return !((this.myPopData.area || '').trim());
        },
        placeholderTxt () {
            return this.myPopData.area ? this.myPopData.area : '请选择地区';
        }
    },
    methods: {
        toggleCityPicker () {
            this.isShowCityPicker = !this.isShowCityPicker;
        },
        formatvalue (picker, value, displayName) {
            if (displayName[0] !== '请选择') {
                this.myPopData.area = displayName.join(' ');
                this.myPopData = Object.assign({}, this.myPopData, {
                    area: displayName.join(' ')
                });
                return displayName.join(' ');
            }
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_userAddressPop {
    .areaColor {
        input::-webkit-input-placeholder { /* WebKit browsers */
            color: $color3D4;
            font-size: $defaultFontSize;
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: $color3D4;
            font-size: $defaultFontSize;
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: $color3D4;
            font-size: $defaultFontSize;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10+ */
            color: $color3D4;
            font-size: $defaultFontSize;
        }
    }


    .ac_userAddressPop-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 0.75rem;
        font-size: $defaultFontSize;
    }
    .ac_inform{
        width: 100%;
        color:$color3;
        .ac_user{
            display: flex;
            height: 2rem;
            .ac_name,.ac_phone{
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
                    background: url(./imgs/mingzi.png) no-repeat;
                    background-size: contain;
                    width: 0.9rem;
                    height: 0.9rem;
                    top:0.5rem;
                    left: 0;
                }
                &.ac_phone{
                    flex: 1;
                    input{
                        width: 5rem;
                    }
                    &:before{
                        background: url(./imgs/shouji.png) no-repeat;
                        background-size: contain;
                    }
                }
            }

        }
        .ac_area, .ac_address{
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
                background: url(./imgs/location.png) no-repeat;
                background-size: contain;
                width: 0.9rem;
                height: 0.9rem;
                top:0.5rem;
                left: 0;
            }
            &.ac_address{
                &::before{
                    display: none;
                }
            }
            &.ac_area{
                &::after{
                    position: absolute;
                    content: '';
                    background: url(./imgs/arrow.png) no-repeat;
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
