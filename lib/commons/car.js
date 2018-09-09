/**
 * author caozhongping@tuhu.cn
 * date 2017/11/29
 * desc: 车型操作相关
 */
const SELECT_CAR_API = 'https://item.tuhu.cn/CarHistory/SelectCarObject.html'

const DELETE_CAR_API = 'https://item.tuhu.cn/CarHistory/DeleteCarObject.html'

const SETDEFAULT_CAR_API = 'https://item.tuhu.cn/CarHistory/SetDefaultCar.html'

const ADD_CAR_API = 'https://item.tuhu.cn/CarHistory/AddCarObject.html'

const UPDATE_CAR_API = 'https://item.tuhu.cn/CarHistory/UpdateCarObject.html'

const LUNGU_CAR_API = 'https://api.tuhu.cn/Product/SelectProperty'

const PROPERTIES_CAR_API = 'https://by.tuhu.cn/YearPackage/GetVehicleProperties.html'

const LUN_GU_KEY = '_lun_gu_'

let currentInstance = null

let lastCarInfoPromise = null

let lastArgs = null

async function addCar(item = {}) {
  const userInfo = await tuhu.getUserInfo()

  // const carList = await getCarList()

  let url = ADD_CAR_API
  if (item.CarID) {
    url = UPDATE_CAR_API
  }/** else {
    if (carList) {
      carList.CarHistory.some((citem) => {
        if (citem.ProductID === item.ProductID) {
          url = UPDATE_CAR_API
          item.CarID = citem.CarID
          return true
        }
      })
    }
  } */

  const formData = new FormData()
  formData.append('Vehicle', item.Vehicle)
  formData.append('ProductID', item.ProductID)
  formData.append('CarName', item.CarName)
  formData.append('SalesName', item.SalesName || '')
  formData.append('TireSizeForSingle', item.TireSizeForSingle || '')
  formData.append('TireSize', item.TireSize || '')
  formData.append('CarID', item.CarID || '')
  formData.append('PropertyList', (item.PropertyList && item.PropertyList.length > 0 && JSON.stringify(item.PropertyList)) || '')
  formData.append('isDefaultCar', true)
  formData.append('paiLiang', item.Pailiang || '')
  formData.append('Nian', item.Nian || '')
  formData.append('userID', userInfo.userid)
  formData.append('Brand', item.Brand)
  formData.append('TID', item.TID || '')

  formData.append('Registrationtime', item.Registrationtime || '')
  formData.append('CarNumber', item.CarNumber || '')
  formData.append('LIYANGID', item.LIYANGID || '')
  formData.append('Classno', item.Classno || '')
  formData.append('Status', item.Status || '')
  formData.append('OnRoadMonth', item.OnRoadMonth || '')
  formData.append('TotalMileage', item.TotalMileage || 0)

  return tuhu.fetch(url, {
    method: 'POST',
    header: {
      'Content-type': 'application/json'
    },
    body: formData
  }).then((data) => {
    if (!item.CarID && item.TireSizeForSingle && data.CarID) {
      item.CarID = data.CarID
      item.Status = -1

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          addCar(item).then((res) => {
            if (res.Code === 1) {
              resolve(data)
            } else {
              setTimeout(() => {
                addCar(item).then((res) => {
                  resolve(data)
                })
              }, 400)
            }
          })
        }, 400)
      })
    }

    return data
  })
}

async function getCarList() {
  const userInfo = await tuhu.getUserInfo()
  return userInfo.islogin && tuhu.fetch(`${SELECT_CAR_API}?userID=${userInfo.userid}`)
}

async function deleteCar(item) {
  const userInfo = await tuhu.getUserInfo()

  return userInfo.islogin && tuhu.fetch(DELETE_CAR_API + '?carID=' + item.CarID + '&userID=' + userInfo.userid).then((data) => {
    tuhu.localStorage.removeItem(LUN_GU_KEY + (item.ProductID || item.VehicleID))
    return data
  })
}

async function updateCar(args = {}) {
  const currentCar = await Car.getDefaultCar(5, false)
  const car = Object.assign({}, currentCar, args)

  const addedCar = await addCar(car)
  if (addedCar && addedCar.CarID) {
    car.CarID = addedCar.CarID
  }

  tuhu.store && tuhu.store.commit('setCarInfo', {
    car: car
  })

  return addedCar
}

