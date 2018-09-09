/**
 * author: caominjie@tuhu.cn
 * date: 2017/11/8
 * desc: 图片上传
 * docs:
 * onLoadImgSuccess: 钩子函数( 加载完图片 上传图片之前 可以获取图片url )
 * onUpload: 上传图片完成回调函数
 * reset: 是否重置input 默认true
 * capture: 是否禁用相册,直接唤起拍照  默认false
 * eg: <a href="#" v-upload="{onUpload: onUpload, imgIndex: 0,imgName: 'desc',imgDesc: 'aaaaa'}" alt="">aaaaaa</a>
 */
import Uploader from '../commons/upload'

Vue.directive('upload', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, arg) {
    // 随机id
    // let randomName = parseInt(Math.random() * 10) + new Date().getTime()
    let randomName = ''
    let d = new Date().getTime()
    randomName = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })
    // input:file实例
    let fileElem = null

    !fileElem && $(el).parent().append(`
      <input type="file" id="_File${randomName}" accept="image/*" ${arg.capture ? 'capture' : ''} style="width: 0.001px;height: 0.001px;opacity: 0;overflow: hidden;position: absolute;z-index: -999;" >
    `)
    fileElem = document.querySelector('#_File' + randomName)

    // 点击挂载元素
    $(el).on('click', function() {
      // 派发事件
      fileElem && fileElem.dispatchEvent(new MouseEvent('click'))
    })

    // 绑定change事件
    $(fileElem).on('change', function(e) {
      // 如果没选择
      if (e.currentTarget.files.length === 0) return
      const { onUpload, reset = true } = arg.value
      Uploader.upload(
        Object.assign({
          file: e.currentTarget.files
        }, arg.value)
      ).then(onUpload)
      // reset input:file
      if (reset) {
        $(this)[0].value = ''
      }
    })
  }
})
