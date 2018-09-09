<template>
  <tuhu-infinite
    @oninfinite="oninfinite"
    endmsg="没有更多晒图"
    :distance="100"
    :nodata='nodata'
    :end ='end'
    v-if='allImages.length>0'
  >
    <div  class="commentPicture" slot="content">
      <ul>
        <li v-for="(item,index) in allImages" :key='index'>
          <img
            v-lazy="{src:item,width:'5.4', height:'5.4', group: group1}"
          />
        </li>
      </ul>
    </div>
  </tuhu-infinite>
</template>

<script>
const getListUrl = 'https://api.tuhu.cn/Comment/GetProductComments'
export default {
  computed: {
    group1() {
      return tuhu.util.getGroup()
    },
    allImages() {
      let allImages = []
      this.imageList.forEach(element => {
        allImages = allImages.concat(element.CommentImages)
      })
      return allImages
    }
  },
  props: {
    tab2Data: {
      type: Object,
      defalut: true
    }
  },
  data() {
    return {
      nodata: false,
      end: false,
      imageList: [],
      PageNumber: 1,
      MaxPageCount: 1,
      tabData: this.tab2Data,
      resolve: () => {},
      reject: () => {}
    }
  },
  watch: {
    PageNumber(value, oldValue) {
      // 第一次请求发送
      if (value === 1) {
        this.getList(true)
      } else if (value) {
        this.getList(false)
      }
    }
  },
  methods: {
    getList(isRefersh = false) {
      tuhu.fetch(getListUrl, {}, {
        query: {
          productId: this.tabData.productId,
          commentType: 1,
          PageNumber: this.PageNumber
        }
      })
        .then((res) => {
          if (isRefersh) {
            this.imageList = res.Data
          } else {
            this.imageList.push(...res.Data)
          }
          // 第一次请求就结束的两种情况
          if (res.MaxPageCount === 1) {
            this.end = true
          }
          if (res.MaxPageCount === 0) {
            this.nodata = true
          }
          this.maxPageCount = res.MaxPageCount
          this.resolve()
        })
    },
    oninfinite (ev, resolve, reject) {
      // 如果当前页数小于总页数，增加页数
      if (this.PageNumber < this.maxPageCount) {
        this.PageNumber = this.PageNumber + 1
        this.resolve = resolve
      } else {
        this.end = true
      }
    }
  },
  updated() {
    this.tabData = this.tab2Data
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="less">
.commentPicture{
  width:100%;
  // height:100%;
  
  ul{
    padding:1rem 0.75rem;
    background-color:#fff;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
    margin: 0;
    li{
      height: 5.4rem;
        width: 5.4rem;
        margin-bottom:0.5rem;
        background-color: rgba(238, 238, 238, 1);
        display:flex;
        align-items:center;
        justify-content:center;
      img{
        height: 5.4rem;
        min-height: 5.4rem;
        max-height: 5.4rem;
        width: 5.4rem;
        min-width: 5.4rem;
        max-width: 5.4rem;
      }
      img[src*='loading']{
        width:2rem;
        height:2rem;
      }
    }
  }
  .nocomment{
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .img{
      height: 3.5rem;
      width: 3.5rem;
      margin-bottom:0.6rem;

      img{
        height: 3.5rem;
        width: 3.5rem;
      }
    }
    p{
      font-size: 0.65rem;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
