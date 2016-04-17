var connection = require('../connection');

function Statuses() {
    //regin 庫存位使用
    //選擇全部
    this.getStatuses = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from status;', function(err, result) {
                con.release();
                res.json(result);
            });
        });
    };
    //建立一筆
    this.setStatusCreate = function(req, res) {
        var Status = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無",
        };
        connection.acquire(function(err, con) {
            var query = con.query('insert into status set ?;', Status, function(err, result) {
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
    this.setstatusDelete = function(req, res) {
        var Status = {
            _sn: (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('delete from status where _sn=?;', [Status._sn], function(err, result) {
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
    this.setStatusUpdate = function(req, res) {
        var sn = (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0;
        var Status = {
            code: req.body.code,
            name: req.body.name,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無",
        };
        connection.acquire(function(err, con) {
            var query = con.query('update status set ? where _sn=?;', [Status, sn], function(err, result) {
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
module.exports = new Statuses();
