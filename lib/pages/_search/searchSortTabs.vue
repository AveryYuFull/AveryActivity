<template>
  <div class="sortTabs">
		<div class="sortItem"
			v-for="(item,index) in tabsStatusType"
			:key='index'
			:class="tabsStatusArray[index]"
			@click="handleClickTab(index)"
		>
			<span v-text="item.name"></span>
		</div>
		<div class="sortItem" :class="shiftStatusObject"  @click='handleClickShift'>
			<span>筛选</span>
		</div>
    <!-- 覆盖层 -->
    <div :class="showCover?'sort-cover show':'sort-cover'" @touchstart="close"></div>
    <tuhu-panel
      ref="panel"
      dir="right"
      open-type="cover"
      class="sort-pannel"
      @closed='closePnnel'
    >
      <div slot="content" class='panel-page'>
        <!-- <div v-if='noFilter'>
        
        </div> -->
        
        <div class="infiniteBox">
          <div :end ='true' class='sorttasbs-infinite'>
            <div slot="content">
              <div class='panel-title'>价格区间(元)</div>
              <div class='panel-input'>
                <input type="text" ref='min' placeholder="最低价" v-model.number='minMoney'>—
                <input type="text" ref='max' placeholder="最高价" v-model.number='maxMoeny'>
              </div>
              <div class='panel-brands' v-if="filterList">
                <div v-for="(item,index) in filterList" :key="index" style="clear:both">
                  <!-- <div class='brands-type' :class='"brands-type-"+index === "#" ? "0":index'>{{index}}</div>
                  <div :class="index === '#' ? 'brands-type brands-type-0' :'brands-type brands-type-'+index ">{{index}}</div> -->
                  <div class="brands-type">
                    <div>{{item.Name}}</div>
                    <div @click="expand(index)" :class="{selected:item.filterItem.length>0,expanded:item.expanded}"><span>{{item.filterItem.length>0 ? item.filterItem.join('、') : '全部'}}</span></div>
                  </div>
                  <div :class="{brandsList:true, expanded:item.expanded}">
                    <div :class="{brandsName: true, selected: item2.selected}"
                      v-for="(item2, index2) in item.ItemList"
                      :key="index2"
                      @click='handleClickBrand(item2.Name, index, index2)'>
                      {{item2.Name}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='panel-buttons'>
          <div class='panel-button' @click="clear">重置</div>
          <div class='panel-button' @click='commit'>确认</div>
        </div>
      </div>
    </tuhu-panel>
  </div>
</template>

<script>
/**
 * author: lijingwen@tuhu.cn
 * date: 2017/11/23
 * desc: 排序筛选tab
 * eg:<tuhu-sortTabs
          :tabsStatusType='tabsStatusType'
          :callbackClickTab='callbackClickTab'
        >
        </tuhu-sortTabs>
    tabsStatusType: [
          { // 没有上下按钮的筛选
            name: '综合',
            type: 0, // 筛选id
            choosed: true // 是否默认选中
          }, {
            name: '销量',
            up: 2,
            down: 1,
            default: 'up', // 默认展示的是啥样的
            choosed: false
          }, {
            name: '价格',
            up: 5,
            down: 6,
            default: 'down',
            choosed: false
          }
        ]
callbackClickTab(type) {
      }
 */
export default {
  props: {
    tabsStatusType: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    callbackClickTab: {
      type: Function,
      required: false,
      default: () => {
      }
    },
    handlePanelHiden: {
      type: Function,
      required: false,
      default: () => {
      }
    },
    keyword: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      tabsStatusArray: [
      ],
      shiftStatusObject: {
        choosed: false,
        shift: true
      },
      test: false,
      showCover: false,
      filterList: null,
      reg: /^([^-]+?)-(.+?)$/,
      brandSelected: [],
      recommendSelected: '',
      minMoney: '',
      maxMoeny: '',
      noFilter: false,
      reject: () => {},
      Easing: {
        easeBoth: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t : 0.5 * (1 - (--t) * (t - 2))
        }
      }
    }
  },
  beforeCreate() {
  },
  created() {
    if (this.keyword !== '') {
      tuhu.fetch(`https://api.tuhu.cn/Search/SelectFilterValues?key=${this.keyword}`)
          .then((res) => {
            if (res.Code === 1) {
              if (res.FilterList.length === 0) {
                this.noFilter = true
              } else if (res.FilterList) {
                this.initFilterList(res.FilterList)
              }
            }
          })
    }
    let tabsStatusArray = []
    this.tabsStatusType.forEach(element => {
      let tabStatus = {}
      // 如果是没有排序的筛选
      if (element.type !== undefined) {
        // 默认选中
        if (element.choosed) {
          tabStatus.choosed = true
        } else {
        // 默认不是选中
          tabStatus.choosed = false
        }
        tabStatus.up = false
        tabStatus.down = false
      } else {
        // 有排序的筛选
        if (element.default === 'up') {
          tabStatus.up = true
          tabStatus.down = false
        } else if (element.default === 'down') {
          tabStatus.up = false
          tabStatus.down = true
        }
        tabStatus.choosed = element.choosed
      }
      tabsStatusArray.push(tabStatus)
    })
    this.tabsStatusArray = tabsStatusArray
  },
  watch: {
    tabsStatusArray(val, oldVal) {
      let _index = 0
      let tab = this.tabsStatusArray.find((element, index) => {
        _index = index
        return element.choosed
      })
      let typeKey
      if (tab.down) {
        typeKey = 'down'
      } else if (tab.up) {
        typeKey = 'up'
      } else {
        typeKey = 'type'
      }
      this.callbackClickTab('sequence', this.tabsStatusType[_index][typeKey])
    },
    shiftStatusObject(val, oldVal) {
    },
    reject (reject) {
      reject()
    },
    brandSelected(value) {
      if (this.minMoney === '' && this.maxMoeny === '' && this.brandSelected.length === 0) {
        this.shiftStatusObject = {...this.shiftStatusObject, choosed: false}
      } else {
        this.shiftStatusObject = {...this.shiftStatusObject, choosed: true}
      }
      // this.callbackClickTab('brand', value)
    },
    minMoney() {
      if (this.minMoney === '' && this.maxMoeny === '' && this.brandSelected.length === 0) {
        this.shiftStatusObject = {...this.shiftStatusObject, choosed: false}
      } else {
        this.shiftStatusObject = {...this.shiftStatusObject, choosed: true}
      }
    },
    maxMoeny() {
      if (this.minMoney === '' && this.maxMoeny === '' && this.brandSelected.length === 0) {
        this.shiftStatusObject = {...this.shiftStatusObject, choosed: false}
      } else {
        this.shiftStatusObject = {...this.shiftStatusObject, choosed: true}
      }
    }
  },
  methods: {
    closePnnel() {
      this.showCover = false
      this.$refs.min.blur()
      this.$refs.max.blur()
    },
    getElementTop(elem) {
      let elemTop = elem.offsetTop
      elem = elem.offsetParent
      while (elem != null) {
        elemTop += elem.offsetTop
        elem = elem.offsetParent
      }
      return elemTop
    },
    scrollToElement (dom, container = document.body, {duration = 240, easing = this.Easing.easeBoth, interval = 15, padding = 0} = {}) {
      if (!dom || !(dom instanceof HTMLElement)) {
        throw new Error('scrollToElement need a dom element')
      }
      let screenHeight = container.clientHeight || document.documentElement.clientHeight
      let pageScrollHeight = container.scrollHeight || document.body.scrollHeight
      let maxScrollHeight = pageScrollHeight - screenHeight
      let domToPageTop = this.getElementTop(dom) - padding // 要滑到的位置
      if (domToPageTop > maxScrollHeight) {
        domToPageTop = maxScrollHeight
      }
      let curScrollTop = container.scrollTop || document.body.scrollTop || window.scrollY || document.documentElement.scrollTop // 当前所在的位置
      let distance = domToPageTop - curScrollTop // 滑动的距离
      let k = distance / easing(1)
      let duringTime = 0 // 运动经过的时间
      let timer = setInterval(() => {
        duringTime += interval
        let percent = duringTime / duration
        let scrollNum = k * easing(percent)
        if ((duration - duringTime) > interval) {
          container.scrollTo(0, scrollNum + curScrollTop)
        } else {
          clearInterval(timer)
          container.scrollTo(0, domToPageTop)
        }
      }, interval)
    },
    handleSelectLetter (e) {
      // debugger
      let letter = e.currentTarget.outerText
      // # 是非法的class类名，所以#改为0
      let classname = '.brands-type-' + (letter === '#' ? '0' : letter)
      this.scrollToElement($(classname)[0], $('.sorttasbs-infinite')[0])
    },
    initFilterList(data) {
      const filterList = data
      filterList.map((item) => {
        item.filterItem = []
        item.expanded = false
        return item.ItemList.map(x => {
          x.Name = x.Name.indexOf('-') > -1 ? x.Name.split('-')[1] : x.Name
          x.selected = false
          return x
        })
      })
      this.filterList = filterList
    },
    clear () {
      this.brandSelected = []
      this.minMoney = ''
      this.maxMoeny = ''
      this.recommendSelected = ''
      this.initFilterList(this.filterList)
    },
    commit () {
      this.handlePanelHiden(false)
      this.callbackClickTab('brand', this.brandSelected)
      this.callbackClickTab('money', [this.minMoney, this.maxMoeny])
      this.callbackClickTab('recommend', this.recommendSelected)
      this.$refs.panel.close()
      this.showCover = false
    },
    close () {
      this.handlePanelHiden(false)
      this.callbackClickTab('brand', this.brandSelected)
      this.callbackClickTab('money', [this.minMoney, this.maxMoeny])
      this.callbackClickTab('recommend', this.recommendSelected)
      this.$refs.panel.close()
      this.showCover = false
    },
    handleClickBrand(value, index, index2) {
      const filterList = this.filterList
      filterList[index].ItemList.map(x => {
        const name = filterList[index].Name
        if (x.Name === value) {
          if (!x.selected) {
            if (name === '品牌') {
              if (this.brandSelected.length >= 5) {
                tuhu.toast('最多能选择5项')
                return
              }
              this.brandSelected.push(x.Name)
              filterList[index].filterItem.push(x.Name)
            } else {
              filterList[index].filterItem = [x.Name]
              this.recommendSelected = x.Name
            }
            x.selected = !x.selected
          } else {
            if (name === '品牌') {
              const delIndex = this.brandSelected.indexOf(value)
              this.brandSelected.splice(delIndex, 1)
              filterList[index].filterItem.splice(delIndex, 1)
            } else {
              filterList[index].filterItem = []
              this.recommendSelected = ''
            }
            x.selected = !x.selected
          }
        } else {
          if (name === '推荐') {
            x.selected = false
          }
        }
        return x
      })
      this.$set(this.filterList, index, filterList[index])
    },
    handleClickTab(index) {
      // 如果可以排序，切换排序
      if (this.tabsStatusArray[index].choosed && (this.tabsStatusArray[index].up || this.tabsStatusArray[index].down)) {
        this.tabsStatusArray[index].up = !this.tabsStatusArray[index].up
        this.tabsStatusArray[index].down = !this.tabsStatusArray[index].down
      }
      // 选中当前，取消其他选中
      this.tabsStatusArray.forEach(element => {
        element.choosed = false
      })
      this.tabsStatusArray[index].choosed = true
      // 触发watch
      this.tabsStatusArray.splice(1, 0)
    },
    handleClickShift (e) {
      if (!this.noFilter) {
        // 显示
        this.handlePanelHiden(true)
        this.showCover = true
        this.$refs.panel.open()
      }
    },
    expand(index) {
      // const filterList = this.filterList
      this.filterList[index].expanded = !this.filterList[index].expanded
      // this.$set(this.filterList, index, this.filterList[index])
    }
  }
}
</script>

