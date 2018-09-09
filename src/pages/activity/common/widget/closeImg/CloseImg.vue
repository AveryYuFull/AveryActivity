<template>
    <!-- <img class="acs_closeImg"
        :src="data"
        alt=''
        @click="handleClose" /> -->
      <ac-img-box class="acs_closeImg" :imgUrl="data" alt='' @click="handleClose"></ac-img-box>
</template>

<script>
import closeImg from './imgs/close_copy.png';

export default {
    name: 'ac-close-img',
    props: {
        data: {
            type: String,
            default: closeImg
        }
    },
    methods: {
        handleClose () {
            this.$emit('handleClose');
        }
    }
};
</script>

<style lang="scss">
.acs_closeImg {
    width: 25px;
    height: 25px;
}
</style>
