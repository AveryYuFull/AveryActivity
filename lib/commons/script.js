const loadScriptPromises = {}

export default {
  load(src, type = 'js') {
    /** 防止二次加载 */
    if (loadScriptPromises[src]) {
      return loadScriptPromises[src]
    }

    /** try again */
    let count = 0
    const load = (resolve, reject) => {
      let script = null
      if (type === 'js') {
        script = document.createElement('script')
        script.src = src
      } else {
        script = document.createElement('link')
        script.rel = 'stylesheet'
        script.href = src
      }

      script.onload = (ev) => {
        setTimeout(resolve)
      }
      script.onerror = (ev) => {
        $(script).remove()

        if (count > 0) {
          return reject(ev)
        }
        count++

        load(resolve, reject)
      }
      if (type === 'js') {
        document.body.appendChild(script)
      } else {
        document.head.appendChild(script)
      }
    }

    loadScriptPromises[src] = new Promise((resolve, reject) => {
      load(resolve, reject)
    })

    return loadScriptPromises[src]
  }
}
