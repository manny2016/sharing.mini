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
import { queryMCardDetails, upgradeSharedPyramid } from "../../utils/endpoints";

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
    fromOpenId:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const me = this;    
    let token = wx.getStorageSync(cfg.localKey.token);
    me.setData({      
      openid: token.sharing.openid,
      fromOpenId: options.fromOpenId
    }); 
    
   
   
    //如果来自于微信分享则提交并保存分享关联信息
    if (options.fromOpenId!=token.token.openid&&options.fromOpenId!=undefined){
      me.upgradeSharedPyramid({
        sharedBy:{appid:cfg.appid,openid:options.fromOpenId},
        current: { appid: cfg.appid, openid:token.sharing.openid },
      }).then(res=>{

      });
    }    
    
    me.queryMCardDetails({
      appid:cfg.appid,
      card_id: options.card_id,
      openid:token.token.openid
    }).then(res => {
      console.log("query MyCard",res.data);
      me.setData({ details:res.data});
    });
    

    
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
  onTouchAddCardBag: function (event) {  
    const me = this;  
    let token = wx.getStorageSync(cfg.localKey.token);    
    request({
      url: ApiList.applyMCard + "?time=" + new Date(),
      method: "POST",
      data: {
        appid: cfg.appid,
        secret: cfg.secret,
        card_id: me.data.details.card_id,
        openid: token.token.openid
      },
      success: function (res) {     
        
        var card = {
          cardId: me.data.details.card_id,
          cardExt: res.data
        }    
        wx.addCard({
          cardList: [card],
          success(res){
            console.log("res.cardlist",res.cardList);
          }
        })
      }
    });
     //getCardExtString
    
  } ,
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