<style scoped lang="less">
  .panel {
    width: 15rem;
  }
  .sorttasbs-infinite {
    background: #eee;
  }
  .panel.panel-right.panel-cover{
    position: fixed;
    // width: 100%;
    background-color:#fff;
  }
  // 侧边栏样式
  .panel-page{
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    color:#333;
     .infiniteBox{
       flex:1;
       overflow-y:auto;
       position: relative;
       background-color:#fff;
     }
    .panel-title{
      padding: 0.5rem;
      text-align: left;
      color:#333;
      background: #fff;
    }
    .panel-input{
      display: flex;
      padding: 0.5rem;
      align-items: center;
      justify-content: space-between;
      color: #ddd;
      background: #fff;
      input{
        border:1px solid #ddd;
        background-color: #f9f9f9;
        width: 44%;
        padding: 0.2rem;
        font-size: 0.6rem;
        color: #000;
        text-align:center;
      }
    }
    .panel-brands{
      padding: 0 10px;
      margin-top: 8px;
      background: #fff;
      .brands-type{
        text-align: left;
        height:1.2rem;
        line-height:1.2rem;
        color:#9897a7;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        div:last-child {
          position: relative;
          padding-right: 0.5rem;
          width: 90%;
          text-align: right;
          &.selected {
            color: #df3448;           
          }
          &:after{
            position:absolute;
            top: 0.3rem;
            content: '';
            width: 0.4rem;
            height: 0.4rem;
            display: inline-block;
            border: 0.1rem solid;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            border: 1px solid #c7c7cc;
            border-left-width: 0;
            border-top-width: 0;
          }
          &.expanded{
            &:after{
              -webkit-transform: rotate(-135deg);
              transform: rotate(-135deg);
              top: 0.4rem;
            }
          }
          span {
            width: 95%;
            display: inline-block;
            margin-right: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .brandsList{
        overflow: hidden;
        height: 1.8rem;
        &.expanded {
          height: auto;
        }
      }
      .brandsName{
        width: 30%;
        float: left;
        margin-right: 5%;
        text-align: center;
        font-size: 0.6rem;
        color: #999;
        box-sizing: border-box;
        border: 1px solid #999;
        height: 1.4rem;
        line-height: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0.5rem;
        &:nth-child(3n){
          margin-right: 0;
        }
        &.selected{
          background:#df3448;
          color: #fff;
          border: none;
        }
      }
    }
    .panel-buttons{
      width: 100%;
      height: 2.5rem;
      justify-content: space-between;
      align-items: center;
      display: flex;
      .panel-button{
        width:50%;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: center;
        border-top:1px solid  #d9d9d9;
        color: #333;
        &:nth-of-type(1){
          background-color: #fff;
        }
        &:nth-of-type(2){
          background:#df3448;
          color:#fff;
        }
      }
    }
    
  }
	.sortTabs{
		height: 2rem;
 		background-color: #fff;
 		position: relative;
 		display:flex;
 		padding:0 0.75rem;
    justify-content:space-between;
    
		 &:after{
 			content:"";
 			position: absolute;
 			left:0;
 			right: 0;
 			bottom:0;
 			height: 1px;
 			background-color: #d9d9d9;
 			transform:scaleY(0.5);
		 }
		.sortItem{
			flex:1;
			text-align: center;
			color: rgba(51, 51, 51, 1);
			position: relative;
			span{
				display:inline-block;
				font-size: 0.7rem;
				height:2rem;
				line-height: 2rem;
			}
			&.choosed{
				color: rgba(223, 52, 72, 1);
				span{
				}
			}
			&.up{
				border-color: #d9d9d9;
				&.choosed{
					border-color: rgba(223, 52, 72, 1);
				}
				&:after{
					content: '';
					display: block;
					position: absolute;
					display: flex;
					right: 0;
					align-items: center;
					bottom: 0;
					top: 0;
					border:0.22rem ;
					border-color:transparent;
					border-bottom-color: inherit ;
					height: 0;
					border-style: solid;
					top: 0.6rem;
				}
			}
			&.down{
				border-color: #d9d9d9;
				&.choosed{
					border-color: rgba(223, 52, 72, 1);
				}
				&:after{
					content: '';
					display: block;
					position: absolute;
					display: flex;
					right: 0;
					align-items: center;
					bottom: 0;
					top: 0;
					border:0.22rem ;
					border-color:transparent;
					border-top-color: inherit ;
					height: 0;
					border-style: solid;
					top: 1rem;
				}
			}
			&.shift{
				background: url(https://res.tuhu.org/images/xcx/filter.png) no-repeat 66px 15px;
				background-size: 13px 13px;
				&.choosed{
					background: url(https://img1.tuhu.org/activity/image/ef4b/20b9/c21b18216d22218e5654fee5_w50_h48.png) no-repeat 66px 15px;
					background-size: 13px 13px;
				}
			}
    }
    .sort-cover{
      display: none;
      &.show{
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
        z-index: 30;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
	}
</style>