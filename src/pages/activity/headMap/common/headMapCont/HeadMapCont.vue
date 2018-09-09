<template>
    <div class="acs_generalPage" @click="click">
        <template v-if="imageDynamic">
            <ac-ae-animation
                :img-url="imageDynamic">
            </ac-ae-animation>
        </template>
        <template v-else>
            <ac-img-box v-if="imgUrl" :imgUrl="imgUrl"></ac-img-box>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        imgUrl: {
            type: String
        },
        imageDynamic: {
            type: String
        }
    },
    methods: {
        click (evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
