import AcSusTip from './SusTip.vue';

export default {
    install (Vue, options) {
        [
            AcSusTip
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
