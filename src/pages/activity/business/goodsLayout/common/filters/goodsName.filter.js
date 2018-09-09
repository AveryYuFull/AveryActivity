/**
 * 商品名称过滤器
 * @param {Object} goodsItemData 商品项数据
 * @export
 * @return {String} 商品名称
 */
export default function filterGoodsName(goodsItemData) {
    let res = '';
    switch (goodsItemData.ProductType+'') { // 0-未知，1-轮胎，2-轮毂，3-服务，4-车品
        case '1': // 轮胎
            res = goodsItemData.Pattern;
            break;
        case '2': // 轮毂
        case '4': // 车品
            res = goodsItemData.ShortTitleAd || goodsItemData.ProductName;
            break;
        default:
            res = goodsItemData.ProductName;
    }
    return res;
}
