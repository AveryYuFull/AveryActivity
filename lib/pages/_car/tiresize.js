const tires = [
  '145/70R12',
  '155/65R13',
  '215/65R15',
  '265/35R21',
  '195/75R16',
  '235/50R18',
  '195/55R15',
  '295/40R21',
  '175/65R15',
  '185/70R14',
  '295/40R20',
  '235/55R19',
  '205/80R14',
  '215/60R16',
  '235/65R17',
  '195/60R16',
  '195/50R16',
  '205/55R16',
  '255/55R20',
  '275/65R17',
  '255/40R21',
  '175/70R13',
  '255/45R20',
  '215/55R17',
  '285/40R22',
  '265/60R18',
  '285/45R19',
  '225/55R17',
  '175/65R14',
  '325/40R21',
  '235/70R16',
  '185/60R14',
  '295/70R17',
  '265/40R20',
  '265/50R20',
  '235/35R19',
  '225/50R18',
  '195/55R16',
  '205/60R15',
  '235/60R17',
  '195/50R15',
  '255/60R17',
  '225/60R16',
  '225/50R17',
  '205/50R15',
  '215/55R18',
  '225/40R19',
  '215/45R17',
  '175/70R14',
  '235/40R20',
  '185/80R14',
  '235/60R16',
  '175/60R13',
  '285/60R18',
  '245/75R17',
  '215/69R16',
  '285/70R17',
  '225/45R17',
  '185/60R15',
  '225/45R18',
  '275/40R22',
  '245/45R19',
  '245/55R19',
  '225/55R19',
  '225/70R15',
  '225/60R18',
  '205/65R16',
  '235/35R20',
  '275/50R20',
  '225/45R19',
  '215/45R16',
  '215/60R17',
  '165/70R13',
  '225/50R16',
  '255/65R16',
  '215/45R18',
  '225/65R17',
  '265/40R21',
  '275/40R20',
  '205/50R17',
  '155/60R15',
  '225/70R16',
  '235/45R17',
  '235/45R18',
  '215/70R16',
  '265/35R19',
  '205/55R15',
  '285/45R20',
  '165/60R14',
  '255/45R18',
  '265/65R17',
  '255/45R19',
  '245/40R20',
  '255/55R19',
  '245/45R20',
  '245/40R19',
  '205/70R15',
  '275/40R19',
  '295/35R20',
  '235/45R19',
  '245/45R17',
  '225/60R17',
  '185/65R12',
  '205/40R17',
  '195/45R16',
  '235/45R20',
  '215/65R16',
  '165/70R14',
  '235/50R19',
  '195/60R15',
  '185/65R14',
  '265/70R17',
  '195/45R15',
  '275/45R19',
  '255/35R19',
  '245/75R16',
  '215/55R16',
  '215/70R15',
  '195/70R14',
  '245/45R18',
  '175/60R14',
  '225/55R16',
  '225/75R15',
  '265/45R21',
  '205/45R17',
  '295/45R20',
  '195/65R15',
  '265/45R20',
  '275/35R21',
  '175/60R15',
  '275/45R18',
  '215/50R17',
  '265/35R18',
  '255/45R17',
  '235/55R17',
  '195/60R14',
  '275/45R21',
  '255/60R19',
  '185/55R16',
  '215/70R17',
  '235/40R18',
  '295/30R20',
  '205/65R15',
  '285/45R21',
  '205/60R16',
  '225/35R18',
  '285/30R19',
  '215/40R17',
  '245/40R18',
  '285/40R19',
  '225/75R16',
  '275/30R19',
  '245/35R19',
  '235/55R18',
  '245/70R16',
  '215/75R16',
  '185/65R15',
  '225/40R18',
  '315/35R20',
  '165/65R13',
  '205/45R16',
  '245/35R18',
  '285/45R22',
  '255/40R18',
  '215/75R14',
  '295/35R21',
  '245/50R20',
  '195/70R15',
  '255/50R19',
  '285/75R16',
  '235/75R16',
  '265/35R20',
  '245/60R18',
  '275/35R20',
  '245/65R17',
  '235/65R18',
  '285/50R20',
  '265/70R16',
  '255/50R20',
  '285/35R18',
  '275/35R19',
  '265/75R16',
  '175/55R15',
  '215/75R15',
  '255/35R18',
  '275/65R18',
  '205/50R16',
  '235/50R17',
  '285/65R17',
  '285/35R20',
  '265/50R19',
  '255/40R20',
  '255/55R18',
  '285/40R21',
  '185/55R15',
  '215/40R18',
  '275/45R20',
  '245/40R17',
  '255/40R19',
  '235/60R18',
  '205/70R14',
  '255/60R18',
  '275/30R21',
  '245/35R21',
  '235/40R17',
  '225/55R18',
  '235/85R16',
  '295/45R19',
  '245/50R18',
  '235/55R20',
  '235/75R15'
]

const cols = []

tires.forEach((data) => {
  const tire = data.split(/[/R]/)

  const findMain = cols.some((item) => {
    if (item.name === tire[0]) {
      const findChild = item.sub.some((citem) => {
        if (citem.name === tire[1]) {
          citem.sub.push({
            name: tire[2]
          })

          return true
        }
      })

      if (!findChild) {
        item.sub.push({
          name: tire[1],
          sub: [{
            name: tire[2]
          }]
        })
      }

      return true
    }
  })

  if (!findMain) {
    cols.push({
      name: tire[0],
      sub: [{
        name: tire[1],
        sub: [{
          name: tire[2]
        }]
      }]
    })
  }
})

cols.sort((item1, item2) => {
  item1.sub.sort((item3, item4) => {
    item3.sub.sort((item5, item6) => {
      return item5.name - item6.name
    })
    return item3.name - item4.name
  })
  return item1.name - item2.name
})

export default {
  data() {
    return {
      selected: false,
      tires: (this.options.car.TireSize || this.options.car.Tires || '').split(';'),
      img: this.options.img,
      vehicle: this.options.vehicle,
      slideIndex: 0,
      tireIndex: this.options.car.TireSizeForSingle || '',
      cols: cols,
      selectedValue: []
    }
  },
  created() {
  },
  beforeDestroy() {
    // if (!this.selected) {
    //   setTimeout(() => {
    //     const instance = tuhu.car.getInstance()
    //     instance.force = false
    //     instance.getDefaultCar()
    //   })
    // }
  },
  methods: {
    selectedCar(item = this.selectedValue) {
      if (!item) {
        return
      }

      let car = this.options.car
      this.selected = true

      if (car) {
        car.TireSizeForSingle = item

        const instance = tuhu.car.getInstance()
        instance.resolveCar(car)
      }
    },
    tab(index) {
      this.slideIndex = index
    },
    onSlideChangeStart(instance) {
      this.slideIndex = instance.activeIndex
    },
    formatvalue(picker, value, displayName) {
      this.selectedValue = `${value[0]}/${value[1]}R${value[2]}`
      return this.selectedValue
    }
  }
}
