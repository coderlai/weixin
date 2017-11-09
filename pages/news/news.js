//导入新闻列表数据

var newsData = require('../../mockData/newsData.js')

Page({
    data: {

    },
    onLoad: function() {
        console.log("新闻列表页页面加载完成")
        console.log(newsData)
        this.setData({
                newsList: newsData.newsList
            })
            //页面加载完成
        console.log("加载完成")
    },
    toDetail: function(event) {
        var currentId = event.currentTarget.dataset.id

        // console.log("新闻id", currentId)
        // 跳转至新闻详情页
        wx.navigateTo({
            url: "news-detail/news-detail?id=" + currentId
        })
    },
    onswiper: function(event) {
        //currentTarget 是捕获事件的元素
        //target        是触发事件的元素
        var currentId = event.target.dataset.id
        wx.navigateTo({
            url: "news-detail/news-detail?id=" + currentId
        })
    }
})