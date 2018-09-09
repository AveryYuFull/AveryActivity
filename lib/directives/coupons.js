import coupons from '../components/coupons.vue'
import { setTimeout } from 'timers'
/**
  * author: lijingwen@tuhu.cn
  * date: 2017/12/6
  * desc: 领取优惠券的弹窗
  * demo: v-coupons:1 轮胎列表领取优惠券
<a href="#" v-coupons='couponsData' >弹出商品优惠券</a>
data {
  couponsData: {
    couponsList: [{'GetRuleID': 8810, 'GetRuleGUID': '52a7d77a-d279-48af-b197-e4a7e61de661', 'Minmoney': 999, 'ValiStartDate': '2017-11-21', 'DeadLineDate': null, 'ValiEndDate': '2017-12-31', 'Description': '1114详情页100元轮胎券-到店且在线支付，部分产品不可用', 'PromtionName': '全网轮胎优惠券', 'Discount': 100, 'IsGet': true, 'Term': 0, 'Time': '2017.11.21 - 2017.12.31', 'Rule': '满￥999可用', 'LabelName': '满999减100'}, {'GetRuleID': 8811, 'GetRuleGUID': 'c2df607e-c8ac-48dc-a678-2b8da1457afe', 'Minmoney': 1999, 'ValiStartDate': '2017-11-21', 'DeadLineDate': null, 'ValiEndDate': '2017-12-31', 'Description': '1114详情页200元轮胎券-到店且在线支付，部分产品不可用', 'PromtionName': '全网轮胎优惠券', 'Discount': 200, 'IsGet': false, 'Term': 0, 'Time': '2017.11.21 - 2017.12.31', 'Rule': '满￥1999可用', 'LabelName': '满1999减200'}],
    couponsCallBack: this.couponsCallBack
  }
}
methods: {
  couponsCallBack(value) {
    console.log('couponsCallBack', value)
  }
}
*/
Vue.directive('coupons', {
  inserted: (el, couponsData) => {
    let instance = null
    const replaceEl = $('<div></div>')
    // $(el).after(replaceEl)
    let $content = $('.page-group').eq(tuhu.getParam('_tab') || 0).find('.page-current').last()
    $content.append(replaceEl)
    // let $content = $('.page-current').eq(tuhu.getParam('_tab') || 0).children('._content')
    // let replaceEl = $('<div></div>')
    // $content.append(replaceEl)

    $(el).on('click', (e) => {
      e.stopPropagation()
      if (instance) {
        instance.$children[0].showModal = true
        return
      }
      tuhu.getUserInfo({force: true})
        .then((res) => {
          if (res.islogin) {
            setTimeout(() => {
              instance = new Vue({
                el: replaceEl[0],
                render: createElement => {
                  return createElement(coupons, {
                    props: {
                      showmask: couponsData.value.showmask,
                      couponsCallBack: couponsData.value.couponsCallBack,
                      productId: couponsData.value.productId,
                      type: couponsData.value.type,
                      sort: couponsData.value.sort
                    }
                  })
                }
              })
            }, 300)
          }
        })
    })
  }
})
