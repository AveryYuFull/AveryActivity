/* eslint-disable max-lines */
/** 基础样式 勿删 */
import '../static/css/sm.css';
/** sm.js 勿删 */
import '../static/js/sm.js';
/** 基础API 勿删 */
import '../lib/commons/tuhu';

import layout from './pages/common/layout.vue';

import 'style/index.scss';

// polyfills
import 'core-js/es6/object';
import 'core-js/es6/array';
import 'core-js/es6/string';
import 'core-js/es7/object';
import 'core-js/es7/array';
import 'core-js/es7/string';

import { StorageClient } from 'tiger-lib';
import { TTag, TButton } from 'tiger-ui';
import { envFactory } from './commons/envService/EnvService';
import { httpFactory } from './commons/httpClient/HttpClient';
import { titleFactory } from './commons/title/Title';
import filterResponseCode from './commons/filter/filterResponseCode.filter';
import Util from '../lib/commons/util';
// // 添加请求拦截器
// $http.axios.interceptors.request.use(function (config) {
// // 在发送请求之前做些什么
//     return config;
// }, function (error) {
// // 对请求错误做些什么
//     return Promise.reject(error);
// });

// // 添加响应拦截器
// $http.axios.interceptors.response.use(function (response) {
// // 对响应数据做点什么
//     return response;
// }, function (error) {
// // 对响应错误做点什么
//     return Promise.reject(error);
// });
/** 系统组件 根据需要自行删除不需要的组件 */
import search from '../lib/components/search.vue';
// import tabs from '../lib/components/tabs.vue'
import panel from '../lib/components/panel.vue';
// import checkbox from '../lib/components/checkbox.vue'
// import infinite from '../lib/components/infinite.vue'
import picker from '../lib/components/picker.vue';
// import popup from '../lib/components/popup.vue'
// import refresh from '../lib/components/refresh.vue'
import swiper from '../lib/components/swiper.vue';
import scroller from '../lib/components/scroller.vue';
// import calendar from '../lib/components/calendar.vue'
// import comments from '../lib/components/comments.vue'

// 张萍UI组件库
// import swipeout from '../lib/components/swipeout.vue'
// import tabsnew from '../lib/components/tabsnew.vue'
// import dialog from '../lib/components/dialog.vue'
// import switchbutton from '../lib/components/switchbutton.vue'
// import tabbar from '../lib/components/tabbar.vue'
// import linenumber from '../lib/components/linenumber.vue'
// import rater from '../lib/components/rater.vue'
// import bigrater from '../lib/components/bigrater.vue'
// import processline from '../lib/components/processline.vue'
// import orderprocess from '../lib/components/orderprocess.vue'
// import logistics from '../lib/components/logistics.vue'
// import settlelist from '../lib/components/settlelist.vue'
// import iconlist from '../lib/components/iconlist.vue'
// import productarea from '../lib/components/productarea.vue'
// import itemjump from '../lib/components/itemjump.vue'
// import condition from '../lib/components/condition.vue'
// import recommendtab from '../lib/components/recommendtab.vue'
// import commenttab from '../lib/components/commenttab.vue'
// import scoretab from '../lib/components/scoretab.vue'
// import select from '../lib/components/select.vue'
// import businessBtn from '../lib/components/businessBtn.vue'
// import buttons from '../lib/components/buttons.vue'
// import numberhasbg from '../lib/components/numberhasbg.vue'
// import gotop from '../lib/components/gotop.vue'
// import sortTabs from '../lib/components/sortTabs.vue'
// import namephone from '../lib/components/namephone.vue'
import citypicker from '../lib/components/citypicker.vue';
import store from './store';
import './commons/navigate';

/* main.js cashier css import */
import './css/reset.css';
import './configs/config';

Vue.component('tuhu-picker', picker);
Vue.component('tuhu-panel', panel);
Vue.component('tuhu-search', search);
Vue.component('tuhu-scroller', scroller);
Vue.component('tuhu-citypicker', citypicker);
Vue.component('tuhu-swiper', swiper);

[
    TTag,
    TButton
].forEach(item => {
    Vue.use(item);
});

