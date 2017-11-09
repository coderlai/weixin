var app = getApp()
Page({
    data: {
        list: [{
                typeName: "in_theaters",
                type: 0,
                title: "正在热映",
                movieList: [],
                link: "https://api.douban.com/v2/movie/in_theaters",
                showMore: true
            }, {
                typeName: "coming_soon",
                type: 1,
                title: "即将上映",
                movieList: [],
                link: "https://api.douban.com/v2/movie/coming_soon",
                showMore: true
            },
            {
                typeName: "new_movies",
                type: 2,
                title: "新片榜",
                movieList: [],
                link: "https://api.douban.com/v2/movie/top250",
                showMore: true
            }
        ]
    },
    onLoad: function() {
        console.log(this.data.list)
        var list = this.data.list

        //获取正在热映的电影数据

        this.getPages(list[0].link, list[0].type, list[0].title)

        /*
        wx.request({
            url: app.links[0],
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
                    if (i === 2) break;
                }

                //更新视图
                _this.setData({
                    in_theaters: {
                        type: 0,
                        title: "正在热映",
                        movieList: movieList
                    }
                })
            }
        })
        */


        //获取即将上映的电影数据
        this.getPages(list[1].link, list[1].type, list[1].title)
        this.getPages(list[2].link, list[2].type, list[2].title)

        /*
        wx.request({
            url: app.links[1],
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
                    if (i === 2) break;
                }

                //更新视图
                _this.setData({
                    coming_soon: {
                        type: 1,
                        title: "即将上映",
                        movieList: movieList
                    }
                })
            }
        })

        */



    },
    more: function(event) {
        var title = event.currentTarget.dataset.title
        var type = event.currentTarget.dataset.type

        wx.navigateTo({
            url: "./more/more?title=" + title + "&type=" + type
        })

        // console.log(title)
    },
    getPages: function(url, type, title) {
        var _this = this
        wx.request({
            url: url,
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
                        score: { num: result[i].rating.average },
                        id: result[i].id
                    })
                    if (i === 2) break;
                }
                var key = 'list[' + type + '].movieList'
                var obj = {}
                obj[key] = movieList
                _this.setData(obj)
            }
        })
    },
    toDetail: function(event) {
        console.log(event)
        wx.navigateTo({
            url: "./movie-detail/movie-detail?id=" + event.currentTarget.dataset.id
        })
    }
})