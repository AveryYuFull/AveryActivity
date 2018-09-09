import WxConfig from './wxconfig'

class TwiceShare {
  static share = (param) => {
    if (!tuhu.device.isWeixin) {
      return
    }

    const share = new TwiceShare(param)
    return share.config()
  }

  constructor(param) {
    this.param = param
  }

  config() {
    return WxConfig.share(['onMenuShareTimeline', 'onMenuShareAppMessage']).then(() => {
      return new Promise((resolve, reject) => {
        const param = this.getParam()
        const link = param.Link.replace(/\{/g, '%7B').replace(/\}/g, '%7D')

        window.wx.onMenuShareAppMessage({
          title: param.Title,
          desc: param.Description,
          link: link,
          imgUrl: param.ImageUrl,
          success: function () {
            resolve()
          },
          cancel: function () {

          }
        })

        window.wx.onMenuShareTimeline({
          title: param.Title,
          desc: param.Description,
          link: link,
          imgUrl: param.ImageUrl,
          success: function () {
            resolve()
          },
          cancel: function () {

          }
        })
      })
    })
  }

  getParam() {
    const param = {}

    param.Title = this.param.shareTitle
    param.Description = this.param.shareDescrip
    param.ImageUrl = this.param.shareImage
    param.Link = this.param.shareUrl || location.href

    return param
  }
}

export default TwiceShare
