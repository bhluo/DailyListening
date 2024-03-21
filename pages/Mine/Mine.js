// pages/Mine/Mine.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null,
        hiddenmodalput: true,
        comment:'',
    },
    note:function(e){
        wx.navigateTo({
            url: '../list/list'
          })
    },
    bindTextAreaBlur:function(e){
        this.setData({
            comment:e.detail.value
          })
          console.log(this.data.comment);
        },
        note:function(e){
            wx.navigateTo({
                url: '../list/list'
              })
        },
    gotopractice: function(param){
        wx.switchTab({
          url: '/pages/practice/practice',
          })
      },
      modalinput: function () {
        this.setData({
          hiddenmodalput: !this.data.hiddenmodalput
        })
      },
      cancel: function(){
        this.setData({
         hiddenmodalput: true
        });
       },
       //确认
       confirm: function(){
        var that = this;
        wx.request({
            url : "http://qwq.uovou.cn/comment.php",
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
            data: {
                comment: JSON.stringify(this.data.comment),
                username:JSON.stringify(app.globalData.userInfo.nickName),
                face_url:JSON.stringify(app.globalData.userInfo.avatarUrl),
            },
            success: function (res) {
              console.log(res.data);
              that.setData({
              hiddenmodalput: true
                           })
              wx.showToast({
                title: '留言成功！',
                icon: 'success',
                duration: 2000
              })
            },
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    goLogin:function(){
        var app = getApp();
        var userInfo = this.data.userInfo;
        app.globalData.userInfo = this.data.userInfo;
        var app = getApp();
        if(!userInfo){
        var that = this;
        wx.getUserProfile({
            desc:'用于完善用户信息',
            success(res){
                app.globalData.userInfo = res.userInfo
                console.log(app.globalData.userInfo)
                that.setData({
                    userInfo:res.userInfo,
                })
            }
        })
        }
    },
    loginOut:function(){
        var userInfo = this.data.userInfo;
        if(!userInfo){
            wx.showToast({
              title: '请先点击登录',
              icon:'none'
            })
        }
        else{
            wx.showModal({
                title: '请问您确定要退出吗？',
                content: '',
                complete: (res) => {
                  if (res.confirm) {
                      wx.setStorageSync('userInfo', null);
                      getApp().globalData.userInfo = null;
                      this.setData({
                          userInfo:null
                      })
                  }
                }
            })    
        }
    },
    setting:function(){
        var app = getApp();
        console.log(app.globalData.userInfo);
    }
})