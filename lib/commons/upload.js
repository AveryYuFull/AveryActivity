/**
 * 图片上传指令
 * author: caominjie@tuhu.cn
 * opt: {
  *   width 压缩后图片宽度 默认400
  *   height 压缩后图片高度 默认400
  *   maxSize 超过剪裁 默认2M
  *   fileFormat 图片格式过滤
 * }
 */
// 图片上传接口
const UPLOAD_IMG_URL = 'https://faxian.tuhu.cn/article/UploadShareImages'
// 类实例
let instance = null
// FileReader
let fileReader = null

class ImgUpload {
  static upload(opts = Object) {
    opts = Object.assign({
      // fileFormat: ['png', 'jpg', 'jpeg']
      width: 400,
      height: 400,
      maxSize: 1024 * 1024 * 2
    }, opts)
    if (!instance) {
      instance = new ImgUpload()
    }
    return instance.uploadImg(opts)
  }

  constructor() {
    this.width = null
    this.height = null
    this.fileType = null
    this.onLoadImgSuccess = null
  }

  async uploadImg(opts) {
    // 过滤错误调用
    if (opts.file.length === 0) {
      Promise.reject({
        _code: -1,
        _message: '未选择图片或者取消选择图片'
      })
    }

    // img
    let file = opts.file[0]

    // 过滤文件格式
    if (opts.fileFormat && !opts.fileFormat.includes(file.name.match(/\.(\w+)$/)[1])) {
      Promise.reject({
        _code: -2,
        _message: '文件格式不正确'
      })
    }

    // 默认宽高
    this.width = opts.width
    this.height = opts.height
    this.fileType = file.type

    // 回调(兼容1.0)
    this.onLoadImgSuccess = opts.onLoadImgSuccess || opts.onImgSuccess

    const fileSize = file.size > opts.maxSize

    if (this.onLoadImgSuccess && !fileSize) {
      const fileResult = await instance._fileReader(file)

      // 触发回调
      this.onLoadImgSuccess({
        img: fileResult
      })
    }

    // 限制文件大小(默认2M)
    if (fileSize) {
      file = await instance._imgCompress(file)
    }

    // 上传
    return instance._upload(file)
  }

  async _imgCompress(file) {
    // load文件流
    const fileResult = await instance._fileReader(file)

    // 触发回调
    this.onLoadImgSuccess && this.onLoadImgSuccess({
      img: fileResult
    })

    // 图片压缩 输出blob
    return instance._imgToBlob(fileResult)
  }

  async _imgToBlob(fileResult) {
    // load图片
    const img = await instance._imgLoader(fileResult)

    // 计算尺寸
    const size = instance._calculate(img)

    // 转化blob
    const blob = await instance._canvasUtil(img, size)

    return blob
  }

  async _fileReader(file) {
    return new Promise((resolve, reject) => {
      if (!fileReader) {
        fileReader = new FileReader()
      }

      fileReader.onloadend = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = () => {
        reject({
          _code: -3,
          _message: '文件load失败'
        })
      }
      fileReader.readAsDataURL(file)
    })
  }

  async _imgLoader(res) {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.src = res
      img.onload = () => {
        resolve(img)
      }

      img.onerror = () => {
        reject({
          _code: -4,
          _message: '图片load失败'
        })
      }
    })
  }

  async _canvasUtil(img, size) {
    return new Promise((resolve, reject) => {
      try {
        const { targetWidth, targetHeight } = size
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight

        // 清除画布
        ctx.clearRect(0, 0, targetWidth, targetHeight)

        // 图片压缩
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

        // canvas转为blob
        canvas.toBlob((blob) => {
          resolve(blob)
        }, this.fileType || 'image/png')
      // 捕获异常
      } catch (error) {
        reject({
          _code: -5,
          _message: 'canvas转为blob异常'
        })
      }
    })
  }

  _calculate(img) {
    let targetWidth = this.width
    let targetHeight = this.height

    if (img.width > targetWidth || img.height > targetHeight) {
      if (img.width / img.height > this.width / this.height) {
        // 更宽
        targetHeight = Math.round(targetWidth * (img.height / img.width))
      } else {
        targetWidth = Math.round(targetHeight * (img.width / img.height))
      }
    }
    return {
      targetWidth,
      targetHeight
    }
  }

  async _upload(img) {
    const data = new FormData()

    data.append('img', img)

    const res = await tuhu.fetch(UPLOAD_IMG_URL, {
      method: 'POST',
      body: data
    }, {
      timeout: 20
    }).catch(() => {
      Promise.reject({
        _code: -6,
        _message: '接口异常'
      })
    })

    return res
  }
}

export default ImgUpload
