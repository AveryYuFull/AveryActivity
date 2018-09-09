<template>
    <ac-loading
        :isLoading="isLoading"
        :noActivity="noActivity"
        :loadingImg="loadingImg"
        :errImg="errImg"
        :endImg="endImg"
        @click="click"></ac-loading>
</template>

<script>
const COMPONENT_NAME = 'ac-loading-container';

// 加载的图片
const LOADING_IMG = 'https://res.tuhu.org/Activity/dist/img/car.gif';
// 错误图片
const ERROR_IMG = 'https://res.tuhu.org/Activity/dist/img/error.jpg';
// 没有活动的图片
const END_IMG = 'https://res.tuhu.org/Activity/dist/img/end.png';

export default {
    name: COMPONENT_NAME,
    props: {
        isLoading: {
            type: Boolean,
            default: true
        },
        noActivity: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            loadingImg: LOADING_IMG,
            errImg: ERROR_IMG,
            endImg: END_IMG
        };
    },
    methods: {
        click () {
            location.reload();
        }
    }
};
</script>

