<template>
    <ac-ernie-tip-msg
        :tip-msg='tipMsg'>
    </ac-ernie-tip-msg>
</template>

<script>
import AcErnieTipMsg from './ErnieTipMsg';
import { DISPLAY_STATUS } from '../../common/constant.js';

export default {
    components: {
        AcErnieTipMsg
    },
    props: {
        data: {
            type: Object
        }
    },
    data () {
        return {
            myData: this.data
        };
    },
    computed: {
        /**
         * 提示文本的设置
         * @returns {String} 提示信息的html文本
         */
        tipMsg () {
            let tipMessage = '';
            let myData = this.myData;
            if (myData) {
                let display = myData.display;
                if (myData.draw - 0 === 0 && display === DISPLAY_STATUS.START) {
                    tipMessage = `<span>今日还剩<span class='num'>${myData.times || 0}</span>次抽奖机会</span>`;
                } else if (myData.draw - 0 === 1 && display === DISPLAY_STATUS.SHARE) {
                    tipMessage = `<span>分享后还可再抽<span class='num'>${myData.shareTimes || 0}</span>次<br/>点击右上角分享再玩一次</span>`;
                } else if (display === DISPLAY_STATUS.NO_LOGIN) {
                    tipMessage = `<span>请先登录</span>`;
                } else if (display === DISPLAY_STATUS.NO_TIMES || display === DISPLAY_STATUS.SHARE_NO_APP) {
                    tipMessage = `<span>机会用光了，请明天再来</span>`;
                } else if (display === DISPLAY_STATUS.NO_ADDRESS) {
                    tipMessage = `<span>请摇动摇杆领取您的实物奖励</span>`;
                }
            }
            return tipMessage;
        }
    },
    watch: {
        data (nowVal) {
            this.myData = nowVal;
        }
    }
};
</script>
