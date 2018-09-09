<template>
    <div class="acs_popFactory">
        <div v-if="popItem"
            :is="popItem"
            :pop-data="myPopData"
            @shareBtnClick="onShareBtnClick"
            @washBtnClick="onWashBtnClick"
            @handleClose="handleClose"></div>
    </div>
</template>

<script>
import PopExtend from '../popExtend/PopExtend';
import { POP_UP_TYPE } from '../constants';
import AcUserAddressPop from '../../userAddressPop/UserAddressPop';
import AcCommonPop from '../../commonPop/CommonPop';
import AcCodePop from '../../codePop/CodePop';

export default {
    extends: PopExtend,
    components: {
        AcUserAddressPop,
        AcCommonPop,
        AcCodePop
    },
    computed: {
        popItem () {
            let res = '';
            const itemType = this.popData ? this.popData.type : '';

            switch (itemType) {
                case POP_UP_TYPE.USER_ADDRESS_POP:
                    res = 'ac-user-address-pop';
                    break;
                case POP_UP_TYPE.COMMON_POP:
                    res = 'ac-common-pop';
                    break;
                case POP_UP_TYPE.CODE_POP:
                    res = 'ac-code-pop';
                    break;
                default:
                    break;
            }
            return res;
        }
    }
    // watch: {
    //     popData (nowVal) {
    //         // console.log('popData watch--->', nowVal);
    //     }
    // }
};
</script>
