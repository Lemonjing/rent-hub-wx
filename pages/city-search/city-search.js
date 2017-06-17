//city-search.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    list: [],
    offset: 0,
    loading: false,
    plain: false,
    sortTab: 0,
    keyword: "",
    city: "",
    cityname: ['杭州', '上海'],
    total_count: 0
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
  loadMore(e) {
    if (this.data.list.length === 0) return
    this.setData({ loading: true })
    this.setData({ plain: true })
    var currentOffset = e.currentTarget.dataset.offset;
    var that = this;
    var currentLimit = 10;
    var city = this.data.city
    var sortTab = this.data.sortTab
    var keyword = this.data.keyword;
    wx.request({
      url: 'https://tinymood.com/api/search/',
      data: { offset: currentOffset, limit: currentLimit, sort: sortTab, city: city, keyword: keyword },
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
          plain: false,
          offset: res.data.topic_list.length + currentOffset,
          list: that.data.list.concat(res.data.topic_list)
        })
      }
    })
  },

  // 加载初始数据
  loadCityData: function (offset) {
    // 显示loading
    wx.showLoading({
      title: "搜索中..."
    });
    var that = this
    var limit = 8
    var sortTab = this.data.sortTab;
    var city = this.data.city;
    var keyword = this.data.keyword;
    console.log("#1 sortTab=", sortTab)

    wx.request({
      url: 'https://tinymood.com/api/search/',
      data: { offset: offset, limit: limit, sort: sortTab, city: city, keyword: keyword },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ list: res.data.topic_list, total_count: res.data.total_count });
        var newoffset = res.data.topic_list.length + offset
        that.setData({ offset: newoffset });
      },
      complete: function () {
        // 关闭loading
        wx.hideLoading();
      }
    })
  },

  // 列表排序
  sortlist: function (e) {
    var sort = e.currentTarget.dataset.idx;
    this.setData({
      sortTab: e.currentTarget.dataset.idx
    });
    var that = this;
    this.loadCityData(0);
  },
  
  //刷新
  refresh: function () {
    this.loadCityData(0);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keyword = options.keyword;
    var city = options.city;
    console.log("city-search@onload,keyword=", keyword)
    console.log("city-search@onload,city=", city)
    this.setData({ keyword: keyword, city: city });
    this.loadCityData(0);
    console.log('===city-search.js@onLoad===');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===city-search.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===city-search.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===city-search.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===city-search.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===city-search.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===city-search.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===city-search.js@onShareAppMessage===');
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
