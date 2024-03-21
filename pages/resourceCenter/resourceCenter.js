Page({
  // 1. 定义数组
  data:{
    // 数组
    list:[],
    active:"hot",
    curtime:"0",
    t_more:false,
  },
  handleTap:function(e){
    // console.log(e.currentTarget.dataset.active);
    let active = e.currentTarget.dataset.active;
    this.setData({
      // active:active
      active
    })
  },
  dianji:function(e){
    var webview=e.target.dataset.webview
  
    wx.navigateTo({
      url: '/pages/webview/webview?webview='+webview,
    })
  },
  download:function()
    {
        var that = this;
        wx.downloadFile({
          url: 'https://www.yahooo.site/source/test.pdf',
          header:{},
          success:function(res){
              var tempFilePath = res.tempFilePath;
              console.log(tempFilePath)
          }
        })
    },
    

 // 2. 发请求 获取网络数据
 onLoad(){
    var month_arr=[0,29,31,30,31,30,31,31,30,31,30,31]
    var sum_day=0;
    var Endtime_Month =9;
    var Endtime_day=22;
     var NowTime = parseInt(new Date().toISOString().substring(5, 7));
     var NowTime2 = parseInt(new Date().toISOString().substring(8, 10));
     for(let i=Endtime_Month-2;i>=NowTime;i--){
       sum_day+=month_arr[i];
       console.log(sum_day);
     }
     sum_day+=Endtime_day+month_arr[NowTime]-NowTime2;
 
   this.setData({
       curtime:sum_day
   })
 },
 t_more_fun(){
    wx.showLoading({
      title: '努力加载中',
    })
    setTimeout(function (){
       wx.hideLoading()
   },100)
    this.setData({
        t_more:true,
    })}
});