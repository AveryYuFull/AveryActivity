/**
 * author: lishufen
 * fixTime: 2017-5-4
 * desc:  调用app底部的分享面板
 * 调用方法: SharePanel.getAppShare({
    shareUrl: '',     //分享地址
    shareImage: '',   //分享图片
    shareTitle: '',   //分享标题
    shareDescrip: '', //分享描述
    shareType: '',    //分享类型（0链接，3小程序，默认0不要传）
  }, media, callback)   // media渠道，默认不传是调起所有渠道，如果要单独调用几个渠道，
 *                                   传一个数组里面包含所要分享的渠道， eg: [1, 2, 4]
 *  1 微信， 2 朋友圈， 4 新浪， 8 QQ， 16 Q空间  32 复制， 64短信
 */

class SharePanel {
  static share = (data, channel, opt) => {
    const share = new SharePanel(data, channel, opt)
    return share.doShare()
  }

  constructor(data = {}, channel = [], opt = {}) {
    this.data = data
    this.channel = channel
    this.opt = opt
  }

  shareAndroid() {
    const androidParam = []
    const data = this.data
    const channel = this.channel
    const len = channel.length

    const param = {
      Media: 'WECHAT',
      ShareType: 0,
      Url: data.shareUrl,
      Description: data.shareDescrip,
      Title: data.shareTitle,
      Picture: data.shareImage,
      ImageText: '',
      ImageUrl: ''
    }

    if (channel.indexOf(1) > -1 || len === 0) {
      androidParam.push(Object.assign({}, param, {
        ShareType: data.shareType || 0,
        MiniProgramPath: data.wxAppPath,
        HdImageData: data.wxAppImg
      }))
    }

    if (channel.indexOf(2) > -1 || len === 0) {
      androidParam.push(Object.assign({}, param, {
        Media: 'WECHAT_CIRCLE'
      }))
    }

    if (channel.indexOf(4) > -1 || len === 0) {
      androidParam.push(Object.assign({}, param, {
        Media: 'SINA'
      }))
    }

    if (channel.indexOf(8) > -1 || len === 0) {
      androidParam.push(Object.assign({}, param, {
        Media: 'QQ'
      }))
    }

    if (channel.indexOf(16) > -1 || len === 0) {
      androidParam.push(Object.assign({}, param, {
        Media: 'QZONE'
      }))
    }

    if (channel.indexOf(32) > -1 || len === 0) {
      androidParam.push(Object.assign({}, param, {
        Media: 'COPY'
      }))
    }

    if (channel.indexOf(64) > -1 || len === 0) {
      androidParam.push(Object.assign({}, param, {
        Media: 'SMS'
      }))
    }

    return tuhu.actionWithNative('sharePanel', androidParam)
  }

  shareIos() {
    const iosParam = []
    const data = this.data
    const channel = this.channel
    const len = channel.length
    const param = {
      channel: 1,
      type: 0,
      url: data.shareUrl,
      content: data.shareDescrip,
      title: data.shareTitle,
      imageURL: data.shareImage,
      image: ''
    }

    if (channel.indexOf(1) > -1 || len === 0) {
      iosParam.push(Object.assign({}, param, {
        type: data.shareType || 0,
        MiniProgramPath: data.wxAppPath || '',
        HdImageData: data.wxAppImg || ''
      }))
    }

    if (channel.indexOf(2) > -1 || len === 0) {
      iosParam.push(Object.assign({}, param, {
        channel: 2
      }))
    }

    if (channel.indexOf(4) > -1 || len === 0) {
      iosParam.push(Object.assign({}, param, {
        channel: 4
      }))
    }

    if (channel.indexOf(8) > -1 || len === 0) {
      iosParam.push(Object.assign({}, param, {
        channel: 8
      }))
    }

    if (channel.indexOf(16) > -1 || len === 0) {
      iosParam.push(Object.assign({}, param, {
        channel: 16
      }))
    }

    if (channel.indexOf(32) > -1 || len === 0) {
      iosParam.push(Object.assign({}, param, {
        channel: 32
      }))
    }

    if (channel.indexOf(64) > -1 || len === 0) {
      iosParam.push(Object.assign({}, param, {
        channel: 64
      }))
    }

    return tuhu.actionWithNative('sharePanel', {
      data: iosParam
    })
  }

  doShare() {
    if (tuhu.device.tuhuAndroid) {
      return this.shareAndroid()
    }

    return this.shareIos()
  }
}

export default SharePanel
