// /**
//  * author: caozhongping@tuhu.cn
//  * date: 2017/10/17
//  * desc: 图片懒加载
//  * docs: https://github.com/hilongjw/vue-lazyload
//  * eg: <img :show-width="300" v-lazy="imgUrl"/>
//  */
// // import VueLazyload from 'vue-lazyload'

// import loadImg from '../imgs/hu.png'

// const photos = []

// let ratio = 2

// let preload = 1

// let fontSize = 20

// $(function() {
//   fontSize = parseInt($('html').css('font-size')) || 20
// })

// tuhu.getDeviceDetail().then((data) => {
//   if (data && data.netWork !== 'wifi') {
//     ratio = 1.5
//   }
// })

// function getHeight(fromSrc, width) {
//   const src = fromSrc.replace(/@.+/, '')
//   let match = src.match(/(\d+)w_(\d+)h/)
//   if (!match) {
//     match = src.match(/w(\d+)_h(\d+)/)
//   }

//   if (match) {
//     const ratioHeight = width * (match[2] / match[1])
//     return [Math.ceil(ratioHeight / 10) * 10 * ratio, parseInt(ratioHeight)]
//   }

//   match = fromSrc.match(/(\d+)w_(\d+)h/)
//   if (!match) {
//     match = fromSrc.match(/w(\d+)_h(\d+)/)
//   }

//   if (match) {
//     const ratioHeight = width * (match[2] / match[1])
//     return [Math.ceil(ratioHeight / 10) * 10 * ratio, parseInt(ratioHeight)]
//   }

//   return false
// }

// function getSrc(src, height) {
//   src = src.replace(/@.+/, '')
//   const type = src.match(/\.([^.]+)$/)[1]

//   if (type === 'gif') {
//     src += '?@' + height + 'h_99q.src'
//   } else {
//     src += '@' + height + 'h_99q.' + type
//   }

//   return src.replace('image.tuhu.cn', 'img1.tuhu.org').replace(/https?/, 'https').replace(/img\d\./, 'img1.').replace(/\.(?:webp|png)$/, '.jpg')
// }

// function onScroll(scrollDom, wrap, attrs, scrollHandle) {
//   const {top: scrollTop, height: scrollHeight} = scrollDom.offset()

//   const offset = wrap.offset()
//   const checkTop = offset.top - scrollTop + (offset.height / 2)

//   if (checkTop >= -(preload * scrollHeight) && checkTop <= (preload + 1) * scrollHeight) {
//     imgLoad(wrap, attrs, scrollHandle, scrollDom)
//   }
// }

// function imgLoad(wrap, attrs, scrollHandle, scrollDom) {
//   console.log(134214327777)
//   let obj = wrap.find('img')
//   let hasWrap = true
//   if (obj.length < 1) {
//     obj = wrap
//     hasWrap = false
//   }

//   obj.attr('src', attrs.realsrc)

//   obj.on('load', function() {
//     scrollDom.off(scrollHandle)
//     $(this).removeAttr('width')

//     Object.keys(attrs).forEach((item, index) => {
//       if (['realsrc', 'src'].indexOf(item) < 0) {
//         $(this).attr(item, attrs[item])
//       }
//     })

//     if (hasWrap) {
//       if (wrap === null) {
//         debugger
//       }

//       const width = wrap.width()
//       width && $(this).width(width).height(wrap.height())

//       wrap.after($(this)).remove()
//       wrap = null
//     }
//   })

//   obj.on('error', function() {
//     if (!obj._count) {
//       obj._count = 1
//       imgLoad(wrap, attrs)
//     }
//   })
// }

// function getScrollDom(el) {
//   let parentNode = el

//   do {
//     let style = window.getComputedStyle(parentNode)

//     const overflow = style['overflow-y']

//     if ((overflow === 'auto' || overflow === 'scroll')) {
//       break
//     }

//     style = window.getComputedStyle(parentNode.parentNode)
//     if (!style) {
//       break
//     }

