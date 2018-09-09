/**
 * 给数字加前缀
 *
 * @export
 * @param {any} data 返回的数据
 * @param {string} api 返回的数据
 * @returns {boolean}
 */
export default function filterResponseCode(data, api) {
    let res = false;
    let code = '';
    if (data && typeof data.Code !== 'undefined') {
        code = data.Code + '';
    }
    if (code !== '' && api) {
        switch (api) {
            case value:

                break;

            default:
                break;
        }
    } else if (code !== '') {
        if (code !== '0') {
            res = true;
        }
    } else {
        res = true;
    }
    return res;
}
