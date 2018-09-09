<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
/**
 * author: caominjie@tuhu.cn
 * show: 控制citypicker显示隐藏
 * cityPicker: 默认值为3 三级地区选择 (2为两级地区选择)
 * cityValue: 默认选择地区 示例['上海市', '上海市', '闵行区']
 * formatvalue: 格式化数据， 每次数据变化时都会执行  picker实例下的$city为整理好的返回数据
 * onOpen: 自定义 picker 打开时的触发动作
 * onClose:  自定义 picker 关闭时的触发动作
 * el: <tuhu-citypicker :formatvalue='formatvalue' :show='true'>
    </tuhu-citypicker>
 */
import picker from '../commons/picker'
(function($) {
  // this = input
  $.fn.cityPicker = function(params, data, type) {
    const defaultParmas = picker.initPicker(params, {'data': data, 'type': 'city', level: type})
    return this.each(function() {
      $(this).picker($.extend(defaultParmas, params))
    })
  }
})($)

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    onopen: {
      type: Function
    },
    onclose: {
      type: Function
    },
    successBtn: {
      type: String,
      default: '确定'
    },
    cancelBtn: {
      type: String,
      default: '取消'
    },
    title: {
      type: String,
      default: ''
    },
    formatvalue: {
      type: Function,
      require: true
    },
    cityPicker: {
      type: Number,
      default: 3
    },
    cityValue: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  watch: {
    show: function(n, o) {
      this._showAndHide(n)
    }
  },
  mounted() {
    const proviceList = tuhu.localStorage.getItem('proviceList')
    if (proviceList) {
      try {
        this._cityPicker(JSON.parse(proviceList))
      } catch (error) {
        this._netWorkLoad()
      }
    } else {
      this._netWorkLoad()
    }
  },
  beforeDestroy() {
    $(this.$el).picker('close')
  },
  methods: {
    _cityPicker(proviceList) {
      $(this.$el).cityPicker({
        toolbarTemplate: `<header class="bar bar-nav">
                                      <button class="button button-link pull-right close-picker">${this.successBtn}</button>
                                      <span class="subtitle">${this.title}</span>
                                      <h1 class="title close-picker">${this.cancelBtn}</h1>
                                  </header>`,
        formatValue: this.formatvalue,
        cityValue: this.cityValue,
        onOpen: this._onopen,
        onClose: this._onclose
      }, proviceList, this.cityPicker)
      this._showAndHide(this.show)
    },
    _netWorkLoad() {
      let $this = this
      tuhu.fetch('https://wx.tuhu.cn/Beautify/GetRegionName2').then((res) => {
        if (res.Code - 0 === 1) {
          try {
            $this._cityPicker(res.ProviceList)
            tuhu.localStorage.setItem('proviceList', JSON.stringify(res.ProviceList))
          } catch (error) {

          }
        }
      })
    },
    _showAndHide(n) {
      n ? $(this.$el).picker('open') : $(this.$el).picker('close')
    },
    _onclose(picker) {
      this.onclose && this.onclose(picker)
    },
    _onopen(picker) {
      this.onopen && this.onopen(picker)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