async function setDefault(item) {
  const userInfo = await tuhu.getUserInfo()

  if (!userInfo.islogin) {
    return
  }

  const data = new FormData()
  data.append('carID', item.CarID)
  data.append('isDefaultCar', true)
  data.append('userID', userInfo.userid)
  return tuhu.fetch(SETDEFAULT_CAR_API, {
    method: 'post',
    body: data
  })
}

function resetSelectCar(data) {
  let propertyList = data.PropertyList || []
  if (typeof data.PropertyList === 'string') {
    try {
      propertyList = JSON.parse(propertyList)
    } catch (e) {

    }
  }

  if (!data.CarName) {
    const match = data.VehicleName && data.VehicleName.split('-')
    if (match) {
      data.CarName = match[0]
      data.BrandType = match[1]
    }
  }

  // ios {\"TireSize\":\"205/65R16;215/55R17;215/60R16\",\"i_sendSMS\":0,\"LastChangedDate\":\"2017/10/24 20:06:49\",\"IsDefaultCar\":true,\"SpecialTireSize\":\"\",\"LastBaoYangKM\":0,\"OnRoadMonth\":\"\",\"Brand\":\"R - 日产\",\"IsTransferInOneYear\":false,\"Pailiang\":\"\",\"CarName\":\"天籁\",\"IsShowCertificationInfo\":true,\"i_sendEmail\":0,\"SalesName\":\"\",\"PropertyList\":[],\"IosAppKey\":\"TNHBH5VViewController\",\"isBaoyang\":false,\"LastBaoYangTime\":\"0001/1/1 0:00:00\",\"Nian\":\"\",\"OdometerUpdatedTime\":\"2017-10-27 11:26:07\",\"IosAppValue\":\"{\\"url\\": \\"http://resource.tuhu.cn/staticpage/chexian/cxlist.html\\"}\",\"CarID\":\"{01160f76-8308-4feb-8e1d-dc62b3c937d1}\",\"ProductID\":\"VE-FENG07BQ\",\"CarNumber\":\"\",\"Vehicle\":\"天籁-东风日产\",\"Status\":-1,\"LIYANGID\":\"\",\"ImageUrl\":\"https://img1.tuhu.org/Images/Logo/richan.png\",\"TID\":\"\",\"BrandType\":\"东风日产\"}
  const pid = data.ProductID || data.VehicleID

  return {
    Brand: data.Brand,
    BrandType: data.BrandType || data.CarBrand,
    CarID: data.CarID || data.PKID || '',
    CarName: data.CarName,
    ImageUrl: (data.ImageUrl || data.VehicleLogin || '').replace(/\/\/img\d/, '//img1'),
    IsDefaultCar: data.IsDefaultCar || true,
    Nian: data.Nian || '',
    Pailiang: data.Pailiang || data.PaiLiang || '',
    ProductID: pid,
    PropertyList: propertyList,
    SalesName: data.SalesName || data.EngineType || data.LiYangName || '',
    TID: data.TID || '',
    TireSizeForSingle: data.TireSizeForSingle || '',
    TireSize: data.TireSize || data.Tires || '',
    Vehicle: data.Vehicle || data.VehicleName || '',
    CarNumber: data.CarNumber || '',
    Classno: data.Classno || '',
    LIYANGID: data.LIYANGID || data.LiYangID || '',
    OnRoadMonth: data.OnRoadMonth || '',
    Registrationtime: data.Registrationtime || data.CreateTime || '',
    Status: data.Status || data.CertificationStatus || '',
    lunguType: data.lunguType || tuhu.localStorage.getItem(LUN_GU_KEY + pid) || '',
    TotalMileage: data.TotalMileage || 0
    // raw: data
  }
}

