import util from './util'

const config = []

const uuid = util.getParam('_uuid')

function setSave() {
  if (uuid) {
    const formData = new FormData()
    const params = []
    config.forEach(item => {
      params.push({
        url: item.url,
        istab: item.istab,
        tab: item.tab
      })
    })

    formData.append('uuid', uuid)
    formData.append('data', JSON.stringify(params))
    // alert(JSON.stringify(params))
    tuhu.fetch('https://wx.tuhu.cn/activity/setpagestack', {
      method: 'post',
      body: formData
    })
  }
}

export default {
  _setCurrentPage(id, path, tab, pageId, istab, instance, url) {
    config.push({
      _id: config.length,
      id,
      path,
      pageId,
      tab,
      istab,
      instance,
      url
    })

    setSave()
  },

  _popPage() {
    config.pop()
  },

  delPage(index) {
    config.splice(index, 1)

    setSave()
  },
  getCurrentPages() {
    return config
  },

  getCurrentPage() {
    return config[config.length - 1]
  }
}
