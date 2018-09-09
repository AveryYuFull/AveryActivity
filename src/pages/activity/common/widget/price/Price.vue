<template>
    <div class="ths_price">
        <!-- <div class="th_price-new"><span class="th_price-icon"></span><span class="th_price-num">{{newPrice}}</span></div> -->
        <div class="th_price-new" v-if="price || (price + '' === '0')" v-html="formatPrice(price)"></div>
        <div class="th_price-old" v-if="oldPrice && (Number(price) < Number(oldPrice))" v-html="formatPrice(oldPrice)"></div>
        <!-- <div class="th_price-old">¥<span class="th_price-linethrough">{{formatPrice(oldPrice)}}</span></div> -->
    </div>
</template>
<script>
export default {
    name: 'ac-price',
    props: {
        /**
         * 价格
         */
        price: {
            // type: Number
            // default: 0
        },
        /**
         * 老的价格
         */
        oldPrice: {
            // type: Number
            // default: 0
        }
    },
    methods: {
        formatPrice(price) {
            let res;
            let filter = Vue.filter('filter_money');
            let _price = filter(price);
            let fix = ((_price||'0')+'').slice(0, 1);
            if (fix === '¥') {
                res = fix + '<span class="th_price-num">' +((_price||'0')+'').slice(1)+ '</span>';
            } else {
                res = '<span class="th_price-num">'+_price+'</span>';
            }
            return res;
        }
    }
};
</script>
<style lang="scss">
@import 'style/_public/_var.scss';
@import 'style/_public/_mixin.scss';
@import 'style/_public/_iconFont.scss';

.ths_price{
    display: flex;
    align-items: baseline;
    padding-top: 3px;
    //子元素
    .th_price-new{
        font-size: $smallFontSize;
        color: $colorRed;
        .th_price-num{
            margin-left:2px;
            font-size: $largeFontSize;
        }
    }
    .th_price-old{
        margin-left:4px;
        font-size: $FontSize10;
        color: $color9;
        position: relative;
        // top: -1px;
        .th_price-num{
            text-decoration: line-through;
        }
    }
}
</style>
