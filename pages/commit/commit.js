const app = getApp();
Page({
        data: {
            content:'',
        },

        bindTextAreaBlur:function(e){
            this.setData({
                content:e.detail.value
              })
            },
    btnSub: function (e) {
        var that = this;
        wx.request({
            url : "http://qwq.uovou.cn/upload.php",
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
            data: {
                content: JSON.stringify(this.data.content),
                username:JSON.stringify(app.globalData.userInfo.nickName),
                face_url:JSON.stringify(app.globalData.userInfo.avatarUrl),
            },
            success: function (res) {
              console.log(res.data);
              wx.navigateBack({
                delta: 1  //小程序关闭当前页面返回上一页面
              })
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                duration: 2000
              })
            },
          })
      },
        onLoad(options) {
        },
    
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady() {
    
        },
    
        /**
         * 生命周期函数--监听页面显示
         */
        onShow() {
    
        },
    
        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide() {
    
        },
    
        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload() {
    
        },
    
        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh() {
    
        },
    
        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom() {
    
        },
    
        /**
         * 用户点击右上角分享
         */
        onShareAppMessage() {
    
        }
    })