//index.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    userInfo: {},
    motto: 'RentHub'
  },

  bindViewTap: function () {
    console.log('===me.js@bindViewTap===');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('===me.js@onLoad===');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===me.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===me.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===me.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===me.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===me.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===me.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===me.js@onShareAppMessage===');
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

  aboutme: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  customData: {
    hi: 'MINA'
  }
})
