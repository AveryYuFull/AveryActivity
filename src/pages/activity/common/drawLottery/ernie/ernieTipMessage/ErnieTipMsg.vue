<template>
    <div class='acs_ErnieTipMsg'
        v-html="myTipMsg"
        v-if="myTipMsg">
    </div>
</template>

<script>
export default {
    props: {
        tipMsg: {
            type: String,
            default: '今日剩<span class="num">18</span>次抽奖机会'
        }
    },
    data () {
        return {
            myTipMsg: this.tipMsg
        };
    },
    watch: {
        tipMsg (newVal) {
            this.myTipMsg = newVal;
        }
    }
};
</script>

<style lang='scss'>
.acs_ErnieTipMsg {
    padding: 10px 10px 5px 0;
    color: #400001;
    font-weight: bold;
    text-align: right;
    max-width: 200px;
    font-size: 15px;
    line-height: 20px;
    .num {
        font-family: ac-alpha;
        font-size: 20px;
        padding: 0 10px;
    }
}
</style>
