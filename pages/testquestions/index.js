const { textContent } = require('../../utils/data.js')
const myaudio = wx.createInnerAudioContext();
Page({
  data: {
      color:"",
      option:0,
      Tyear:" ",
      Type:" ",
      Month:" ",
      answerState:0,
      Start_analy:"",
      trueTotal:0,
      question_index:0,
      audio_url:"",
      optionstyle:[],
    Lsection:[
      {title:"sectionA"},
      {title:"sectionB"},
      {title:"sectionC"},

    ],
    arr:[],
    Lsectionsen:[
      {title:"题目"},
      {title:"解析"},
      {title:"原文"},

    ],
    activeIndexleftsen:0,
    activeIndexleft:0,
    // 判断是否播放,状态
    isplay:false,
    //总的进度
    playAll:0,
    //播放的秒数
    playS:0,
    // 播放的百分比
    playP:0,
    playTime:0,
    zero:'0',
	//音频链接
    audio:'',
    myaudio:myaudio,
    textContent:textContent,
    indexcontent:'question',
    question:"question",
    content:"content",
    analysis:"analysis",
    analysissR:" ",
    frequency:7,
    Qarray:[
        {numble:"1"},
        {numble:"2"},
        {numble:"3"},
        {numble:"4"},
        {numble:"5"},
        {numble:"6"},
        {numble:"7"},
    ],
    submitArray:[
        {ans:"0" },
        {ans:"0" },
        {ans:"0" },
        {ans:"0" },
        {ans:"0" },
        {ans:"0" },
        {ans:"0" },
    ],
    Answer_arr:[],
    trueAnswer:[1,1,1,1,1,1,1]
  },
  onLoad() {
    var year = wx.getStorageSync('Year')
    var pattern = wx.getStorageSync('Type')
    var month = wx.getStorageSync('Month')
    var audio_src = wx.getStorageSync('audio_src')
    this.setData({
        Tyear:year,
        Type:pattern,
        Month:month,
        audio_url:audio_src
    })
    wx.request({
      url: 'http://qwq.uovou.cn/cet4/'+this.data.Tyear+'/'+this.data.Month+'/api/Question.json',
      success:(res)=>{
        this.setData({
            arr:res.data,
        })
    }
    })
    const that = this;
    myaudio.src = audio_src;
    
    //myaudio.src = 'https://aod.cos.tx.xmcdn.com/storages/d4e9-audiofreehighqps/88/C5/GKwRIJEGK1eaAK709gE6ubcb.m4a'
    that.setData({
        audio:audio_src,
		//audio:"https://aod.cos.tx.xmcdn.com/storages/e1e5-audiofreehighqps/83/06/GKwRIUEHMkq7ALhaQgG8sVWB.m4a",
        isplay:false,
    })
    wx.request({
        url: 'http://qwq.uovou.cn/cet4/'+this.data.Tyear+'/'+this.data.Month+'/api/Analysis.json',
        success:(res)=>{
          this.setData({
              analysissR:res.data,
          })
      }
      })
      wx.request({
        url: 'http://qwq.uovou.cn/cet4/'+this.data.Tyear+'/'+this.data.Month+'/api/Cet4_answer.json',
        success:(res)=>{
          this.setData({
              Answer_arr:res.data,
          })
      }
      })
      wx.setNavigationBarTitle({
        title: this.data.Tyear+"年"+this.data.Month+"英语听力"
    })
   
  },
  onPullDownRefresh: function(){
    wx.request({
        url: 'http://qwq.uovou.cn/cet4/'+this.data.Tyear+'/'+this.data.Month+'/api/Question.json',
        success:(res)=>{
          this.setData({
              arr:res.data,
          })
      }
      })
    wx.stopPullDownRefresh()
  },
  /*bindtimeupdates(res) {
    var that = this;
    console.log("播放信息",res)
     console.log('bindtimeupdate', res.detail.currentTime, '时间总时长-->', res.detail.duration);
    that.setData({
      //播放进度
      playAll:res.detail.duration,
      //播放的秒数
      playS:res.detail.currentTime,
      //计算进度条的播放百分比
      playP:(res.detail.currentTime/res.detail.duration)*100,
    })
    //判断当前播放事件大于等于音频的总时长时
    //停止播放。进度条保留在100%
    if(res.detail.currentTime<=res.detail.duration){
      that.setData({
        isplay:false,
        playP:100
      })
      //设置定时器500毫秒以后进度条回到起点
      setTimeout(() => {
        that.setData({
          playP:0
        })
      }, 500);
    }
},*/
    //选择框实现
    radioChange(e){
        var arrs = this.data.submitArray;
        var that =this;
        for(const x in arrs){
           arrs[e.target.dataset.parentindex-1].ans= e.detail.value;
        }
        that.setData({
            submitArray:arrs
        })

    }
    ,
   
    Lsubmit(){
        var that =this;
        var arrs = that.data.submitArray;
        var tans = that.data.trueAnswer;
        
        var arrF = that.data.arr;
        var num  = 0;
        wx.request({
            url: 'http://qwq.uovou.cn/cet4/'+this.data.Tyear+'/'+this.data.Month+'/api/Analysis.json',
            success:(res)=>{
              this.setData({
                  analysissR:res.data
              })
          }
          })
        for(const x in arrs){
           if(arrs[x].ans==0)
            wx.showToast({
              title: '还未完成作答',
              icon:'error',
              duration:500
            })
        }
        for(const x in arrs){
            if(arrs[x].ans==tans[x])
            {
                
                num = num + 1;
                arrF[parseInt(x)+parseInt(that.data.question_index)].fir[parseInt(arrs[x].ans-1)].backgroundColor = 'green';
                
                that.setData({
                    arr:arrF
                })
            }
            else
            {
                arrF[parseInt(x)+parseInt(that.data.question_index)].fir[parseInt(arrs[x].ans-1)].backgroundColor = 'red';
                that.setData({
                    arr:arrF
                })
            }

        }
        that.setData({
            trueTotal:num,
        })
        wx.showToast({
            title: '您答对了'+ num +'道题'+'请查看解析',
            duration:1000
          })
    }
    ,

    changesection(e){
        wx.showLoading({
          title: 'Loading！',
        })

        setTimeout(function (){
            wx.hideLoading()
        },2000)
},



  changeleft(e){
      console.log("ssss")
    const { index } =  e.currentTarget.dataset
    this.setData({
      activeIndexleft:index,
    })
    wx.showLoading({
        title: 'Loading！！',
      })

     if(index==0){
        this.setData({
            trueAnswer:this.data.Answer_arr[index].sectionA_ans,
            Qarray:[
                {numble:"1"},
                {numble:"2"},
                {numble:"3"},
                {numble:"4"},
                {numble:"5"},
                {numble:"6"},
                {numble:"7"},
            ],
            question_index:0,
          })
    }
    else if(index==1){
        this.setData({
            trueAnswer:this.data.Answer_arr[index].sectionB_ans,
            submitArray:[
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
            ],
            Qarray:[
            {numble:"8"},
            {numble:"9"},
            {numble:"10"},
            {numble:"11"},
            {numble:"12"},
            {numble:"13"},
            {numble:"14"},
            {numble:"15"},
        ],
            frequency:8,
            question_index:7,
          })
    }
    else{
        this.setData({
            trueAnswer:this.data.Answer_arr[index].sectionC_ans,
            submitArray:[
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" },
                {ans:"0" }
            ],
            Qarray:[
                {numble:"16"},
                {numble:"17"},
                {numble:"18"},
                {numble:"19"},
                {numble:"20"},
                {numble:"21"},
                {numble:"22"},
                {numble:"23"},
                {numble:"24"},
                {numble:"25"},
            ],
            frequency:10,
            question_index:15
          })
    }
      setTimeout(function (){
          wx.hideLoading()
      },200)
   
    
  },

  changeleftsen(e){
    wx.showLoading({
        title: 'Loading！',
      })

      setTimeout(function (){
          wx.hideLoading()
      },100)
    const { index } =  e.currentTarget.dataset
    this.setData({
      activeIndexleftsen:index,
    })
    if(index==0){
        this.setData({
            indexcontent:"question",
          })
    }
    else if(index==1){
        this.setData({
            indexcontent:"analysis",
          })
    }
    else{
        this.setData({
            indexcontent:"content",
          })
    }
  },

  sliderChange:function(e){
    console.log("拖动到",e.detail.value)
    var that = this;
    //计算播放的秒数
    console.log("时间",that.data.playAll)
    var gotoplay = e.detail.value/100*that.data.playAll
    var zero ='0';
    if(gotoplay%60>=10){
        zero='';
    }
    that.setData({
      playS:gotoplay,
      //设置进度条到百分多少
      playP:e.detail.value,
      playTime:gotoplay,
      zero:zero,
    })
    //AudioContext.seek(number position)
	//跳转到指定播放的秒数位置。
    myaudio.seek(gotoplay);
  },
  //播放
  clickplay: function () {
    var that= this;
    myaudio.play();
    
    myaudio.onTimeUpdate(() => {
        var zero ='0';
    if(myaudio.currentTime%60>=10){
        zero='';
    }
        this.setData({
            playAll:myaudio.duration,
            playS:myaudio.currentTime,
            playP:(myaudio.currentTime/myaudio.duration)*100,
            playTime:myaudio.currentTime,
            zero:zero
        })
        
      })
      
 
    that.setData({
      isplay: true
    });
  },
  // 停止
  stop: function () {
    var that= this;
    //AudioContext.pause()
	//暂停音频
    myaudio.pause()
    that.setData({
      isplay: false
    });
  },
})