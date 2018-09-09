import AcGoodsItem from './goodsItem';

export default {
    install (Vue, options) {
        [
            AcGoodsItem
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
