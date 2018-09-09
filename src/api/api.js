// export const CASH_HOST = 'http://172.16.24.235:8081'
// export const CASH_HOST = 'https://cashierapi.tuhu.work'
// export const CASH_HOST = 'https://cashierapipre-staging.tuhu.cn'
export const CASH_HOST = 'https://cashierapi.tuhu.cn';

// 获取session
export const getSession = (token) => tuhu.fetch(CASH_HOST + '/cashier/v1/preChecked', {
    method: 'GET',
    headers: {
        'ACCESSTOKEN': token
    }
}, {
    json: false
});

// 收银台列表渲染
export const getCashierData = (params, sessionid) => tuhu.fetch(CASH_HOST + '/cashier/v1/build;jsessionid=' + sessionid, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
}, {
    timeout: 20
});

// 花呗数据接口
export const getCheckData = (params, sessionid) => {
    return tuhu.fetch(CASH_HOST + '/cashier/v1/huabei/order/rate/' + params + ';jsessionid=' + sessionid, {
        method: 'GET'
    }, {
        timeout: 20
    });
};

// 收银台支付接口
export const cashierPay = (params, sessionid) => tuhu.fetch(CASH_HOST + '/cashier/v1/pay;jsessionid=' + sessionid, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
}, {
    timeout: 20
});

// 支付结果查询接口
export const payResult = (param, param2, sessionid) => {
    return tuhu.fetch(CASH_HOST + '/cashier/v1/query/' + param + '/' + param2 + ';jsessionid=' + sessionid, {
        method: 'GET'
    });
};

// 查询支付密码设置状态
export const pwdResult = (params, sessionid) => tuhu.fetch(CASH_HOST + '/cashier/v1/cryptogram/check;jsessionid=' + sessionid, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
});

// 获取手机验证码
export const getPhoneCode = (params, sessionid) => tuhu.fetch(CASH_HOST + '/cashier/v1/sms/send;jsessionid=' + sessionid, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
});

// 设置支付密码
export const setPayPwd = (params, sessionid) => tuhu.fetch(CASH_HOST + '/cashier/v1/cryptogram/set;jsessionid=' + sessionid, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
});

// 重置支付密码
export const resetPayPwd = (params, sessionid) => tuhu.fetch(CASH_HOST + '/cashier/v1/cryptogram/reset;jsessionid=' + sessionid, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
});
