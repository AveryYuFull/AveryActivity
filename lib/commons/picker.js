/**
 * params
 * other: {
 *    data: data
 *    type: city date
 *    level: 2 3
 * }
 */
// let instance = null

class Picker {
  static initPicker (params = Object, other = Object) {
    // default params
    other = Object.assign({
      level: 3
    }, other)

    return new Picker()._pickerRouter(params, other)
  }

  constructor() {
    // util
    this.util = {}
    // 省
    this.provinces = []
    this.currentProvince = ''
    this.cpId = 0
    // 市
    this.initCities = []
    this.currentCity = ''
    this.ccId = 0
    // 区
    this.initDistricts = []
    this.currentDistrict = ''
    this.cdId = ''
    // timer
    this.t = null
    this.t2 = null
    // filterCity
    this.filterCity = ['请选择', '上海市', '北京市', '天津市', '重庆市']
  }

  _pickerRouter(params, other) {
    if (other.type === 'city') {
      this._cityPickerUtil(params, other.data, other.level)
      return this._cityPicker(params, other.data, other.level)
    } else if (other.type === 'date') {
      this._datePicker()
    }
  }

  _cityPicker(params, data, level) {
    let res = null
    const $this = this
    // 默认值
    const initValue = params.cityValue || []
    if (level === 3) {
      this.provinces = data && data.map((v) => {
        return v.ProviceName
      })
      this.currentProvince = initValue[0] || this.provinces[0]
      this.initCities = this.currentProvince && this.util._getCities(this.currentProvince)
      this.currentCity = initValue[1] || this.initCities[0]
      this.initDistricts = (this.currentCity && this.util._getDistricts(this.currentProvince, this.currentCity)) || ['请选择']
      this.currentDistrict = initValue[2] || this.initDistricts[0]
      res = {
        cssClass: 'city-picker',
        rotateEffect: false,
        cols: [
          {
            textAlign: 'center',
            values: this.provinces,
            cssClass: 'col-province'
          },
          {
            textAlign: 'center',
            values: this.initCities,
            cssClass: 'col-city'
          },
          {
            textAlign: 'center',
            values: this.initDistricts,
            cssClass: 'col-district'
          }
        ],
        onChange: (picker) => {
          // 选中的市
          let newProvince = picker.value[0]
          // 选中的省
          let newCity = picker.value[1]
          // 选中的区
          let newDistrict = picker.value[2]
          picker.$city = $this.util._getRegionId(newProvince, newCity, newDistrict)
          if (newProvince !== $this.currentProvince) {
            clearTimeout($this.t)

            $this.t = setTimeout(function() {
              $this.currentProvince = newProvince
              let newCities = $this.util._getCities(newProvince)
              newCity = newCities[0]
              $this.currentCity = newCity
              let newDistricts = $this.util._getDistricts(newProvince, newCity)
              $this.currentDistrict = newDistrict
              picker.cols[1].replaceValues(newCities)
              picker.cols[2].replaceValues(newDistricts)
              picker.updateValue()
            }, 200)
          } else {
            newCity = picker.cols[1].value
            if ($this.currentCity !== newCity) {
              picker.cols[2].replaceValues($this.util._getDistricts(newProvince, newCity))
              $this.currentDistrict = newDistrict
              $this.currentCity = newCity
              picker.updateValue()
            } else {
              if ($this.currentDistrict !== newDistrict) {
                // 所有change都会进入这里
                clearTimeout($this.t2)

                $this.t2 = setTimeout(function() {
                  picker.$city = $this.util._getRegionId(newProvince, newCity, newDistrict)
                }, 200)
              }
            }
          }
        }
      }
    } else if (level === 2) {
      this.provinces = data && data.map((v) => {
        return v.ProviceName
      })
      this.currentProvince = initValue[0] || this.provinces[0]
      this.initCities = this.currentProvince && this.util._getCities(this.currentProvince)
      this.currentCity = initValue[1] || this.initCities[0]
      res = {
        cssClass: 'city-picker',
        rotateEffect: false,
        cols: [
          {
            textAlign: 'center',
            values: this.provinces,
            cssClass: 'col-province'
          },
          {
            textAlign: 'center',
            values: this.initCities,
            cssClass: 'col-city'
          }
        ],
        onChange: (picker) => {
          // 选中的市
          let newProvince = picker.value[0]
          // 选中的省
          let newCity = picker.value[1]
          picker.$city = $this.util._getRegionId(newProvince, newCity)
          if (newProvince !== $this.currentProvince) {
            clearTimeout($this.t)

            $this.t = setTimeout(function() {
              $this.currentProvince = newProvince
              let newCities = $this.util._getCities(newProvince)
              newCity = newCities[0]
              // currentCity = newCity
              picker.cols[1].replaceValues(newCities)
              picker.updateValue()
            }, 200)
          } else {
            newCity = picker.cols[1].value
            if ($this.currentCity !== newCity) {
              $this.currentCity = newCity
              // 所有change都会进入这里
              clearTimeout($this.t)

              $this.t = setTimeout(function() {
                picker.$city = $this.util._getRegionId(newProvince, newCity)
              }, 200)
            }
          }
        }
      }
    }
    if (initValue.length > 0) {
      res['value'] = [this.currentProvince, this.currentCity, this.currentDistrict]
    }
    return res
  }

  _datePicker() {
    // TODO
  }

  _cityPickerUtil(params, data, level) {
    this.util._loopArr = (arr) => {
      return arr.map((v) => {
        return v.CtiyName
      })
    }
    this.util._getRegionId = (newProvince, newCity, newDistrict) => {
      data.some((v) => {
        if (v.ProviceName === newProvince) {
          this.cpId = v.RegionID
          v.CityList.some((v) => {
            if (v.CtiyName === newCity) {
              this.ccId = v.RegionID
              newDistrict && v.AreaList.some((v) => {
                if (v.CtiyName === newDistrict) {
                  this.cdId = v.RegionID
                  return true
                }
              })
              return true
            }
          })
          return true
        }
      })
      return Object.assign(
        {'province': newProvince, 'provinceRegionId': this.cpId},
        {'city': newCity, 'cityRegionId': this.ccId},
        newDistrict ? {'district': newDistrict, 'districtRegionId': this.cdId} : {}
      )
    }
    this.util._getCities = this._initUtilCity(data, level)
    this.util._getDistricts = this._initUtilDistricts(data, level)
  }

  _initUtilCity(data, level) {
    if (level === 3) {
      return (newProvince) => {
        let result = []
        data.some((v) => {
          if (v.ProviceName === newProvince) {
            // cpId = v.RegionID
            result = this.util._loopArr(v.CityList)
            return true
          }
        })
        return result
      }
    } else if (level === 2) {
      return (newProvince) => {
        let result = []
        data.some((v, i) => {
          if (v.ProviceName === newProvince) {
            if (v.CityList.length === 1 && this.filterCity.includes(newProvince)) {
              result = this.util._loopArr(v.CityList[0].AreaList)
            } else {
              result = this.util._loopArr(v.CityList)
            }
            return true
          }
        })
        return result
      }
    }
  }

  _initUtilDistricts(data, level) {
    if (level === 3) {
      return (newProvince, newCity) => {
        let result = []
        data.some((v) => {
          if (v.ProviceName === newProvince) {
            // cpId = v.RegionID
            v.CityList.some((v) => {
              if (v.CtiyName === newCity) {
                // ccId = v.RegionID
                result = this.util._loopArr(v.AreaList)
                return true
              }
            })
            return true
          }
        })
        return result
      }
    }
  }
}

export default Picker
