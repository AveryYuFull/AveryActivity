/**
 * author: lishufen
 * fixTime: 2017-3-13
 * desc:  调用app头部分享按钮
 * 调用方法: CommonShare3.doshare({
    shareUrl: '',     //分享地址
    shareImage: '',   //分享图片
    shareTitle: '',   //分享标题
    shareDescrip: '', //分享描述
  })
 */

class Share {
  static share (params, opts) {
    const share = new Share(params, opts)
    share.doShare()
  }

  constructor (params = {}, opts = {}) {
    this.params = params

    this.opts = Object.assign({
      isClip: true
    }, opts)

    // this.params.shareUrl = this.params.shareUrl + '&' + tuhu.util.query2Str(this.params, '_twiceshare_')
    // console.log(888, this.params.shareUrl)
  }

  getUrl () {
    let url = decodeURIComponent(location.href)

    return url.indexOf('?') > -1 ? (url + '&utm_source=1') : (url + '?utm_source=1')
  }

  shareAndroid () {
    const params = {}
    const data = this.params

    params.Description = data.shareDescrip
    params.Title = data.shareTitle
    params.Picture = data.shareImage
    params.Url = data.shareUrl
    params.MiniProgramPath = data.wxAppPath || ''
    params.HdImageData = data.wxAppImg || ''

    tuhu.actionWithNative('share', params)
  }

  shareIos () {
    const data = this.params
    const params = {}
    const iosParam = []
    const types = [1, 2, 4, 8, 16, 32]
    const param = {
      channel: 1,
      type: 0,
      url: data.shareUrl,
      content: data.shareDescrip,
      title: data.shareTitle,
      imageURL: data.shareImage,
      image: ''
    }

    types.forEach((type) => {
      if (type === 1) {
        iosParam.push(Object.assign({}, param, {
          type: data.shareType || 0,
          MiniProgramPath: data.wxAppPath || '',
          HdImageData: data.wxAppImg || ''
        }))
      } else {
        iosParam.push(Object.assign({}, param, {
          channel: type
        }))
      }
    })

    params.descrip = data.shareDescrip
    params.title = data.shareTitle
    params.image = data.shareImage
    params.url = data.shareUrl
    params.share = iosParam

    // window.webkit.messageHandlers.setShare.postMessage(params)
    tuhu.actionWithNative('share', params)
  }

  doShare () {
    if (/img\d\.tuhu\.org/.test(this.params.shareImage)) {
      this.params.shareImage = this.params.shareImage.replace(/@.+/, '') + '@200h_99q.jpg'
    }

    if (tuhu.device.tuhuAndroid) {
      this.shareAndroid()
    } else if (tuhu.device.tuhuIos) {
      this.shareIos()
    }
  }
}

export default Share
