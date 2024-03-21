var app = getApp()
Page({
  data: {
    firco:"#000000",
    secco:"#979797",
    forum:[]
  },
  ontTap: function () {
    wx.navigateTo({url: '../commit/commit',
    })
},
    onShow() {
    this.onLoad();
    },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //onload获取服务器的内容（id，content...）
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'https://qwq.uovou.cn/data.php',//此处填写你后台请求地址
      method: 'GET',
      header: {'Content-Type': 'application/json' },
      data: {},
      success: function (res) {
        //console.log(res.data);//打印请求返回的结果
        that.setData({ forum: res.data})
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  }
})