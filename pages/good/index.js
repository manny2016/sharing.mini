var Zan = require('../../dist/index');
var common = require('../../utils/common.js');
const WxParse = require('../../utils/wxParse/wxParse.js');
import {
  queryProductDetails
} from "../../utils/sharing";
import cfg from '../../config/index.js';
var app = getApp()

Page(Object.assign({}, Zan.Quantity, {
  queryProductDetails,
  data: {
    indicatorDots: true, //是否出现焦点
    autoplay: true, //是否自动播放轮播图
    interval: 4000, //时间间隔
    duration: 1000, //延时时间
    detail: {
      "imageUrl": "https://www.yourc.club/images/banners/1.jpg"
    }, //页面数据
    hiddenModal: true,
    id: 0,
    goodNum: 10000, //库存
    price: 10.00, //商品价格
    option: "",
    // minPrice: 8,//商品最低价格
    // maxPrice: 20,//商品最高价格
    quantity1: {
      quantity: 1,
      min: 1,
      max: 20
    },
    actionType: 'payOrder',
    cartResult: false,
    specifications: [],
    isOption: true, //是否显示商品属性
    fare: 0.00,
    imgUrls: []
  },
  onLoad: function(options) {
    if (options.fromid) {
      wx.setStorageSync(cfg.localKey.sharedBy, options.fromid)
    }
    if (!options.id) {
      common.showModal("获取商品信息失败", '', false, () => {
        wx.navigateBack({
          delta: 1
        });
      });
      return false;
    }
    this.setData({
      id: options.id
    });
    this.getData(); //获取页面数据
    // this.getCartResult();//购物车是否有商品
  },

  onShow: function() {},

  getData: function() {
    const me = this;
    wx.showLoading({
      title: '加载中'
    });
    me.queryProductDetails(me.data.id).then(res => {
      if (!res.data) {
        common.showModal("商品已下架", '', false, () => {
          wx.navigateBack({
            delta: 1
          });
        });
        return;
      }    
        
      me.setData({
        imgUrls: res.data.settings.banners,
        price: res.data.fixedPrice,
        // fare: 5,
        name: res.data.name,
        detail: {
          name: res.data.name,
          description: res.data.description,
          imageUrl: res.data.imageUrl
        },
        specifications: res.data.settings.specifications
      });
      me.replaceSelectOption(res.data.settings.specifications);
      wx.hideLoading();
    });
  },
  replaceSelectOption: function (specifications){
    const me = this;
    var optionSummary = "";
    let fixedPrice = 0;   
    for (var item in specifications) {      
      for (var index in specifications[item].options)        
        if(index==specifications[item].current){
          optionSummary +=specifications[item].options[index].name+",";
          if(specifications[item].options[index].price){
            fixedPrice+=specifications[item].options[index].price;
          }
        }
    }            
    me.setData({ price: (fixedPrice / 100).toFixed(2)});
    me.setData({option:optionSummary});
  },

  placeOrder: function(event) {
    var name = event.target.dataset.name;
    this.setData({
      actionType: name
    })

    this.showModal();
  },

  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  click_cancel: function() {
    this.hideModal()
  },

  payOrder: function() {
    //获取传递过来的数量，商品名称，价格
    const me = this;
    let number = me.data.quantity1.quantity;    
    let properties = me.getProductProperties();    
    if(properties==""){
      common.showModal("请选择商品规格", '', false, () => {});
      return;
    }
    

    let detailArray = {
      number: number,
      price: me.data.price,
      name: me.data.detail.name,
      pic: me.data.detail.imageUrl,
      fare: 0,
      option: properties,
    };
    let orderResult = new Array();
    orderResult.push(detailArray);
    wx.setStorage({
      key: "orderResult",
      data: orderResult
    })
    wx.redirectTo({
      url: '../payorder/index'
    })
  },

  addCart: function() {
    const me = this;    
    let number = me.data.quantity1.quantity;
    let detailArray = {
      number: number,
      // good_number: good_number,
      id: me.data.id,
      price: me.data.price,
      name: me.data.detail.name,
      pic: me.data.detail.imageUrl,
      // fare: me.data.detail.get('fare'),
      option:me.data.option,
      active: true
    };
    console.log(detailArray);
    let cartResult = wx.getStorageSync('cartResult') || [];
    cartResult.push(detailArray);
    wx.setStorage({
      key: "cartResult",
      data: cartResult
    })

    this.hideModal();
    this.getCartResult();
    common.showTip("加入购物车成功");
  },


  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;

    this.setData({
      [`${componentId}.quantity`]: quantity
    });
  },

  getCartResult: function() {
    wx.getStorage({
      key: 'cartResult',
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            cartResult: true
          });
        }
      },
    })
  },

  index: function() {
    wx.switchTab({
      url: '../dashboard/index'
    })
  },

  cart: function() {
    wx.switchTab({
      url: '../cart/index'
    })
  },

  //选择商品属性
  selectOption: function(e) {
    const me = this;
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let options = me.data.specifications;
    options[item].current = index;
    me.setData({specifications:options});    
    me.replaceSelectOption(me.data.specifications);   
  },
  getProductProperties:function(){
    let properties = "";
    console.log("this.data.specifications",this.data.specifications);
    if(this.data.specifications){
      for (var item in this.data.specifications) {
        var specify = this.data.specifications[item]
        var specifyName = specify.options[specify.current].name;
        properties += specifyName+",";        
      }
    }
    return properties;
  }
}))