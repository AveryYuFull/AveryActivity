import AcGoodsListLevel from './goodsListLevel';
import AcGoodsListCol1 from './goodsListCol1';
import AcGoodsListCol2 from './goodsListCol2';
import AcGoodsListCol3 from './goodsListCol3';

export default {
    install (Vue, options) {
        [
            AcGoodsListLevel,
            AcGoodsListCol1,
            AcGoodsListCol2,
            AcGoodsListCol3
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