let $tuhu = {
    /**
     * 与Android原生交互
     * @param {String} type 类型
     * @param {Object} args 参数对象
     * @returns {*} 返回请求数据
     */
    actionWidthAndroid(type, args = {}) {
        const callback = args.callback;
        if (callback) {
            delete args.callback;
        }

        /** if ($.isEmptyObject(args)) {
             return window.WebViewJavascriptBridge.callHandler(type, {
            param: ''
            }, callback)
        } */

        return window.WebViewJavascriptBridge
            .callHandler(type, encodeURIComponent(encodeURIComponent(JSON.stringify(args))), callback);
    },
    apiFilter(...args) {
        return tuhu.config.apiFilter(...args);
    },
    toast(...args) {
        return tuhu.toast(...args);
    },
    getParam(...args) {
        return tuhu.getParam(...args);
    },
    getDeviceDetail() {
        return tuhu.getDeviceDetail();
    },
    getUserInfo(...args) {
        return tuhu.getUserInfo(...args);
    },
    getUuid() {
        return Util.uuid();
    },
    device() {
        return tuhu.device;
    },
    getDefaultCar (...args) {
        return tuhu.getDefaultCar(...args);
    },
    alert (...args) {
        return tuhu.alert(...args);
    },
    appShare (...args) {
        return tuhu.appShare(...args);
    },
    sharePanel (...args) {
        return tuhu.sharePanel(...args);
    },
    actionWithNative(...args) {
        return tuhu.actionWithNative(...args);
    },
    selectCar(...args) {
        return tuhu.selectCar(...args);
    },
    getScrollId() {
        return tuhu.util.getScrollId();
    },
    /**
     * 显示loading框
     * @returns {*} 显示loading弹窗方法
     */
    showIndicator () {
        return tuhu.showIndicator();
    },
    /**
     * 关闭loading
     * @returns {*} 关闭loading弹窗方法
     */
    hideIndicator () {
        return tuhu.hideIndicator();
    },
    /**
     * 跳转链接
     * @param {Object} itemData 跳转参数
     * @param {String} itemData.appLink 跳转app链接
     * @param {String} itemData.h5Link 跳转h5链接
     */
    toUrl(itemData) {
        const _that = this;
        if (!itemData || (!itemData.appLink && !itemData.h5Link)) {
            return;
        }
        const isApp = _that.device().isApp;
        const tuhuAndroid = _that.device().tuhuAndroid;
        const tuhuIos = _that.device().tuhuIos;

        let url = decodeURIComponent(isApp ? itemData.appLink : itemData.h5Link);
        url = url || itemData.h5Link;
        url = handleUrl(url);
        url = handleAppUrl(url);

        url && (location.href = url);

        /**
         * 活动页链接中包含的参数键值对，其键与活动页中链接类型模块配置中返回的占位符的值相同时，替换占位符
         * @param {String} url 跳转链接
         * @returns {String} 返回新的跳转链接
         */
        function handleUrl (url) {
            if (url) {
                let splicingParams = url.match(/{{\s*[a-zA-Z0-9]+\s*}}/g);

                splicingParams && splicingParams.forEach((item, index) => {
                    item = item.replace(/{{|}}/g, '').trim();
                    if (item && _that.getParam(item)) {
                        url = url.replace(new RegExp(`=\\s*{{\\s*${item}\\s*}}`), `=${_that.getParam(item)}`);
                    }
                });
            }
            return url;
        }

        /**
         * 处理app链接
         * @param {String} url 跳转链接
         * @returns {String} 返回新的跳转链接
         */
        function handleAppUrl (url) {
            if (url && isApp) {
                if (url.includes('/webView?url=')) {
                    let webViewUrl = decodeURIComponent(url).split('/webView?url=')[1];
                    let navHidden = '';
                    if (webViewUrl.includes('&navHidden=1')) {
                        navHidden = 'navHidden=1&';
                        webViewUrl = webViewUrl.substring(0, webViewUrl.indexOf('&navHidden=1'));
                    }
                    url = 'tuhu:/webView?' + navHidden + 'url=' +
                        tuhuAndroid ? encodeURIComponent(encodeURIComponent(webViewUrl)) : encodeURIComponent(webViewUrl);
                } else {
                    url = 'tuhu:' + url;
                }
            }
            return url;
        }
    }
};
let $storage = StorageClient();
let $env = envFactory(); // 环境变量
let $title = titleFactory({
    title: '活动页'
}); // 环境变量

