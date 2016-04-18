function Sessions() {
    //將Session資料放到資料庫中
    this.getLoginStatus = function(req,res,next) {
        if (req.session.user) {
            //登入是成功的
            req.session.user = 0;
            console.log("你登入過");
            next();
        } else {
            // 需要登入
            req.session.user = 1;
            // 協定 回傳 XXXX代碼 就是沒登入過，APP 要登入耶~
            res.send("抱歉，你還沒登入過");
            console.log(req.session);
        }
    };
    //將Cookies 放到客戶端(危險)
    this.setSession = function(req, res) {
        if (req.cookies.isVisit) {
            console.log(req.cookies);
            res.send("歡迎再度訪問");
        } else {
            res.cookie('isVisit', 1, {
                maxAge: 60 * 1000
            });
            res.send("歡迎您");
        }
    };
}

module.exports = new Sessions();
