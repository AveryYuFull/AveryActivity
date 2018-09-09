<template>
    <div class="acs_ernieMachine">
        <div class="ac_ernieMachine-imgs"
            :style="{ 'background': `url(${myImgs}) no-repeat center / contain` }">
            <slot></slot>    
        </div>
    </div>
</template>

<script>
import ernieImg from './imgs/slotMachine.png';

const COMPONENT_NAME = 'ac-ernie-machine';

export default {
    name: COMPONENT_NAME,
    props: {
        imgs: {
            type: String,
            default: ernieImg
        }
    },
    data () {
        return {
            myImgs: this.imgs || ernieImg
        };
    },
    watch: {
        imgs (nowVal) {
            this.myImgs = nowVal || ernieImg;
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

// position: relative;
//                 height: 75%;
//                 width: 250px;
//                 right: 20px;
.acs_ernieMachine {
    height: 200px;
    width: 250px;
    .ac_ernieMachine-imgs {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
