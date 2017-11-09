Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: null

        // movie: {
        //     movieImg: "/images/movies/01.webp",
        //     title: "神奇动物在哪里",
        //     country: "英国",
        //     year: 2016,
        //     wishCount: 3432,
        //     commentCount: 1566,
        //     originalTitle: "Fanstastic Beasts and Where to Find Them",
        //     stars: 8.1,
        //     directors: "大卫·叶茨",
        //     casts: "埃迪·雷德梅恩/凯特琳·沃特斯顿/丹·福勒/埃里森·萨多尔",
        //     generes: "剧情、奇幻、冒险",
        //     summary: "机器人9号（伊利亚•伍德 Elijah Wood 饰）突然醒来，发现身边的世界充满危机，四处残败，一片末世景象。9号带着一个画有三个奇怪符号的圆形物体逃到街上，幸遇发明家机器人2号（马丁•兰道 Martin Landau 饰）给自己装上了声音，但2号却不幸被机器怪兽抓走。9号找到了老兵1号（克里斯托弗•普卢默 Christopher Plummer 饰）、机械工5号（约翰•雷利 John C. Reilly 饰）、疯癫画家6号（克里斯品•格拉夫 Crispin Glover 饰）和大力士8号（弗雷德•塔塔绍尔 Fred Tatasciore 饰）。9号与5号擅自出行援救2号，危急时被女武士7号（詹妮佛•康纳利 Jennifer Connelly 饰）救下，但无意中9号却令终极机器兽复活。带着自己从哪里来以及生存使命的问题，9号决定想尽办法制服机器兽，拯救全世界……",
        //     castsInfo: [{
        //             img: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.webp",
        //             name: "伊利亚·伍德",
        //             id: "1054395"
        //         },
        //         {
        //             img: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3996.webp",
        //             name: "詹妮弗·康纳利",
        //             id: "1016673"
        //         },
        //         {
        //             img: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55994.webp",
        //             name: "约翰·C·赖利",
        //             id: "1017907"
        //         },
        //         {
        //             img: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42033.webp",
        //             name: "克里斯托弗·普卢默",
        //             id: "1036321"
        //         }
        //     ]
        // }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        console.log(options.id)
        var url = "https://api.douban.com/v2/movie/subject/" + options.id
        var _this = this
        wx.request({
            url: url,
            method: "GET",
            header: {
                "content-type": "json" // 默认值
            },
            success: function(res) {
                console.log(res)
                var data = res.data
                var directors = []
                var castsInfo = []
                var castNames = []
                data.directors.forEach(function(item) {
                    directors.push(item.name)
                })

                data.casts.forEach(function(item) {
                    castsInfo.push({
                        img: item.avatars.small,
                        name: item.name
                    })
                    castNames.push(item.name)
                })

                var movieItem = {
                    movieImg: data.images.large,
                    title: data.title,
                    country: data.countries.join("、"),
                    year: data.year,
                    wishCount: data.wish_count,
                    commentCount: data.comments_count,
                    originalTitle: data.original_title,
                    stars: data.rating.average,
                    directors: directors.join("、"),
                    casts: castNames.join("/"),
                    generes: data.genres.join("、"),
                    summary: data.summary,
                    castsInfo: castsInfo
                }

                _this.setData({
                    movie: movieItem
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