// 请求的loading配置
let loading; // 加载框
let loadingtimeout; // 加载定时
let loadingArr = []; // 加载队列
let $http = httpFactory({
    isErrorData: true,
    headers: {
        deviceId: $tuhu.getUuid()
    }
}, {
    /**
     * URL过滤器
     * @param {String} url url地址
     * @return {String} 过滤后的地址
     */
    apiServerFilter(url) {
        url = $tuhu.apiFilter(url);
        return url;
    },
    beforeSend(options) { // 开始请求前
        options = options || {};
        if (options && options.isLoading) {
            loadingArr.push(1);
            if (loadingArr.length === 1) {
                if (typeof loadingtimeout !== 'undefined') {
                    clearTimeout(loadingtimeout);
                    loadingtimeout = undefined;
                }
                loadingtimeout = setTimeout(() => {
                    loadingtimeout = undefined;
                    // loading= Loading.service({
                    //     lock: true,
                    //     text: '数据加载中，请稍候。。。',
                    //     // spinner: 'el-icon-loading',
                    //     background: 'rgba(0, 0, 0, 0.1)'
                    // });
                }, 200);
            }
        }
        if (options.data instanceof FormData) {
            // options.data.append('channel', 'kH5');
        } else if (options.data) {
            options.data = Object.assign({
                channel: 'kH5'
            }, options.data);
        }
        return options;
    },
    onHttpError(err, url) { // 请求出错
        if (err) {
            let errInfo = 'err：' + err.message;
            if (err.response && err.response.status) {
                errInfo = err.message + '：\n' + url;
            }
            // errorMsg(errInfo);
        }
    },
    onServiceError(data) { // 业务出错
        let _data = data;
        let _rMessage = _data && _data.Message;
        // if (filterResponseCode(_data)) { // 不处理的错误码
        //     return _data;
        // } else {
        //     $tuhu.toast(_rMessage);
        //     // errorMsg(_rMessage);
        // }
        return _data;
    },
    afterSend(options) { // 请求结束后
        if (options && options.isLoading) {
            loadingArr.pop();
            if (loadingArr.length <= 0) {
                if (typeof loadingtimeout !== 'undefined') {
                    clearTimeout(loadingtimeout);
                    loadingtimeout = undefined;
                }
                // loading && loading.close();
                loading = undefined;
            }
        }
    }
}, $env, $storage);

Vue.prototype.$env = $env;
Vue.prototype.$http = $http;
Vue.prototype.$title = $title;
Vue.prototype.$filterResponseCode = filterResponseCode;
Vue.prototype.$tuhu = $tuhu;

// vue-touch 组件 https://github.com/vuejs/vue-touch/tree/next
var VueTouch = require('vue-touch');

// /** 监听web-view切换 勿删 */
window.webview_reactive = () => {

};

/** 加载layout */
tuhu.store = store;

tuhu.store.registerModule('cashier', {
    namespaced: true,
    state: {
        jsessionid: '',
        cashData: []
    },
    mutations: {
        setJsessionid(state, payload = String) {
            payload && (state.jsessionid = payload);
        },
        setCashData(state, payload = Array) {
            payload && (state.cashData = payload);
        }
    }
});

new Vue({
    el: $('#root')[0],
    mounted() {

    },
    render: h => {
        return h(layout);
    }
});
if (tuhu.getParam('_channel') === 'xiaomi') {
    $(document.body).height(window.innerHeight);
}

/** 自己控制初始化路由 */
const url = tuhu.getPath(location.href);
tuhu.redirectTo({
    url: url,
    query: tuhu.getParams()
});

if (tuhu.getParam('_channel') === 'xiaomi') {
    $(document.body).height(window.innerHeight);
}

$('#tuhuloadmore').hide();