async function getLocalCar() {
  if (tuhu.device.isApp) {
    return tuhu.actionWithNative('getCar').then((data) => {
      //  {"Brand":"A - 奥迪","CarBrand":"一汽大众奥迪","CarName":"100","CarNumber":"","CarPlate":"","Carno_City":"","Carno_Province":"","CertificationStatus":-1,"Classno":"","ClickCount":"","CreateTime":"2017/10/27 8:35:49","Engineno":"","FileIntegrity":"0","HistoryPKID":"","Hub":"","InsuranceCompany":"","InsureExpireDate":"","IsDefaultCar":true,"IsDelete":false,"IsShowCertificationInfo":true,"LastBaoYangKM":0,"LastUpDateTime":"2017/10/27 8:35:49","LiYangID":"","LiYangName":"","Nian":"","OdometerUpdatedTime":"","OnRegistrationTime":"","OnRoadMonth":"","PKID":"{1cd51f1c-7190-4cd9-986c-a95f5a64b4bb}","PaiLiang":"","PropertyList":"[]","SpecialTireSize":"","SpecialTireSizeForSingle":"","StandardTireSize":"","TID":"","TireSize":"185/80R14;195/70R14;185/70R14","TireSizeForSingle":"185/80R14","TripDistance":"","VehicleID":"VE-AUDF96AE","VehicleImage":"","VehicleLicenseImage":"","VehicleLogin":"https://img1.tuhu.org/Images/Logo/aodi.png","VehicleName":"100-一汽大众奥迪","androidKey":"cn.TuHu.Activity.AutomotiveProducts.AutomotiveProductsWebViewUI","androidValue":"{\"Url\":\"http://res.tuhu.org/staticpage/chexian/cxlist.html\"}","carInfoLevel":"2","describe":"","expiredDate":"","id":278,"isOnlyHasTwo":false,"masterID":"","masterName":"","oneYearGH":false,"tbCity":""}
      let result = data

      if (typeof data === 'string') {
        try {
          result = JSON.parse(data)
        } catch (e) {

        }
      }

      return result ? resetSelectCar(result) : null
    })
  }

  let carResult = null

  try {
    carResult = JSON.parse(tuhu.localStorage.getItem('_current_car'))
  } catch (e) {

  }

  return carResult
}

class Car {
  static async addLoginedCar() {
    const item = await getLocalCar()

    if (!item) {
      return
    }
    if (!currentInstance) {
      currentInstance = new Car()
    }

    const addedCar = await addCar(item)
    const carInfo = Object.assign({}, item)
    if (addedCar && addedCar.CarID) {
      carInfo.CarID = addedCar.CarID
      carInfo.Status = -1
    }
    currentInstance.carResolve(carInfo)
  }

  static getInstance = () => {
    return currentInstance || new Car(5, false)
  }

  static saveLunGu(key, value) {
    tuhu.localStorage.setItem(LUN_GU_KEY + key, value)
  }

  static getDefaultCar = (...args) => {
    const [carLevel, force, opts] = args

    if (lastCarInfoPromise && JSON.stringify(args) === JSON.stringify(lastArgs)) {
      return lastCarInfoPromise
    }

    lastArgs = args

    currentInstance = new Car(carLevel, force, opts)
    lastCarInfoPromise = currentInstance.getDefaultCar()

    setTimeout(() => {
      lastCarInfoPromise = null
    }, 1000)
    return lastCarInfoPromise
  }

  static selectCar = (carLevel, force) => {
    currentInstance = new Car(carLevel, force)
    return currentInstance.selectCar()
  }

  static async getLunGu(tid) {
    const list = await tuhu.fetch(LUNGU_CAR_API, {}, {
      query: {
        category: 'hub',
        tid: tid
      }
    }).then(list => {
      return list.Rims
    })

    return list
  }

  static updateCar = updateCar

  static getCarList = getCarList

  static deleteCar = deleteCar

  static setDefault = setDefault

  constructor(carLevel = 5, force = true, opts = {}) {
    this.options = Object.assign({
      updateStore: false,
      pageCar: false
    }, opts)
    this.carLevel = carLevel
    this.force = force

    this.carResolve = null
    this.carReject = null
    this.carPromise = new Promise((resolve, reject) => {
      this.carResolve = (car) => {
        if (!car) {
          resolve(null)
          tuhu.store && tuhu.store.commit('setCarInfo', {
            car: null,
            force: this.options.updateStore
          })
          return
        }

        if (car.TireSizeForSingle) {
          const match = car.TireSizeForSingle.split(/[/R]/)
          car.AspectRatio = match[1]
          car.Rim = match[2]
          car.Width = match[0]
        }

        car.currentType = 2
        if (car.Pailiang && car.Nian) {
          car.currentType = 4

          if (car.SalesName) {
            car.currentType = 5
          }
        }
        tuhu.store && tuhu.store.commit('setCarInfo', {
          car: car,
          force: this.options.updateStore
        })
        resolve(car)
      }
      this.carReject = reject
    })
  }

