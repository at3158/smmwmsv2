var connection = require('../connection');

function Logins() {
    //region 登入
    this.getEmployee = function(req, res) {
        var Employee = {
            code: (typeof req.body.code != 'undefined' && req.body.code) ? req.body.code : 0,
            password: (typeof req.body.password != 'undefined' && req.body.password) ? req.body.password : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('select code,name,_sn from employee where ? and ? limit 0,1;', [Employee.code,Employee.password], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                } else {
                    req.session._sn = result[0]._sn;
                    req.session.code = result[0].code;
                    req.session.name = result[0].name;
                    console.log(result);
                    res.json(result);
                }
                con.release();
            });
        });
    };
}
module.exports = new Logins();