//     parentNode = parentNode.parentNode
//   } while (parentNode)

//   return parentNode
// }

// function lozyLoad(el, arg) {
//   let {src, width} = arg.value
//   if (!src) {
//     return
//   }
//   let wrap = null
//   let height = 0

//   let timeout = null
//   let scrollDom = $(getScrollDom(el))
//   const attrs = {}

//   const match = (width + '').match(/(\d+)%$/)
//   if (match) {
//     width = parseInt(match[1] * window.innerWidth / 100)
//   } else if (width) {
//     width = parseInt(width * fontSize)
//   }

//   Array.prototype.slice.call(el.attributes).forEach((item) => {
//     attrs[item] = el.getAttribute(item)
//   })
//   const scrollHandle = function() {
//     clearTimeout(timeout)

//     timeout = setTimeout(() => {
//       onScroll($(this), wrap, attrs, scrollHandle)
//     }, 100)
//   }

//   scrollDom.on('scroll', scrollHandle)

//   if (width) {
//     // throw new Error(`${src} 没有指定显示区域的宽度, 请添加width属性`)
//     height = getHeight(src, width)
//     if (height) {
//       // throw new Error(`${src} 没有指定图片的原始宽高`)
//       attrs.realsrc = getSrc(src, height[0])

//       $(el)
//       .css('width', '1.3rem')
//       .css('height', '1.3rem')
//       .attr('src', loadImg)

//       $(el).wrap(`<div style="width: ${width}px; height: ${height[1]}px; display:-webkit-flex; display:flex; -webkit-justify-content: center; justify-content: center; -webkit-align-items: center; align-items: center;"></div>`)
//       wrap = $(el).parent()

//       return onScroll(scrollDom, wrap, attrs, scrollHandle)
//     }
//   }

//   if (!height) {
//     attrs.realsrc = src
//     $(el)
//     .attr('src', loadImg)

//     wrap = $(el)
//     return onScroll(scrollDom, wrap, attrs, scrollHandle)
//   }
// }

// Vue.directive('lazy', {
//   update(el, arg) {
//     if (arg.value.src !== arg.oldValue.src) {
//       lozyLoad(el, arg)
//     }
//   },
//   inserted(el, arg) {
//     lozyLoad(el, arg)
//     const group = arg.value.group
//     const fromSrc = arg.value.src
//     let imageIndex = 0

//     $(el).on('click', () => {
//       if (photos[group]) {
//         tuhu.photoBrowser({
//           photos: photos[group]
//         }, {
//           index: imageIndex
//         })
//       }
//     })

//     if (group !== undefined) {
//       if ((group + '').indexOf('group_') < 0) {
//         throw new Error(`group属性非法，请调用tuhu.util.getGroup()生成`)
//       }
//       if (!photos[group]) {
//         photos[group] = []
//       }
//       imageIndex = photos[group].length

//       let src = fromSrc
//       const height = getHeight(src, window.innerWidth)
//       if (height) {
//         src = getSrc(src, height[0])
//       }

//       photos[group].push(src)
//     }
//   }
// })
import lazyVue from '../components/lazy.vue'

function bindVue(el, arg) {
  let replaceEl = el

  if (el.__vue__) {
    replaceEl = el.__vue__.$el
    el.__vue__.$destroy()
  }

  arg.value.src && new Vue({
    el: replaceEl,
    render: createElement => {
      return createElement(lazyVue, {
        props: {
          el: el,
          src: arg.value.src,
          width: arg.value.width,
          forceHeight: arg.value.height, // 强制高度
          group: arg.value.group
        }
      })
    }
  })
}

Vue.directive('lazy', {
  update(el, arg) {
    if (arg.value.src.replace(/\/\/img\d/, '') !== arg.oldValue.src.replace(/\/\/img\d/, '')) {
      bindVue(el, arg)
    }
  },
  inserted(el, arg) {
    arg.value.src && bindVue(el, arg)
  }
})