  pageBack() {
    const delta = tuhu.getCurrentPages().reduce((count, item) => {
      if (item.path.indexOf('/_car/') > -1) {
        return count + 1
      }

      return count
    }, 0)

    if (location.href.indexOf('/_car/') > -1) {
      if (this.options.pageCar) {
        tuhu.navigateBack({
          delta: delta,
          last: 0
        })
      } else {
        tuhu.navigateBack({
          delta: delta,
          last: 1
        })
      }
    }

    return delta
  }

  async resolveCar(result) {
    if (!result) {
      this.carResolve(result)
      return
    }

    const item = resetSelectCar(result)

    if (this.force) {
      const data = await tuhu
      .fetch(
        'https://item.tuhu.cn/Car/SelectVehicle?VehicleID=' +
          item.ProductID
      )

      if (data.PaiLiang.length > 0 || this.carLevel === 7) {
        if (this.carLevel === 6 || this.carLevel === 7) {
          if (!item.TireSizeForSingle || this.carLevel === 7) {
            this.carLevel = 6

            return tuhu.navigateTo({
              url: '/pages/_car/tiresize',
              query: {
                type: this.carLevel,
                vehicle: item.Vehicle,
                img: item.ImageUrl
              },
              data: {
                car: item
              }
            })
          }
        }

        if (this.carLevel === 8 || this.carLevel === 9) {
          if (!item.lunguType || this.carLevel === 9) {
            this.carLevel = 8

            return tuhu.navigateTo({
              url: '/pages/_car/choosesize',
              query: {
                productid: item.ProductID,
                type: this.carLevel,
                vehicle: item.Vehicle,
                img: item.ImageUrl
              },
              data: {
                car: item
              }
            })
          }
        }
        if (this.carLevel === 10 || this.carLevel === 11) {
          if (item.PropertyList.length === 0 || this.carLevel === 11) {
            this.carLevel = 10
            if (item.PropertyList.length === 0) {
              // 获取车型属性信息，车型属性不是每辆车都有
              const res = await tuhu.fetch(PROPERTIES_CAR_API, {}, {
                query: {
                  vehicleId: item.ProductID,
                  paiLiang: item.Pailiang,
                  nian: item.Nian,
                  tid: '',
                  properties: ''
                }
              })
              if (res.properties.length > 0) {
                const list = res.properties.map((item) => {
                  item.selected = {
                    propertyKey: item.Name,
                    propertyValue: ''
                  }
                  return item
                })
                return tuhu.navigateTo({
                  url: '/pages/_car/chooseproperties',
                  query: {
                    productid: item.ProductID,
                    type: this.carLevel,
                    vehicle: item.Vehicle,
                    pailiang: item.Pailiang,
                    nian: item.Nian
                  },
                  data: {
                    car: item,
                    properties: list
                  }
                })
              }
            }
          }
        }
        if (this.carLevel > 3 && this.carLevel < 6) {
          if (!item.Pailiang) {
            return tuhu.navigateTo({
              url: '/pages/_car/detail',
              query: {
                productid: item.ProductID,
                type: this.carLevel,
                vehicle: item.Vehicle,
                img: item.ImageUrl
              },
              data: {
                car: item
              }
            })
          }

          if (!item.Nian) {
            return tuhu.navigateTo({
              url: '/pages/_car/detail',
              query: {
                productid: item.ProductID,
                type: this.carLevel,
                vehicle: item.Vehicle,
                pailiang: item.Pailiang,
                img: item.ImageUrl
              },
              data: {
                car: item
              }
            })
          }

          if (this.carLevel === 5) {
            if (!item.SalesName) {
              return tuhu.navigateTo({
                url: '/pages/_car/detail',
                query: {
                  productid: item.ProductID,
                  type: this.carLevel,
                  vehicle: item.Vehicle,
                  pailiang: item.Pailiang,
                  year: item.Nian,
                  img: item.ImageUrl
                },
                data: {
                  car: item
                }
              })
            }
          }
        }
      } else {
        item.noPailiang = true
      }
    }

    if (location.href.indexOf('/_car') < 0) {
      this.carResolve(item)
      return
    }

    const carInfo = Object.assign({}, item)
    if (this.force) {
      const addedCar = await addCar(item)

      if (addedCar && addedCar.CarID) {
        carInfo.CarID = addedCar.CarID
      }
    }

    tuhu.actionWithNative('carChange', item)

    const userInfo = await tuhu.getUserInfo()
    if (!userInfo.islogin) {
      tuhu.localStorage.setItem('_current_car', JSON.stringify(item))
    }

    this.pageBack()
    this.carResolve(carInfo)
  }

