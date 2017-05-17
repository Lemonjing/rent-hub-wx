//logs.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===log.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===log.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===log.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===log.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===log.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===log.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===log.js@onShareAppMessage===');
  },

  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },

  customData: {
    hi: 'MINA'
  }
})