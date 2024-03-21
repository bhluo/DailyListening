// index.js
const app = getApp()
Page({
    data: {
        userInfo:null,
        book:'词达人四级英语',
        daka:'false',
        hiddenmodalput:true ,
        comment:'',
        modalHidden:'true',
        Sentence:[]
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
      qiandao:function(){
        var that = this;
        wx.showToast({
            title: '签到成功',//提示文字
            duration:2000,//显示时长
            mask:true,
            icon:'success',
            success:function(){
            },//接口调用成功
            fail: function () { },  //接口调用失败的回调函数  
            complete: function () {
                that.setData({
                    daka: 'true'
                  })
             } //接口调用结束的回调函数  
         })
      },
      choosebook: function(){
        var ithis = this;
        var list = ['词达人四级英语', '词达人六级英语', '考研英语大纲词汇5500','红宝书考研英语词汇'];
        wx.showActionSheet({
          itemList: list,
          success(res) {
            console.log(list[res.tapIndex])
            ithis.setData({
              book: list[res.tapIndex]
            })
          },
        })
      },
      onShow() {
        this.setData({
            userInfo:app.globalData.userInfo,
        }),
        wx.request({
            url: 'https://api.vvhan.com/api/en',
            success:(res)=>{
              this.setData({
                  Sentence:res.data
              })
            },
          })
    },
       showSentence: function() {
        this.setData({
          modalHidden: false
        })
      },
      modalCandel: function() {
        // do something
        this.setData({
          modalHidden: true
        })
      },
      modalConfirm: function() {
        // do something
        this.setData({
          modalHidden: true
        })
      }
})
