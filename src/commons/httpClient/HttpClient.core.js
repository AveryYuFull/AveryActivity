import axios from 'axios';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators'; // 'rxjs/add/operator/publishReplay';

import { HttpCache } from './HttpCache';

export class HttpClientCore {
    constructor(option, config, $env, $storage) {
        this.defalutOptions = option;
        this.config = config;
        this.$httpCache = new HttpCache($storage);
        // this.axios = axios;
        // this._axios = axios.create(Object.assign({
        //     withCredentials: true,
        //     headers: { 'Content-type': 'application/json' }
        // }, option));
        this.axios = tuhu.fetch;
        this._axios = tuhu.fetch;
        this._jsonp = tuhu.fetchJsonp;
        this.$env = $env;
    }
    /**
     * 发送请求
     * @param {*} url api url
     * @param {*} options 选项
     * @returns {Observable<object>}
     */
    send(url, options) {
        options = options || {};
        let config = this.config || {};
        let self = this;
        let defalutOptions = this.defalutOptions;
        let _url = self.getApiUrl(options && options.apiServer, url);
        // if (config.apiServerFilter instanceof Function) { // 过滤url的过滤器
        //     _url = config.apiServerFilter(_url);
        // }
        let cacheOptions = self.getCacheOption(url, options);
        options.cacheData && delete options.cacheData;

        // 删除选项中的apiServer的key
        delete options.apiServer;

        // 发送请求
        let res;
        let _axios = Observable.create((observer) => {
            if (config.beforeSend instanceof Function) {
                let tempOption = config.beforeSend(options);
                if (tempOption !== false && typeof tempOption !== 'undefined') {
                    options = tempOption;
                }
            }
            if (options && options.data) {
                if (options.data instanceof FormData) {
                    options.body = options.data;
                } else {
                    options.headers = Object.assign({
                        'content-type': 'application/json'
                    }, options.headers);
                    if (options.data instanceof Object) {
                        options.body = JSON.stringify(options.data);
                    } else if (options.data) {
                        options.body = options.data;
                    }
                }
            }
            if (defalutOptions && defalutOptions.headers) {
                options.headers = Object.assign({}, defalutOptions.headers, options.headers);
            }
            let q;
            if (options.dataType === 'jsonp') {
                q = self._jsonp(_url + options.params);
            } else {
                q = self._axios(_url, options, {
                    session: true,
                    query: options.params,
                    status: options.isLoading,
                    timeout: 60 * 60 * 5
                });
            }
            q.then(back => {
                let data = back;
                if (back && back.json instanceof Function) { // 兼容fetch
                    data = {
                        data: back.json()
                    };
                } else if (!back.data) { // 兼容tuhu.fetch
                    data = {
                        data: back
                    };
                }
                if (config && config.afterSend instanceof Function) {
                    config.afterSend(options);
                }
                if (data && data.data instanceof Promise) {
                    data.data.then(_data => {
                        let food = {
                            data: _data
                        };
                        observer.next(food);
                        observer.complete();
                    }, _err => {
                        observer.error(_err);
                        observer.complete();
                        if (config && config.afterSend instanceof Function) {
                            config.afterSend(options);
                        }
                    });
                } else {
                    observer.next(data);
                    observer.complete();
                }
            }, err => {
                observer.error(err);
                observer.complete();
                if (config && config.afterSend instanceof Function) {
                    config.afterSend(options);
                }
            });
        }).pipe(publishReplay(), refCount());

        // 缓存
        res = self.cacheData(_axios, cacheOptions);

        return res;
    }

    /**
   * 获取api链接
   * @param {*} apiServer api服务器key
   * @param {*} api api
   * @returns {string}
   */
    getApiUrl(apiServer, api) {
        let server = '';
        let res = api || '';
        let config = this.config || {};

        if (!/^\s*(https?:|\/\/)/.test(res)) { // 没有加协议的才可以拼接
            apiServer = (apiServer || 'apiServer') + '';
            if (apiServer) {
                server = this.$env[apiServer] || '';
            }

            res = server + res + '';
        }
        if (config.apiServerFilter instanceof Function) { // 过滤url的过滤器
            res = config.apiServerFilter(res);
        }
        return res;
    }

    /**
   * 获取缓存参数
   *
   * @param {String} url 请求地址
   * @param {Object} options 请求选项
   * @returns {Object|undefined}
   * @memberof HttpClient
   */
    getCacheOption(url, options) {
        let res;
        // 设置缓存
        let cacheData = options && options.cacheData;
        if (url && cacheData) {
            res = {
                cacheKey: url
            };
            if (cacheData instanceof Object) {
                res = Object.assign(res, cacheData);
            }
        }
        return res;
    }
    /**
   * 设置数据缓存
   *
   * @param {Observable<object>} obs 请求的Observable
   * @param {object} options 缓存选项
   * @returns {Observable<object>}
   * @memberof HttpClient
   */
    cacheData(obs, options) {
        let self = this;
        let res;
        // 缓存数据
        if (self.$httpCache instanceof Object) {
            res = self.$httpCache.cacheData(() => {
                return obs;
            }, options, back => { // 过滤缓存数据（返回数据不为undefined的数据则会缓存）
                let _tempData = back && back.data;
                if (_tempData instanceof Object) {
                    // 缓存接口数据
                    if (_tempData.success === true || _tempData.status === true || _tempData.Code + '' === '1') {
                        return _tempData;
                    }
                }
            });
        } else {
            res = obs;
        }
        return res;
    }
}
