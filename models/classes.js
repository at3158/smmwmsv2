var connection = require('../connection');

function Classes() {
    //regin 大類別使用
    //選擇全部
    this.getClasses = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from class;', function(err, result) {
                con.release();
                res.json(result);
            });
        });
    };
    //建立一筆
    this.setClassCreate = function(req, res) {
        var Class = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無"
        };
        connection.acquire(function(err, con) {
            var query = con.query('insert into class set ?;', Class, function(err, result) {
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
    this.setClassDelete = function(req, res) {
        var Class = {
            _sn: (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('delete from class where _sn=?;', [Class._sn], function(err, result) {
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
    this.setClassUpdate = function(req, res) {
        var sn = (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0;
        var Class = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無",
        };
        connection.acquire(function(err, con) {
            var query = con.query('update  class set ? where _sn=?;', [Class, sn], function(err, result) {
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
module.exports = new Classes();
