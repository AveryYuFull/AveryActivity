<template>
    <ae-animation-content v-if="imgUrl" :imgUrl="imgUrl"></ae-animation-content>
</template>

<script>
const COMPONENT_NAME = 'ac-ae-animation';

export default {
    name: COMPONENT_NAME,
    props: {
        imgUrl: {
            type: String
        }
    },
    components: {
        AeAnimationContent: () => import('../aeAnimationContent/AeAnimationContent')
    },
    methods: {
        click () {
            this.$emit('click');
        }
    }
};
</script>
<style lang="scss">
// 去多余的边距
.acs_aeAnimation{
    display: inline-block;
    vertical-align: middle;
    svg{
        display: inline-block;
        vertical-align: middle;
    }
}
</style>

