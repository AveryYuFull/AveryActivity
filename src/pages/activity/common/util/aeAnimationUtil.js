import lottie from 'lottie-web';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

class AeAnimationUtil {
    /**
     * 解析ae动画
     * @param {*} fileUrl 文件地址
     * @param {*} container 容器dom对象
     * @param {*} $tuhu tuhu类库对象
     */
    static handleAEAnimation (fileUrl, container, $tuhu) {
        const aeAnimationUtil = new AeAnimationUtil($tuhu);
        aeAnimationUtil.handleAEImg(fileUrl, container);
    }

    /**
     * 解析ae动画
     * @param {String} fileUrl ae动画文件地址
     * @param {Dom} container 渲染动画的dom元素
     */
    handleAEImg (fileUrl, container) {
        if (!fileUrl || !container) {
            return;
        }

        if (fileUrl.endsWith('.json')) {
            this.loadAnimation({
                container: container,
                isFile: true,
                path: fileUrl
            });
        } else if (fileUrl.endsWith('.zip')) {
            this.parseZipFile(fileUrl, container);
        }
    }

    constructor ($tuhu) {
        this.$tuhu = $tuhu;
    }
    /**
     * 渲染AE动画到dom元素中
     * @param {Object} data 动画数据
     */
    loadAnimation (data) {
        /**
         * wrapper为要出现动画的DOM，path为汇出的json档位置。
         */
        let animData = {
            container: data.container, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true
        };
        if (data.isFile) {
            animData.path = data.path;
        } else {
            animData.animationData = data.animationData;
        }
        lottie.loadAnimation(animData);
    }

    /**
     * 设置flag标志，如果全部完成就设置全部为true
     * @param {Dom} container 需要渲染动画的dom对象
     * @param {Array} fileFlag 标志数组
     * @param {Number} index 索引
     * @param {Array} imageArr 图片数组对象
     * @param {String} jsonData json对象内容
     */
    setFlag (container, fileFlag, index, imageArr, jsonData) {
        fileFlag[index] = true;
        if (fileFlag.indexOf(false) < 0) {
            // 如果ae动画解析完毕，就会执行改回调进行渲染
            imageArr.forEach(item => {
                let name = item.name;
                let value = item.value;
                let nameArr = name.split('/');
                for (let i = 0; i < nameArr.length - 1; i++) {
                    let regExp = new RegExp(`${nameArr[i]}\\/`, 'g');
                    jsonData = jsonData.replace(regExp, '');
                }

                let regExpVal = new RegExp(`${nameArr[nameArr.length - 1]}`, 'g');
                jsonData = jsonData.replace(regExpVal, value);
            });
            this.loadAnimation({
                container: container,
                animationData: jsonData ? JSON.parse(jsonData) : {}
            });
        }
    }

    /**
     * 解析zip文件
     * @param {String} url zip文件的地址
     * @param {Dom} container dom 对象
     */
    parseZipFile (url, container) {
        let jsonData = ''; // 存储zip文件中的json文件内容
        let imageArr = []; // 存储zip文件中图片内容
        let fileFlag = []; // 一个存储文件内容是否解析完了的flag（默认值是false， 如果文件解析完了就设置改flag为true）

        new JSZip.external.Promise(function (resolve, reject) {
            JSZipUtils.getBinaryContent(url, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }).then(JSZip.loadAsync).then(zip => {
            zip.files = zip.files || {};
            fileFlag = new Array(Object.keys(zip.files).length).fill(false);
            Object.keys(zip.files).forEach((key, index) => {
                if (!(key.indexOf('__MACOSX') === 0)) {
                    if (key.endsWith('.json')) {
                        ((index) => {
                            zip.file(key).async('string').then((text) => {
                                jsonData = text;
                                this.setFlag(container, fileFlag, index, imageArr, jsonData);
                            });
                        })(index);
                    } else if (key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg')) {
                        ((index) => {
                            zip.file(key).async('base64').then((text) => {
                                text = 'data:image/png;base64,' + text;
                                imageArr.push({
                                    name: key,
                                    value: text
                                });
                                this.setFlag(container, fileFlag, index, imageArr, jsonData);
                            });
                        })(index);
                    } else {
                        this.setFlag(container, fileFlag, index, imageArr, jsonData);
                    }
                } else {
                    this.setFlag(container, fileFlag, index, imageArr, jsonData);
                }
            });
        }).catch(err => {
            this.$tuhu && this.$tuhu.toast('AE图片解析错误');
            throw err;
        });
    }
};

export default AeAnimationUtil;