Page({
    data: {},
    jumpTo: function() {
        //console.log("aaa")

        wx.navigateTo({
            url: '../news/news'
        })

        // wx.redirectTo({
        //     url: '../news/news'
        // })

    }
})