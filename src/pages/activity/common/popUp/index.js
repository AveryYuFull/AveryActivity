import AcPopItem from './popItem';

export default {
    install (Vue, options) {
        [
            AcPopItem
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
