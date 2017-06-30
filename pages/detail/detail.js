//detail.js
var htmlToWxml = require('../../utils/htmlToWxml.js');
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    info: {},
    wxml_content: {},
    pageCount: 1
  },

  bindViewTap: function () {
    console.log('===detail.js@bindViewTap===');
  },

  bindFavTap: function (e) {
    var that = this
    var info_id = e.currentTarget.dataset.id;
    var user_id = wx.getStorageSync("user").openid;
    console.log('===detail.js@bindFavTap===');
    console.log('===info_id=', info_id);
    console.log('===user_id=', user_id);

    wx.request({
      url: 'https://tinymood.com/api/addfav/',
      data: { user_id: user_id, info_id: info_id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        wx.setStorageSync('cacheFavKey', true);
        console.log("add fav success");
      }
    }),

      wx.showToast({
        title: '已收藏',
      })
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

    /**
     * to do
     */
    //load Fav Data 
    // var cacheFavValue = wx.getStorageSync('cacheFavKey');
    // that.setData({ isFav: cacheFavValue });
    // console.log("cacheFavValue=", cacheFavValue);

    //优先加载缓存
    var cacheInfoData = wx.getStorageSync('cacheInfoKey' + options.id);
    var cacheContentData = wx.getStorageSync('cacheContentKey' + options.id);
    if (cacheInfoData && cacheContentData) {
      that.setData({ info: cacheInfoData.detail, wxml_content: cacheContentData });
      console.log("load detail data from cache");
      wx.hideLoading();
      return true
    }

    wx.request({
      url: 'https://tinymood.com/api/detail/' + options.id,
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
        wx.setStorage({
          key: 'cacheInfoKey' + options.id,
          data: res.data,
        }),
          wx.setStorage({
            key: 'cacheContentKey' + options.id,
            data: json_content,
          }),
          console.log("load detail data from network");
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '非常抱歉，网络异常，请稍后再试',
          confirmText: '返回',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
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
