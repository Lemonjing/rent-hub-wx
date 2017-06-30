//app.js
App({
  // 小程序初始化
  onLaunch: function () {
    var that = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                console.log("成功获取到用户信息，objz=", objz);
                wx.setStorageSync('userInfo', objz);//存储userInfo
              },
              fail:function() {
               wx.showModal({
                 title: '注意',
                 content: '拒绝授权后可能无法使用部分服务',
                 showCancel:false,
                 confirmText:"知道了"
               })
              }
            });
            var d = that.globalData;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                console.log("obj=", obj);
                wx.setStorageSync('user', obj);//存储openid  
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },

  // 当小程序启动，或从后台进入前台显示
  onShow: function() {
    console.log("=====app.js@onShow====");
  },
  // 进入后台
  onHide: function () {
    console.log("=====app.js@onHide====");
  },

  globalData: {
    appid: 'wxdb33a5054fab2229',//修改为自己的
    secret: '72dda0d98e5e384eb332514ffebfd423',//修改为自己的
  },
})