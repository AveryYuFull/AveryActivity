/**
 * 商品状态
 * @param {Object} goodsItemData 商品项数据
 * @returns {Number} status（2-已售完）
 */
export default function filterStatus(goodsItemData) {
    // let soldOut = goodsItemData.Label === '已抢光' || goodsItemData.Label === '已售罄' ||
    // goodsItemData.Label === '已结束' || goodsItemData.Label === '抢光了' ||
    // goodsItemData.Label === '拼团已结束' || !goodsItemData.Onsale || goodsItemData.LabelClass === 'over';
    // let soldOut = goodsItemData.Label === '已抢光' || goodsItemData.Label === '已售罄' ||
    // goodsItemData.Label === '抢光了' || !goodsItemData.Onsale;
    let soldOut = goodsItemData.ProductStatus+'' === '1';

    return soldOut ? 2 : 1;
}
