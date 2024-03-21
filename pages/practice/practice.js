// index.js
const { audio_url } = require('../../utils/data.js')

Page({
  data: {
    peonumble:[
      {Pnumble:"34",accuracy:"85"},
      {Pnumble:"46",accuracy:"87"},
      {Pnumble:"76",accuracy:"56"},
      {Pnumble:"22",accuracy:"76"},
    ],
    decide:0,
    activeIndex:0,
    audio_url:audio_url,
    url_index:0,
    VerticalNavTop: 0,
    TabCur: 0,
    activeIndexleft:0,
    ificationGrade:[
      {title:"四级"},
      {title:"六级"},
      {title:"考研"},
      {title:"专四"},
    ],
    ificationTitle:[
      {title:"2022"},
      {title:"2021"},
      {title:"2020"},
      {title:"2019"},
      {title:"2018"},
      {title:"2017"},
      {title:"2016"},
      {title:"2015"},
      {title:"2014"},
      {title:"2013"},
      {title:"2012"},
      {title:"2011"},
      {title:"2009"},
      {title:"2008"}
    ],
    
  },


  onLoad() {
    const that = this;
    wx.setStorage({
        key:"Year",
        data:2022
    })
    wx.getSystemInfo({
      success (res) {
        // var heightleft = (res.windowHeight*2);
        const height = (res.windowHeight*2);
        that.setData({
          phoneHeight: height,
        })
      }
    })
  },

  //随着滚动动态设置左侧边栏的选中态
  showActive(e) {
    //方法欠佳，还需改进
    const index = parseInt(e.detail.scrollTop/116);
    this.setData({
      activeIndex: index
     })
  },
  // 侧边栏的点击事件
  changeleft(e){
    const that = this;
    const { index, id } =  e.currentTarget.dataset
    this.setData({
      activeIndexleft:index,
    });
    wx.showLoading({
        title: 'Loading！',
      })

      setTimeout(function (){
          wx.hideLoading()
      },200)
    wx.setStorage({
        key:"Type",
        data:that.data.ificationGrade[index].title
    })
    if(index==2){
        this.setData({
            decide:1,
          })
    }
  
  },
  change(e) {
    const { index, id } =  e.currentTarget.dataset
    let arr=this.data.peonumble
    wx.showLoading({
      title: '加载中',
    })
    for(let i=0;i<4;i++){
        arr[i].Pnumble=parseInt(parseInt(this.data.ificationTitle[index].title)/20);
        arr[i].accuracy=8*(10-i)-i*2;
    }
    setTimeout(function () {
        wx.hideLoading()
      }, 200)
    this.setData({
      VerticalNavTop: (index - 1) * 50,
      activeIndex:index,
      TabCur: id,
      peonumble:arr
    })

    wx.setStorage({
        key:"Year",
        data:this.data.ificationTitle[index].title
    })
    this.setData({
        VerticalNavTop: (index - 1) * 50,
        activeIndex:index,
        TabCur: id,
      })
  },
  enter0(e){
    var U_index = this.data.activeIndex*2+1;
    wx.setStorage({
        key:"Month",
        data:"JunFir",
    })
    wx.setStorage({
        key:"audio_src",
        data:this.data.audio_url[U_index]
    })
    wx.navigateTo({
      
        url: '/pages/testquestions/index',
      })
  
  },
  enter1(e){
    var U_index = this.data.activeIndex*2+1;
    wx.setStorage({
        key:"Month",
        data:"JunSec"
    })
    wx.setStorage({
        key:"audio_src",
        data:this.data.audio_url[U_index]
    })
    wx.navigateTo({
        url: '/pages/testquestions/index',
      })
   
  },
  enter2(e){
    var U_index = this.data.activeIndex*2;

    wx.setStorage({
        key:"Month",
        data:"DecFir",
    })
    wx.setStorage({
        key:"audio_src",
        data:this.data.audio_url[U_index]
    })
    wx.navigateTo({
      
        url: '/pages/testquestions/index',
      })
   
  },
  enter3(e){
    wx.setStorage({
        key:"Month",
        data:"DecSec"
    })
    wx.setStorage({
        key:"audio_src",
        data:this.data.audio_url[this.data.activeIndex]
    })
    
    wx.navigateTo({
      url: '/pages/testquestions/index',
    })
    
  },
});
