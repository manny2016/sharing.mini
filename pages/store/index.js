// pages/store/index.js
Page({
  /**
   * Page initial data
   */
  data: {    
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    bannerList: [{
      linkTo: "",
      pic: "https://www.yourc.club/images/banners/banner-01.jpg"
    },
    {
      linkTo: "",
      pic: "https://www.yourc.club/images/banners/banner-02.jpg"
    },
    {
      linkTo: "",
      pic: "https://www.yourc.club/images/banners/banner-03.jpg"
    }
    ],
    tabs: [
      {
        category: "热销饮品", items: [{
          id: 123,
          image: "https://www.yourc.club/images/banners/banner-01.jpg",
          originalPrice:20,
          price: 15,
          name: "热销饮品1"
        }, {
            id: 123,
            image: "https://www.yourc.club/images/banners/banner-01.jpg",
            originalPrice: 20,
            price: 15,
            name: "热销饮品1"
          }]
      },
      {
        category: "特价饮品", items: [{
          id: 123,
          image: "https://www.yourc.club/images/banners/banner-01.jpg",
          originalPrice: 20,
          price: 15,
          name: "特价饮品1"
        }]
      },
      {
        category: "柠檬系列", items: [{
          id: 123,
          image: "https://www.yourc.club/images/banners/banner-01.jpg",
          originalPrice: 20,
          price: 15,
          name: "特价饮品1"
        }]
      },
      
      {
        category: "奶茶系列", items: [{
          id: 123,
          image: "https://www.yourc.club/images/banners/banner-01.jpg",
          originalPrice: 20,
          price: 15,
          name: "特价饮品1"
        }]
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})