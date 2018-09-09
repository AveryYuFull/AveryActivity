import AcGoodsItemBase from './goodsItemBase';
import AcGoodsItemBaseLevel from './goodsItemBaseLevel';
import AcGoodsItemBtn from './goodsItemBtn';
import AcGoodsItemBtnLevel from './goodsItemBtnLevel';
import AcGoodsItemFull from './goodsItemFull';
import AcGoodsItemFullLevel from './goodsItemFullLevel';
import AcGoodsItemTag from './goodsItemTag';
import AcGoodsItemTagLevel from './goodsItemTagLevel';

export default {
    install (Vue, options) {
        [
            AcGoodsItemBase,
            AcGoodsItemBaseLevel,
            AcGoodsItemBtn,
            AcGoodsItemBtnLevel,
            AcGoodsItemFull,
            AcGoodsItemFullLevel,
            AcGoodsItemTag,
            AcGoodsItemTagLevel
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
