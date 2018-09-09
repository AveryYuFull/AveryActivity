<template>
    <div class='acs_swiper-slide' @click="$emit('click', $event)">
        <ac-img-box :imgUrl='slideCoupons.Image'></ac-img-box>
    </div>
</template>
<script>
export default {
    name: 'ac-slide-box',
    props: {
        slideCoupons: {
            type: Object
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_swiper-slide {
    display: inline-block;
    text-align: center;
    margin-right: 5px;
    img {
        width: 100%;
    }
    &:last-child {
        margin-right: 15px;
    }
}

</style>
