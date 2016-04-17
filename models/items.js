var connection = require('../connection');

function Items() {
    //region 資產
    //資產
    this.getItem = function(req, res) {
        connection.acquire(function(err, con) {
            var query = con.query('select * from item limit ?,?;', [parseInt(page) * 20, (parseInt(page) + 1) * 20], function(err, result) {
                con.release();
                res.json(result);
            });
            console.log(query.sql);
        });
    };
    this.getItems = function(req, res) {
        var page = (typeof req.params.page != 'undefined' && req.params.page) ? req.params.page : 0;
        connection.acquire(function(err, con) {
            var query = con.query('select * from item limit ?,?;', [parseInt(page) * 20, (parseInt(page) + 1) * 20], function(err, result) {
                con.release();
                res.json(result);
            });
            console.log(query.sql);
        });
    };
    //新增1個員工
    this.setEmployeeCreate = function(req, res) {
        var Employee = {
            code: req.body.code,
            password: req.body.password,
            name: req.body.name,
            telephone: req.body.telephone,
            ext: req.body.ext,
            address: req.body.address,
            cellphone: req.body.cellphonee,
            sex: req.body.sex,
            department_sn: req.body.department_sn
        };
        connection.acquire(function(err, con) {
            var query = con.query('insert into item set ?;', Employee, function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                } else {
                    res.json(result.insertId);
                }
                con.release();
            });
            console.log(query.sql);
        });
    };
    //刪除一筆
    this.setEmployeeDelete = function(req, res) {
        var Employee = {
            _sn: (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('delete from item where _sn=?;', [Department._sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                } else {
                    res.send("true");
                }
                con.release();
            });
            console.log(query.sql);
        });
    };
    //異動一筆
    this.setEmployeeUpdate = function(req, res) {
        var sn = (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0;
        var Employee = {
            code: req.body.code,
            password: req.body.password,
            name: req.body.name,
            telephone: req.body.telephone,
            ext: req.body.ext,
            address: req.body.address,
            cellphone: req.body.cellphonee,
            sex: req.body.sex,
            department_sn: req.body.department_sn
        };
        connection.acquire(function(err, con) {
            var query = con.query('update  item set ? where _sn=?;', [Employee, sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                } else {
                    res.send("true");
                }
                con.release();
            });
            console.log(query.sql);
        });
    };
    //endregin

    this.extend = function(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    };
}
module.exports = new Items();
