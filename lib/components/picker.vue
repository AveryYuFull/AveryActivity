<template>
  <div class="item-input">
    <slot name="content"></slot>
  </div>
</template>

<script>
/**
 * author: caozhongping@tuhu.cn
 * date: 2017/10/11
 * desc: picker是一个JS实现的类似select的组件，他可以代替原生的select组件，并且功能更加强大、样式更加统一。
 * params:
 * cols 列数据
 * formatvalue：function(picker, value, displayValue) {
                return displayValue
            } 格式化数据， 每次数据变化时都会执行
 * onOpen 自定义 picker 打开时的触发动作
 * onClose  自定义 picker 关闭时的触发动作
 * <tuhu-picker :cols="cols" :formatvalue="formatvalue">
        <input slot="content" type="text" value="钱 小鹏 小姐" placeholder="选择手机" readonly='' />
    </tuhu-picker>
 */
(function($) {
  // this = input
  $.fn.nativePicker = function(params, raw) {
    let format = function(data) {
      let result = []
      for (let i = 0; i < data.length; i++) {
        let d = data[i]
        if (d.name === '请选择') continue
        result.push(d.name)
      }
      if (result.length) return result
      return ['']
    }

    let sub = function(data) {
      if (!data.sub) return ['']
      return format(data.sub)
    }

    let getCities = function(d) {
      for (let i = 0; i < raw.length; i++) {
        if (raw[i].name === d) return sub(raw[i])
      }
      return ['']
    }

    let getDistricts = function(p, c) {
      for (let i = 0; i < raw.length; i++) {
        if (raw[i].name === p) {
          for (let j = 0; j < raw[i].sub.length; j++) {
            if (raw[i].sub[j].name === c) {
              return sub(raw[i].sub[j])
            }
          }
        }
      }
      return ['']
    }

    let provinces = raw.map(function(d) {
      return d.name
    })
    let initCities = sub(raw[0])
    let initDistricts = sub(raw[0].sub[0])
    let currentProvince = provinces[0]
    let currentCity = initCities[0]

    let t
    let defaults = {

      cssClass: 'city-picker',
      rotateEffect: false,  //  为了性能

      onChange: function(picker, values, displayValues) {
        let newProvince = picker.cols[0].value
        let newCity
        if (newProvince !== currentProvince) {
          // 如果Province变化，节流以提高reRender性能
          clearTimeout(t)

          t = setTimeout(function() {
            var newCities = getCities(newProvince)
            newCity = newCities[0]
            var newDistricts = getDistricts(newProvince, newCity)
            picker.cols[1].replaceValues(newCities)
            picker.cols[2].replaceValues(newDistricts)
            currentProvince = newProvince
            currentCity = newCity
            picker.updateValue()
          }, 200)
          return
        }
        newCity = picker.cols[1].value
        if (newCity !== currentCity) {
          picker.cols[2].replaceValues(getDistricts(newProvince, newCity))
          currentCity = newCity
          picker.updateValue()
        }
      },

      cols: [
        {
          textAlign: 'center',
          values: provinces,
          cssClass: 'col-province'
        },
        {
          textAlign: 'center',
          values: initCities,
          cssClass: 'col-city'
        },
        {
          textAlign: 'center',
          values: initDistricts,
          cssClass: 'col-district'
        }
      ]
    }

    return this.each(function() {
      if (!this) return
      let p = $.extend(defaults, params)
      //  计算value
      if (p.value) {
        $(this).val(p.value.join(' '))
      } else {
        let val = $(this).val()
        val && (p.value = val.split(' '))
      }

      if (p.value) {
        //  p.value = val.split(" ")
        if (p.value[0]) {
          currentProvince = p.value[0]
          p.cols[1].values = getCities(p.value[0])
        }
        if (p.value[1]) {
          currentCity = p.value[1]
          p.cols[2].values = getDistricts(p.value[0], p.value[1])
        } else {
          p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0])
        }
        !p.value[2] && (p.value[2] = '')
      }
      $(this).picker(p)
    })
  }
})($)

export default {
  props: {
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
    cols: {
      type: Array
    },
    formatvalue: {
      type: Function,
      default: function(picker, value, displayValue) {
        return displayValue.join(' ')
      }
    },
    rotateeffect: {
      type: Boolean,
      default: true
    },
    onopen: {
      type: Function
    },
    onclose: {
      type: Function
    }
  },
  beforeDestroy() {
    $(this.$el).find('input').picker('close')
  },
  mounted() {
    if (this.cols) {
      $(this.$el).find('input').nativePicker({
        toolbarTemplate: `<header class="bar bar-nav">
                                    <button class="button button-link pull-right close-picker">${this.successBtn}</button>
                                    <span class="subtitle">${this.title}</span>
                                    <h1 class="title close-picker">${this.cancelBtn}</h1>
                                </header>`,
        formatValue: this.formatvalue,
        rotateEffect: this.rotateeffect,
        onOpen: this.onopen,
        onClose: this.onclose
      }, this.cols)
    } else {
      $(this.$el).find('input').picker({
        toolbarTemplate: `<header class="bar bar-nav">
                                    <button class="button button-link pull-right close-picker">${this.successBtn}</button>
                                    <span class="subtitle">${this.title}</span>
                                    <h1 class="title close-picker">${this.cancelBtn}</h1>
                                </header>`,
        formatValue: this.formatvalue,
        rotateEffect: this.rotateeffect,
        cols: [
          {
            textAlign: 'center',
            values: this.cols
          }
        ],
        onOpen: this.onopen,
        onClose: this.onclose
      })
    }
  }
}
</script>
