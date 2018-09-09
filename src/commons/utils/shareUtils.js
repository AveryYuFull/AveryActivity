/**
 * 分享
 */
class Share {
    static share (params) {
        const share = new Share(params);
        share.doShare();
    }

    constructor(params = {}) {
        this.params = params;
    }

    shareAndroid () {
        const params = {};
        const data = this.params;

        params.Description = data.ShareDescribe;
        params.Title = data.ShareTitle;
        params.Picture = data.ShareImgUrl;
        params.Url = data.ShareLink;
        params.MiniProgramPath = data.ShareSmallLink || '';
        params.HdImageData = data.ShareSmallImgUrl || '';

        this.$tuhu.actionWithNative('share', params);
    }

    shareIos () {
        const data = this.params;
        const params = {};
        const iosParam = [];
        const types = [1, 2, 4, 8, 16, 32];
        const param = {
            channel: 1,
            type: 0,
            url: data.ShareLink,
            content: data.ShareDescribe,
            title: data.ShareTitle,
            imageURL: data.ShareImgUrl,
            image: ''
        };

        types.forEach((type) => {
            if (type === 1) {
                iosParam.push(Object.assign({}, param, {
                    type: 3,
                    MiniProgramPath: data.ShareSmallLink || '',
                    HdImageData: data.ShareSmallImgUrl || ''
                }));
            } else {
                iosParam.push(Object.assign({}, param, {
                    channel: type
                }));
            }
        });

        params.descrip = data.ShareDescribe;
        params.title = data.ShareTitle;
        params.image = data.ShareImgUrl;
        params.url = data.ShareLink;
        params.share = iosParam;

        this.$tuhu.actionWithNative('share', params);
    }

    doShare () {
        if (/img\d\.tuhu\.org/.test(this.params.ShareImgUrl)) {
            this.params.ShareImgUrl = this.params.ShareImgUrl.replace(/@.+/, '') + '@200h_99q.jpg';
        }

        if (this.$tuhu.device.tuhuAndroid) {
            this.shareAndroid();
        } else if (this.$tuhu.device.tuhuIos) {
            this.shareIos();
        }
    }
}
export default Share;
