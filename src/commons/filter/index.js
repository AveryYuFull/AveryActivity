import filterPrefixInt from './filterPrefixInt.filter.js';
import filterNumber from './filterNumber.filter.js';
import filterMoney from './filterMoney.filter.js';

export default {
    install(Vue) {
        Vue.filter('filter_prefixInt', filterPrefixInt);
        Vue.filter('filter_number', filterNumber);
        Vue.filter('filter_money', filterMoney);
    }
};
