
/**
 * 商品名称过滤器
 * @param {Object} goodsItemData 商品项数据
 * @param {Number} col 一行col列
 * @param {String} templateType 模板类型
 * @export
 * @return {Array} tags
 */
export default function filterTagList(goodsItemData, col, templateType) {
    let res = null;
    if (!goodsItemData || !col || !templateType) {
        return res;
    }

    // 直降xxx
    const oldPrice = goodsItemData.MarketingPrice;
    const newPrice = goodsItemData.Price;
    const price = subtract(oldPrice, newPrice);
    if (price > 0) {
        res = res || [];
        // let filter = Vue.filter('filter_money');
        // let price = filter(_price, '1.0-2');
        // price = ((price||'0')+'').slice(1);
        ;
        res.push({styleType: 1, nameText: `直降${price}`});
    }
    // }

    // 接口返回的Tabs
    let tabs = goodsItemData.Tabs;
    if ((tabs instanceof Array) && tabs.length > 0) {
        res = res || [];
        res = res.concat(tabs);
        // tabs.
    }

    // 1列最多显示3个标签；3列最多显示一个标签；2列完整版且有进度条时最多显示1个标签，其余最多显示3个标签
    if (res) {
        switch (col) {
            case 1:
                res.slice(3);
                break;
            case 2:
                if (templateType === 'Complete' && goodsItemData.IsProgressBar) {
                    res.splice(1);
                } else {
                    res.splice(3);
                }
                break;
            case 3:
                res.splice(1);
                break;
        }
    }

    // 促销语（只有一列完整版，才需要把促销语写在tabs里）
    if (templateType === 'Complete' && col+'' === '1') {
        let promotionalAd = goodsItemData.PromotionalAd;
        if (promotionalAd) {
            res = res || [];
            res.push({styleType: 0, nameText: promotionalAd});
        }
    }
    if (tabs && (!res || res.length <=0)) {
        res = [{
            styleType: 0,
            nameText: ''
        }];
    }
    return res;
}
/**
 * 过滤价格
 * @param {Number} num1 price
 * @param {Number} num2 oldPrice
 * @returns {Number} 差
 */
function subtract (num1 = '', num2 = '') {
    num1 = num1 || '';
    num2 = num2 || '';
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (Math.round(num1 * baseNum) - Math.round(num2 * baseNum)) / baseNum;
}
