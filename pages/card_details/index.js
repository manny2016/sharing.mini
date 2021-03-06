import cfg from '../../config/index.js';
import ApiList from '../../config/api';
import {
  promisify,
  complete
} from '../../utils/promisify';
import {
  co,
  Promise,
  regeneratorRuntime
} from '../../utils/co-loader';
import request from '../../utils/request';
import { queryMCardDetails, upgradeSharedPyramid } from "../../utils/sharing";

let app = getApp();
Page({
  queryMCardDetails,
  upgradeSharedPyramid,
  /**
   * Page initial data
   */
  data: {
    bannerList: [
      { linkTo: "", pic: "https://www.yourc.club/images/banners/banner-01.jpg" },
      { linkTo: "", pic: "https://www.yourc.club/images/banners/banner-02.jpg" },
      { linkTo: "", pic: "https://www.yourc.club/images/banners/banner-03.jpg" }
    ],  
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    details:{},
    openid:"",
    fromOpenId:"", 
    cards:[],
    cardId:"",
    ready:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const me = this;    
    let token = wx.getStorageSync(cfg.localKey.token);
    console.log("options",token);
    me.setData({      
      openid: token.sharing.openid,
      fromOpenId: options.fromOpenId,
      cardId: options.cardid
    });    
   
    //如果来自于微信分享则提交并保存分享关联信息
    if (options.fromOpenId!=token.token.openid&&options.fromOpenId!=undefined){
      me.upgradeSharedPyramid({
        sharedBy:{appid:cfg.appid,openid:options.sharedBy},
        current: { appid: cfg.appid, openid:token.sharing.openid },
      }).then(res=>{

      });
    }    
    
    me.queryMCardDetails({
      appid:cfg.appid,
      cardid: options.cardid,
      openid:token.token.openid
    }).then(res => {      
      me.setData({ details:res.data});
      me.setData({ready:true});
    });    
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {    const me = this;
  
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
  onTouchAddCardBag: function (event) {  
    const me = this;  
    let token = wx.getStorageSync(cfg.localKey.token);   
    
    request({
      url: ApiList.applyMCard + "?time=" + new Date(),
      method: "POST",
      data: {
        mcode: cfg.mcode,
        cardid: me.data.cardid
      },
      success: function (res) {
        var cards =[{
          cardId: me.data.cardId,
          cardExt: '{"timestamp":' + res.data.timestamp + ',"signature":"' + res.data.signature +  '", "nonce_str":"' + res.data.nonceStr + '"}'
        }];     
        me.addCard(cards);
      }
    });

    


     //getCardExtString
    
  } ,
  addCard:function(cards){
    const me = this;
    let token = wx.getStorageSync(cfg.localKey.token);
    wx.addCard({
      cardList: cards,
      success: function (res) {
        console.log(res);
        request({
          url: ApiList.registerMCard + "?time=" + new Date(),
          method: "POST",
          data: {
            mcode: cfg.mcode,
            openid: token.token.openid,
            appid:cfg.appid,
            unionid:token.sharing.unionid,
            cardList:res.cardList
          },
          success: function (res) {
            
          }
        });
      },
      fail: function (res) {
        console.log("fail", res);
      }
    });
  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function (event) {
    console.log(event);
  } , 
  onSharingCard:function(event){
    let details = event.target.dataset["details"];  
    console.log(details);    
  }
})


