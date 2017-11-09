//导入数据
var newsObject = require('../../../mockData/newsData.js')
    //获取小程序全局对象
var app = getApp()
Page({
    data: {
        isCollected: false,
        currentId: null,
        isplaying: false //表示背景音乐的播放状态
    },
    onLoad: function(option) {
        console.log("播放状态", app.playingStatus)

        // console.log("导入数据", newsObject)
        var currentId = option.id

        //设置当前页的新闻id
        this.setData({
            currentId: currentId
        })

        //通过新闻id获取新闻详情
        var currentNews = newsObject.newsList[currentId]

        this.setData({
            newsImg: currentNews.newImg,
            avatar: currentNews.postAvatar,
            postDate: currentNews.newDate,
            title: currentNews.newTitle,
            content: currentNews.content,
            coverImg: currentNews.music.coverImg
        })

        //读取缓存中的新闻收藏列表
        var collection = wx.getStorageSync("collection")

        //判断用户之前是否收藏过新闻
        if (collection) {
            if (collection[currentId]) {
                this.setData({
                    isCollected: true
                })
            }
        } else {
            wx.setStorageSync("collection", {})
        }

        var _this = this

        //初始化播放状态
        if (app.playingStatus && (this.data.currentId === app.currentNewsId)) {
            this.setData({
                isplaying: true
            })
        } else {
            this.setData({
                isplaying: false
            })
        }

        //监听音乐的播放
        wx.onBackgroundAudioPlay(function() {
            //更新当前音乐的播放状态
            _this.setData({
                isplaying: true
            })
            app.playingStatus = true
            app.currentNewsId = _this.data.currentId
        })

        //监听音乐暂停事件
        wx.onBackgroundAudioPause(function() {
            //更新当前音乐的播放状态
            _this.setData({
                isplaying: false
            })

            app.playingStatus = false
        })

    },
    oncollect: function() {
        this.showToast()

        //this.showModal()
    },
    showToast: function() {
        //判断当前是已收藏还是未收藏
        this.setData({
            isCollected: !this.data.isCollected
        })

        var collection = wx.getStorageSync("collection")

        collection[this.data.currentId] = this.data.isCollected

        //重新保存缓存
        wx.setStorageSync("collection", collection)

        //弹窗提示
        wx.showToast({
            title: this.data.isCollected ? "收藏成功" : "取消收藏"
        })



    },
    showModal: function() {
        //在用户已经收藏的情况下，询问是否确认取消收藏
        //在用户未收藏的情况下，询问是否确认收藏
        var _this = this
        wx.showModal({
            content: this.data.isCollected ? "是否取消收藏？" : "是否收藏？",
            cancelColor: "red",
            confirmColor: "green",
            success: function(res) {
                if (res.confirm) { //用户是否点击了确定按钮
                    _this.setData({
                        isCollected: !_this.data.isCollected
                    })
                    var collection = wx.getStorageSync("collection")
                    collection[_this.data.currentId] = _this.data.isCollected
                    wx.setStorageSync("collection", collection)
                }
            }
        })
    },
    onshare: function() {
        wx.showActionSheet({
            itemList: ["分享到朋友圈", "分享到QQ", "分享到微博"],
            success: function(res) {
                console.log(res.tapIndex)
                if (res.cancel) {
                    console.log("取消分享")
                }
            }
        })
    },
    onplay: function() {
        var currentMusic = newsObject.newsList[this.data.currentId].music
            //当点击播放按钮时，先判断背景音乐是处于播放还是暂停状态
        if (this.data.isplaying) {
            //暂停
            wx.pauseBackgroundAudio()
            this.setData({
                isplaying: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: currentMusic.url
            })
            this.setData({
                isplaying: true
            })
        }
    }
})