var connection = require('../connection');

function SubClasses() {
    //regin 小分類使用
    //選擇全部
    this.getSubClasses = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from subclass;', function(err, result) {
                con.release();
                res.json(result);
            });
        });
    };
    //建立一筆
    this.setSubClassCreate = function(req, res) {
        var SubClass = {
            code: req.body.code,
            name: req.body.name,
            class_sn: (typeof req.body.class_sn != 'undefined' && req.body.class_sn) ? req.body.class_sn : 0,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無"
        };
        connection.acquire(function(err, con) {
            var query = con.query('insert into subclass set ?;', SubClass, function(err, result) {
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
    this.setSubClassDelete = function(req, res) {
        var SubClass = {
            _sn: (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0
        };
        connection.acquire(function(err, con) {
            var query = con.query('delete from subclass where _sn=?;', [SubClass._sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                }
                con.release();
                res.send("true");
            });
            console.log(query.sql);
        });
    };
    //異動一筆
    this.setSubClassUpdate = function(req, res) {
        var sn = (typeof req.body._sn != 'undefined' && req.body._sn) ? req.body._sn : 0;
        var SubClass = {
            code: req.body.code,
            name: req.body.name,
            class_sn: (typeof req.body.class_sn != 'undefined' && req.body.class_sn) ? req.body.class_sn : 0,
            note: (typeof req.body.note != 'undefined' && req.body.note) ? req.body.note : "無"
        };
        connection.acquire(function(err, con) {
            var query = con.query('update  subclass set ? where _sn=?;', [SubClass, sn], function(err, result) {
                if (err) {
                    console.log(err);
                    res.send("false");
                }
                con.release();
                res.send("true");
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
module.exports = new SubClasses();
