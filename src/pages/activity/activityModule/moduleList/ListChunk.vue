<script>
import AcModuleBase from '../common/moduleBase/ModuleBase';
import {mapData, paramsGrouping, getApiType} from './chunkBase.js';

export default {
    extends: AcModuleBase,
    props: {
        /**
         * 模块列表
         */
        list: {
            type: Array
        }
    },
    data() {
        return {
            myList: null
        };
    },
    methods: {
        /**
         * 初始化数据
         */
        initData() {
            let list = this.list;
            let len = 5;
            let reqList = list.slice(0, len);
            let _list = list.slice(len) || [];

            this.requestQueue(reqList, 5, (mapList) => {
                let _myList = this.myList || [];
                this.myList = _myList.concat(mapList);
            }, (mapList) => {
                let _myList = this.myList || [];
                this.myList = _myList.concat(mapList);
                let count = _list.length > 5 ? Math.ceil(_list.length / 2) : 5;
                this.requestQueue(_list, count, (mapList) => {
                    let _myList = this.myList || [];
                    this.myList = _myList.concat(mapList);
                }, (mapList) => {
                    let _myList = (this.myList || []).concat(mapList);
                    this.myList = _myList; // .concat(_list);
                });
            });
        },
        /**
         * 请求队列
         * @param {Array} list 查询的模块列表
         * @param {Number} size 每次请求数量
         * @param {Function} cb 每组完成后的回调
         * @param {Function} endCb 结束后的回调
         *
         * 开始位置
         */
        requestQueue(list, size, cb, endCb) {
            let _that = this;
            let len = list.length;
            getData(0);
            /**
             * 获取
             * @param {Number} _start 开始位置
             */
            function getData (_start) {
                let res;
                let end = Math.min(_start + size, len);
                if (_start > end) {
                    endCb([]);
                    return;
                }
                let _myList = list.slice(_start, end);
                _that.getData(_myList, (mapList) => {
                    res = res || [];
                    res = res.concat(mapList || []);
                    if (end >= len) {
                        if (endCb instanceof Function) {
                            endCb(res);
                        }
                    } else {
                        if (cb instanceof Function) {
                            cb(res);
                        }
                        getData(end);
                    }
                });
            }
        },
        /**
         * 获取数据
         * @param {Array} list 模块的列表
         * @param {Function} cb 完成后的回调
         */
        getData(list, cb) {
            let apiMap = paramsGrouping(list);
            let apiFnList = this.getApiFnList(apiMap);
            Promise.all(apiFnList)
                .then(backList => {
                    let dataMap = mapData(backList);
                    let _mapList = list.map(item => {
                        let res = item;
                        if (item && item.ModuleId) {
                            let _dataItem = dataMap[item.ModuleId];
                            res = Object.assign({}, item, {
                                _isGet: true,
                                _getData: _dataItem
                            });
                        }
                        return res;
                    });
                    if (cb instanceof Function) {
                        cb(_mapList);
                    }
                });
        },
        /**
         * 获取api调用的列表
         * @param {Object} apiMap api的map
         * @returns {Array}
         */
        getApiFnList(apiMap) {
            let _that = this;
            let res = [];
            if (!apiMap) {
                return res;
            }
            for (const key in apiMap) {
                if (apiMap.hasOwnProperty(key)) {
                    const dataList = apiMap[key];
                    switch (key) {
                        case 'getActivitySecondskill':
                            dataList.forEach(item => {
                                let fn = (function(item) {
                                    return genPromise(() => {
                                        return _that.getActivitySecondskill(item);
                                    }, 'getActivitySecondskill', item);
                                })(item);
                                res.push(fn);
                            });
                            break;
                        case 'getMaintainPricing':
                            dataList.forEach(item => {
                                let fn = (function(item) {
                                    return genPromise(() => {
                                        return _that.getMaintainPricing(item);
                                    }, 'getMaintainPricing', item);
                                })(item);
                                fn && res.push(fn);
                            });
                            break;
                        case 'getMdBrandConfig':
                            dataList.forEach(item => {
                                let fn = (function(item) {
                                    return genPromise(() => {
                                        return _that.getMdBrandConfig(item);
                                    }, 'getMdBrandConfig', item);
                                })(item);
                                fn && res.push(fn);
                            });
                            break;
                        case 'getModuleDetail':
                            let fn = genPromise(() => {
                                return _that.getModuleDetail(dataList);
                            }, 'getModuleDetail');
                            fn && res.push(fn);
                            break;
                        case 'getProductModule':
                            dataList.forEach(item => {
                                let fn = (function(item) {
                                    return genPromise(() => {
                                        return _that.getProductModule(item);
                                    }, 'getProductModule', item);
                                })(item);
                                fn && res.push(fn);
                            });
                            break;
                        case 'getProductPool':
                            let pfn = genPromise(() => {
                                return _that.getProductPool(dataList);
                            }, 'getProductPool');
                            pfn && res.push(pfn);
                            // dataList.forEach(item => {
                            //     let fn = (function(item) {
                            //         return genPromise(() => {
                            //             return _that.getProductPool(item);
                            //         }, 'getProductPool', item);
                            //     })(item);
                            //     fn && res.push(fn);
                            // });
                            break;

                        default:
                            break;
                    }
                }
            }
            return res;

            /**
             * 生成promise
             * @param {Function} fn 函数名
             * @param {String} type 接口类型
             * @param {Array} param 函数名
             * @return {Promise}
             */
            function genPromise(fn, type, param) {
                if (fn instanceof Function) {
                    let apiFn = fn();
                    if (apiFn) {
                        return new Promise((resolve, reject) => {
                            if (apiFn) {
                                apiFn.subscribe(data => {
                                    if (data) {
                                        // if (type) {
                                        //     data._type = type;
                                        // }
                                        if (param) {
                                            data._itemData = param;
                                        }
                                    }
                                    resolve(data);
                                }, err => {
                                    reject(err);
                                });
                            }
                        });
                    }
                }
            }
        }
    }
};
</script>
