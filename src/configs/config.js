const config = {
    apis: {

    },
    pages: {
        '/pages/home/index': {
            title: '活动页',
            vue: require('@/pages/index.vue'),
            notForceLogin: true
        }
    }
};

Object.assign(tuhu.config.pages, config.pages);

export default config;
