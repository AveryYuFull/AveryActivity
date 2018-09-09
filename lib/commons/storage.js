/**
 * author: caozhongping@tuhu.cn
 * desc: 兼容模式storage
 */

let tuhuSessionStorage = {}

let tuhuLocalStorage = {}

export default {
  /** 兼容无痕模式下sessionStorage */
  sessionStorage: {
    setItem(key, value) {
      try {
        sessionStorage.setItem(key, value)
      } catch (e) {
        tuhuSessionStorage[key] = value
      }
    },
    getItem(key) {
      try {
        return sessionStorage.getItem(key) || tuhuSessionStorage[key]
      } catch (e) {
        return tuhuSessionStorage[key]
      }
    },
    removeItem(key) {
      try {
        sessionStorage.removeItem(key)
      } catch (e) {
        delete tuhuSessionStorage[key]
      }
    },
    clear() {
      try {
        sessionStorage.clear()
      } catch (e) {
        tuhuSessionStorage = {}
      }
    }
  },

  /** 兼容无痕模式下localStorage */
  localStorage: {
    setItem(key, value) {
      try {
        localStorage.setItem(key, value)
      } catch (e) {
        tuhuLocalStorage[key] = value
      }
    },
    getItem(key) {
      try {
        return localStorage.getItem(key) || tuhuLocalStorage[key]
      } catch (e) {
        return tuhuLocalStorage[key]
      }
    },
    removeItem(key) {
      try {
        localStorage.removeItem(key)
      } catch (e) {
        delete tuhuLocalStorage[key]
      }
    },
    clear() {
      try {
        localStorage.clear()
      } catch (e) {
        tuhuLocalStorage = {}
      }
    }
  }
}
