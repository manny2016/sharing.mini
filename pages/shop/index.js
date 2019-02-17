//index.js
//获取应用实例



Page({
  data: {
    products: [], //页面数据
    pagination: 0, //页码
    pageSize: 8, //每页数据
    nodata: true, //无数据
    searchVal:""
  },
  onLoad() {
    //初始页面第一次获取页面数据
    this.getData();
  },
  input(e){
    this.setData({
      searchVal: e.detail.value
    })
    this.search()
  },
  clear(){
    this.setData({
      products: [], //页面数据
      pagination: 0, //页码
      pageSize: 8, //每页数据
      nodata: true, //无数据
      searchVal: ""
    })
    this.getData();
  },
  search(){
   
  },
  getData() {
    
  },
  router(e) {
    //跳转至商品详情页
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/good/index?id=${id}`
    })
  },
  onReachBottom() {
    //下拉触底加载更多数据
    this.getData();
  }
})
