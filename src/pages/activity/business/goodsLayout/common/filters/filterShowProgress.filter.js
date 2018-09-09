/**
 * 是否显示进度条
 * @param {Object} goodsItemData 商品项数据
 * @param {Number} col 展示行数
 * @return {Boolean} 是否显示进度条
 */
export default function filterShowProgress(goodsItemData, col) {
    let res = (col+'' !== '3') && goodsItemData.IsProgressBar;
    return res;
}
