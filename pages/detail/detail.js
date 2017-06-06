//detail.js
var htmlToWxml = require('../../utils/htmlToWxml.js');
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    info: {},
    wxml_content: {},
    pageCount:1
  },

  bindViewTap: function () {
    console.log('===detail.js@bindViewTap===');
  },

  stockClick: function (e) {
    var secCode = e.currentTarget.dataset.seccode;
    var secName = e.currentTarget.dataset.secname;
    console.log("stockClick:" + secCode + ";secName:" + secName);
  },
  
  imageLoad: function (e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var windowWidth = wx.getSystemInfoSync().windowWidth - 30;
    var picHeight = (height / width) * windowWidth;
    var index = e.currentTarget.dataset.index;
    this.data.wxml_content[index].attr.height = picHeight;
    this.setData({
      wxml_content: this.data.wxml_content
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中..."
    });
    console.log("options.id=", options.id)
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/api/detail/' + options.id,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var json_content = htmlToWxml.html2json(res.data.detail.content);
        // console.log(json_content);
        that.setData({ info: res.data.detail, wxml_content: json_content });
        // console.log(that.data.wxml_content);
      },
      complete: function () {
        // 关闭loading
        wx.hideLoading();
      }
    })
    console.log('===detail.js@onLoad===');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var pageCount = Math.random() * 10 + Math.random();
    pageCount = pageCount.toFixed(1);
    this.setData({ pageCount: pageCount });
    console.log(pageCount);
    console.log('===detail.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===detail.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===detail.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===detail.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===detail.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===detail.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===detail.js@onShareAppMessage===');
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
