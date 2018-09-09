<template>
    <div class="acs_play" @click="click">
        <div class='ac_play_icon'></div>
    </div>
</template>
<script>
export default {
    name: 'ac-play-btn',
    methods: {
        click(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_play {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 4px solid $brf_5;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    // margin: -25px 0 0  -25px;
    // top: 0;
    // bottom: 0;
    // margin: auto;
    z-index: 9;
    .ac_play_icon {
        width: 0;
        height: 0;
        border-top: 15px solid transparent;
        border-left: 20px solid $brf_5;
        border-bottom: 15px solid transparent;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-33%,-50%);
        // margin-top: 6px;
        // margin-left: 15px;
    }
}

</style>
