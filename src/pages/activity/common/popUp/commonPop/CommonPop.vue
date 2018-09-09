<template>
    <ac-pop-up
        class="acs_commonPop"
        :pop-data="myPopData"
        @shareBtnClick="onShareBtnClick"
        @washBtnClick="onWashBtnClick({
            type: COMMON_POP
        })"
        @handleClose="handleClose">
    </ac-pop-up>
</template>

<script>
import AcPopUp from '../popUp/PopUp';
import PopExtend from '../common/popExtend/PopExtend';
import { COMMON_POP } from '../common/constants';

export default {
    name: 'ac-common-pop',
    extends: PopExtend,
    components: {
        AcPopUp
    },
    data () {
        return {
            COMMON_POP
        };
    }
};
</script>
