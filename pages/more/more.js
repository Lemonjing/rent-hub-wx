//index.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    userInfo: {},
    motto: 'RentHub'
  },

  bindViewTap: function () {
    console.log('===more.js@bindViewTap===');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('===more.js@onLoad===');

    var user = wx.getStorageSync("user");
    var userInfo = wx.getStorageSync("userInfo");
    this.setData({userInfo:userInfo});
    console.log("more@user=", user);
    console.log("more@userInfo=", userInfo);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===more.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===more.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===more.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===more.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===more.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===more.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===more.js@onShareAppMessage===');
  },

  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },

  relief: function () {
    wx.navigateTo({
      url: '../relief/relief',
    })
  },

  reply: function () {
    wx.showModal({
      title: '反馈邮箱',
      content: 'xmusaber@163.com',
      confirmText: '好的',
      showCancel: false,
      success: function (res) {
        //do nothing
      }
    })
  },

  tobeadded: function () {
    wx.showToast({
      title: '暂未开放',
    })
  },

  removeCache: function () {
    wx.showModal({
      title: '提示',
      content: '确定清除所有数据缓存？',
      confirmText: "确定",
      success:function(res){
        if (res.confirm) {
          try {
            wx.clearStorageSync()
            wx.showToast({
              title: '清除结束',
            })
          } catch (e) {
            console.log("remove cache error")
          }
        } else if (res.cancel){
          //do nothing
        }
      }
    })
    
  },

  myfav: function () {
    wx.navigateTo({
      url: '../myfav/myfav',
    })
  },

  aboutme: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  customData: {
    hi: 'MINA'
  }
})
