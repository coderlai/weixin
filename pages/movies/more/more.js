// pages/movies/more/more.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        more: {
            title: "",
            movieList: [],
            showMore: false
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var title = options.title
        var type = options.type

        // console.log(options)
        var _this = this
        wx.request({
            url: app.links[type],
            method: "GET",
            header: {
                "content-type": "json" // 默认值
            },
            success: function(res) {

                var movieList = []
                var result = res.data.subjects
                for (var i = 0; i < result.length; i++) {
                    movieList.push({
                        moviePost: result[i].images.small,
                        name: result[i].title,
                        score: { num: result[i].rating.average }
                    })
                }

                //更新视图
                _this.setData({
                    more: {
                        title: title,
                        movieList: movieList
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})