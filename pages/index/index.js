//index.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    list: [],
    offset: 0,
    loading: false,
    plain:false,
    moreHidden:"",
    sortTab:0,
  },
  // 解决图片404错误
  errorImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var replaceImgUrl = "http://tgi1.jia.com/117/511/17511183.jpg";
    this.data.list[errorImgIndex].coverimage = replaceImgUrl;
    this.setData(
      { list: this.data.list }
    );
  },
  toSearch:function(e) {
    var keyword = e.detail.value;
    wx.navigateTo({
      url: '../index-search/index-search?keyword='+keyword,
    })
  },
  loadMore(e) {
    if (this.data.list.length === 0) return
    this.setData({ loading: true })
    this.setData({ plain: true })
    var currentOffset = e.currentTarget.dataset.offset;
    var that = this;
    var currentLimit = 10;
    var sortTab = this.data.sortTab

    console.log("#2 sortTab=", sortTab)

    wx.request({
      url: 'https://tinymood.com/api/lists/all/',
      data: { offset: currentOffset, limit: currentLimit, sort: sortTab},
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.topic_list.length == 0) {
          wx.showToast({
            title: "没有更多了"
          });
        }
        that.setData({
          loading: false,
          plain:false,
          offset: res.data.topic_list.length + currentOffset,
          list: that.data.list.concat(res.data.topic_list)
        })
      },
      fail: function (res) {
        wx.showToast({
          title: "服务器异常，请稍后再试。",
          duration:3000
        });
        that.setData({
          loading: false,
          plain: false
        })
        console.log("load more fail")
      },
      complete: function () {
      }
    })
  },

  loadData: function (offset) {
    // 显示loading
    wx.showLoading({
      title:"加载中..."
    });
    var that = this
    var limit = 8
    var sortTab = this.data.sortTab

    console.log("#1 sortTab=", sortTab)

    wx.request({
      url: 'https://tinymood.com/api/lists/all/',
      data: { offset: offset, limit: limit, sort: sortTab},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ list: res.data.topic_list });
        var newoffset = res.data.topic_list.length + offset
        that.setData({ offset: newoffset });
        //cache
        if (offset == 0) {
          wx.setStorage({
            key: 'cacheIndexDataKey',
            data: res.data
          })
        }
        console.log("load data from network")
      },
      fail:function(res) {
        var cacheIndexData = wx.getStorageSync('cacheIndexDataKey');
        if (cacheIndexData != "") {
          that.setData({ list: cacheIndexData.topic_list });
          var newoffset = cacheIndexData.topic_list.length + offset
          that.setData({ offset: newoffset });
          console.log("load data from cache")
        } else {
          console.log("cache data is null")
        }
      },
      complete:function() {
        // 关闭loading
        wx.hideLoading();
      }
    })
  },
  // 列表排序
  sortlist: function (e) {
    console.log("#0 enter sortlist")
    var sort = e.currentTarget.dataset.idx;
    this.setData({
      sortTab: e.currentTarget.dataset.idx
    });
    var that = this;
    this.loadData(0);
    console.log("#0 quit sortlist")
  },
  refresh:function() {
    this.loadData(0);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.loadData(0);
    console.log('===list.js@onLoad===');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===list.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===list.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===list.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===list.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===list.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===list.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===list.js@onShareAppMessage===');
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