  async getDefaultCar() {
    const userInfo = await tuhu.getUserInfo()

    if (userInfo.islogin) {
      const data = await getCarList()

      if (data) {
        if (data.CarHistory.length > 0) {
          this.resolveCar(data.CarHistory[0])
          return this.carPromise
        }

        if (this.force) {
          tuhu.navigateTo({
            url: '/pages/_car/list',
            query: {
              type: this.carLevel
            }
          })

          return this.carPromise
        }
      }
    } else {
      const carResult = await getLocalCar()

      if (carResult) {
        this.resolveCar(carResult)
        return this.carPromise
      }

      if (this.force) {
        tuhu.navigateTo({
          url: '/pages/_car/list',
          query: {
            type: this.carLevel
          }
        })
        return this.carPromise
      }
    }

    return this.carResolve(null)
  }

  async selectCar() {
    if (tuhu.device.tuhuAndroid) {
      window.carCallback = (car) => {
        // tuhu.actionWithNative('getCar').then((data) => {
        //   //  {"Brand":"A - 奥迪","CarBrand":"一汽大众奥迪","CarName":"100","CarNumber":"","CarPlate":"","Carno_City":"","Carno_Province":"","CertificationStatus":-1,"Classno":"","ClickCount":"","CreateTime":"2017/10/27 8:35:49","Engineno":"","FileIntegrity":"0","HistoryPKID":"","Hub":"","InsuranceCompany":"","InsureExpireDate":"","IsDefaultCar":true,"IsDelete":false,"IsShowCertificationInfo":true,"LastBaoYangKM":0,"LastUpDateTime":"2017/10/27 8:35:49","LiYangID":"","LiYangName":"","Nian":"","OdometerUpdatedTime":"","OnRegistrationTime":"","OnRoadMonth":"","PKID":"{1cd51f1c-7190-4cd9-986c-a95f5a64b4bb}","PaiLiang":"","PropertyList":"[]","SpecialTireSize":"","SpecialTireSizeForSingle":"","StandardTireSize":"","TID":"","TireSize":"185/80R14;195/70R14;185/70R14","TireSizeForSingle":"185/80R14","TripDistance":"","VehicleID":"VE-AUDF96AE","VehicleImage":"","VehicleLicenseImage":"","VehicleLogin":"https://img1.tuhu.org/Images/Logo/aodi.png","VehicleName":"100-一汽大众奥迪","androidKey":"cn.TuHu.Activity.AutomotiveProducts.AutomotiveProductsWebViewUI","androidValue":"{\"Url\":\"http://res.tuhu.org/staticpage/chexian/cxlist.html\"}","carInfoLevel":"2","describe":"","expiredDate":"","id":278,"isOnlyHasTwo":false,"masterID":"","masterName":"","oneYearGH":false,"tbCity":""}
        //   let result = data

        //   if (typeof data === 'string') {
        //     try {
        //       result = JSON.parse(data)
        //     } catch (e) {

        //     }
        //   }

        //   if (args.isNeedCar) {
        //     resolveCar(resetSelectCar(result), {
        //       isNeedCar: true,
        //       carLevel: args.carLevel
        //     }, selectCarResolve)
        //   } else {
        //     alert(2222)
        //     selectCarResolve(resetSelectCar(result))
        //   }
        // })
        let result = car

        if (typeof car === 'string') {
          try {
            result = JSON.parse(car)
          } catch (e) {

          }
        }

        this.resolveCar(result)
      }

      tuhu.actionWithNative('selectCar', {
        carLevel: this.carLevel,
        isNeedCar: this.force
      })
    } else if (tuhu.device.tuhuIos) {
      tuhu.actionWithNative('selectCar', {
        level: this.carLevel,
        force: false
      }).then((data) => {
        this.resolveCar(data.car)
      })
    } else {
      const userInfo = await tuhu.getUserInfo()

      if (userInfo.islogin) {
        const data = await getCarList()

        if (data && data.CarHistory.length > 0) {
          tuhu.navigateTo({
            url: '/pages/_car/mycar',
            query: {
              type: this.carLevel
            }
          })
        } else {
          tuhu.navigateTo({
            url: '/pages/_car/list',
            query: {
              type: this.carLevel
            }
          })
        }
      } else {
        tuhu.navigateTo({
          url: '/pages/_car/list',
          query: {
            type: this.carLevel
          }
        })
      }
    }

    return this.carPromise
  }
}

export default Car
