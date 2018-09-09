import AcGoodsList from './goodsList';
import AcGoodsListwidget from './common/goodsListWidget';

export default {
    install (Vue, options) {
        [
            AcGoodsList,
            AcGoodsListwidget
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
