// 小程序通过配置信息;
const AppConfig = {
  appid: "wx6a15c5888e292f99",                //app id
  secret: "74c4c300a46b8c6eb8c79b3689065673",           //app secret
  mcode:"92511402MA6941EG0R",
  mid:"",
    ak: "db185e5dba386e42aeea9723d4a1fc66",                // 高德地图key
    bk: "your baidu map key",           // 百度地址key

    //定位信息
    location: {
        //默认
        defaults: {
            lat: 30.22965,
            lng: 120.192567,
            areaId: "330102",
            province: "四川省",
            city: "成都市",
            district: "锦江区",
            street: "某街道",
            source: "default"
        },
        //当前
        current: null,
        //GPS
        gps: null
    },

    // 本地存储名称集合
    localKey: {
        token: "_user_info",                     // 用户信息
        qcRpt: "_qc_report",                    // 质检报告
        session:"_session",
        withCredentials:"_withCredentials",
        
    },
};

export default AppConfig;