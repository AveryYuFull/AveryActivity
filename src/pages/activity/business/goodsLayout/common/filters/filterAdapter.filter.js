/**
 * 是否展示适配角标
 * @param {Object} goodsItemData 商品项数据
 * @param {Object} activityInfo 活动信息
 * @return {Boolean} 是否展示适配角标
 */
export default function filterAdapter(goodsItemData, activityInfo) {
    const tags = goodsItemData.Tabs;
    const innerShow = tags && tags.some((goodsItemData) => {
        return goodsItemData.Tab === '适配';
    });
    return activityInfo.IsShowAdapter && innerShow;
}
